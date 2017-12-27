import * as React from 'react';
import {
  Image,
  FlatList,
  Text,
  TouchableHighlight,
  View,
  StyleSheet
} from 'react-native';

import newsSources from '../config/newsSources';

const getNewsSource = sourceName => {
  for (let source of newsSources) {
    if (source.name === sourceName) {
      return source;
    }
  }
}

const onPress = (navigation, sourceName) => {
  const { navigate } = navigation;

  const source = getNewsSource(sourceName);
  navigate(source.navigation, { name: sourceName });
}

export default ({ navigation }) => (
  <FlatList
    data={newsSources}
    renderItem={({ item }) => {
      return <TouchableHighlight
        style={styles.rowStyle}
        underlayColor='#008b8b'
        onPress={() => onPress(navigation, item.name)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ width: 30, height: 30, borderRadius: 4 }} source={item.logo} />
          <Text style={styles.rowText}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    }}
    keyExtractor={(item) => item.name}
  />
)

const styles = StyleSheet.create({
  listView: {
    backgroundColor: '#eee',
  },
  rowText: {
    marginLeft: 10,
    fontSize: 18,
    flex: 1,
  },
  rowStyle: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 1,
  },
});