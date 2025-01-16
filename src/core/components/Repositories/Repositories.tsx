import Container from "../Utils/Container/Container";
import RepositoriesGrid from "./RepositoriesList/RepositoriesGrid";

const Repositories = () => {
  return (
    <section className="repositories">
      <h1 className="visually-hidden">Найди нужный репозиторий на GitHub</h1>
      <Container>
        <div className="repositories__wrapper">
          <RepositoriesGrid/>
        </div>
      </Container>
    </section>
  );
}

export default Repositories;