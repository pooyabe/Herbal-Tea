import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

export default class Chart extends React.Component {
  logout = () => {
    AsyncStorage.setItem('@logged_in', '0');
    this.props.navigation.navigate("Index", {
      screen: "Index",
    });
  }
  render() {
    return (
      <View>
        <Button onPress={this.logout}>خروج</Button>
      </View>
    );
  }
}
