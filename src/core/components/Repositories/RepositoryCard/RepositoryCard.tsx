import "./_repository-card.scss";
import { Button, Card, Typography } from "antd";
import { RepositoryData } from "../../../api/GithubTypes";
import IconStar from "../../Icons/IconStar";
import IconLink from "../../Icons/IconLink";
import IconEdit from "../../Icons/IconEdit";
import IconHide from "../../Icons/IconHide";
import RootStore from "../../../store/RootStore";

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
  const handleEditClick = () => {
    // TODO
    console.log('handleEditClick');
  }

  const handleHideClick = () => {
    RootStore.repoStore.remove(data.id);
  }

  return (
    <Card className="repository-card" bordered={false} title={data.name}
      extra={
        <div className="repository-card__extra">
          <IconStar width={16} height={16} />
          <Typography.Text>{data.stargazers_count.toLocaleString()}</Typography.Text>
        </div>}
      actions={[
        <a href={data.html_url} target='_blank'>
          <Button type="text">
            <IconLink width={20} height={20} key="link" />
          </Button>
        </a>,
        <Button type="text" onClick={handleEditClick}>
          <IconEdit width={20} height={20} key="edit" />
        </Button>,
        <Button type="text" onClick={handleHideClick}>
          <IconHide width={24} height={24} key="hide" />
        </Button>,
      ]}
    >
      <Typography.Text className="repository-card__text">
        {getShortDescription(data.description)}
      </Typography.Text>
    </Card>
  )
}

export default RepositoryCard;