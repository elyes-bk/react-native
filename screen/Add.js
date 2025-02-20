import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../constants/api';

export default function Add({ navigation }) {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });

  const onChangeText = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const { data, status } = await axios.post(URL.FETCH_PRODUCT, product);
      if (status === 200) {
        console.log('Produit ajouté avec succès');
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Titre"
        onChangeText={(val) => onChangeText("title", val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Prix"
        keyboardType="numeric"
        onChangeText={(val) => onChangeText("price", val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline
        onChangeText={(val) => onChangeText("description", val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Catégorie"
        onChangeText={(val) => onChangeText("category", val)}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de l'image"
        onChangeText={(val) => onChangeText("image", val)}
      />
      <Button title="Ajouter" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  }
});