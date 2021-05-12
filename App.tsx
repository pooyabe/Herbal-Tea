import React from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Index from "./screens/index";

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async loadFonts() {
    try {
      SplashScreen.preventAutoHideAsync();
      await Font.loadAsync({
        Kalameh: {
          uri: require("./assets/font/Kalameh.ttf"),
        },
      });
    } catch {
      console.log("EveryThing Fucked!");
    } finally {
      this.setState({ fontsLoaded: true });
      SplashScreen.hideAsync();
    }
  }
  UNSAFE_componentWillMount() {
    this.loadFonts();
  }

  render() {
    return <Index />;
  }
}
