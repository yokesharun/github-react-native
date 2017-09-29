
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ListViewGit from './src/list.js';


export default class hello extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.navBar}>
          <Text style={styles.titleText}>Github Profiles</Text>
        </View>
        <ListViewGit></ListViewGit>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    navBar: {
        flexDirection: 'column',
        backgroundColor: '#05A5D1',
        paddingTop: 10,
        paddingBottom : 10,
    },
    content:{
        flex: 1,
        backgroundColor: '#fff'
    },
    titleText: {
        color : '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    },
});

AppRegistry.registerComponent('hello', () => hello);
