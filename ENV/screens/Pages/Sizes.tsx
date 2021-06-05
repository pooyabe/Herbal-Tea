import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { TextInput, Button, Snackbar } from "react-native-paper";

export default class Sizes extends React.Component {
  state = {
    shekam: null,
    kamar: null,
    bazoo: null,
    ran: null,
    visibleSnak: false,
    snackText: "",
    sendButtonText: "ثبت اطلاعات",
  };

  onShowSnackBar = () => this.setState({ visibleSnak: true });
  onDismissSnackBar = () => this.setState({ visibleSnak: false });

  /* 
    TODO: Complete this Function and Send data to DATABASE
  */
  collectData = async () => {
    this.setState({ sendButtonText: "لطفا صبر کنید..." });

    const PHONE_NUMBER = await AsyncStorage.getItem("@phone");
    const shekam = this.state.shekam;
    const kamar = this.state.kamar;
    const bazoo = this.state.bazoo;
    const ran = this.state.ran;

    if (
      shekam != null &&
      shekam != 0 &&
      kamar != null &&
      kamar != 0 &&
      bazoo != null &&
      bazoo != 0 &&
      ran != null &&
      ran != 0
    ) {
      this.sendData(PHONE_NUMBER, shekam, kamar, bazoo, ran).then((r) => {
        if (r) {
          /**
           * 
           * Sent successfully. reset form data
           * 
           */
          this.setState({
            snackText: "اطلاعات با موفقیت ثبت شد.",
            shekam: null,
            kamar: null,
            bazoo: null,
            ran: null,
          });
          this.onShowSnackBar();
        } else {
          this.setState({ snackText: "اتصال اینترنت خود را بررسی کنید." });
          this.onShowSnackBar();
        }
      });
    } else {
      this.setState({ snackText: "ورود تمامی اطلاعات الزامی است" });
      this.onShowSnackBar();
    }

    this.setState({ sendButtonText: "ثبت اطلاعات" });
  };

  sendData = async (phone, shekam, kamar, bazoo, ran) => {
    //FIXME: Replace the address with server on production
    const URL = `http://192.168.1.107:8000/customer/data/sizes/${phone}/${shekam}/${kamar}/${bazoo}/${ran}`;
    try {
      let res = await fetch(URL);
      let res_json = await res.json();

      return res_json;
    } catch {
      return 0;
    }
  };

  render() {
    const { shekam, kamar, bazoo, ran, snackText, sendButtonText } = this.state;
    const imageBG = require("../../assets/image/running-woman-erzebet-s.jpg");
    return (
      <ImageBackground style={styles.container} source={imageBG}>
        <Text style={styles.topText}>
          اندازه‌های خواسته شده (به سانتیمتر) در فرم زیر را هر هفته ثبت کنید تا
          در نمودار وضعیت‌تان ثبت و همچنین برای مشاورتان نیز ارسال گردد.
        </Text>

        <View style={styles.textContainer}>
          <TextInput
            style={styles.inputText}
            label="CM"
            mode="outlined"
            keyboardType={"phone-pad"}
            onChangeText={(val) => this.setState({ shekam: val })}
            value={shekam}
          />
          <Text style={styles.inputTextHelper}>دور شکم</Text>
        </View>

        <View style={styles.textContainer}>
          <TextInput
            style={styles.inputText}
            label="CM"
            mode="outlined"
            keyboardType={"phone-pad"}
            onChangeText={(val) => this.setState({ kamar: val })}
            value={kamar}
          />
          <Text style={styles.inputTextHelper}>دور کمر</Text>
        </View>

        <View style={styles.textContainer}>
          <TextInput
            style={styles.inputText}
            label="CM"
            mode="outlined"
            keyboardType={"phone-pad"}
            onChangeText={(val) => this.setState({ bazoo: val })}
            value={bazoo}
          />
          <Text style={styles.inputTextHelper}>دور بازو</Text>
        </View>

        <View style={styles.textContainer}>
          <TextInput
            style={styles.inputText}
            label="CM"
            mode="outlined"
            keyboardType={"phone-pad"}
            onChangeText={(val) => this.setState({ ran: val })}
            value={ran}
          />
          <Text style={styles.inputTextHelper}>دور ران</Text>
        </View>

        <TouchableOpacity style={styles.buttonContainer}>
          <Button
            raised
            theme={{ roundness: 5 }}
            icon="google-fit"
            mode="contained"
            style={styles.sendButton}
            onPress={this.collectData}
          >
            {sendButtonText}
          </Button>
        </TouchableOpacity>

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
          {snackText}
        </Snackbar>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100 + "%",
    resizeMode: "cover",
    alignItems: "center",
  },

  topText: {
    padding: 5 + "%",
    fontFamily: "Kalameh",
    fontSize: 20,
    direction: "rtl",
    textAlign: "right",
    lineHeight: 30,
  },

  textContainer: {
    flexDirection: "row",
    width: 90 + "%",
    display: "flex",
    alignItems: "center",
    padding: 25,
    justifyContent: "space-between",
  },
  inputTextHelper: {
    flex: 2,
    textAlign: "right",
    fontFamily: "Kalameh",
    fontSize: 20,
  },
  inputText: {
    flex: 1,
    textAlign: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    width: 90 + "%",
    display: "flex",
    padding: 25,
    justifyContent: "space-between",
    height: 110,
  },
  sendButton: {
    flex: 1,
    justifyContent: "center",
    color: "#fff",
  },
});
