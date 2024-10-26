import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { useNavigation, useRoute } from '@react-navigation/native';  // Usa o hook de navegação

// Configuração de Localização para Português
LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  dayNames: [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br'; // Define o idioma padrão como português

const AgendaConsultas = () => {
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation();
  const route = useRoute();  // Usado para acessar os dados da consulta passada via navegação

  // Função para carregar consultas para os dias
  const loadItems = (day) => {
    setTimeout(() => {
      let newItems = { ...items }; // Mantém os itens atuais

      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = new Date(time).toISOString().split('T')[0];

        if (!newItems[strTime]) {
          newItems[strTime] = [];
        }
      }

      // Verifica se há nova consulta passada via navegação
      if (route.params?.consulta) {
        const { consulta } = route.params;
        if (!newItems[consulta.data]) {
          newItems[consulta.data] = [];
        }
        newItems[consulta.data].push({
          name: `Consulta com ${consulta.nome} às ${consulta.hora}`,
          height: 100,
        });

        // Remove os dados da rota após adicionar para evitar duplicação
        navigation.setParams({ consulta: null });
      }

      setItems(newItems);
    }, 1000);
  };

  // Renderiza cada item da consulta
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        {/* Certifica-se de que o texto está dentro de <Text> */}
        <Text>{item.name}</Text>  
      </View>
    );
  };

  // Atualiza a data selecionada
  const handleDayChange = (day) => {
    setSelectedDate(new Date(day.timestamp));
  };

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Adicionar Consulta"
        onPress={() => navigation.navigate('CadastroConsulta', { selectedDate: selectedDate.toISOString().split('T')[0] })}  // Passa a data selecionada para o formulário
      />
      <View style={styles.header}>
        {/* Certifica-se de que o texto da data está dentro de <Text> */}
        <Text style={styles.monthText}>{selectedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</Text>
      </View>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}  // Carrega as consultas para o mês
        selected={selectedDate.toISOString().split('T')[0]}
        onDayPress={handleDayChange}  // Atualiza a data selecionada
        renderItem={renderItem}  // Renderiza cada item (consulta)
        theme={{
          agendaDayTextColor: 'black',
          agendaDayNumColor: 'black',
          agendaTodayColor: 'blue',
          agendaKnobColor: 'blue',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default AgendaConsultas;
