// @flow
import React, { Component } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View,
} from 'react-native';

import Cheerio from 'cheerio-without-node-native';
import Moment from 'moment';
import 'moment/locale/zh-cn';

import InfoList from './InfoList';

const url = 'https://toutiao.io/prev/';
const ONEDAY = 24 * 60 * 60 * 1000;

export default (props: { navigation: { navigate: any } }) => {
  const fetchData = async pageNo => {
    try {
      console.log('pageNo:===', pageNo);
      const response = await fetch(url + pageNo);
      const text = await response.text();
      const $ = Cheerio.load(text);
      let items = [];
      $('.post').each(function (i, v) {
        const title = $(v).find('.title').text().replace(/\r\n/gi, '').trim();
        const href = $(v).find('.title a').attr('href');
        const avatar = $(v).find('.user-avatar img').attr('src');
        const replyCount = $(v).find('.meta span').text().replace(/\r\n/gi, '').trim();
        const originUrl = $(v).find('.meta').children().remove().end().text().replace(/\r\n/gi, '').trim();

        items.push({
          title: title,
          href: 'https://toutiao.io' + href,
          avatar: avatar,
          originUrl: originUrl,
          replyCount: replyCount,
        });
      });

      return items;
    } catch (error) {
      console.info('fetData error........');
      return [];
    }
  }

  const getPageNo = pageNo => {
    return Moment(new Date().getTime() - (pageNo - 1) * ONEDAY).format("YYYY-MM-DD");
  }

  const renderRow = (rowData) => (
    <View style={styles.rowStyle}>
      {
        rowData.avatar ?
          <Image
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
            source={{ uri: rowData.avatar }}
          /> : null
      }
      <View style={{ flex: 1 }}>
        <Text style={styles.rowText}>{rowData.title}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Text style={styles.other}>{rowData.originUrl}</Text>
          <Text style={[styles.other]}>{rowData.replyCount} 个回复</Text>
        </View>
      </View>
    </View>
  )

  return <InfoList
    getPageNo={getPageNo}
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
    fontSize: 14,
    marginTop: 10,
    color: '#777'
  },
  rowStyle: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
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