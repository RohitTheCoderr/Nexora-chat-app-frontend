import { useEffect } from "react";
import { useMatches } from "react-router-dom";

export type RouteHandle = {
  title?: string;
};

const DocumentTitle = () => {
  const matches = useMatches();

  useEffect(() => {
    const currentRoute = matches
      .slice()
      .reverse()
      .find((match) => (match.handle as RouteHandle)?.title);

    const title =
      (currentRoute?.handle as RouteHandle)?.title || "Nexora Chat App";

    document.title = title;
  }, [matches]);

  return null;
};

export default DocumentTitle;
