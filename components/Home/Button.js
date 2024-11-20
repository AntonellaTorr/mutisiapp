import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native'; // Importa StyleSheet desde react-native

function Button ({ title, action }){
    return (
        <TouchableOpacity
            style={styles.btn} // Usa styles.btn aquí
            onPress={action}
        >
            <Text>{title}</Text> {/* Agrega el texto del botón */}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: 'blue', // Color de fondo del botón
        padding: 10, // Añade relleno al botón
        margin: 5, // Añade margen alrededor del botón
        alignItems: 'center', // Centra los elementos dentro del botón
        justifyContent: 'center', // Centra verticalmente los elementos dentro del botón
    },
});

export default Button