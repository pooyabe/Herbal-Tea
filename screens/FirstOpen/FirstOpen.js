import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";


export default class FirstOpen extends React.Component {
  state = {
    PhoneNumber: '',
    Password: '',
    SignInButtonText: 'ورود / ثبت‌نام'
  }
  componentDidMount() {
    this.animation.play();
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  getPhoneInputValue = (value) => {
    this.setState({PhoneNumber: value});
  }
  getPasswordInputValue = (value) =>{
    this.setState({Password: value});
  }

  signIn = () => {
    this.setState({SignInButtonText: 'لطفا صبر کنید...'});
    console.log(`
      Phone Number: ${this.state.PhoneNumber} \n
      Password : ${this.state.Password}
    `);
  }

  render() {
    const { SignInButtonText } = this.state;
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
          <View style={styles.InputContainer}>
            <View style={styles.InputLeftImageBox}>
              <Image
                source={require("../../assets/icon/password.png")}
                style={styles.InputLeftImage}
              />
            </View>
            <TextInput
              placeholder={"رمزعبور"}
              placeholderTextColor={"white"}
              style={styles.InputText}
              secureTextEntry={true}
              onChangeText={this.getPasswordInputValue}
            />
          </View>

          <TouchableOpacity
          style={styles.FormButton}
          onPress={this.signIn}
          >
            <Text style={styles.FormButtonText}>{SignInButtonText}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.Forgot}>بازیابی رمزعبور</Text>
        <StatusBar hidden={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    borderWidth: 10,
    borderColor: "white",
    borderTopWidth: 0,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 100 + "%",
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  Logo: {
    resizeMode: "contain",
    height: 50,
    borderWidth: 1,
    borderColor: "black",
  },
  topLottie: {
    width: 95 + "%",
    height: "auto",
    backgroundColor: "transparent",
    top: 0,
  },
  FormInput: {
    height: 27 + "%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  InputContainer: {
    borderRadius: 50,
    borderColor: "rgba(255,255,255,0.6)",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderWidth: 1,
    width: 80 + "%",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "space-between",
  },
  InputLeftImageBox: {
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 10,
  },
  InputLeftImage: {
    width: 30,
    height: 30,
  },
  InputText: {
    width: 80 + "%",
    color: "#fff",
    fontSize: 18,
    fontFamily: "Kalameh",
  },
  FormButton: {
    borderRadius: 30,
    backgroundColor: "white",
    paddingTop: 15,
    paddingBottom: 15,
  },
  FormButtonText: {
    fontSize: 18,
    color: "#fc2e2e",
    textAlign: "center",
    fontFamily: "Kalameh",
  },
  Forgot: {
    color: "white",
    textDecorationLine: "underline",
    fontFamily: "Kalameh",
  },
});