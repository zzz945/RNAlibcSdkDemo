/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  View,
} from 'react-native';

import AlibcSdk from 'react-native-alibc-sdk';
export default class RNAlibcSdkDemo extends Component {
  constructor(props) {
    super(props);
    AlibcSdk.init((err) => {
        if (!err)
          console.log("init success")
        else
          console.log(err)
      }
    );
  }
  _login() {
    AlibcSdk.login((err, userInfo) => {
        if (!err)
          console.log(userInfo)
        else
          console.log(err)
      }
    );
  }
  _logout() {
    AlibcSdk.logout((err) => {
        if (!err)
          console.log("logout success")
        else
          console.log(err)
      }
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Button 
            onPress={this._login}
            title="LOGIN"
        />
        <Button 
            onPress={this._logout}
            title="LOGOUT"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});