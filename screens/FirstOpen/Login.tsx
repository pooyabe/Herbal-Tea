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

export default class FirstOpen extends React.Component {
  state = {
    PhoneNumber: "",
    SignInButtonText: "ورود / ثبت‌نام",
  };

  constructor(props) {
    super(props);

    this.sendCodeToPhoneNumber = this.sendCodeToPhoneNumber.bind(this);
    this.random_code = this.random_code.bind(this);
  }

  componentDidMount() {
    this.animation.play();
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  getPhoneInputValue = (value) => {
    this.setState({ PhoneNumber: value });
  };

  random_code = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  signIn = () => {
    if (
      this.state.PhoneNumber.length >= 10 &&
      this.state.PhoneNumber.length < 12
    ) {
      this.setState({ SignInButtonText: "لطفا صبر کنید..." });

      const API_KEY =
        "644B6F654E6D765A3746416773563665657441746E3030676B383250694763475A734C775234762B3848673D";
      const RECEPTOR = this.state.PhoneNumber;
      const MESSAGE = this.random_code(1000, 9999);

      const URL = `https://api.kavenegar.com/v1/${API_KEY}/sms/send.json?receptor=${RECEPTOR}&message=${MESSAGE}`;

      this.sendCodeToPhoneNumber(URL)
        .then((result) => {
      this.setState({ SignInButtonText: "ورود / ثبت‌نام" });
      this.props.navigation.navigate("ConfirmCode",{
            code: MESSAGE
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  sendCodeToPhoneNumber = async (URL) => {
    return "OK";
    /* try {
      let response = await fetch(URL);
      let json = await response.json();
      return json;
    } catch (error) {
      return error;
    } */
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
                source={require("../../assets/icon/phone.png")}
                style={styles.InputLeftImage}
              />
            </View>
            <TextInput
              placeholder={"شماره موبایل"}
              placeholderTextColor={"white"}
              style={styles.InputText}
              keyboardType={"phone-pad"}
              onChangeText={this.getPhoneInputValue}
            />
          </View>

          <TouchableOpacity style={styles.FormButton} onPress={this.signIn}>
            <Text style={styles.FormButtonText}>{SignInButtonText}</Text>
          </TouchableOpacity>
        </View>

        <StatusBar hidden={true} />
      </View>
    );
  }
}
