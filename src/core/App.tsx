import Header from './components/Header/Header';
import Main from './components/Utils/Main/Main';
import Repositories from './components/Repositories/Repositories';
import { Layout } from 'antd';

function App() {
  return (
    <>
      <Layout style={{minHeight: "100vh"}}>
        <Header />
        <Main>
          <Repositories />
        </Main>
      </Layout>
    </>
  )
}

export default App;
