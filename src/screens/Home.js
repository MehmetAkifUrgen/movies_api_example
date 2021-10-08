import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  FlatList,
  BackHandler,
  StyleSheet,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [newdata, setnewData] = useState([]);
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
    let isMounted = true; // note mutable flag
    getMoviesFromApi().then(data2 => {
      if (isMounted) {
        setData(data2);
      } // add conditional check
    });
    return () => {
      isMounted = false;
    }; // cleanup toggles value, if unmounted
  }, []);
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log('user,', user);
    return subscriber; // unsubscribe on unmount
  }, []);

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
        style={styles.movie_button}>
        <Image
          resizeMode="stretch"
          style={styles.movie_image}
          source={{
            uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
          }}
        />

        <Text style={styles.movie_text}> {item.title}</Text>
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
    <View style={styles.container}>
      <View style={styles.headers}>
        <View style={styles.headers_body}>
          <View style={styles.headers_left}>
            <Text style={styles.headers_title}>Popular Movies</Text>
          </View>
          <View style={styles.headers_right}>
            <Image
              source={require('../images/clapperboard.png')}
              style={styles.headers_image}
            />
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <TextInput
          onChangeText={text => {
            searchFilter(text);
            text == '' ? getMoviesFromApi() : null;
          }}
          placeholder="Search"
          placeholderTextColor="#b1e5d3"
          style={styles.input}
        />
        <Image source={require('../images/3.png')} style={styles.input_image} />
        
      </View>

      <FlatList
        contentContainerStyle={styles.list}
        data={data}
        renderItem={renderItem}
        refreshing={true}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  movie_button: {
    width: wp('50%'),
    height: hp('40%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  movie_image: {
    width: '90%',
    height: '80%',
    borderRadius: 10,
  },
  movie_text: {
    width: wp('40%'),
    height: hp('7%'),
    fontSize: hp('2%'),
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  headers: {
    height: hp('17%'),
    backgroundColor: '#C0DAD6',
    borderBottomLeftRadius: wp('2%'),
    borderBottomRightRadius: wp('2%'),
    paddingHorizontal: wp('2%'),
  },
  headers_body: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
  },
  headers_left: {
    width: '50%',
  },
  headers_title: {
    fontSize: 28,
    color: '#0A344C',
    fontWeight: 'bold',
  },
  headers_right: {
    width: '50%',
    alignItems: 'flex-end',
  },
  headers_image: {
    height: 60,
    width: 60,
  },
  body: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  input: {
    fontSize: 18,
    width: 260,
    color: 'black',
    fontWeight: 'bold',
  },
  input_image: {
    width: 20,
    height: 20,
  },
  list: {
    flexGrow: 1,
    marginTop: hp('1%'),
  },
});
export default Home;
