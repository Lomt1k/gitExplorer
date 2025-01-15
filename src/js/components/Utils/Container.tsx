type ContainerProps = {
  children: string | JSX.Element | JSX.Element[]
}

const Container = ({children}: ContainerProps) => {
  return <div className="container">{children}</div>
}

export default Container;