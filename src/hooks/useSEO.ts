import { useEffect } from "react";

interface useSEOProps {
  title?: string;
  description: string;
}

export default function useSEO({ title, description }: useSEOProps) {
  useEffect(() => {
    if (title) document.head.title = title;
    if (description)
      document
        .getElementById("meta[name=description]")
        ?.setAttribute("content", description);
  }, []);
}
