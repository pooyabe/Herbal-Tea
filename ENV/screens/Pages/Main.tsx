import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Sizes from "./Sizes";
import Chart from "./Chart";
import SendPic from "./SendPic";
import LogOut from './LogOut'

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Sizes"
        backBehavior="initialRoute"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Chart") {
              iconName = focused ? "ios-pie-chart" : "ios-pie-chart-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === "Sizes") {
              iconName = "pagelines";
              return <FontAwesome name={iconName} size={size} color={color} />;
            } else if (route.name === "SendPic") {
              iconName = "image-filter-tilt-shift";
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "LogOut") {
              return <AntDesign name="logout" size={size} color={color} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
          showLabel: !1,
        }}
      >
        <Tab.Screen name="Chart" component={Chart} />
        <Tab.Screen name="Sizes" component={Sizes} />
        <Tab.Screen name="SendPic" component={SendPic} />
        <Tab.Screen name="LogOut" component={LogOut} options={{unmountOnBlur: true}}/>
      </Tab.Navigator>
    </>
  );
}
