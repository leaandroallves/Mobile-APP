import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

export default class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      senha: ''
    };
    this.irLogin = this.irLogin.bind(this);
  }

  // Função para navegar para a tela de Login
  irLogin() {
    this.props.navigation.navigate("Login");
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />

        <Image style={{ width: 150, height: 150 }} source={require('./assets/foto.png')} />

        <TextInput
          placeholder='Seu Nome'
          style={styles.textInput}
          onChangeText={text => this.setState({ nome: text })}
          value={this.state.nome}
        />
        <TextInput
          placeholder='Seu Email'
          style={styles.textInput}
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry={true}
          placeholder='Sua Senha'
          style={styles.textInput}
          onChangeText={text => this.setState({ senha: text })}
          value={this.state.senha}
        />

        {/* Botão de Cadastro */}
        <TouchableOpacity style={styles.btnCadastro} onPress={this.cadastrarUsuario}>
          <Text style={{ color: 'white', textAlign: 'center' }}>CADASTRAR</Text>
        </TouchableOpacity>

        {/* Texto clicável para quem já tem conta */}
        <TouchableOpacity onPress={this.irLogin}>
          <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    );
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
  textInput: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 10
  },
  btnCadastro: {
    width: '100%',
    height: 40,
    backgroundColor: '#000080',
    borderRadius: 20,
    justifyContent: 'center'
  },
  linkText: {
    color: 'white',
    marginTop: 20,
    textDecorationLine: 'underline',
    textAlign: 'center'
  }
});

