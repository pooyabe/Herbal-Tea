import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';




const logOut = async () => {
    await AsyncStorage.setItem("@logged_in", '0');
    setSetLogOutState(1);
}

export default function Test() {
  const [LogOutState, setSetLogOutState] = useState(0);
  return (
        <View>
            <Text>
                Hello World :) {'\n'} Just a TEST page!
            </Text>
            <TouchableOpacity onPress={logOut}>
                <Text>
                    خروج
                </Text>
            </TouchableOpacity>
        </View>
    );
}