import React,{Component} from "react"
import {View,Text} from 'react-native'

import{NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import Cadastro from'./src/Pages/Cadastro'
import Login from'./src/Pages/Login'
import Agendamento from "./src/Pages/Agendamento"
import CadastroConsulta from "./src/Pages/CadastroConsulta"

const Stack = createStackNavigator()

export default class App extends Component{
  render(){
    return(

   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Cadastro' component={Cadastro}/>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Agendamento' component={Agendamento}/>
      <Stack.Screen name='CadastroConsulta' component={CadastroConsulta}/>
    </Stack.Navigator>
   </NavigationContainer> )
  }
}
