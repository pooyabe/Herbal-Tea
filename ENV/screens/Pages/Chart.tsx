import React from "react";
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { LineChart } from "react-native-chart-kit";
import { Title, Snackbar } from "react-native-paper";

export default class Chart extends React.Component {
  state = {
    /**
     * These are data recived from server
     */
    shekamData: [0],
    bazooData: [0],
    ranData: [0],
    kamarData: [0],

    /**
     * This is for check refreshing the page
     */
    refreshing: false,

    /**
     * Clearly for snackBar
     */
    snackText: "",
    visibleSnak: false,
  };

  componentDidMount() {
    /**
     * Call the function that receives data from server
     */
    this.collectData();
  }

  /**
   * Receive data from server
   */
  collectData = async () => {
    const PHONE_NUMBER = await AsyncStorage.getItem("@phone");

    /**
     * Call fetch data function
     */
    await this.sendData(PHONE_NUMBER).then((res) => {
      // If user didn't submited any data, server will return 0
      if (res != 0) {
        this.setState({
          shekamData: res["Shekam"],
          bazooData: res["Bazoo"],
          ranData: res["Ran"],
          kamarData: res["Kamar"],
        });
      }
    });
  };

  sendData = async (phone) => {
    //FIXME: Replace the address with server on production
    const URL = `http://192.168.1.107:8000/customer/data/show-sizes/${phone}`;
    try {
      let res = await fetch(URL);
      let res_json = await res.json();

      return res_json;
    } catch {
      return 0;
    }
  };

  /**
   * Function for check refreshing page
   */
  _onRefresh() {
    this.setState({
      refreshing: true,
      snackText: "داده ها به روز رسانی شدند",
    });

    this.collectData().then(() => {

      this.setState({ refreshing: false });

      this.onShowSnackBar();

    });
  }

  /**
   * Control the snack bar
   */
  onShowSnackBar = () => this.setState({ visibleSnak: true });
  onDismissSnackBar = () => this.setState({ visibleSnak: false });

  render() {

    /**
     * Chart configurations
     */

    const chartConfig = {
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(250, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(250, 255, 255, ${opacity})`,
      propsForDots: {
        r: "5",
        strokeWidth: "2",
        stroke: "#ffa726",
      },
    };

    // States
    const { shekamData, ranData, bazooData, kamarData, snackText } = this.state;
    return (
      <SafeAreaView style={pageStyle.container}>
        <ScrollView
          style={pageStyle.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          <View style={pageStyle.box}>
            <Title style={{ direction: "rtl", textAlign: "center" }}>
              تغییرات سایز کمر
            </Title>
            <LineChart
              data={{
                datasets: [
                  {
                    data: kamarData,
                  },
                ],
              }}
              width={Dimensions.get("window").width * 0.9} // from react-native
              height={180}
              yAxisSuffix="CM"
              chartConfig={chartConfig}
              style={pageStyle.chart}
              bezier
            />
          </View>

          <View style={pageStyle.box}>
            <Title style={{ direction: "rtl", textAlign: "center" }}>
              تغییرات دور بازو
            </Title>
            <LineChart
              data={{
                datasets: [
                  {
                    data: bazooData,
                  },
                ],
              }}
              width={Dimensions.get("window").width * 0.9} // from react-native
              height={180}
              yAxisSuffix="CM"
              chartConfig={chartConfig}
              style={pageStyle.chart}
              bezier
            />
          </View>

          <View style={pageStyle.box}>
            <Title style={{ direction: "rtl", textAlign: "center" }}>
              تغییرات دور ران
            </Title>
            <LineChart
              data={{
                datasets: [
                  {
                    data: ranData,
                  },
                ],
              }}
              width={Dimensions.get("window").width * 0.9} // from react-native
              height={180}
              yAxisSuffix="CM"
              chartConfig={chartConfig}
              style={pageStyle.chart}
              bezier
            />
          </View>

          <View style={pageStyle.box}>
            <Title style={{ direction: "rtl", textAlign: "center" }}>
              تغییرات سایز شکم
            </Title>
            <LineChart
              data={{
                datasets: [
                  {
                    data: shekamData,
                  },
                ],
              }}
              width={Dimensions.get("window").width * 0.9} // from react-native
              height={180}
              yAxisSuffix="CM"
              chartConfig={chartConfig}
              style={pageStyle.chart}
              bezier
            />
          </View>
        </ScrollView>
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
      </SafeAreaView>
    );
  }
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  chart: {
    borderRadius: 10,
  },
  scrollView: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  box: {
    marginTop: 50,
  },
});
