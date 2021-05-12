import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default class Sizes extends React.Component {
    state = {
        log: 1,
    }


    logout = () => {
        AsyncStorage.setItem('@logged_in', '0');
        console.log('Ok');
        this.setState({log: 0});
    }

    render(){
        return (
            <TouchableOpacity onPress={this.logout}>
                <Text>
                    خروج
                </Text>
            </TouchableOpacity>
        )
    }
}