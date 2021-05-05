import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

function Auth() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const user = [
    {username: 'Huda', password: 'Akun123'},
    {username: 'Wintang', password: 'Akun123'},
  ];

  const login = async () => {
    const isUser = user.filter(
      item => item.username === username && item.password === password,
    );
    if (isUser.length > 0) {
      AsyncStorage.setItem('@userdata', JSON.stringify({username}));
      ToastAndroid.showWithGravity(
        'Login Succes',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      navigation.replace('Home');
    } else {
      ToastAndroid.showWithGravity(
        'Login Failed',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  const passwordVisibility = () => {
    !hidePassword ? setHidePassword(true) : setHidePassword(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerBrand}>
        <Text style={styles.brand}>Barcode</Text>
      </View>
      <View style={styles.containerAuth}>
        <View style={styles.containerInput}>
          <Text style={styles.title}>Username</Text>
          <View style={styles.containerTextInput}>
            <TextInput
              value={username}
              onChangeText={val => setUsername(val)}
              style={styles.textInput}
            />
          </View>
          <Text style={styles.title}>Password</Text>
          <View style={styles.containerTextInput}>
            <TextInput
              secureTextEntry={hidePassword}
              value={password}
              onChangeText={val => setPassword(val)}
              style={styles.textInput}
            />
            <TouchableOpacity onPress={() => passwordVisibility()}>
              <Icon
                name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => login()}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerBrand: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '20%',
  },
  brand: {
    color: '#394967',
    fontFamily: 'PublicaSans-Medium',
    fontSize: 35,
  },
  textInput: {
    flex: 1,
  },
  containerTextInput: {
    flexDirection: 'row',
    borderWidth: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderColor: '#B3B3B3',
    marginBottom: 5,
    borderRadius: 5,
  },
  containerAuth: {
    paddingHorizontal: '6%',
  },
  containerInput: {
    marginBottom: '20%',
  },
  title: {
    color: '#B3B3B3',
    fontFamily: 'PublicaSans-Light',
    marginBottom: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#14274E',
    borderRadius: 5,
    height: '16%',
    justifyContent: 'center',
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'PublicaSans-Light',
    fontSize: 15,
  },
});
