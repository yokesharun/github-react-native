
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
            <ListViewGit></ListViewGit>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
});

AppRegistry.registerComponent('hello', () => hello);
