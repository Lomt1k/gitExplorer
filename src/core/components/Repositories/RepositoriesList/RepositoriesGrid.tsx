import "./_repositories-grid.scss";
import { observer } from "mobx-react-lite";
import RootStore from "../../../store/RootStore";
import RepositoryCard from "../RepositoryCard/RepositoryCard";
import RepositoryLoadingCards from "../RepositoryLoadingCards/RepositoryLoadingCards";
import LoadRepositoriesOnScroll from "../LoadRepositoriesOnScroll/LoadRepositoriesOnScroll";

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
      {RootStore.repoStore.isLoading &&
        <RepositoryLoadingCards count={12}/>
      }
      {!RootStore.repoStore.isLoading && 
        <LoadRepositoriesOnScroll scrollPercentage={60} />}
    </ul>
  )
})

export default RepositoriesGrid;