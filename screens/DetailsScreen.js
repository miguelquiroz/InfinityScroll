import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';

const DetailsScreen = ({ route, navigation }) => {
    /* 2. Get the param */
    const { item } = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.titleText}>Details</Text>
        <Image source={{uri:item.image}} style={{width:300, height:300}} />
        <Text style={styles.baseText}>Name: {item.name}</Text>
        <Text style={styles.baseText}>Status: {item.status}</Text>
        <Text style={styles.baseText}>Species: {item.species}</Text>
        <Text style={styles.baseText}>Type: {item.type}</Text>
        <Text style={styles.baseText}>Gender: {item.gender}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    baseText: {
        fontSize: 20
    },
    titleText: {
      fontSize: 40,
      color: "#3363FF",
      fontWeight: "bold"
    }
  });
 
  export default DetailsScreen;