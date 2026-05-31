import { useEffect, useRef, useState } from "react";

function distance(a, b) {
  return Math.sqrt(
    Math.pow(a.x - b.x, 2) +
    Math.pow(a.y - b.y, 2) +
    Math.pow(a.z - b.z, 2)
  );
}

export function useGesture(landmarks) {
  const [didFlick, setDidFlick] = useState(false);
  const prevPosRef = useRef(null);
  const lastFlickRef = useRef(0);
  const gunShapeStartRef = useRef(null);

  useEffect(() => {
    if (!landmarks) {
      prevPosRef.current = null;
      gunShapeStartRef.current = null;
      return;
    }

    const thumbTip = landmarks[4];
    const wrist = landmarks[0];
    const gunDetected = checkGunShape(landmarks);

    if (gunDetected) {
      // Start timer when gun shape first detected
      if (gunShapeStartRef.current === null) {
        gunShapeStartRef.current = Date.now();
      }

      const heldFor = Date.now() - gunShapeStartRef.current;
      const readyToShoot = heldFor > 250;

      if (readyToShoot) {
        const currentThumbY = thumbTip.y;
        const currentWristY = wrist.y;

        const prevThumbY = prevPosRef.current?.thumb;
        const prevWristY = prevPosRef.current?.wrist;

        if (prevThumbY !== undefined && prevWristY !== undefined) {
          const thumbDelta = Math.abs(currentThumbY - prevThumbY);
          const wristDelta = Math.abs(currentWristY - prevWristY);
          const relativeDelta = thumbDelta - wristDelta;

          if (relativeDelta > 0.02) {
            const now = Date.now();
            if (now - lastFlickRef.current > 500) {
              lastFlickRef.current = now;
              setDidFlick(true);
              setTimeout(() => setDidFlick(false), 200);
            }
          }
        }

        prevPosRef.current = { thumb: currentThumbY, wrist: currentWristY };
      }
    } else {
      // Reset everything when gun shape lost
      gunShapeStartRef.current = null;
      prevPosRef.current = null;
      setDidFlick(false);
    }
  }, [landmarks]);

  const tipPosition = landmarks
    ? { x: landmarks[8].x, y: landmarks[8].y }
    : null;

  const isGunShape = landmarks ? checkGunShape(landmarks) : false;

  return { isGunShape, didFlick, tipPosition };
}

function checkGunShape(landmarks) {
  const thumbTip  = landmarks[4];
  const thumbMcp  = landmarks[2];
  const indexTip  = landmarks[8];
  const indexMcp  = landmarks[5];
  const middleTip = landmarks[12];
  const middleMcp = landmarks[9];
  const ringTip   = landmarks[16];
  const ringMcp   = landmarks[13];
  const pinkyTip  = landmarks[20];
  const pinkyMcp  = landmarks[17];

  const indexDist  = distance(indexTip, indexMcp);
  const middleDist = distance(middleTip, middleMcp);
  const ringDist   = distance(ringTip, ringMcp);
  const pinkyDist  = distance(pinkyTip, pinkyMcp);
  const thumbDist  = distance(thumbTip, thumbMcp);

  const indexExtended = indexDist > 0.15;
  const middleCurled  = middleDist < 0.1;
  const ringCurled    = ringDist < 0.1;
  const pinkyCurled   = pinkyDist < 0.1;
  const thumbExtended = thumbDist > 0.07;

  return indexExtended && middleCurled && ringCurled && pinkyCurled && thumbExtended;
}