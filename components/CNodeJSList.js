import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View
} from 'react-native';

import Moment from 'moment';
import 'moment/locale/zh-cn';

import InfoList from './InfoList';

const url = 'https://cnodejs.org/api/v1/topics?page=';

export default (props) => {
  const fetchData = async pageNo => {
    try {
      const response = await fetch(url + pageNo);
      const json = await response.json();
      json.data.forEach(e => {
        delete e.content;
        e.href = 'https://cnodejs.org/topic/' + e.id
      })
      return json.data;
    } catch (e) {
      console.info('fetchData error: ', error);
      return [];
    }
  }

  const renderRow = (rowData) => (
    <View style={styles.rowStyle}>
      <Image
        style={{ width: 40, height: 40, borderRadius: 20 }}
        source={{ uri: rowData.author.avatar_url }}
      />
      <View style={{ paddingLeft: 10, flexDirection: 'column', flex: 1 }}>
        <Text style={{ fontSize: 18, }}>{rowData.title}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Text style={styles.other}>{Moment(rowData.create_at).fromNow()}</Text>
          <Text style={[styles.other]}>{rowData.reply_count} 个回复</Text>
        </View>
      </View>
    </View>
  )

  return <InfoList
    navigation={props.navigation}
    fetchData={fetchData}
    renderRow={renderRow}
  />
}

const styles = StyleSheet.create({
  listView: {
    backgroundColor: '#eee',
  },
  other: {
    fontSize: 14,
    paddingTop: 10,
    color: '#777'
  },
  rowStyle: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginBottom: 1,
  },
  footer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
});