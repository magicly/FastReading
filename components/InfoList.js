// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Text,
  StyleSheet,
  RefreshControl,
  View,
  TouchableHighlight,
} from 'react-native';

type Props = {
  renderRow: any => any,
  getPageNo?: number => string,
  navigation: { navigate: any },
  fetchData: (pageNo: number | string) => Promise<any[]>,
}
type State = {
  refreshing: boolean,
  loadMore: boolean,
  pageNo: number,
  dataSource: any[],
}
export default class ItemList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = ({
      refreshing: true,
      loadMore: false,
      pageNo: 1,
      dataSource: [],
    })
  }

  componentDidMount() {
    this.loadMore();
  }

  loadMore = async () => {
    try {
      const pageNo = this.state.pageNo;
      const pageNoStr = this.props.getPageNo ? this.props.getPageNo(pageNo) : pageNo;
      const newItems = await this.props.fetchData(pageNoStr);

      // if (newItems.length === 0) {// No More Data...
      //   this.setState({
      //     noMore: true,
      //   })
      //   return;
      // }

      this.setState({
        refreshing: false,
        loadMore: false,
        dataSource: this.state.pageNo === 1 ? newItems : this.state.dataSource.concat(newItems)
      })
    } catch (e) {
      console.log('loadMore error...=====', e)
      this.setState({
        refreshing: false,
      });
    }
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
      pageNo: 1
    }, () => this.loadMore());
  }

  onEndReached = () => {
    console.log('onEndReached: ', this.state.pageNo)
    // if (this.state.noMore) return; // 没有数据了
    // if (this.state.loadMore) return;// 正在加载ing
    // if (this.state.refreshing) return;// 正在刷新ing，一开始在获取数据， 会触发很多次onEndReached
    this.setState({
      loadMore: true,
      pageNo: this.state.pageNo + 1,
    }, () => this.loadMore());
  }

  onPress = (item: { title: string, href: string }) => {
    const navigate: any = this.props.navigation.navigate;
    navigate('NewsDetail', {
      title: item.title,
      href: item.href
    })
  }

  renderRow = (item: any) => {
    return <TouchableHighlight
      underlayColor='#008b8b'
      onPress={() => this.onPress(item)}>
      {this.props.renderRow(item)}
    </TouchableHighlight>
  }

  render() {
    const FooterView = this.state.loadMore ?
      <View style={styles.footer}>
        <Text style={{ fontSize: 16, color: '#777' }}>加载更多...</Text>
      </View> : null;
    return <FlatList
      style={[styles.listView]}
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />
      }
      data={this.state.dataSource}
      renderItem={({ item }) => this.renderRow(item)}
      keyExtractor={(item) => item.href}

      onEndReachedThreshold={0.1}
      onEndReached={this.onEndReached}

      ListFooterComponent={FooterView}
    />
  }
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