"use client";

import useDeviceOrientation from "@/hooks/useDeviceOrientation";

export default function OrientationInfo() {
  const {
    deviceOrientation,
    requestAccess,
    isPermissionGranted,
    isSupported,
    error,
  } = useDeviceOrientation();

  const gamma = deviceOrientation.gamma;

  // Interpolate between gray and gold based on gamma (-30 to +30 range)
  const interpolateColor = (gamma: number | null): string => {
    if (gamma === null) return "rgb(245, 245, 130)";

    const thresholdAngle = 30; // degrees

    const absGamma = Math.abs(gamma); // symmetry around 0
    const clamped = Math.min(absGamma, thresholdAngle); // clamp to [0, 30]
    const ratio = clamped / thresholdAngle; // normalize to 0–1

    const r = Math.round(128 + (255 - 128) * ratio);
    const g = Math.round(128 + (215 - 128) * ratio);
    const b = Math.round(128 + (0 - 128) * ratio);

    return `rgb(${r},${g},${b})`;
  };

  const dynamicColor = interpolateColor(gamma);

  return (
    <div className="p-4 text-white">
      <h1 
        className="text-lg font-bold mb-2 transition-colors duration-0" 
        style={{ color: dynamicColor }}
      >
        Device Orientation
      </h1>

      {!isSupported && (
        <p className="text-red-500">Device Orientation API not supported.</p>
      )}

      {error && <p className="text-red-400">Error: {error.message}</p>}

      {isSupported && !isPermissionGranted && (
        <button
          className="bg-blue-500 px-4 py-2 rounded text-white"
          onClick={requestAccess}
        >
          Request Access
        </button>
      )}

      {isPermissionGranted && (
        <ul className="mt-4 space-y-2">
          <li>Alpha (Z-axis): {deviceOrientation.alpha ?? "N/A"}</li>
          <li>Beta (X-axis): {deviceOrientation.beta ?? "N/A"}</li>
          <li>Gamma (Y-axis): {gamma ?? "N/A"}</li>
          <li>Absolute: {deviceOrientation.absolute ? "Yes" : "No"}</li>
          <li
            style={{ color: dynamicColor }}
            className="font-semibold transition-colors duration-0"
          >
            Y-axis Color Fade
          </li>
        </ul>
      )}
    </div>
  );
}
