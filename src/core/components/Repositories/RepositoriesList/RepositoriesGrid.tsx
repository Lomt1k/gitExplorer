import { observer } from "mobx-react-lite";
import RootStore from "../../../store/RootStore";
import RepositoryCard from "../RepositoryCard/RepositoryCard";
import "./_repositories-grid.scss";

const RepositoriesGrid = observer(() => {

  return (
    <ul className='repositories-grid'>
      {RootStore.repoStore.datas.map(data => {
        return (
          <li key={data.id}>
            <RepositoryCard data={data} />
          </li>
        )
      })}
    </ul>
  )
})

export default RepositoriesGrid;