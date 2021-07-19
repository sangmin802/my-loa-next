const Custom404 = () => {
  if (typeof window === "undefined") return null;
  window.location.replace("/");

  return <div>404입니다</div>;
};

export default Custom404;
