import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { Component } from "react";
import { Alert } from "react-native";

export default class LogOut extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.logOut();
  }


  logOut = async () => {
    Alert.alert("خروج", "آیا می‌خواهید خارج شوید؟", [
      {
        text: "نه",
        onPress: () => this.props.navigation.navigate("Sizes"),
        style: "cancel",
      },
      {
        text: "بله",
        onPress: async () => {
          await AsyncStorage.setItem("@logged_in", "0");
    
          await AsyncStorage.setItem("@phone", "0");
    
          this.props.navigation.navigate("Index", {
            screen: "Index",
          });
        },
      },
    ]);
  };

  render() {
    return <></>;
  }
}
