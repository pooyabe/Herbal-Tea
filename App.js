import React from "react";
import * as Font from "expo-font";
import Index from "./screens/index";
import FirstLoading from "./screens/LoadingPage/FirstLoading";

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async loadFonts() {
    await Font.loadAsync({
      Kalameh: {
        uri: require("./assets/font/Kalameh.ttf"),
      },
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    if (this.state.fontsLoaded) {
      return <Index />;
    }else{
      return <FirstLoading />
    }
  }
}
