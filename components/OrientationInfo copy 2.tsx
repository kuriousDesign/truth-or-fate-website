"use client";

import useGammaColor from "@/hooks/useGammaColor";

export default function OrientationInfo() {
  const {
    color,
    gamma,
    deviceOrientation,
    requestAccess,
    isPermissionGranted,
    isSupported,
    error,
  } = useGammaColor(); // optionally pass { h: 120 } etc. for hue overrides

  //const gamma = deviceOrientation.gamma;

  // Convert HSV to RGB
  const hsvToRgb = (h: number, s: number, v: number): [number, number, number] => {
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;
    let r = 0, g = 0, b = 0;

    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255),
    ];
  };

  // Fade brightness based on gamma
  const interpolateColor = (gamma: number | null): string => {
    if (gamma === null) {gamma = 0;} // Default to 0 if gamma is null

    const maxAngle = 20;
    const deadBand = 2.5;
    const absGamma = Math.max(deadBand,Math.min(Math.abs(gamma), maxAngle));
    const ratio = (absGamma - deadBand) / (maxAngle - deadBand);

    const h = 36;             // Gold hue
    const s = .47;            // Full saturation
    const v = .96 - ratio * 0.7; // Value fades from 1.0 to 0.3

    const [r, g, b] = hsvToRgb(h, s, v);
    return `rgb(${r}, ${g}, ${b})`;
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
          <li
            style={{ color: dynamicColor }}
            className="font-semibold transition-colors duration-0"
          > Gamma (Y-axis): {gamma ?? "N/A"}</li>
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
