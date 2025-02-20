import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native';
import React, {useState, useEffect} from 'react';
import {URL} from '../constants/api';
import axios from 'axios';

export default function Home({navigation}) {
  
  const [product, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try{
        const { data, status } = await axios.get(URL.FETCH_PRODUCT);

        setProducts(data);

        if(status === 200){
          console.log('Success');
          console.log(data[0]);
          
        }

        setProducts(data);
      }catch(error){
        throw error.message;
      }
    }
    fetchProduct();
  }, []);

  const renderItem = ({item}) => {
    const {id, title, price, image} = item;
    return(
      <Pressable 
        onPress={() => navigation.navigate('Detail', { id: id })}
        style={styles.itemContainer}
      >
        <View>
          <Text style={styles.title}>{title}</Text>
          <Image
            source={{uri: image}}
            style={{width: 100, height: 100}}
          />
        </View>
      </Pressable>
    )
  }   

  return (
    <View style={styles.container}>
      <FlatList
        data={product}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain'
  }
})