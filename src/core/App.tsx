import Header from './components/Header/Header';
import Main from './components/Utils/Main/Main';
import Repositories from './components/Repositories/Repositories';

function App() {
  return (
    <>
      <Header/>
      <Main>
        <Repositories/>
      </Main>
    </>
  )
}

export default App;
