import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { URL } from '../constants/api'

export default function update({route}) {

  const [product, setProduct] = useState(null);
  const { id } = route.params;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, status } = await axios.get(`${URL.FETCH_PRODUCT_BY_ID}/${id}`);
        if (status === 200) {
          console.log('Success');
        }setProduct(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [])

  const onChangeText = (key, value) => {
    setProduct({...product,[key]: value})
  }

  const handleSubmit = async () => {
    try{
      const {data, status} = await axios.put(`${URL.FETCH_PRODUCT_BY_ID}/${id}, product`);
      if(data.status ===200){
        console.log('success update product');
        navigation.goBack();

      }
    }catch(error){
      throw error.message;
    }
  }

  if (!product) return <Text>Chargement...</Text>;

  return (
    <>
      <TextInput
        style={styles.textInput}
        defaultValue={product.title}
        maxLength={200}
        onChangeText={(val) => onChangeText("title", val)}
      />
      <Button title="Valider" onPress={handleSubmit} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5
  }
});