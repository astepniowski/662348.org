import { useEffect, useRef } from "react";

export function useCanvas(videoRef, landmarks, didFlick, tipPosition, isGunShape) {
  const canvasRef = useRef(null);
  const landmarksRef = useRef(null);
  const didFlickRef = useRef(false);
  const tipPositionRef = useRef(null);
  const isGunShapeRef = useRef(false);
  const holesRef = useRef([]);
  const smoothedPosRef = useRef(null);
  const audioCtxRef = useRef(null);
  const audioBufferRef = useRef(null);

  landmarksRef.current = landmarks;
  didFlickRef.current = didFlick;
  tipPositionRef.current = tipPosition;
  isGunShapeRef.current = isGunShape;

  useEffect(() => {
    const img = new Image();
    img.src = "/bullethole.png";

    // Set up Web Audio API
    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    fetch("/pew.mp3")
      .then(res => res.arrayBuffer())
      .then(data => audioCtxRef.current.decodeAudioData(data))
      .then(buffer => { audioBufferRef.current = buffer; })
      .catch(err => console.log("audio load error:", err));

    const playSound = () => {
      if (!audioBufferRef.current || !audioCtxRef.current) return;
      const source = audioCtxRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(audioCtxRef.current.destination);
      source.start(0);
    };

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    let animFrameId = null;
    let prevFlick = false;
    const FADE_DURATION = 3000;
    const DISTANCE = 150;
    const LERP = 0.3;

    const syncSize = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    };

    const drawCrosshair = (x, y) => {
      const size = 20;
      const gap = 5;

      ctx.strokeStyle = isGunShapeRef.current ? "lime" : "red";
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(x - size, y);
      ctx.lineTo(x - gap, y);
      ctx.moveTo(x + gap, y);
      ctx.lineTo(x + size, y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x, y - gap);
      ctx.moveTo(x, y + gap);
      ctx.lineTo(x, y + size);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, gap, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawFingerDots = () => {
      const lm = landmarksRef.current;
      if (!lm) return;

      const FINGER_TIPS = [4, 8, 12, 16, 20];
      const color = isGunShapeRef.current ? "lime" : "red";

      FINGER_TIPS.forEach((index) => {
        const tip = lm[index];
        const x = (1 - tip.x) * canvas.width;
        const y = tip.y * canvas.height;

        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });
    };

    const getAimedPosition = () => {
      const lm = landmarksRef.current;
      if (!lm) return null;

      const indexTip = lm[8];
      const indexMcp = lm[5];

      const dx = (1 - indexTip.x) - (1 - indexMcp.x);
      const dy = indexTip.y - indexMcp.y;

      const len = Math.sqrt(dx * dx + dy * dy);
      if (len === 0) return null;
      const nx = dx / len;
      const ny = dy / len;

      const tipX = (1 - indexTip.x) * canvas.width;
      const tipY = indexTip.y * canvas.height;

      return {
        x: tipX + nx * DISTANCE,
        y: tipY + ny * DISTANCE,
      };
    };

    const draw = () => {
      if (video.readyState >= 2) {
        syncSize();
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        ctx.restore();

        const aimed = getAimedPosition();

        if (aimed) {
          if (!smoothedPosRef.current) {
            smoothedPosRef.current = { x: aimed.x, y: aimed.y };
          }
          smoothedPosRef.current.x += (aimed.x - smoothedPosRef.current.x) * LERP;
          smoothedPosRef.current.y += (aimed.y - smoothedPosRef.current.y) * LERP;
        }

        if (didFlickRef.current && !prevFlick) {
          if (smoothedPosRef.current) {
            holesRef.current.push({
              x: smoothedPosRef.current.x,
              y: smoothedPosRef.current.y,
              createdAt: Date.now(),
            });
            playSound();
          }
        }
        prevFlick = didFlickRef.current;

        holesRef.current = holesRef.current.filter(
          (hole) => Date.now() - hole.createdAt < FADE_DURATION
        );

        holesRef.current.forEach((hole) => {
          const age = Date.now() - hole.createdAt;
          const opacity = 1 - age / FADE_DURATION;
          ctx.globalAlpha = opacity;
          ctx.drawImage(img, hole.x - 50, hole.y - 50, 100, 100);
          ctx.globalAlpha = 1;
        });

        drawFingerDots();

        if (smoothedPosRef.current && landmarksRef.current) {
          drawCrosshair(smoothedPosRef.current.x, smoothedPosRef.current.y);
        }
      }

      animFrameId = requestAnimationFrame(draw);
    };

    video.addEventListener("loadedmetadata", syncSize);
    animFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameId);
      video.removeEventListener("loadedmetadata", syncSize);
      audioCtxRef.current?.close();
    };
  }, [videoRef]);

  return { canvasRef };
}