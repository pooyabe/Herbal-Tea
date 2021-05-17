import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Sizes from "./Sizes";
import Chart from "./Chart";
import SendPic from "./SendPic";

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <>
      <Tab.Navigator initialRouteName="Sizes">
        <Tab.Screen name="Chart" component={Chart} />
        <Tab.Screen name="Sizes" component={Sizes} />
        <Tab.Screen name="SendPic" component={SendPic} />
      </Tab.Navigator>
    </>
  );
}
