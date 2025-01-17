import "./_empty-repository.scss";
import { Typography } from 'antd';
import { observer } from "mobx-react-lite";

type EmptyRepositoryProps = {
  title: string,
  text: string,
  imageUrl: string,
  imageAlt: string,
}

const EmptyRepository = observer(({title, text, imageUrl, imageAlt}: EmptyRepositoryProps) => {
  return (
    <div className='empty-repository'>
      <img className='empty-repository__img' src={imageUrl} alt={imageAlt} width={300} height={300}/>
      <Typography.Title className="empty-repository__title" level={2}>
        {title}
      </Typography.Title>
      <Typography.Text className="empty-repository__text" type={'secondary'}>
        {text}
      </Typography.Text>
    </div>
  )
})

export default EmptyRepository;