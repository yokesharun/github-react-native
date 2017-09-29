import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicator,
  Image,
  Button,
  onPress,
  Linking
} from 'react-native';

export default class FlatListBasics extends Component {
   constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
componentDidMount() {
    return fetch('https://api.github.com/search/users?q=yokesh')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.items),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
            <View style={styles.liner}>
               <Image
                  style={styles.image}
                  source={{uri : rowData.avatar_url}}
               />
               <Text style={styles.item}>{rowData.login}
               </Text>
               <View style={{flex: 1,marginRight: 10}}>
                  <Button
                    onPress={ ()=>{ Linking.openURL(rowData.html_url)}}
                    title="Follow"
                  />
               </View>
            </View>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  liner:{
   flexDirection: 'row',
   marginTop: 10,
   marginBottom: 10,
   height:60,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    flex: 2,
    fontSize: 14
  },
  image: {
   width: 50,
   height: 50,
   marginLeft: 10,
   borderRadius: 5
  }
})