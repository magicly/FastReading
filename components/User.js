import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import Config from "../config";

const UserComponent = ({ navigation }) => {
  const onPress = async type => {
    const { navigate } = navigation;
    if (type === 'Clear') {
      await AsyncStorage.removeItem(Config.starsKey);
      // todo confirm
      alert("清空成功");
    }
    if (type === 'ReadItLater') {
      navigate('BookMarks')
    }
    if (type === 'Star') {
      navigate('Stars')
    }
  }

  return <View>
    <TouchableHighlight
      style={styles.rowStyle}
      underlayColor='#008b8b'
      onPress={() => onPress('ReadItLater')}>
      <View style={styles.container}>
        <Icon name="book" size={20} style={{ paddingRight: 5 }} />
        <Text style={styles.text}>稍候阅读</Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight
      style={styles.rowStyle}
      underlayColor='#008b8b'
      onPress={() => onPress('Star')}>
      <View style={styles.container}>
        <Icon name="heart-o" size={20} style={{ paddingRight: 5 }} />
        <Text style={styles.text}>我的收藏</Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight
      style={[styles.rowStyle, { marginTop: 15 }]}
      underlayColor='#008b8b'
      onPress={() => onPress('Clear')}>
      <View style={[styles.container, { backgroundColor: '#ff0000', justifyContent: 'center' }]}>
        <Icon name="trash-o" size={20} style={{ paddingRight: 5, color: '#fff' }} />
        <Text style={[styles.text, { color: '#fff' }]}>清空数据</Text>
      </View>
    </TouchableHighlight>
  </View>
}

export default UserComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    marginBottom: 1,
  },
  text: {
    fontSize: 18,
  },
  rowText: {
    marginLeft: 10,
    fontSize: 18,
    flex: 1,
  },
});