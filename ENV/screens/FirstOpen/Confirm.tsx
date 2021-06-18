import * as React from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";

import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Snackbar } from "react-native-paper";

export default class Confirm extends React.Component {
  state = {
    InputCode: "",
    SignInButtonText: "بررسی",
    checkLogin: "",
    visibleSnak: false,
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
    this.setState({ SignInButtonText: "لطفا صبر کنید..." });

    const RECEPTOR = this.props.route.params.phone;

    const input = this.state.InputCode;

    //FIXME: Replace the address with server on production
    const URL = `http://192.168.1.107:8000/customer/validate/${RECEPTOR}/${input}`;

    this.validateTheCode(URL)
      .then((result) => {
        if (result) {
          this.setState({ SignInButtonText: "درحال ورود..." });
          AsyncStorage.setItem("@logged_in", "1");

          AsyncStorage.setItem("@phone", String(RECEPTOR));

          /**
           *
           * Check if Customer's name exists in database or not
           *
           */

          // Check user name existance in database by rest api
          const CHECK_NAME_URL = `http://192.168.1.107:8000/customer/namecheck/${RECEPTOR}`;
          this.checkNameExists(CHECK_NAME_URL).then((check_name) => {
            if (check_name) {
              /**
               *
               * Customer name exists, so return to main page
               *
               */
              this.props.navigation.navigate("Index", {
                screen: "Index",
              });
            } else {
              /**
               *
               * Customer name does not exists, so return to name screen
               *
               */
              this.props.navigation.navigate("Index", {
                screen: "AddName",
              });
            }
          });
        } else {
          this.setState({ SignInButtonText: "بررسی" });
          this.onShowSnackBar();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  checkNameExists = async (URL) => {
    try {
      let response = await fetch(URL);
      let json = await response.json();
      return json;
    } catch (error) {
      return error;
    }
  };

  validateTheCode = async (URL) => {
    try {
      let response = await fetch(URL);
      let json = await response.json();
      return json;
    } catch (error) {
      return error;
    }
  };

  onShowSnackBar = () => this.setState({ visibleSnak: true });
  onDismissSnackBar = () => this.setState({ visibleSnak: false });

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

          {/* FIXME: Style this button */}
          <TouchableOpacity
            onPress={() => {
              navigation.popToTop();
            }}
          >
            <Text>بازگشت</Text>
          </TouchableOpacity>
        </View>

        <Snackbar
          visible={this.state.visibleSnak}
          onDismiss={this.onDismissSnackBar}
          action={{
            label: "X",
            onPress: () => {
              this.onDismissSnackBar;
            },
          }}
        >
          رمز وارد شده اشتباه است!
        </Snackbar>
      </View>
    );
  }
}
