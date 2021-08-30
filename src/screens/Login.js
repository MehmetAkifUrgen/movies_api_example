import React,{useState,useEffect} from 'react';
import { Text, View,TextInput,StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const Login = ({
    navigation
}) => {
    
 
   

    const [email, onChangeemail] = React.useState("");
    const [password, onChangepassword] = React.useState("");


    const kayitOl = ()=> { auth()
        
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          navigation.navigate('Home')
        })
        .catch(error => {
            
            Alert.alert(error)
      
          
        });}
        const giris = ()=> { auth()
        
            .signInWithEmailAndPassword(email, password)
            .then(() => {
              console.log('User account created & signed in!');
              
              navigation.navigate('Home')
            })
            .catch(error => {
              
          
              console.error(error);
            });}
    console.log('////////',password,email)
    return(
        
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                 <TextInput
        style={styles.input}
        onChangeText={onChangeemail}
        value={email}
        placeholder="email"
        keyboardType="email-address"
      />
       <TextInput
        style={styles.input}
        onChangeText={onChangepassword}
        value={password}
        placeholder="password"
        secureTextEntry={true}
      />
      <View style={{flexDirection:'row',justifyContent:'space-between',width:wp('60%')}}>
      <TouchableOpacity style={styles.buton} onPress={()=> kayitOl()} > 
      <Text> Kayıt Ol </Text> 
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buton,{backgroundColor:'aqua'}]} onPress={()=> giris()} >
         <Text> Giriş </Text> 
         </TouchableOpacity>
      </View>
        </View>
    );
    
}
const styles = StyleSheet.create({
    input: {
      height: hp('4%'),
      margin: wp('1.2%'),
      borderWidth: 1,
      padding: wp('1%'),
      width:wp('60%'),
      borderRadius:wp('5%')
    },
    buton:{
      backgroundColor:'green',
      borderRadius:wp('5%'),
      width:wp('20%'),
      justifyContent:'center',
      alignItems:'center'
    }
  });

export default Login;
