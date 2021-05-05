import React, {useState, useEffect} from 'react';
import {
  View,
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import BottomTab from '../../components/BottomTabs';
import {SwipeablePanel} from 'rn-swipeable-panel';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation, CommonActions} from '@react-navigation/native';

import ic_arrow from '../../assets/icons/ic_arrow.png';

function Profile() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState([]);
  const [swipeQr, setSwipeQr] = useState(false);

  const getData = async () => {
    const data = await AsyncStorage.getItem('@userdata');
    setUserData(JSON.parse(data));
  };

  useEffect(() => {
    getData();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('@userdata');
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {name: 'Auth'},
          {
            name: 'Auth',
          },
        ],
      }),
    );
  };

  const renderQr = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <QRCode
          value={userData?.username}
          size={200}
          logoBackgroundColor="transparent"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSwipeQr(true)}>
          <Text style={styles.textMenu}>Show My QR</Text>
          <Image source={ic_arrow} style={styles.iconArrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => logout()}>
          <Text style={styles.textMenu}>Logout</Text>
          <Image source={ic_arrow} style={styles.iconArrow} />
        </TouchableOpacity>
      </View>
      <SwipeablePanel
        closeOnTouchOutside
        fullWidth
        isActive={swipeQr}
        onClose={() => setSwipeQr(false)}
        onPressCloseButton={() => setSwipeQr(false)}>
        {renderQr()}
      </SwipeablePanel>
      <BottomTab screen="Profile" />
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  main: {
    height: '100%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: 'white',
    padding: 50,
  },
  iconArrow: {
    width: 16,
    height: 16,
    alignSelf: 'center',
  },
  textMenu: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'PublicaSans-Medium',
    color: '#14274E',
  },
  button: {
    flexDirection: 'row',
    marginBottom: '10%',
  },
});

AppRegistry.registerComponent('Profile', () => Profile);

module.exports = Profile;
