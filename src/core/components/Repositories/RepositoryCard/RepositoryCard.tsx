import "./_repository-card.scss";
import { Button, Card, Typography } from "antd";
import { RepositoryData } from "../../../api/GithubTypes";
import { useState } from "react";
import IconStar from "../../Icons/IconStar";
import IconLink from "../../Icons/IconLink";
import IconEdit from "../../Icons/IconEdit";
import IconHide from "../../Icons/IconHide";
import RootStore from "../../../store/RootStore";
import EditRepositoryModal from "../EditRepositoryModal/EditRepositoryModal";

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
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    console.log('setShowModal');
    setShowModal(true);
  }

  const handleHideClick = () => {
    RootStore.repoStore.remove(data.id);
  }

  return (
    <>
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
          {data.description ? getShortDescription(data.description) : 'Описание отсутствует'}
        </Typography.Text>
      </Card>
      {showModal && <EditRepositoryModal data={data} close={() => setShowModal(false)} />}
    </>

  )
}

export default RepositoryCard;