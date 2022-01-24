import React, {useState, useEffect} from 'react';
 import {
   View,
   Text,
   StyleSheet,
   FlatList,
   ActivityIndicator,
   TouchableOpacity,
   Image,
   StatusBar
 } from 'react-native';

 
const Home = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState(1);
    const [isListEnd, setIsListEnd] = useState(false);

  useEffect(() => getData(), []);

  const getData = () => {
    if (!loading && !isListEnd) {
      setLoading(true);
      // Service to get the data from the server to render
      fetch('https://rickandmortyapi.com/api/character/?page='
        + offset)
        // Sending the currect offset with get request
        .then((response) => response.json())
        .then((responseJson) => {
          // Successful response from the API Call
          if (responseJson.results.length > 0) {
            setOffset(offset + 1);
            // After the response increasing the offset
            setDataSource([...dataSource, ...responseJson.results]);
            setLoading(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator
            color="black"
            style={{margin: 15}} />
        ) : null}
      </View>
    );
  };

  const ItemView = ({item}) => {
    return (
      <View style={styles.listItem}>
      <Image source={{uri:item.image}}  style={{width:80, height:80,borderRadius:40}} />
      <View style={{alignItems:"center",flex:1}}>
        <Text style={{fontWeight:"bold"}}>{item.name}</Text>
        <Text style={{color:"red"}}>{item.status}</Text>
        <Text>{item.species}</Text>
      </View>
      <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}} onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {item});
        }}>
        <Text style={{color:"green"}}>View</Text>
      </TouchableOpacity>
    </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
        <FlatList
          style={{flex:1}}
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
          ListFooterComponent={renderFooter}
          onEndReached={getData}
          onEndReachedThreshold={0.5}
        />
      </View>
  );
};

const styles = StyleSheet.create({
    footer: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    container: {
      flex: 1,
      backgroundColor: '#F7F7F7',
      marginTop:10
    },
    listItem:{
      margin:10,
      padding:10,
      backgroundColor:"#FFF",
      width:"90%",
      flex:1,
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:5
    }
  });
  export default Home;