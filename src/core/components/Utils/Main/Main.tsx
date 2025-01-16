type MainProps = {
  children: JSX.Element | JSX.Element[] | string;
}

const Main = ({children}: MainProps) => {
  return <main>{children}</main>
}

export default Main;