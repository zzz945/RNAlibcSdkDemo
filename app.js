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

// 引入sdk
import AlibcSdk from 'react-native-alibc-sdk';

export default class RNAlibcSdkDemo extends Component {
  constructor(props) {
    super(props);
    // 初始化sdk(此方法为异步， 确保回调执行后再进行下一步操作)
    AlibcSdk.init("mm_43693166_0_0", (err) => {
        if (!err)
          console.log("init success")
        else
          console.log(err)
      }
    );
  }
  _login() {
    // 唤起手淘app进行授权登录， 获取用户个人信息。 
    AlibcSdk.login((err, userInfo) => {
        if (!err)
          console.log(userInfo)
        else
          console.log(err)
      }
    );
  }
  _islogin() {
    AlibcSdk.isLogin((err, isLogin) => {
        if (!err)
          console.log(isLogin)
      }
    );
  }
  _getUser() {
    AlibcSdk.getUser((err, userInfo) => {
        if (err)
          console.log(err);
        else
          console.log(userInfo)
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
  _show() {
    AlibcSdk.show("539152008480", (err, info) => {
        if (!err)
          console.log(info)
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
            onPress={this._islogin}
            title="ISLOGIN"
        />
        <Button 
            onPress={this._getUser}
            title="GETUSER"
        />
        <Button 
            onPress={this._logout}
            title="LOGOUT"
        />
        <Button 
            onPress={this._show}
            title="SHOW"
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