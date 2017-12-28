// @flow
import React from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import Cheerio from 'cheerio-without-node-native';

import InfoList from './InfoList';

const url = 'https://www.oschina.net/action/ajax/get_more_news_list?newsType=&p=';

export default (props: { navigation: { navigate: any } }) => {
  const fetchData = async (pageNo) => {
    console.log('fetchData:===== ', pageNo);
    try {
      const response = await fetch(url + pageNo)
      const text = await response.text();
      const $ = Cheerio.load(text);
      const items = [];
      // const items = $('.item').map(function (i, v) { // map返回的是Cheerio对象， 包含了无用信息
      $('.item').each(function (i, v) {
        const title = $(v).find('.title').text();
        let href = $(v).find('.title').attr('href');
        if (href.indexOf('https://') === -1) href = 'https://www.oschina.net' + href;
        const summary = $(v).find('.summary').text();
        const name = $(v).find('.from>.mr>a').text();
        const time = $(v).find('.from>.mr').children().remove().end().text();
        const avatar = $(v).find('.avatar').attr('src');
        const replyCount = $(v).find('.from>a>.mr').text();
        const thumb = $(v).find('.thumb>a>img').attr('src');

        items.push({
          title: title,
          href: href,
          summary: summary,
          name: name,
          time: time,
          avatar: avatar,
          replyCount: replyCount,
          thumb: thumb,
        });
      });

      return items;
    } catch (error) {
      console.info('fetData error........');
      return [];
    }
  }

  const renderRow = item => (
    <View style={[styles.rowStyle, { flexDirection: 'row', justifyContent: 'space-between' }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowText}>{item.title}</Text>
        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ width: 20, height: 20, borderRadius: 10, marginRight: 5 }}
              source={{ uri: item.avatar }}
            />
            <Text style={styles.other}>{item.name}</Text>
            <Text style={styles.other}>{item.time}</Text>
          </View>
          <Text style={[styles.other, {}]}>{item.replyCount} 个回复</Text>
        </View>
      </View>
      {
        item.thumb ? <Image style={{ width: 60 }} source={{ uri: item.thumb }} /> : <View />
      }
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
  rowText: {
    fontSize: 18,
    paddingRight: 10,
  },
  other: {
    marginRight: 5,
    fontSize: 14,
    color: '#777'
  },
  rowStyle: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 1,
  },
  footer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
});