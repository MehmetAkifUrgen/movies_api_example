import React from 'react'
import {View, Text,Image, ScrollView } from 'react-native'
import {useState,useEffect, } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Detail = ({route,navigation}) => {
    
    const {language,title,overview,poster,date,vote,id}=route.params;

    const [data,setData]=useState([]);
    const getMoviesFromApi = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=b953ac9f9bd22f92fd0cc94a9cc906b1&language=tr-TR`, {
        method: 'GET',
      
            }).then((response)=>response.json()).then((json)=>setData(json.results))
            .catch((error)=>Alert(error));
        };

    return(
        <ScrollView style={{
            flex:1,
            backgroundColor:"#FFF",
            
        }}>
            <View style={{
                flexDirection:"row",
                width:wp("100%"),
                height:hp("60%")
            }}>
                <View style={{width:wp("10%"),paddingLeft:wp('2%')}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Image
                            source={require('../images/17.png')}
                            style={{marginVertical:hp('4%')}}
                        />
                    </TouchableOpacity>   
                        <View style={{
                            backgroundColor:"#FFF",
                            height:hp('7%'),
                            width:wp('10%'),
                            borderRadius:5,
                            elevation:5,
                            alignItems:"center",
                            justifyContent:"center",
                            marginTop:hp('5%')
                        }}>
                            <Image
                                style={{width:wp('7%'),height:hp('4%')}}
                                source={require('../images/badge.png')}
                            />
                            <Text>{JSON.stringify(vote)}</Text>
                        </View>
                       
                        <View style={{
                            backgroundColor:"#FFF",
                            height:hp('7%'),
                            width:wp('10%'),
                            borderRadius:5,
                            elevation:5,
                            alignItems:"center",
                            justifyContent:"center",
                            marginTop:hp('5%')
                        }}>
                            <Image
                                style={{width:wp('7%'),height:hp('4%')}}
                                source={require('../images/translate.png')}
                            />
                            <Text>{JSON.stringify(language)}</Text>
                        </View>
                        <View style={{
                            backgroundColor:"#FFF",
                            height:hp('7%'),
                            width:wp('10%'),
                            borderRadius:5,
                            elevation:5,
                            alignItems:"center",
                            justifyContent:"center",
                            marginTop:hp('5%')
                        }}>
                            <Image
                                 style={{width:wp('7%'),height:hp('4%')}}
                                source={require('../images/labour-day.png')}
                            />
                            <Text>{JSON.stringify(date).substring(1,5)}</Text>
                        </View>
                       
                </View>
                <View style={{width:wp("90%"),alignItems:'center',marginTop:hp('5%')}}>
                <Image
                        resizeMode="stretch"
                        source={{uri:'https://image.tmdb.org/t/p/w500'+poster}}
                        style={{
                          
                            height:hp('50%'),
                            width:wp('80%'),
                            borderRadius:30
                            
                            
                        }}
                    />
                </View>
            </View>

            <View  style={{alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:hp('2.2%'),fontWeight:'bold'}}> {title} </Text>
                
            </View>
            <ScrollView style={{marginHorizontal:wp('5%')}}>
                
                    <Text style={{fontSize:hp('2.2%'),textAlign:'justify'}}> {overview} </Text>
            </ScrollView>          

                        
                        
        </ScrollView>
    )
}
export default Detail;