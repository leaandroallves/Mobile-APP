import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CadastroConsulta = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = async () => {
    if (nome && data && hora) {
      try {
        const novaConsulta = {
          nome,
          data: data.toISOString().split('T')[0],  // Formata a data como "YYYY-MM-DD"
          hora: hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })  // Formata a hora como "HH:MM"
        };

        const storedConsultas = await AsyncStorage.getItem('consultas');
        const consultas = storedConsultas ? JSON.parse(storedConsultas) : [];

        consultas.push(novaConsulta);
        await AsyncStorage.setItem('consultas', JSON.stringify(consultas));

        Alert.alert("Consulta agendada com sucesso!");
        navigation.navigate('AgendaConsultas');
      } catch (e) {
        Alert.alert("Erro ao salvar consulta", e.message);
      }
    } else {
      Alert.alert("Preencha todos os campos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Paciente:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do paciente"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Data da Consulta:</Text>
      <Button color='#000080' title="Escolher Data" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setData(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Hora da Consulta:</Text>
      <Button color='#000080' title="Escolher Hora" onPress={() => setShowTimePicker(true)} />
      {showTimePicker && (
        <DateTimePicker
          value={hora}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setHora(selectedTime);
          }}
        />
      )}

      <Button
        color='#000080'
        title="Salvar Consulta"
        onPress={handleSave}
        style={styles.btnConsulta}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#4169e1',
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: 'white'
  }
});

export default CadastroConsulta;

