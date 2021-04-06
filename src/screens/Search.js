import React,{useState,useEffect, } from 'react'
import {View, Text, Image, ImageBackground, Alert, FlatList} from 'react-native'
import {TextInput,ScrollView,TouchableOpacity} from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';






const Search = ({navigation}) => {
    const [data, setData] = useState([])
    const [newdata,setnewData]=useState(null)
    const [text,setText]=useState("")
    
    const veri=[]
    const getMoviesFromApi = () => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=b953ac9f9bd22f92fd0cc94a9cc906b1&language=tr-TR&query=${text}&page=1&include_adult=false`, {
        method: 'GET',
      
            }).then((response)=>response.json()).then((json)=>setData(json.results))
            .catch((error)=>Alert(error));
        };

        

    useEffect(() => {
        
        setnewData(data.length)
     },[] );

     const renderItem= ({item}) => {
        const language=item.original_language
        const title=item.original_title
        const overview=item.overview
        const poster=item.poster_path
        const date=item.release_date
        const vote=item.vote_average
        return(
            <TouchableOpacity 
            onPress={()=> navigation.navigate('Detail',{language,title,overview,poster,date,vote})}
            style={{width:wp('50%'),height:hp('40%'),alignItems:'center',justifyContent:'center'}}>
                <Image resizeMode="stretch" style={{width:'90%',height:'80%',borderRadius:10}} source={{uri:'https://image.tmdb.org/t/p/w500'+item.poster_path}}></Image>
                <View style={{flexDirection:'row'}}>
                <Text style={{width:wp('40%'),height:hp('7%'),fontSize:hp('2%'),textAlign:'center'}}> {item.original_title}</Text>
                <Text style={{fontSize:hp('2.2%')}}> {item.vote_average} </Text>
                </View>
            </TouchableOpacity>
        )
    }

    console.log('---------',text)
    

     
     
     
    return(
        <View style={{
            backgroundColor:"#FFF",
            flex:1
        }}>
           <View style={{
               backgroundColor:"#00ac",
               height:hp('17%'),
               borderBottomLeftRadius:wp('2%'),
               borderBottomRightRadius:wp('2%'),
               paddingHorizontal:wp('2%')
           }}>
              
               <View style={{
                   flexDirection:"row",
                   alignItems:"center",
                   marginTop:25,
                   width:"100%"
               }}>
                   <View style={{width:"50%"}}>
                        <Text style={{
                            fontSize:28,
                            color:"#FFF",
                            fontWeight:"bold"
                        }}>Search Movies</Text>
                   </View>
                   <View style={{width:"50%",alignItems:"flex-end"}}>
                        <Image
                            source={require('../images/popcorn.png')}
                            style={{height:60,width:60}}
                        />
                   </View>
               </View>
           </View>
           <LinearGradient
            colors={["rgba(0,164,109,0.4)", "transparent"]}
            style={{
                left:0,
                right:0,
                height:90,
                marginTop:-45
            }}
           >
               <View style={{
                   backgroundColor:"#FFF",
                   paddingVertical:8,
                   paddingHorizontal:20,
                   marginHorizontal:20,
                   borderRadius:15,
                   marginTop:25,
                   flexDirection:"row",
                   alignItems:"center"
               }}>
                   <TextInput
                        onChangeText={(text)=>{setText(text)
                        getMoviesFromApi()
                        }}
                        placeholder="Search"
                        placeholderTextColor="#b1e5d3"
                        style={{
                            fontWeight:"bold",
                            fontSize:18,
                            width:260
                        }}
                   />
                   <TouchableOpacity onPress={()=>getMoviesFromApi()}>
                        <Image
                            source={require('../images/3.png')}
                            style={{height:20,width:20}}
                        />
                   </TouchableOpacity>
                   
               </View>
            </LinearGradient>
         {
             text == "" ?  <View style={{alignItems:'center',justifyContent:'center',marginTop:hp('5%')}}>
             <Text style={{fontSize:hp('2%')}}> Veri Bulunamadı</Text> 
        </View>  :
             <FlatList
             contentContainerStyle={{ flexGrow:1,marginTop:hp('1%')}}
             data={data}
             renderItem={renderItem}
             refreshing={true}
             keyExtractor={item => item.id}
             numColumns={2}
         />
             
         }
            

            

               
        </View>
    )
}
export default Search;