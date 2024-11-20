import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Image
          style={styles.logo}
          source={require("../../assets/logo_con_negro.jpg")}
        />
      </View>
      <TouchableOpacity style={styles.menu}>
        <Icon  name="bars" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    //borderWidth:10,
    borderColor:"white",
    flexDirection:"row",
    width:"100%",
    marginTop:50,
    //borderBottomWidth:1,



  },
  //ACORDARSE DE ARREGLAR DE FORMA GENERICA QUE SE CENTRA LA IMAGEN 
  centerContent: {
    //borderWidth:5,
    //borderColor:"red",
    alignItems:"center",flex:3,
    paddingLeft:50,


  },
  menu: {
   // borderWidth:10,
   // borderColor:"blue",
    padding:15,
    marginLeft:"auto",

    
  },
  logo: {
    width: 200,
    height: 50, // Ajusta la altura según tus necesidades
    resizeMode: "contain",
    paddingTop:10
  },
});
