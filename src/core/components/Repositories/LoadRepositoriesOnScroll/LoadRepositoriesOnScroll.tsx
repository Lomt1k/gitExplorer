import { useEffect } from "react";
import ScrollChecker from "../../../helpers/ScrollChecker";
import GithubAPI from "../../../api/GithubAPI";

type LoadRepositoriesOnScrollProps = {
  scrollPercentage: number;
}

let lastRequestTime = 0;

function TryLoadNextPage() {
  const now = Date.now();
  if (now - lastRequestTime < 1_000) {
    return;
  }

  lastRequestTime = now;
  GithubAPI.tryFetchNextPage();
}

const LoadRepositoriesOnScroll = ({ scrollPercentage }: LoadRepositoriesOnScrollProps) => {
  const scrollChecker = new ScrollChecker(scrollPercentage, TryLoadNextPage);

  useEffect(() => {
    // on mount
    scrollChecker.start();

    // on unmount
    return () => scrollChecker.stop();
  }, []);

  return <></>
}

export default LoadRepositoriesOnScroll;