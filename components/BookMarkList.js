import React from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableHighlight,
  View,
} from 'react-native';

import Config from '../config';

export default class StarList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: []
    }
  }

  async componentDidMount() {
    const value = await AsyncStorage.getItem(Config.readItLaterKey);
    const stars = value ? JSON.parse(value) : [];
    this.setState({ stars });
  }

  onPress = item => {
    const { navigate } = this.props.navigation;
    navigate('NewsDetail', {
      title: item.title,
      href: item.href,
      bookmark: true
    })
  }

  renderRow = item => {
    return <TouchableHighlight
      underlayColor='#008b8b'
      onPress={() => this.onPress(item)}>
      <View style={styles.rowStyle}>
        <Text style={{ fontSize: 18 }}>{item.title}</Text>
      </View>
    </TouchableHighlight>
  }

  render() {
    return this.state.stars.length > 0 ?
      <FlatList
        data={this.state.stars}
        renderItem={({ item }) => this.renderRow(item)}
        keyExtractor={(item) => item.href}
      /> : <Text style={{ padding: 10, textAlign: 'center', fontSize: 16, color: '#777' }}>你还没有收藏任何资讯~</Text>
  }
}

const styles = StyleSheet.create({
  listView: {
    backgroundColor: '#eee',
  },
  rowStyle: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 1,
  },
});