import React,{Component} from "react"
import {View,Text} from 'react-native'

import{NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import Cadastro from'./src/Pages/Cadastro'
import Login from'./src/Pages/Login'
import AgendaConsultas from "./src/Pages/AgendaConsultas"
import CadastroConsulta from "./src/Pages/CadastroConsulta"


const Stack = createStackNavigator()

export default class App extends Component{
  render(){
    return(

   <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000080' }, // Cor de fundo do cabeçalho
        headerTintColor: '#fff', // Cor do texto e dos ícones
        headerTitleStyle: { fontWeight: 'bold' }, // Estilo do título
         
      }}
    >
      <Stack.Screen name='Cadastro' component={Cadastro}/>
      <Stack.Screen name= 'Login' component={Login}/>
      <Stack.Screen name='AgendaConsultas' component={AgendaConsultas}/>
      <Stack.Screen name='CadastroConsulta' component={CadastroConsulta}/>
    </Stack.Navigator>
   </NavigationContainer> )
  }
}
