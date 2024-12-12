import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const CervezaDetalle = ({ route }) => {
  const { item } = route.params;
  const [cerveza, setCerveza] = useState(null);

  useEffect(() => {
    fetchCerveza(item.codigo);
  }, [item]);

  const fetchCerveza = async (codigo) => {
    const ip = 'http://192.168.0.15:3000/api/';
    try {
      const response = await fetch(`${ip}cervezas/${codigo}`);
      if (!response.ok) {
        throw new Error('Error al obtener los detalles de la cerveza');
      }
      const data = await response.json();
      setCerveza(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!cerveza) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: `http://192.168.0.215:3000${cerveza.image}` }} style={styles.image} />
      <Text style={styles.name}>{cerveza.nombre}</Text>
      <Text style={styles.detail}>Amargor: {cerveza.amargor}</Text>
      <Text style={styles.detail}>Porcentaje: {cerveza.graduacion}%</Text>
      <Text style={styles.detail}>Detalles: {cerveza.detalle}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  image: {
    width: 300,
    height: 500,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'orange',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
  },
});

export default CervezaDetalle;