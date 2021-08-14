import {View,  Text, Image, ScrollView, ImageBackground, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Detail = ({route, navigation}) => {
  const {language, title, overview, poster, date, vote, id,backPoster,voteCount} = route.params;

  const [data, setData] = useState([]);
  const [credits, setCredits] = useState([]);
  const [control, setControl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCast  = async ()=> {
  AsyncStorage.getItem('id', (error,value) => {
    console.log('/*/*/*/',value)
    if(!error){
        
        if(value !== null){
            fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=b953ac9f9bd22f92fd0cc94a9cc906b1&language=en-US
            `, {
                method: 'GET',
              
                    }).then((response)=>response.json()).then((json)=>{setCredits(json.cast); setIsLoading(false),setControl(true) })
                    .catch((err)=> {setIsLoading(false),setError(err)}
                       );
                   
                };
               
                
        }
})}

  
 
   useEffect(() => {
    setIsLoading(true);
     getCast();
     
    
  },[] );
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
 }

  if (error) {
    setControl(true)
    setError(false)
    console.log("dsfsdfsdf",data)
   return (
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <Text style={{ fontSize: 18}}>
         Error fetching data... Check your network connection!
      </Text>
    </View>
   );
 }
        //   const costum = Cast.map((value,index) => {
              
        //     return(
        //         <View style={{flexDirection:'row',flex:1}} key={index}>
        //               <Image resizeMode="stretch" style={{ width:wp('5%'),height:hp('7%'),borderBottomLeftRadius:wp('15%'),borderRadius:wp('2%'),
        //               backgroundColor: 'transparent'}} source={{uri:'https://image.tmdb.org/t/p/w500' +value.profile_path }} ></Image>
        //         </View>
                
                
        //     )
        // });


        console.log('----------------',credits)

    if(control){
      const costum = credits.map((value,index) => {
       
        return(
            <View style={{marginHorizontal:wp('2%'),width:wp('20%')}} key={index}>
                  <Image resizeMode="stretch" style={{ width:wp('20%'),height:hp('15%'),borderRadius:wp('5%')  }} source={{uri: 'https://image.tmdb.org/t/p/w500' + value.profile_path}} ></Image>
                  <Text style={{textAlign:'center'}}> {value.name} </Text>
            </View>
            
            
        )
  });

      return (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor:'white'
          }}>
          <View
            style={{flex:1,
              backgroundColor: '#BDD6D4',
              width: wp('100%'),
              height:hp('50%'),
              justifyContent:'center',
              alignItems:'center'
            }}>
              <ImageBackground resizeMode="stretch" style={{width:'100%',height:'100%',opacity:.5}} source={{uri: 'https://image.tmdb.org/t/p/w500' + poster}}/>
    
              
           
            <View
              style={{width: wp('90%'), alignItems: 'center', marginTop: hp('5%'),position:'absolute'}}>
              <Image
                resizeMode="stretch"
                source={{uri: 'https://image.tmdb.org/t/p/w500' + poster}}
                style={{
                  height: hp('45%'),
                  width: wp('60%'),
                  borderRadius: 30,
                }}
              />
             
              
            </View>
          </View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{marginTop:hp('1.5%'),fontSize:hp('3.5%'),fontWeight:'bold',color:'#0A334E'}}>
                {title}
              </Text>
          <Text style={{marginTop:hp('1.5%'),fontSize:hp('4.5%'),fontWeight:'bold',color:'#688391'}}>
                {vote}
              </Text>
              <Rating
                type='custom'
                count={5}
                imageSize={wp('5%')}
                ratingBackgroundColor="grey"
                ratingColor="gold"
                startingValue={vote/2}
                tintColor="white"
                
                jumpValue={.1}
              />
              
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:hp('3%')}}>
               
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <Text style={{color:'#5A7480'}}>Language</Text>
                  <Text style={{fontSize:hp('2.5%'),fontWeight:'bold',color:'#4F6C7E'}}> {language} </Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <Text style={{color:'#5A7480'}}>Year</Text>
                  <Text style={{fontSize:hp('2.5%'),fontWeight:'bold',color:'#4F6C7E'}}> {date} </Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <Text style={{color:'#5A7480'}}>Vote Count</Text>
                  <Text style={{fontSize:hp('2.5%'),fontWeight:'bold',color:'#4F6C7E'}}> {voteCount} </Text>
                </View>
              </View>
              <View style={{justifyContent:'center',alignItems:'center',marginTop:hp('3%'),marginHorizontal:wp('5%')}}>
                <Text style={{color:'#416576',fontWeight:'bold',fontSize:hp('3%'),marginBottom:hp('1.5%')}}>Storyline</Text>
                <Text style={{textAlign:'justify',color:'#566F7B',fontSize:hp('1.8%')}}> {overview} </Text>
              </View>
              <Text style={{left:wp('5%'),marginTop:hp('2.5%'),color:'#0D334F',fontSize:hp('2.5%'),fontWeight:'bold'}}> CAST </Text>
              <ScrollView style={{flexDirection:'row'}} horizontal={true}> 
                {costum}
              </ScrollView>
          
        </ScrollView>
      );
    

    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
    
  
  
  

 
};
export default Detail;
