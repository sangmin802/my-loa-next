import { useRouter } from "next/router";

const Custom404 = () => {
  if (typeof window === "undefined") return null;
  const history = useRouter();
  const path = history.asPath;
  const splitPath = path.split("/");

  if (splitPath[1] === "userInfo") return history.replace(path);
  history.replace("/");

  return <div>404입니다</div>;
};

export default Custom404;
