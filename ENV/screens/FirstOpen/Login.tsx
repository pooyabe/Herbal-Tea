import * as React from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { StackActions } from "@react-navigation/native";

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

      const RECEPTOR = this.state.PhoneNumber;

      //FIXME: Replace the address with server on production
      const URL = `http://192.168.1.107:8000/customer/login-request/${RECEPTOR}`;

      this.sendCodeToPhoneNumber(URL)
        .then((result) => {
          this.setState({ SignInButtonText: "ورود / ثبت‌نام" });
          this.props.navigation.navigate("Index", {
            screen: "ConfirmCode",
            params: {
              phone: RECEPTOR
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  sendCodeToPhoneNumber = async (URL) => {
    try {
      let response = await fetch(URL);
      let json = await response.json();
      if (JSON.parse(json)) {
        return json;
      } else {
        alert("مشکل در اتصال به سرور!");
      }
    } catch (error) {
      return error;
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
      </View>
    );
  }
}
