const Custom404 = () => {
  if (typeof window === "undefined") return null;
  const l = window.location;
  let pathSegmentsToKeep = 0;
  l.replace(
    l.protocol +
      "//" +
      l.hostname +
      (l.port ? ":" + l.port : "") +
      l.pathname
        .split("/")
        .slice(0, 1 + pathSegmentsToKeep)
        .join("/") +
      "/?/" +
      l.pathname
        .slice(1)
        .split("/")
        .slice(pathSegmentsToKeep)
        .join("/")
        .replace(/&/g, "~and~") +
      (l.search ? "&" + l.search.slice(1).replace(/&/g, "~and~") : "") +
      l.hash
  );

  return <div>404입니다</div>;
};

export default Custom404;
