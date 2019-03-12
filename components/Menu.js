import * as React from 'react';
import { Text, View, StyleSheet, Image,AsyncStorage,FlatList,Alert} from 'react-native';
import * as firebase from "firebase";
import { ListItem,Icon  } from 'react-native-elements';

//Connect to database
let config = {
    apiKey: "AIzaSyAyuAyXr9nt7TDndXioMuE7gCJozrwL3Hs",
    authDomain: "nomadherdb.firebaseapp.com",
    databaseURL: "https://nomadherdb.firebaseio.com",
    projectId: "nomadherdb",
    storageBucket: "nomadherdb.appspot.com",
    messagingSenderId: "409543702217"
  };

 const db= !firebase.apps.length ? firebase.initializeApp(config) : firebase.app().database();

//Request information about user info
let refi =db.ref('/users').orderByChild('name');





 class Menu extends React.Component {

state={name:'',user:[],isloaded:false};

async componentDidMount(){

//Get main parameter (current user name)
const nom = await AsyncStorage.getItem('userToken');
  

let refia =refi.equalTo(nom);
  refia.on('value', (snapshot) => {
            let data = snapshot.val();
            let user = Object.values(data);
            this.setState({user});
         });

}

  render() {
    const list = [
      {
        title: 'NomadHers near U',
        icon: 'location-on',
        link:'NearYou',
        
      },
      {
        title: 'New Post',
        icon: 'plus',
        link:'NewPost',
        
      },
      {
        title: 'Profile',
        icon: 'person',
        link: 'Profile',
        name:this.state.name,
       
      },
      {
        title: 'Chatroom',
        icon: 'chat',
         link: 'Chatroom',
        
      },
      {
        title: 'Hosting',
        icon: 'hotel',
        link: 'hostRequest'
      
      },
      {
        title: 'Look For Host',
        icon: 'hotel',
        link: 'Look4Host'
      
      },
      
     {
        title: 'Settings',
        icon: 'settings',
        link:'Settings',
        
      },
       {
        title: 'Safety Jauge',
        icon: 'settings',
        link:'SafetyJauge',
        
      },
      {
        title: 'Logout',
        icon: 'arrow_right_alt',
        link:'Logout',
        
      },
    ];
    return (
      <View >
       
<View>
          {list.map((item, i) => (<ListItem

          
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon }}
              button onPress={() => {
                //console.log(auth.currentUser.pic)
                 this.props.navigation.navigate(item.link);
                }}
            />))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
 
});
export default Menu;
