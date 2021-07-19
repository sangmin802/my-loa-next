const Custom404 = () => {
  if (typeof window === "undefined") return null;
  const path = window.location.pathname;
  const splitPath = path.split("/");

  if (splitPath[1] === "userInfo" && splitPath.length === 3)
    return window.location.replace(path);

  window.location.replace("/");

  return <div>404입니다</div>;
};

export default Custom404;
