"use client";

export default function useDeviceMapLink(query = "Las Palmas de Gran Canaria") {
  const isIOS =
    typeof navigator !== "undefined" &&
    /iPhone|iPad|iPod/i.test(navigator.userAgent);

  const isAndroid =
    typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);

  if (isIOS) {
    return `https://maps.apple.com/?q=${encodeURIComponent(query)}`;
  }

  if (isAndroid) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      query
    )}`;
  }

  return `https://www.google.com/maps/place/${encodeURIComponent(query)}`;
}
