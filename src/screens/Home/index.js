import React, {useState} from 'react';
import {
  Text,
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import BottomTab from '../../components/BottomTabs';

function Home() {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');

  const onSuccess = item => (setName(item.data), setModal(true));

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onSuccess}
        containerStyle={styles.containerStyle}
        showMarker={true}
        markerStyle={{borderColor: '#AEB5B6'}}
        cameraStyle={{width: 200}}
        bottomContent={
          <Text style={styles.bottomContent}>Scanning will automatically</Text>
        }
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        statusBarTranslucent
        onRequestClose={() => {
          setModal(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textModal}>Halo, nama saya {name}</Text>
            <View style={styles.modalRow}>
              <TouchableOpacity
                style={styles.buttonModal}
                onPress={() => setModal(false)}>
                <Text style={styles.textButton}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <BottomTab screen="Home" />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonModal: {
    backgroundColor: '#2486F3',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 20,
  },
  textButton: {
    fontFamily: 'PublicaSans-Light',
    fontSize: 12,
    color: '#fff',
  },
  bottomContent: {
    fontSize: 15,
    fontFamily: 'PublicaSans-Medium',
    color: '#14274E',
  },
  textModal: {
    fontFamily: 'PublicaSans-Medium',
    fontSize: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('default', () => Home);
