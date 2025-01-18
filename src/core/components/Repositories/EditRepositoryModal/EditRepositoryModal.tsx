import RootStore from "../../../store/RootStore";
import { Input, InputNumber, message, Modal, Typography } from "antd";
import { RepositoryData, isRepositoryData } from "../../../api/GithubTypes";

type EditRepositoryModalProps = {
  data: RepositoryData;
  close: Function;
}

const EditRepositoryModal = ({ data, close }: EditRepositoryModalProps) => {
  const newData = JSON.parse(JSON.stringify(data));
  if (!isRepositoryData(newData)) {
    const messageText = 'Произошла ошибка при копировании объекта RepositoryData';
    console.error(messageText);
    message.error(messageText, 5);
    return <></>;
  }

  const handleInputChange = <K extends keyof RepositoryData>(key: K, value: RepositoryData[K]) => {
    newData[key] = value;
  }

  const handleOk = () => {
    RootStore.repoStore.replace(data.id, newData);
    close();
  }

  const handleCancel = () => {
    close();
  }

  return (
    <Modal open={true} title={`Редактирование данных (id ${data.id})`} okText="Сохранить" cancelText="Отменить" onOk={handleOk} onCancel={handleCancel}>
      <div style={{ marginBottom: '10px' }}>
        <Typography.Text>Название репозитория</Typography.Text>
        <Input placeholder="Введите название" defaultValue={data.name} autoFocus
          onChange={(e) => handleInputChange('name', e.target.value)} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <Typography.Text>Описание репозитория</Typography.Text>
        <Input.TextArea placeholder="Введите описание" defaultValue={data.description} style={{ height: 100, resize: 'none' }}
          onChange={(e) => handleInputChange('description', e.target.value)} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <InputNumber placeholder="Введите число" defaultValue={data.stargazers_count}
          addonBefore={<Typography.Text>Количество звёзд</Typography.Text>}
          onChange={(number) => handleInputChange('stargazers_count', number ?? 0)} />
      </div>
    </Modal>
  )
}

export default EditRepositoryModal;