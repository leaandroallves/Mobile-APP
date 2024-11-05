import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Alert } from 'react-native';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: ''
    };
  }

  // Função para verificar credenciais e fazer login
  handleLogin = async () => {
    const { email, senha } = this.state;

    try {
      // Busca as credenciais armazenadas
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPassword = await AsyncStorage.getItem('userPassword');

      // Verifica se as credenciais correspondem
      if (email === storedEmail && senha === storedPassword) {
        this.props.navigation.navigate('AgendaConsultas');  // Navega para a tela de Agendamento
      } else {
        Alert.alert("Erro de Login", "Email ou senha incorretos");  // Exibe erro se não corresponderem
      }
    } catch (e) {
      Alert.alert("Erro", "Não foi possível verificar as credenciais");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        
        <Image style={{ width: 150, height: 150 }} source={require('./assets/foto.png')} />
        
        {/* Campo de entrada para o Email */}
        <TextInput
          placeholder='Seu Email'
          style={styles.textInput}
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />

        {/* Campo de entrada para a Senha */}
        <TextInput
          secureTextEntry={true}
          placeholder='Sua Senha'
          style={styles.textInput}
          onChangeText={text => this.setState({ senha: text })}
          value={this.state.senha}
        />
        
        {/* Botão de Login */}
        <TouchableOpacity style={styles.btnCadastro} onPress={this.handleLogin}>
          <Text style={{ color: 'white', textAlign: 'center' }}>LOGAR</Text>
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
  }
});
