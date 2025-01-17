import "./_repository-card.scss";
import { Card, Typography } from "antd";
import { RepositoryData } from "../../../api/GithubTypes";
import IconStar from "../../Icons/IconStar";

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
    <Card className="repository-card" bordered={false} title={data.name}
      extra={
        <div className="repository-card__extra">
          <IconStar width={16} height={16}/>
          <Typography.Text>{data.stargazers_count.toLocaleString()}</Typography.Text>
        </div>}
    >
      <Typography.Text className="repository-card__text">
        {getShortDescription(data.description)}
      </Typography.Text>
    </Card>
  )
}

export default RepositoryCard;