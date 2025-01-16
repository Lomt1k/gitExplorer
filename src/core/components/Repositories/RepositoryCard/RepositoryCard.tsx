import "./_repository-card.scss";
import { Card, Typography } from "antd";
import { RepositoryData } from "../../../api/GithubAPI";

const maxDescriptionLength = 140;

const getShortDescription = (description: string): string => {
  return description?.length > maxDescriptionLength 
  ? description.slice(0, maxDescriptionLength - 1) + '...' 
  : description;
}

type RepositoryCardProps = {
  data: RepositoryData;
}

const RepositoryCard = ({ data }: RepositoryCardProps) => {
  return (
    <Card className="repository-card" title={data.name} bordered={false}>
        <Typography.Text className="repository-card__text">
          {getShortDescription(data.description)}
        </Typography.Text>
    </Card>
  )
}

export default RepositoryCard;