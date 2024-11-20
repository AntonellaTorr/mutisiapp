import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import CervezaDetalle from './components/CervezaDetalle';
import Form from './components/Form/Form';
import CervezaLista from './components/cervezaLista'

const Stack = createStackNavigator();

const App = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CervezaLista">
        <Stack.Screen 
          name="CervezaLista" 
          component={CervezaLista} 
          options={{ title: 'Bienvenidx!, qué vas a tomar hoy?' }} 
        />
        <Stack.Screen 
          name="CervezaDetalle" 
          component={CervezaDetalle} 
          options={{ title: 'Detalle de la Cerveza' }} 
        />
         <Stack.Screen name="Form" component={Form} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;