import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet ,Alert} from "react-native";
import RNPickerSelect from 'react-native-picker-select';



export default function Form() {
  const [amargor, setAmargor] = useState(null);
  const [nombre, setNombre] = useState("");
  const [graduacion, setGraduacion] = useState(null);
  const [detalle, setDetalle] = useState(null);  // Definición del estado

  // Función para realizar solicitudes POST usando fetch
  const postCerveza = async (endpoint, data) => {
  try {
    console.log(endpoint);
    const response = await fetch(`${'http:/192.168.0.15:3000/api/'}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }else{
      console.log("en el ese");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }

};
  
  const placeholder = {
    label: 'Selecciona el nivel de amargor',
    value: null,
    color: 'black', // Puedes personalizar el color del placeholder aquí
  };

  const onPress = async () => {
    try {
      const data = {
        nombre,
        amargor,
        graduacion: parseFloat(graduacion),
        detalle,
      };

      const response = await postCerveza('cervezas', data);

      Alert.alert('Cerveza registrada', `Se ha registrado la cerveza ${response.nombre}`);
      setNombre('');
      setAmargor(null);
      setGraduacion('');
      setDetalle('');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Hubo un problema al registrar la cerveza. Inténtalo nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Cargar Cerveza</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el nombre"
          placeholderTextColor={"white"}
          onChangeText={setNombre}
          value={nombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese la graduación"
          keyboardType="numeric"
          placeholderTextColor={"white"}
          onChangeText={setGraduacion}
          value={graduacion}
        />


        <RNPickerSelect
          onValueChange={setAmargor}
          items={[
            { label: 'Bajo', value: 'Bajo' },
            { label: 'Suave', value: 'Suave' },
            { label: 'Medio', value: 'Medio' },
          ]}
          style={pickerSelectStyles} 
          placeholder={placeholder} 
        />
        
        <TextInput
          style={styles.input}
          placeholder="Ingrese el detalle"
          placeholderTextColor={"white"}
          onChangeText={setDetalle}
          value={detalle}
        />


        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.t}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"black",
    flex:1,
  },
 
  title: {
    color: "white",
    textAlign: "left",
    fontSize: 30,
    paddingLeft: 25,
    paddingTop: 60,
    fontWeight: "300",
  },
  input: {
    fontSize: 16,
    borderColor: "white",
    borderWidth: 0.5,
    borderRadius: 3,
    color: "white",
    margin: 15,
    padding: 5,
    borderRadius: 5,
  },
  inputContainer: {
    justifyContent: "flex-start",
    margin: 20,
    padding: 5,
    borderRadius: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 50,
    marginHorizontal: 70,
    borderRadius: 10,
  },
  t:{
    color:"black",
  }
});


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    color: 'white',
    padding:5,
    margin:15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30,
  },
  placeholder: {
    color: 'white',
    borderWidth: 1,
    borderRadius: 5,
    margin: 15,
    padding: 6,
  },
  // Estilo del texto de la opción seleccionada
  selectedItemTextColor: 'white',
});

