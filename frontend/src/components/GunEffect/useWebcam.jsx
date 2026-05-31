import { useEffect, useRef, useState } from "react";

export function useWebcam() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    let stream = null;

    const startWebcam = async () => {
      setStatus("requesting");

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "user",
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.oncanplay = () => {
            videoRef.current.play();
            setStatus("ready");
          };
        }
      } catch (err) {
        console.log("full error:", err);
        setError(err.message || err.name || "unknown error");
        setStatus("error");
      }
    };

    startWebcam();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return { videoRef, status, error };
}