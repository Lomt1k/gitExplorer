import "./_header.scss";
import Container from "../Utils/Container/Container";
import GitSearch from "../GitSearch/GitSearch";

const Header = () => {
  return (
    <Container>
      <div className="header__wrapper">
        <span className="header__logo">gitExplorer</span>
        <GitSearch/>
      </div>
    </Container>
  )
}

export default Header;