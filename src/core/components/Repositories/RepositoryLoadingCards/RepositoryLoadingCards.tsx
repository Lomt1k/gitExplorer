import { Card } from "antd";

type RepositoryLoadingCardsProps = {
  count: number;
}

const RepositoryLoadingCards = ({count}: RepositoryLoadingCardsProps) => {
  const elements: JSX.Element[] = [];

  for (let i = 0; i < count; i++) {
    elements.push(
      <li key={i}>
        <Card loading={true} style={{height: "100%"}}/>
      </li>
    )
  }

  return <>{elements}</>;
}

export default RepositoryLoadingCards;