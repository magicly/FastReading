import React, { Component } from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";

import UserComponent from './components/User';
import HomeComponent from './components/Home';

import CNodeJSList from './components/CNodeJSList';
import OSChinaList from './components/OSChinaList';
import ToutiaoList from './components/ToutiaoList';
import NewsDetail from "./components/NewsDetail";
import StarList from "./components/StarList";
import BookMarkList from "./components/BookMarkList";

const ITNewsTabNavigator = TabNavigator({
  Main: {
    screen: HomeComponent,
    navigationOptions: {
      title: 'FastReading',
      headerTitle: 'FastReading',
      tabBarLabel: 'FastReading',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="home"
          size={24}
          color={tintColor}
        />
      )
    }
  },
  User: {
    screen: UserComponent,
    navigationOptions: {
      title: '我的',
      headerTitle: '我的',
      tabBarLabel: "我的",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="user"
          size={24}
          color={tintColor}
        />
      )
    }
  }
}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    backBehavior: 'none',
  });

const ITNews = StackNavigator({
  ITNewsTab: { screen: ITNewsTabNavigator },
  CNodeJS: { screen: CNodeJSList },
  OSChina: {
    screen: OSChinaList,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`
    }),
  },
  TouTiao: { screen: ToutiaoList },
  NewsDetail: { screen: NewsDetail },
  Stars: {
    screen: StarList,
    navigationOptions: {
      headerTitle: '我的收藏'
    }
  },
  BookMarks: {
    screen: BookMarkList,
    navigationOptions: {
      headerTitle: '我的书签'
    }
  },
});

export default ITNews;