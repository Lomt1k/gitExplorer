import { observer } from "mobx-react-lite";
import RootStore from "../../../store/RootStore";
import RepositoryCard from "../RepositoryCard/RepositoryCard";
import RepositoryLoadingCards from "../RepositoryLoadingCards/RepositoryLoadingCards";
import LoadRepositoriesOnScroll from "../LoadRepositoriesOnScroll/LoadRepositoriesOnScroll";
import EmptyRepository from "../EmptyRepository/EmptyRepository";
import { Row, Col } from "antd";

const RepositoriesGrid = observer(() => {

  return (
    <>
      <Row gutter={[16, 24]}>
        {RootStore.repoStore.datas.map(data => {
          return (
            <Col key={data.id} span={6} xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
              <RepositoryCard data={data} />
            </Col>
          )
        })}
        {RootStore.repoStore.isLoading && <RepositoryLoadingCards count={12}/> }
      </Row>
      {!RootStore.repoStore.isLoading && <LoadRepositoriesOnScroll scrollPercentage={60} />}
      {!RootStore.repoStore.isLoading && RootStore.repoStore.datas.length < 1 && <EmptyRepository/>}
    </>
  )
})

export default RepositoriesGrid;