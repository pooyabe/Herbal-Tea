import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { TextInput, Button } from "react-native-paper";

export default class Sizes extends React.Component {
  state = {
    shekam: null,
    kamar: 0,
    bazoo: 0,
    ran: 0,
  };

  /* 
    TODO: Complete this Function and Send data to DATABASE
  */
  sendData = () => {
    console.log(this.state.shekam);
    console.log(this.state.kamar);
    console.log(this.state.bazoo);
    console.log(this.state.ran);
  };

  render() {
    const { shekam, kamar, bazoo, ran } = this.state;
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
            onPress={this.sendData}
          >
            ثبت اطلاعات
          </Button>
        </TouchableOpacity>
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
