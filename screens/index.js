import React, { useState } from "react";
import FirstOpen from "./FirstOpen/FirstOpen";
import FirstLoading from "./LoadingPage/FirstLoading";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [Loaded, setLoaded] = useState(0);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@logged_in");
      if (value !== null && value) {
        setLoaded(1);
      }else{
        setLoaded(0);
      }
    } catch (e) {
      console.log("WTF");
    }
  };
  getData();
  if (Loaded) {
    return <FirstOpen />;
  } else {
    return <FirstLoading />;
  }
}
