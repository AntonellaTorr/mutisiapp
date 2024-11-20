import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import CervezaItem from './CervezaItem.js';

const CervezaLista = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  // Si el parámetro 'reloadData' está presente, recarga los datos
  useEffect(() => {
    if (route.params?.reloadData) {
      fetchData();
    }
  }, [route.params]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const ip = 'http://192.168.0.11:3000/api/'; // IP del servidor
      const response = await fetch(`${ip}cervezas?cantidad=5&from=${(page - 1) * 5}`);
      const json = await response.json();
      setData(prevData => [...prevData, ...json]);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener cervezas:', error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <CervezaItem
        name={item.nombre}
        image={{ uri: `http://192.168.0.11:3000${item.image}` }} // Asegúrate de que la URL de la imagen esté bien formada
        onPress={() => navigation.navigate('CervezaDetalle', { item })}
      />
    );
  };

  const renderFooter = () => {
    return loading ? (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : null;
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>¿Cuál es tu estilo?</Text>

         {/* Botón para agregar una nueva cerveza */}
         <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('Form')}
      >
        <Text style={styles.addButtonText}>Agregar Cerveza</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={item => item.codigo.toString()} 
        renderItem={renderItem}
        onEndReached={fetchData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 30,
    backgroundColor: 'black',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: 'orange', // Fondo naranja
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'black', // Texto negro
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default CervezaLista;