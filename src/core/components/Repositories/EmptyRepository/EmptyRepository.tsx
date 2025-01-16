import "./_empty-repository.scss";
import { Typography } from 'antd';
import bycicleIcon from '../../../../assets/bycicle.svg';

const EmptyRepository = () => {
  return (
    <div className='empty-repository'>
      <div className='empty-repository__content'>
        <img className='empty-repository__img' src={bycicleIcon} />
        <Typography.Title className="empty-repository__title" level={2}>
          Хватит изобретать велосипед
        </Typography.Title>
        <Typography.Text className="empty-repository__text" type={'secondary'}>
          Найди репозиторий с нужным тебе решением
        </Typography.Text>
      </div>
    </div>

  )
}

export default EmptyRepository;