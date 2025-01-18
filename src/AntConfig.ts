import { ThemeConfig } from "antd";

const AntConfig: ThemeConfig = {
  token: {
    fontFamily: "Noto Sans",
    colorPrimary: "#677AE7",
    colorBgLayout: "#DDDDDD",
  },
  components: {
    Button: {
      defaultBorderColor: "transparent",
      defaultHoverBorderColor: "transparent",
      defaultActiveBorderColor: "transparent",
    }
  }
}

export default AntConfig;