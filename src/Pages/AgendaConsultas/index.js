import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

const AgendaConsultas = () => {
  const [items, setItems] = useState({});
  const navigation = useNavigation();

  // Função para carregar consultas do AsyncStorage e formatá-las para o Agenda
  const loadItems = async (day) => {
    try {
      const storedConsultas = await AsyncStorage.getItem('consultas');
      const consultas = storedConsultas ? JSON.parse(storedConsultas) : [];

      const newItems = {};
      consultas.forEach((consulta) => {
        if (!newItems[consulta.data]) {
          newItems[consulta.data] = [];
        }
        
        newItems[consulta.data].push({
          name: `Consulta com ${consulta.nome} às ${consulta.hora}`,
          height: 100,
          data: consulta.data,
          hora: consulta.hora,
          nome: consulta.nome,
        });
      });

      const time = day.timestamp;
      for (let i = -15; i < 85; i++) {
        const strTime = new Date(time + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        if (!newItems[strTime]) {
          newItems[strTime] = [];
        }
      }

      setItems(newItems);
    } catch (e) {
      console.error("Erro ao carregar consultas", e);
    }
  };

  // Função para excluir uma consulta
  const handleDelete = async (consulta) => {
    try {
      const storedConsultas = await AsyncStorage.getItem('consultas');
      const consultas = storedConsultas ? JSON.parse(storedConsultas) : [];

      // Filtra a consulta específica a ser excluída
      const updatedConsultas = consultas.filter(
        (item) => !(item.nome === consulta.nome && item.hora === consulta.hora && item.data === consulta.data)
      );

      // Atualiza o AsyncStorage e o estado
      await AsyncStorage.setItem('consultas', JSON.stringify(updatedConsultas));
      loadItems({ timestamp: new Date().getTime() });

      Alert.alert("Consulta excluída com sucesso!");
    } catch (e) {
      console.error("Erro ao excluir consulta", e);
      Alert.alert("Erro ao excluir consulta", e.message);
    }
  };

  useEffect(() => {
    const today = new Date();
    loadItems({ timestamp: today.getTime() });
  }, []);

  const renderItem = (item) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>  
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Adicionar Consulta"
        color='#4169e1'
        onPress={() => navigation.navigate('CadastroConsulta')}
      />
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={new Date().toISOString().split('T')[0]}
        renderItem={renderItem}
        theme={{
          agendaDayTextColor: 'black',
          agendaDayNumColor: 'black',
          agendaTodayColor: '#4169e1',
          agendaKnobColor: '#4169e1',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#4169e1',
    padding:3,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10
  },
});

export default AgendaConsultas;


