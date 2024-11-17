import { useEffect, useState } from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Agregar el event listener al montar
    window.addEventListener("resize", handleResize);

    // Remover el event listener al desmontar
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
