import React, { useState } from "react";
import FirstOpen from "./FirstOpen/FirstOpen";
import FirstLoading from "./LoadingPage/FirstLoading";
import Test from "./TestPage/test";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [Logged, setLogged] = useState(0);
  const [Loaded, setLoad] = useState(0);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@logged_in");
      if (value !== null && value != '0') {
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
      return <Test />;
    } else {
      return <FirstOpen />;
    }
  } else {
    return <FirstLoading />;
  }
}
