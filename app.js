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
  Text,
} from 'react-native';

// 引入sdk
import RNAlibcSdk, {AlibcTradeWebView} from 'react-native-alibc-sdk';

export default class RNAlibcSdkDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {ready: false};
    /* 初始化sdk(此方法为异步， 确保回调执行后再进行下一步操作) 
    * 参数
    * pid: 绑定阿里妈妈帐号后在百川后台查询此帐号
    * forceH5：强制浏览器打开页面
    * callback: 回调函数
    */
    RNAlibcSdk.init("mm_43693166_0_0", true, (err) => {
        if (!err)
          console.log("init success")
        else
          console.log(err)
        this.setState({ ready: true });
      }
    );

    this._login = this._login.bind(this);
    this._islogin = this._islogin.bind(this);
    this._getUser = this._getUser.bind(this);
    this._show = this._show.bind(this);
    this._onTradeResult = this._onTradeResult.bind(this);
  }
  _login() {
    // 唤起手淘app进行授权登录， 获取用户个人信息。 
    RNAlibcSdk.login((err, userInfo) => {
        if (!err)
          console.log(userInfo)
        else
          console.log(err)
      }
    );
  }
  _islogin() {
    RNAlibcSdk.isLogin((err, isLogin) => {
        if (!err)
          console.log(isLogin)
      }
    );
  }
  _getUser() {
    RNAlibcSdk.getUser((err, userInfo) => {
        if (err)
          console.log(err);
        else
          console.log(userInfo)
      }
    );
  }
  _logout() {
    RNAlibcSdk.logout((err) => {
        if (!err)
          console.log("logout success")
        else
          console.log(err)
      }
    );
  }
  _show() {
    /*
    Q：交易成功后没有回调
        1.详情页加入购物车没有回调
        2.只有加入购物车购页加购才有回调
        3.支付的话，如果有接入支付宝sdk，都会有回调的
      ****目前只有通过H5打开页面完成支付，并且集成了alipay的时候才会有支付成功的回调***  （12/7更新）
    */
    RNAlibcSdk.show("539152008480", (err, info) => {
        if (!err)
          console.log(info)
        else
          console.log(err)
      }
    );
  }

  _onTradeResult(tradeResult) {
    console.log(tradeResult);
  }

  render() {
    if (!this.state.ready) return <View style={styles.loading}><Text>Loading</Text></View>;
    return (
      <View style={styles.container}>
        <View style={styles.buttonGroup}>
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
        <AlibcTradeWebView style={styles.webView} 
                          itemId="539152008480"
                          onChange={this._onTradeResult}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    margin: 10,
  },
  webView: {
    width: 300,
    height: 370,
  },
  loading: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  }
});