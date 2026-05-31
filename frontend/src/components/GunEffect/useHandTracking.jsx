import { useEffect, useRef, useState } from "react";

export function useHandTracking(videoRef) {
  const [landmarks, setLandmarks] = useState(null);
  const handsRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

    const init = async () => {
      await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js");
      await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js");

      const hands = new window.Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.6,
      });

      // Called every frame with results
      hands.onResults((results) => {
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          setLandmarks(results.multiHandLandmarks[0]);
        } else {
          setLandmarks(null);
        }
      });

      // Camera utility feeds frames into MediaPipe
      const camera = new window.Camera(videoRef.current, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });

      await camera.start();

      handsRef.current = hands;
      cameraRef.current = camera;
    };

    init();

    return () => {
      cameraRef.current?.stop();
      handsRef.current?.close();
    };
  }, [videoRef]);

  return { landmarks };
}