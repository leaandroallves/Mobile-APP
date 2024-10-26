import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Biblioteca para selecionar a hora

const CadastroConsulta = ({ navigation, route }) => {
  const [nome, setNome] = useState('');
  const [hora, setHora] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = () => {
    const consulta = {
      nome,
      hora: hora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      data: route.params.selectedDate // Passar a data selecionada
    };

    // Aqui você pode salvar a consulta, por exemplo, usando o navigation para passar os dados para a agenda
    navigation.navigate('Agendamento', { consulta }); // Envia os dados da consulta para a agenda
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Paciente</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do paciente"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Hora da Consulta</Text>
      <Button title="Escolher Hora" onPress={() => setShowTimePicker(true)} />
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

      <Button title="Salvar Consulta" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
});

export default CadastroConsulta;

