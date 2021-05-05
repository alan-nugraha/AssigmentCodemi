import React, {useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  const getData = async () => {
    const data = await AsyncStorage.getItem('@userdata');
    setTimeout(() => {
      if (data) {
        navigation.replace('Home');
      } else {
        navigation.replace('Auth');
      }
    }, 2000);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <Text style={styles.brand}>Barcode</Text>
      <ActivityIndicator color="white" />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#14274E',
  },
  brand: {
    fontFamily: 'PublicaSans-Medium',
    color: 'white',
    fontSize: 50,
  },
});
