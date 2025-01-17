import Container from "../Utils/Container/Container";
import RepositoriesGrid from "./RepositoriesGrid/RepositoriesGrid";

const Repositories = () => {
  return (
    <section className="repositories">
      <h1 className="visually-hidden">Найди нужный репозиторий на GitHub</h1>
      <Container>
        <RepositoriesGrid/>
      </Container>
    </section>
  );
}

export default Repositories;