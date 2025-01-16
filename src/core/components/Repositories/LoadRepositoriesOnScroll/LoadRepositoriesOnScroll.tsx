import { useEffect } from "react";
import ScrollChecker from "../../../helpers/ScrollChecker";
import GithubAPI from "../../../api/GithubAPI";

type LoadRepositoriesOnScrollProps = {
  scrollPercentage: number;
}

function TryLoadNextPage() {
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