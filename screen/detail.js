import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { URL } from '../constants/api';
import axios from 'axios';

export default function Detail({ route, navigation }) {
  const { id } = route.params;  
  const [product, setProduct] = useState(null); // Initialiser à null au lieu de undefined

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, status } = await axios.get(`${URL.FETCH_PRODUCT_BY_ID}/${id}`);
        if (status !== 200) {
          console.error('Error fetching product');
        }
        setProduct(data);
      } catch (error) {
        throw error.message;
      }
    };
    fetchProduct();
  }, []);  

  const deleteProduct = async () => {
    try{
        const {data, status} = await axios.delete(`${URL.FETCH_PRODUCT_BY_ID}/${id}`)

        if(status === 200){
            console.log(data);
            navigation.goBack();
        }
    }catch(error){
        throw {message: error.message, response: error.response}
    }
  };


  return (
    <View style={styles.container}>
      {!product ? (
        <Text>Chargement...</Text>
      ) : (
        <>
          <Image source={{ uri: product.image }} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>

            <Button title="Supprimer" onPress={deleteProduct} />
            <Button title="Modifier" onPress={()=>{
                navigation.navigate('Update', {id: id})
            }} />

          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain'
  },
  details: {
    padding: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  price: {
    fontSize: 18,
    color: '#666',
    marginBottom: 15
  },
  description: {
    fontSize: 16,
    lineHeight: 24
  }
});