import React, { useEffect, useRef, useState } from "react";

// Shows a spinner while the real image URL is still being fetched/loaded,
// and only swaps to the fallback after a genuine timeout or load error —
// never an instant flash of the fallback before the real photo had a chance.
const ImageWithFallback = ({ src, fallbackSrc, alt, className, timeout = 5000 }) => {
  const [status, setStatus] = useState(src ? "loading" : "waiting");
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setStatus((current) => (current === "loaded" ? current : "error"));
    }, timeout);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (src) {
      setStatus("loading");
    }
  }, [src]);

  const showSpinner = status === "waiting" || status === "loading";
  const displaySrc = status === "error" ? fallbackSrc : src;

  return (
    <div className={`relative bg-gray-100 ${className}`}>
      {showSpinner && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {displaySrc && (
        <img
          src={displaySrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      )}
    </div>
  );
};

export default ImageWithFallback;
