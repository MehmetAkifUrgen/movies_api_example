/* eslint-disable prettier/prettier */
import {NavigationHelpersContext} from '@react-navigation/core';
import React, {useState, useEffect, use} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Alert,
  FlatList,
  BackHandler,
} from 'react-native';
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [newdata, setnewData] = useState([]);
  const [texte, setText] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

    // Handle user state changes
   

  useEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isSelectionModeEnabled()) {
          disableSelectionMode();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isSelectionModeEnabled, disableSelectionMode]),
  );
  const isSelectionModeEnabled = () => {
    return true;
  };
  const disableSelectionMode = () => {
    return false;
  };

  const getMoviesFromApi = async () => {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=b953ac9f9bd22f92fd0cc94a9cc906b1&language=en_EN',
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(json => setData(json.results), setnewData(data))
      .catch(error => Alert(error));
  };

  useEffect(() => {
    getMoviesFromApi();
    navigation.addListener('beforeRemove', e => {
      return;
    });
  }, []);
  useEffect(() => {
    let isMounted = true;               // note mutable flag
    getMoviesFromApi().then(data2 => {
      if (isMounted) setData(data2);    // add conditional check
    })
    return () => { isMounted = false }; // cleanup toggles value, if unmounted
  }, []); 
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }  
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log('user,',user)
    return subscriber; // unsubscribe on unmount
    
  }, [])

  const renderItem = ({item}) => {
    const language = item.original_language;
    const title = item.original_title;
    const overview = item.overview;
    const poster = item.poster_path;
    const date = item.release_date;
    const vote = item.vote_average;
    const id = item.id;
    const backPoster = item.backdrop_path;
    const voteCount = item.vote_count;

    AsyncStorage.setItem('id', JSON.stringify(id)).then(() => {});

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Detail', {
            language,
            title,
            overview,
            poster,
            date,
            vote,
            id,
            backPoster,
            voteCount,
          })
        }
        style={{
          width: wp('50%'),
          height: hp('40%'),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          resizeMode="stretch"
          style={{width: '90%', height: '80%', borderRadius: 10}}
          source={{
            uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              width: wp('40%'),
              height: hp('7%'),
              fontSize: hp('2%'),
              textAlign: 'center',
            }}>
            {' '}
            {item.title}
          </Text>
          {/* <Text style={{fontSize:hp('2.2%')}}> {item.vote_average} </Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  const searchFilter = text => {
    const newData = newdata.filter(item => {
      const listItem = item.original_title.toLowerCase();

      return listItem.indexOf(text.toLowerCase()) != -1;
    });

    setData(newData);
  };

  return (
    <View
      style={{
        backgroundColor: '#FFF',
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: '#C0DAD6',
          height: hp('17%'),
          borderBottomLeftRadius: wp('2%'),
          borderBottomRightRadius: wp('2%'),
          paddingHorizontal: wp('2%'),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 25,
            width: '100%',
          }}>
          <View style={{width: '50%'}}>
            <Text
              style={{
                fontSize: 28,
                color: '#0A344C',
                fontWeight: 'bold',
              }}>
              Popular Movies
            </Text>
          </View>
          <View style={{width: '50%', alignItems: 'flex-end'}}>
            <Image
              source={require('../images/clapperboard.png')}
              style={{height: 60, width: 60}}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#FFF',
          paddingVertical: 8,
          paddingHorizontal: 20,
          marginHorizontal: 20,
          borderRadius: 15,
          marginTop: 25,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          onChangeText={text => {
            searchFilter(text);
            text == '' ? getMoviesFromApi() : null;
          }}
          placeholder="Search"
          placeholderTextColor="#b1e5d3"
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            width: 260,
            color: 'black',
          }}
        />
        <Image
          source={require('../images/3.png')}
          style={{height: 20, width: 20}}
        />
      </View>

      <FlatList
        contentContainerStyle={{flexGrow: 1, marginTop: hp('1%')}}
        data={data}
        renderItem={renderItem}
        refreshing={true}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
};
export default Home;
