import React from 'react';
import { ActivityIndicator, AsyncStorage, Button,TextInput, StatusBar, StyleSheet, View} from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import style from './components/style';
import Facebook from './components/Connexion';
import homePage from './components/home-page';
import Chatroom from './components/Chatroom';
import CommentSection from './components/CommentSection';
import Connexion from './components/Connexion';
import HostRequest_ from './components/HostRequest';
import messagerie from './components/messagerie';
import NearYou from './components/NearYou';
import NewPost from './components/NewPost';
import notifications from './components/notifications';
import Profile from './components/Profile';
import Menu from './components/Menu';
import SafetyJauge from './components/SafetyJauge';
import Report from './components/Report';
import Settings from './components/Settings';
import UserVerification from './components/UserVerification';
import UserInfo from './components/UserInfo';
import inscription from './components/inscription';
import motdepasseOublier from './components/Mot-de-passe-oublier';
import Look4Host from './components/Look4Host';


//Provides a way for your app to transition between screens where each new screen is placed on top of a stack.

const AppStack = createStackNavigator({ homePage: homePage,CommentSection:CommentSection,
Chatroom:Chatroom,
hostRequest:HostRequest_,
messagerie:messagerie,
NearYou:NearYou,
NewPost:NewPost,
notifications:notifications,
Profile:Profile,
Report:Report,
Settings:Settings,
UserVerification:UserVerification,
SafetyJauge:SafetyJauge,
Menu:Menu,
UserInfo:UserInfo,
Look4Host:Look4Host



});
const AuthLoadingScreen = createStackNavigator({ Facebook: Facebook });
const AuthStack = createStackNavigator({ Facebook: Facebook, forgottenPasseword: motdepasseOublier });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
);