import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React, {Component, useState} from 'react';
import { TouchableOpacity } from 'react-native';

export default class Cadastro extends Component{

    constructor(props){
        super(props)
        this.irLogin = this.irLogin.bind(this)

    }

    irLogin(){
        this.props.navigation.navigate("Login")
    }
    
    render(){

        return (
            <View style={styles.container}>
                <StatusBar hidden />
        
                <Image style={{width:150,height:150}} source={require('./assets/foto.png')}/>
        
                <TextInput placeholder=' Seu Nome' style={styles.textInput} onChangeText={text=>setNome(text)}/>
                <TextInput placeholder=' Seu Email' style={styles.textInput} onChangeText={text=>setEmail(text)}/>
                <TextInput secureTextEntry={true} placeholder='Sua Senha' style={styles.textInput} onChangeText={text=>setSenha(text)}/>
        
        
               <TouchableOpacity style={styles.btnCadastro} onPress={this.irLogin}>
                <Text style={{color:'white', textAlign:'center'}}>CADASTRAR</Text>
                </TouchableOpacity>     
        
            </View>
            )

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4169e1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
    
  },
  textInput:{
    width: '100%',
    height:40,
    backgroundColor:'white',
    borderRadius:20,
    paddingLeft:10,
    marginBottom:10


  },
  btnCadastro:{
    width: '100%',
    height:40,
    backgroundColor:'#162b69',
    borderRadius: 20,
    justifyContent:'center'
    
  }
  
});