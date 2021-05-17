import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";

export default class Sizes extends React.Component {
  render() {
    const imageBG = require("../../assets/image/running-woman-erzebet-s.jpg");
    return (
      <ImageBackground style={styles.container} source={imageBG}>
          <Text style={styles.topText} >
              اندازه‌های خواسته شده در فرم زیر را به صورت هفتگی ثبت کنید تا در نمودار وضعیت‌تان ثبت و همچنین برای مشاورتان نیز ارسال گردد.
          </Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        height: 100 + '%',
        resizeMode: "cover"
    },

    topText: {
        padding: 5 + '%',
        fontFamily: "Kalameh",
        fontSize: 20,
        direction: "rtl",
        textAlign: "right",
        lineHeight: 30
    }
});