import * as React from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import LottieView from "lottie-react-native";

export default class FirstLoading extends React.Component {

  componentDidMount() {
    this.animation.play();
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  render() {
    return (
      <View style={styles.container}>
        
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={styles.topLottie}
          source={require("../../assets/lottie/fitness.json")}
        />
        
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
  topLottie: {
    width: 95 + "%",
    height: "auto",
    backgroundColor: "transparent",
    top: 0,
  },
});