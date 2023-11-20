import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { useEffect, useState } from 'react';
import {onAuthStateChanged} from 'firebase/auth'
import { FIREBASE_AUTH } from './FirebaseConfig';

import Home from './Screens/Home';
import LogIn from './Screens/LogIn';
import Register from './Screens/Register';
import Welcome from './Screens/Welcome';
import BasicInformation from './Screens/BasicInformation';
import BDI from './Screens/BDI';
import Gad7 from './Screens/Gad7';
import Summary from './Screens/Summary';

export default function App() {

  const Stack = createNativeStackNavigator();
  const InsideStack = createNativeStackNavigator();
  const OutsideStack = createNativeStackNavigator();

  const [user, setUser] = useState(null)

  useEffect(() =>{
    onAuthStateChanged(FIREBASE_AUTH, (user) =>{
      setUser(user)
    })
  }, [])
 

  function InsideLayout() {
    return(
      <InsideStack.Navigator>
        <InsideStack.Screen name='Welcome' component={Welcome} options={{headerTitleAlign: 'center', headerStyle:{backgroundColor:'#14a5f8'}}} />
        <InsideStack.Screen name='BasicInformation' component={BasicInformation} options={{headerTitle: 'Personal Information', headerTitleAlign:'center', headerStyle:{backgroundColor:'#14a5f8'}}}/>
        <InsideStack.Screen name='BDI' component={BDI} options={{headerTitle: "BDI: Beck's Depression Inventory", headerTitleAlign: 'center', headerStyle:{backgroundColor:'#14a5f8'}}}/>
        <InsideStack.Screen name='GAD7' component={Gad7} options={{headerTitle: "GAD-7 anxiety", headerTitleAlign:'center', headerStyle:{backgroundColor:'#14a5f8'}}}/>
        <InsideStack.Screen name='Summary' component={Summary} options={{headerTitle: "Summary", headerTitleAlign:'center', headerStyle:{backgroundColor:'#14a5f8'}}}/>
      </InsideStack.Navigator>
    )
  }

  function OutsideLayout (){
    return(
    <OutsideStack.Navigator initialRouteName='Home' >
      <OutsideStack.Screen name='Home' component={Home}  options={{headerTitleAlign: 'center', headerStyle:{backgroundColor:'#14a5f8'}}}/>
      <OutsideStack.Screen name='LogIn' component={LogIn}  options={{headerTitle: 'Log in', headerTitleAlign: 'center', headerStyle:{backgroundColor:'#14a5f8'}}}/>
      <OutsideStack.Screen name='Register' component={Register} options={{headerTitleAlign: 'center', headerStyle:{backgroundColor:'#14a5f8'}}}/>
    </OutsideStack.Navigator>)
  }

  



  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name='InsideLayout' component={InsideLayout} options={{headerShown: false}}/>
        ) : (
          <Stack.Screen name='OutsideLayout' component={OutsideLayout} options={{headerShown: false}}/>
        )}      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

