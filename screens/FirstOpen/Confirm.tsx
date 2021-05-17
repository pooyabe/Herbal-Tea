import * as React from "react";
import {
  StatusBar,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  DevSettings,
} from "react-native";
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
    const code = this.props.route.params.code;
    const input = this.state.InputCode;
    if (code == input) {
      AsyncStorage.setItem("@logged_in", "1");

      this.props.navigation.navigate("Index", {
        screen: "Index",
      });
    } else {
      this.onShowSnackBar();
    }
  };

  onShowSnackBar = () => this.setState({ visibleSnak: true });
  onDismissSnackBar = () => this.setState({ visibleSnak: false });

  render() {
    const { SignInButtonText } = this.state;
    const { navigation } = this.props;

  /* 
    TODO: Clear this Shit
  */
    console.log(this.props.route.params.code);

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
