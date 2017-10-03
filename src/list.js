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
  Linking,
  Modal,
  TouchableHighlight
} from 'react-native';

import { Header, Icon, Badge } from 'react-native-elements'


export default class FlatListBasics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            modalData:[],
            modalVisible: false,
        }
    }

    singleRowPressed = (username) => {
        fetch('https://api.github.com/users/'+ username)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          modalData: responseJson,
        });
        this.setModalVisible(true)
        console.log("clicked " + username)
      })
      .catch((error) => {
        console.error(error);
      });
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
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
        <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            rightComponent={{ icon: 'search', color: '#fff' }}
            centerComponent={{ text: 'Github Profiles', style: { color: '#fff'} }}
            outerContainerStyles={{ backgroundColor: '#3D6DCC', height: 50 }}
          />

        <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}
        >
            <View style={{margin: 15}}>
                <View style={{ alignItems: 'flex-end' }}>
                    <Icon
                      name='close'
                      type='font-awesome'
                      color='#3D6DCC'
                      onPress={() => {this.setModalVisible(!this.state.modalVisible)}} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        style={{borderRadius: 5, width: 120, height: 120, marginBottom: 10}}
                        source={{uri : this.state.modalData.avatar_url}}
                        />
                    <Text style={{fontSize: 22, marginBottom: 10}}>{this.state.modalData.name}</Text>
                    <Badge containerStyle={{ backgroundColor: '#fff', marginBottom: 10}}>
                      <Text style={{color: '#3D6DCC'}}>{this.state.modalData.followers} Followers , {this.state.modalData.following} Following</Text>
                    </Badge>
                    <Text style={{marginBottom: 10}}>{this.state.modalData.bio}</Text>
                    <Button
                        onPress={ ()=>{ Linking.openURL(this.state.modalData.html_url)}}
                        title="Follow"
                        />
                </View>
            </View>
        </Modal>

        <ListView
            style={{marginTop: 50}}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
                <View style={styles.liner}>
                    <TouchableHighlight underlayColor='#fff' onPress={() => this.singleRowPressed(rowData.login)}>
                        <Image
                        style={styles.image}
                        source={{uri : rowData.avatar_url}}
                        />
                    </TouchableHighlight>
                    <Text style={styles.item}>{rowData.login}</Text>
                    <View style={{flex: 1,marginRight: 10}}>
                        <Button
                        onPress={ ()=>{ Linking.openURL(rowData.html_url)}}
                        title="Follow"
                        />
                    </View>
                </View>
            }
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