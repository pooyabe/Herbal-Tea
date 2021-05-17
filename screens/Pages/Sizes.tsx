import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";

import { TextInput } from "react-native-paper";

export default class Sizes extends React.Component {
  render() {
    const imageBG = require("../../assets/image/running-woman-erzebet-s.jpg");
    return (
      <ImageBackground style={styles.container} source={imageBG}>
        <Text style={styles.topText}>
          اندازه‌های خواسته شده (به سانتیمتر) در فرم زیر را هر هفته ثبت کنید تا
          در نمودار وضعیت‌تان ثبت و همچنین برای مشاورتان نیز ارسال گردد.
        </Text>

        <TextInput label="دور شکم" mode="outlined" />
        <TextInput label="دور کمر" mode="outlined" />
        <TextInput label="دور بازو" mode="outlined" />
        <TextInput label="دور ران" mode="outlined" />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100 + "%",
    resizeMode: "cover",
  },

  topText: {
    padding: 5 + "%",
    fontFamily: "Kalameh",
    fontSize: 20,
    direction: "rtl",
    textAlign: "right",
    lineHeight: 30,
  },
});
