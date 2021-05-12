import React, { useState } from "react";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

/* 
  Screens
*/
import Login from "./FirstOpen/Login";
import FirstLoading from "./LoadingPage/FirstLoading";
import ConfirmCode from "./FirstOpen/Confirm";
import Sizes from './Pages/Sizes'

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
    if (Logged) {
      return <Sizes />;
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ConfirmCode" component={ConfirmCode} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  } else {
    return <FirstLoading />;
  }
}
