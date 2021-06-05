import React from "react";
import { View, ImageBackground, Dimensions, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LineChart } from "react-native-chart-kit";
import { Title, RadioButton } from "react-native-paper";

export default class Chart extends React.Component {
  state = {
    datas: null,
    chart_type: "Kamar",
    show_data: [0],
  };

  componentDidMount() {
    this.collectData();
  }

  showData = (r, type) => {
    this.setState({ show_data: r[type] });
  };

  collectData = async () => {
    const PHONE_NUMBER = await AsyncStorage.getItem("@phone");

    await this.sendData(PHONE_NUMBER).then((res) => {
      if (res != 0) {
        this.setState({ datas: res });

        this.showData(res, this.state.chart_type);
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

  render() {
    const chartConfig = {
      backgroundColor: "#ffffff",
      backgroundGradientFrom: "#ffffff",
      backgroundGradientTo: "#ffffff",
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      propsForDots: {
        r: "5",
        strokeWidth: "2",
        stroke: "#ffa726",
      },
    };


    const imageBG = require("../../assets/image/running-woman-2.jpg");


    const { show_data, chart_type } = this.state;
    return (
      <ImageBackground style={pageStyle.container} source={imageBG}>
        <LineChart
          data={{
            datasets: [
              {
                data: show_data,
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={250}
          yAxisSuffix="CM"
          chartConfig={chartConfig}
          style={pageStyle.chart}
          bezier
        />
        <Title style={{ direction: "rtl", textAlign: "center" }}>
          جدول تغییرات سایز شما
        </Title>
        <RadioButton.Group
          onValueChange={(value) => {
            this.setState({ chart_type: value });
            this.showData(this.state.datas, value);
          }}
          value={chart_type}
        >
          <RadioButton.Item label="دور کمر" value="Kamar" />
          <RadioButton.Item label="دور ران" value="Ran" />
          <RadioButton.Item label="دور بازو" value="Bazoo" />
          <RadioButton.Item label="دور شکم" value="Shekam" style={pageStyle.Radios}/>
        </RadioButton.Group>
      </ImageBackground>
    );
  }
}

const pageStyle = StyleSheet.create({
  container: {

    height: 100 + "%",
    resizeMode: "stretch",
    alignItems: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },Radios:{
    direction: "rtl",
    textAlign: "right",
  }
});
