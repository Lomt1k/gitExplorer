import { Card, Col } from "antd";

type RepositoryLoadingCardsProps = {
  count: number;
}

const RepositoryLoadingCards = ({count}: RepositoryLoadingCardsProps) => {
  const elements: JSX.Element[] = [];

  for (let i = 0; i < count; i++) {
    elements.push(
      <Col key={`loading-card-${i}`} span={6} xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
        <Card loading={true} style={{height: "100%"}}/>
      </Col>
    )
  }

  return <>{elements}</>;
}

export default RepositoryLoadingCards;