import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, Alert, Image, Dimensions, ScrollView} from 'react-native';
import {Header, List, ListItem, Icon} from 'react-native-elements';
import * as firebase from "firebase";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { db } from './db';


export default class App extends React.Component {

  //The constructor for a React component is called before it is mounted. When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement.
  constructor(props){

    super(props);
    this.state = {
      fontLoaded: false,
      listitems: []


    };
}



//Useful when we want to change the states of the app.
  componentDidMount(){
  var items = [];
  const Ref = db.ref('messages/');
  Ref.on("value", snapshot=>{
       snapshot.forEach((child)=>{
         items.push({key:child.child("from").val(), url:child.child("userpic").val(), id:child.key, message:child.child("text").val()});
       });
    this.setState({listitems:items})
  });
  }

  renderSeperator= () =>{
    return(
      <View
        style={{
          height:1,
          width: "86%",
          backgroundColor:'green',
          marginLeft:'14%',
          marginTop:5
        }}

      />
    );
  };

  render() {
    const {navigate} = this.props.navigation;
    console.log(this.state.listitems);
    //Alert.alert(firebase.auth().currentUser.displayName);
    return (
      <View>

      <View style={{height:200}}>
      <Image
          style={{width:Dimensions.get('window').width, height:200}}
          resizeMode='stretch'
          source={{uri:'https://thebesttravelplaces.com/wp-content/uploads/2016/10/single-women-travel-1068x712.jpg'}}
        />
      </View>

      <View style={{height:50}}>
      <Header outerContainerStyles={{ marginTop: 0, zIndex: 9999, height:50 }}
          centerComponent={{ text: 'NomadHers Near You', style: { fontSize:20,textAlign:"center",color: '#fff' } }}
          backgroundColor='limegreen'

      />
      </View>

      <View style={{height:Dimensions.get('window').height - 70 -50 -200}}>
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0, marginBottom:0 }}>
        <FlatList
          data={this.state.listitems}
          renderItem={({item}) => (
            <View>
            <ListItem
              onPress={() => navigate('UserInfo', {itemId: item.key})
            
              }
              roundAvatar
              avatar={{uri: item.url}}
              title={item.key}
              subtitle={item.message}
              rightIcon={<Icon
                          color='green'
                          name='chat'
                         
                          onPress={() => 
                         // console.log(item.key)
                        //  navigate('UserInfo', {itemId: item.key})
                        this.props.navigation.navigate('UserInfo', {itemId: item.key})
                          }/>}
              containerStyle={{borderBottomWidth: 0}}
            />
            <View style={{borderRadius:50, marginLeft:35, marginTop:-18, borderWidth:1, borderColor:"limegreen", width:10, height:10, backgroundColor:"white"}}>
              <Button
                color = "green"
                title= ""
              />
            </View>
            </View>
          )}
        ItemSeparatorComponent = {this.renderSeperator}

        />
      </List>
      </View>

      <View style={styles.advbar}>
      <ScrollView
       horizontal={true}
       pagingEnabled={true}
       showsHorizontalScrollIndicator={false}>
       <Image style={{width: Dimensions.get('window').width, height: 80, resizeMode:'stretch'}} source={{uri:'https://www.cdnetworks.com/resources/case-studies/hostelworld.png'}}/>
       <Image style={{width: Dimensions.get('window').width, height: 80, resizeMode:'stretch'}} source={{uri:'http://scaleupporto.pt/wp-content/uploads/2018/02/58f77df83ba0c205658230-980x588.png'}}/>
      </ScrollView>
      </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  advbar: {
    left: 0,
    flexGrow: 1,
    borderColor: 'green',
    borderWidth: 1,
    top: 0,
    height: 70,
    width:Dimensions.get('window').width
  },

});
