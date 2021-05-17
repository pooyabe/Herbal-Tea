import React from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { StatusBar, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Index from "./screens/index";

const Dealer = createStackNavigator();

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
  componentDidMount() {
    this.loadFonts();
  }

  render() {
    return (
      <NavigationContainer>
        <Dealer.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Dealer.Screen name="Index" component={Index} />
        </Dealer.Navigator>
      </NavigationContainer>
    );
  }
}
