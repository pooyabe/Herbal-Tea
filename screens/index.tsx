import React, { useState } from "react";
import { StatusBar, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

/* 
  Screens
*/
import Login from "./FirstOpen/Login";
import ConfirmCode from "./FirstOpen/Confirm";
import Sizes from "./Pages/Sizes";
import FirstLoading from "./LoadingPage/FirstLoading";

const Stack = createStackNavigator();

export default function Index() {
  const [Logged, setLogged] = useState(0);
  const [Loaded, setLoad] = useState(0);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@logged_in");
      if (value !== null && value != "0") {
        setLogged(1);
      } else {
        setLogged(0);
      }
    } catch (e) {
      console.log("WTF");
    }
  };

  getData().then(
    () => {
      setLoad(1);
    },
    () => {
      setLoad(0);
    }
  );

  if (Loaded) {
    return (
      <>
        <StatusBar hidden={true} />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
            detachPreviousScreen: true,
          }}
        >
          {Logged ? (
            <Stack.Screen name="Sizes" component={Sizes} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="ConfirmCode" component={ConfirmCode} />
            </>
          )}
        </Stack.Navigator>
      </>
    );
  } else {
    return <FirstLoading />;
  }
}
