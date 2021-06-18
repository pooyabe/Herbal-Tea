import * as React from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";

import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Snackbar } from "react-native-paper";

export default class Name extends React.Component {
  state = {
    InputName: "",
    SignInButtonText: "ذخیره",
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

  getNameInputValue = (value) => {
    this.setState({ InputName: value });
  };

  checkCodeRecived = () => {
    this.setState({ SignInButtonText: "لطفا صبر کنید..." });

    const RECEPTOR = this.props.route.params.phone;

    const input = this.state.InputName;

    //FIXME: Replace the address with server on production
    const URL = `http://192.168.1.107:8000/customer/store-name/${RECEPTOR}/${input}`;

    this.storeTheName(URL)
      .then((result) => {
        if (result) {

          // Do Login
          AsyncStorage.setItem("@logged_in", "1");
          AsyncStorage.setItem("@phone", String(RECEPTOR));

          this.props.navigation.navigate("Index", {
            screen: "Index",
          });


        } else {
          this.setState({ SignInButtonText: "ذخیره" });
          this.onShowSnackBar();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  storeTheName = async (URL) => {
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
                source={require("../../assets/icon/Name.png")}
                style={styles.InputLeftImage}
              />
            </View>
            <TextInput
              placeholder={"نام و نام خانوادگی"}
              placeholderTextColor={"white"}
              style={styles.InputText}
              onChangeText={this.getNameInputValue}
            />
          </View>

          <TouchableOpacity
            style={styles.FormButton}
            onPress={this.checkCodeRecived}
          >
            <Text style={styles.FormButtonText}>{SignInButtonText}</Text>
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
          لطفا فیلد نام را وارد کنید.
        </Snackbar>
      </View>
    );
  }
}
