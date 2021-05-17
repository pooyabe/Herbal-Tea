import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { StackActions } from "@react-navigation/native";

export default class Sizes extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    log: 1,
  };

  logout = () => {
    AsyncStorage.setItem("@logged_in", "0");
    this.props.navigation.navigate("Index", {
      screen: "Index",
    });
  };

  render() {
    return (
      <TouchableOpacity onPress={this.logout}>
        <Text>خروج</Text>
      </TouchableOpacity>
    );
  }
}
