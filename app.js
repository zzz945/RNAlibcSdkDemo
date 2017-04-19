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

const PARAMS = {
  pid: "mm_43693166_0_0",
  forceH5: true,
  detail: {type: "detail", payload: "539152008480"},
  url: {
        type: "url",
        payload: "http://uland.taobao.com/coupon/edetail?activityId=13e9f56152bf43329f1940b7354c7bcf&pid=mm_33719122_5420449_75840102&itemId=543666118631&src=quanbaibai"
  },
  shop: {type: "shop", payload: "116614296"},
  orders: {type: "orders",  payload: {orderType: 0, isAllOrder: true}},
  addCard: {type: "addCard", payload: "539152008480"},
  mycard: {type: "mycard"},
};

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
    RNAlibcSdk.init(PARAMS.pid, PARAMS.forceH5, (err) => {
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
    this._goBack = this._goBack.bind(this);
    this._onTradeResult = this._onTradeResult.bind(this);
    this._onWebViewStateChange = this._onWebViewStateChange.bind(this);
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
  _goBack() {
    const { MyWebView } = this.refs;
    MyWebView.goBack();
  }
  _onWebViewStateChange(state) {
    console.log(state);
  }
  _show(param) {
    /*
    Q：交易成功后没有回调
        1.详情页加入购物车没有回调
        2.只有加入购物车购页加购才有回调
        3.支付的话，如果有接入支付宝sdk，都会有回调的
      ****目前只有通过H5打开页面完成支付，并且集成了alipay的时候才会有支付成功的回调***  （12/7更新）
    */
    RNAlibcSdk.show(param, (err, info) => {
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
        </View>
        <View style={styles.buttonGroup}>
          <Button
              onPress={this._show.bind(this, PARAMS.detail)}
              title="detail"
          />
          <Button
              onPress={this._show.bind(this, PARAMS.url)}
              title="url"
          />    
          <Button
              onPress={this._show.bind(this, PARAMS.shop)}
              title="shop"
          />   
          <Button
              onPress={this._show.bind(this, PARAMS.orders)}
              title="orders"
          />
          <Button
              onPress={this._show.bind(this, PARAMS.addCard)}
              title="addCard"
          /> 
          <Button
              onPress={this._show.bind(this, PARAMS.mycard)}
              title="myCarts"
          />    
        </View>
        <AlibcTradeWebView style={styles.webView} 
                          ref="MyWebView"
                          param={PARAMS.mycard}
                          onTradeResult={this._onTradeResult}
                          onStateChange={this._onWebViewStateChange}/>
        <View style={styles.buttonGroup}>
          <Button
              onPress={this._goBack}
              title="go back"
          />
        </View>
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