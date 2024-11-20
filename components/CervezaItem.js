import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CervezaItem = ({ name, image, onPress}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={styles.container}>
                <Image source={image} style={styles.image} />
                <Text style={styles.text}>{name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'black',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 220,
        height: 400,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    text: {
        color: 'orange',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5
    },
});

export default CervezaItem;