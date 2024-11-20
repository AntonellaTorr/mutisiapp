import React, { useEffect, useState } from 'react';
import { View, FlatList , StyleSheet} from 'react-native';

import Button from './Button';

const Cervezas = () => {
    const arrCervezas = [
        {id: 1, name: 'IPA ARGENTA'},
        {id: 2, name: 'IPA SESSION'},
        {id: 3, name: 'OLD ALE'},
        {id: 4, name: 'COCO SCOTTISH'},
        {id: 5, name: 'PILSEN'},
        {id: 6, name: 'HOPPY PILSEN'},
        {id: 7, name: 'ALTA BARDA'}
    ]

    return (
        <View style= {StyleSheet.container}>
           <FlatList
                data = {arrCervezas}
                renderItem={({item, index}) => (
                    <Button title={item.name} action={() => console.log(item.name)}/>
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                    <View style = { { height: 10, width: '100%' , backgroundColor: 'black'}}/>
                )}
           />
        </View>
    );
}

const styles = StyleSheet.create({ // Define los estilos
    container: {
        flex: 1,
        backgroundColor: '#FFF', // Color de fondo para la vista
    },
});

export default Cervezas; 