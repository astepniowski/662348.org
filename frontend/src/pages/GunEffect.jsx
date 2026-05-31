import { useWebcam } from "../components/GunEffect/useWebcam";
import { useHandTracking } from "../components/GunEffect/useHandTracking";
import { useGesture } from "../components/GunEffect/useGesture";
import { useCanvas } from "../components/GunEffect/useCanvas";

import '../styles/GunEffect.css'

export default function GunEffect() {
  const { videoRef, status } = useWebcam();
  const { landmarks } = useHandTracking(videoRef);
  const { isGunShape, didFlick, tipPosition } = useGesture(landmarks);
  const { canvasRef } = useCanvas(videoRef, landmarks, didFlick, tipPosition, isGunShape);

  console.log({ isGunShape, didFlick });

return (
  <div className="gun-effect-wrapper">
    <video ref={videoRef} style={{ display: "none" }} />
    <canvas ref={canvasRef} className="gun-effect-canvas" />

    <div className="gun-effect-status">
      {status === "requesting" && <p>Waiting for camera permission...</p>}
      {status === "error" && <p>Camera error — check console</p>}
      {status === "ready" && <p>try making finger guns :D</p>}
    </div>

    <div className="gun-effect-debug">
      <span>isGunShape: <span style={{ color: isGunShape ? "lime" : "red" }}>{String(isGunShape)}</span></span>
      {" | "}
      <span>didFlick: <span style={{ color: didFlick ? "lime" : "red" }}>{String(didFlick)}</span></span>
      {tipPosition && (
        <>
          {" | "}
          <span>x: {tipPosition.x.toFixed(3)}</span>
          {" | "}
          <span>y: {tipPosition.y.toFixed(3)}</span>
        </>
      )}
    </div>
  </div>
);
}