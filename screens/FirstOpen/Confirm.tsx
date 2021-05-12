import * as React from "react";
import {
  StatusBar,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Confirm extends React.Component {
  state = {
    InputCode: "",
    SignInButtonText: "بررسی",
    checkLogin: ""
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.animation.play();
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  getPhoneInputValue = (value) => {
    this.setState({ InputCode: value });
  };

  checkCodeRecived = () => {
    const code = this.props.route.params.code;
    const input = this.state.InputCode;
    if(code.length == 4 &&  input.length == 4){
        if(code == input){
            AsyncStorage.setItem("@logged_in", "1");
            this.setState({checkLogin: "1"});
            console.log("Ok");
        }
    }
  };

  render() {
    const { SignInButtonText } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#ef7462", "#ee365a"]}
          style={styles.background}
        />
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={styles.topLottie}
          source={require("../../assets/lottie/fitness.json")}
        />
        <View style={styles.FormInput}>
          <View style={styles.InputContainer}>
            <View style={styles.InputLeftImageBox}>
              <Image
                source={require("../../assets/icon/password.png")}
                style={styles.InputLeftImage}
              />
            </View>
            <TextInput
              placeholder={"کد دریافت شده"}
              placeholderTextColor={"white"}
              style={styles.InputText}
              keyboardType={"phone-pad"}
              onChangeText={this.getPhoneInputValue}
            />
          </View>

          <TouchableOpacity
            style={styles.FormButton}
            onPress={this.checkCodeRecived}
          >
            <Text style={styles.FormButtonText}>{SignInButtonText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text>بازگشت</Text>
          </TouchableOpacity>
        </View>

        <StatusBar hidden={true} />
      </View>
    );
  }
}
