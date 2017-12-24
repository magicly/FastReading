import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  RefreshControl,
  Dimensions,
  Share,
  Linking,
  View,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import Web from 'react-native-webview2';
import Icon from "react-native-vector-icons/FontAwesome";
import Config from '../config';

const addToStorage = async (key, newItem, msg) => {
  try {
    const valueStr = await AsyncStorage.getItem(key);
    const valueJson = valueStr ? JSON.parse(valueStr) : [];
    const notNew = valueJson.filter(value => {
      return value.href !== newItem.href && value.title !== newItem.title;
    });
    if (notNew.length < valueJson.length) { // 已经收藏过了
      alert(`取消${msg}`);
      await AsyncStorage.setItem(key, JSON.stringify(notNew));
      return;
    }
    valueJson.push(newItem);
    await AsyncStorage.setItem(key, JSON.stringify(valueJson));
    alert(`${msg}成功`);
  } catch (e) {
    alert(`${msg}失败`);
  }
}
export default class NewsDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerTitleStyle: {
      // paddingRight: Platform.OS === 'ios' ? 0 : 40
    },
    headerRight: <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
      {
        <Icon
          name={navigation.state.params.star ? "heart" : "heart-o"}
          size={20}
          color="#000"
          style={{ paddingRight: 10 }}
          onPress={() => {
            const newStar = {
              title: navigation.state.params.title,
              href: navigation.state.params.href
            };
            addToStorage(Config.starsKey, newStar, '收藏');
          }}
        />
      }
      <Icon
        name={navigation.state.params.bookmark ? "bookmark" : 'bookmark-o'}
        size={20}
        color="#000"
        style={{ paddingRight: 10 }}
        onPress={() => {
          const newBookMark = {
            title: navigation.state.params.title,
            href: navigation.state.params.href
          };
          addToStorage(Config.readItLaterKey, newBookMark, '书签');
        }}
      />
      <Icon
        name="share"
        size={20}
        color="#000"
        style={{ paddingRight: 10 }}
        onPress={() => {
          Share.share({
            message: navigation.state.params.title + ' \r\n' + navigation.state.params.href + ' \r\n' + '分享来自ITNews'
          })
            .then(() => {
            })
            .catch((error) => console.log(error.message));
        }}
      />
    </View>
  });

  constructor(props) {
    super(props);
    this.state = ({
      height: 0,
      refreshing: true,
      title: this.props.navigation.state.params.title,
      href: this.props.navigation.state.params.href,
    });
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.refs.webview.reload();
  }

  onLoadEnd = () => {
    this.setState({
      height: Dimensions.get('window').height,
      refreshing: false
    })
  }

  render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }>
        <Web
          canGoBack={true}
          ref="webview"
          source={{ uri: this.state.href }}
          onLoadEnd={this.onLoadEnd}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // backgroundColor: 'black',
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  menuTrigger: {
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  menuTriggerText: {
    // color: 'lightgrey',
    fontWeight: '600',
    fontSize: 20
  },
  disabled: {
    color: '#ccc'
  },
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  contentText: {
    fontSize: 18
  },
  dropdown: {
    width: 300,
    borderColor: '#999',
    borderWidth: 1,
    padding: 5
  },
  dropdownOptions: {
    marginTop: 30,
    borderColor: '#ccc',
    borderWidth: 2,
    width: 300,
    height: 200
  }
});