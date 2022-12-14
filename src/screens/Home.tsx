import React, {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Home = () => {
  const [cameraPhoto, setCameraPhoto] = useState<any>();
  //Image picker launcheCamera Option
  let options = {
    mediaType: 'photo',
    cameraType: 'back',
    // saveToPhotos: true,
  };
  const [showHomePage, setShowHomePage] = useState(false);
  const OpenCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // console.log("Je suis beau comme je l'entend");

      const result = await launchCamera(options);
      setCameraPhoto(result.assets[0].uri);
      console.log('Le set camera contient : ', result.assets[0].uri);
    }
  };

  const Opengallery = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // console.log("Je suis beau comme je l'entend");

      const result = await launchImageLibrary(options);
      setCameraPhoto(result.assets[0].uri);
      console.log('Le set camera contient : ', result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: cameraPhoto}} style={styles.image} />

      <Button title="Prendre Une Photo" onPress={OpenCamera} />
      <Text>.</Text>
      <Button title="Aller a la Gallery" onPress={Opengallery} />
      {/* <Text>Je suis jocelyn pyw</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'lime',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginBottom: 20,
    width: 180,
    height: 180,
  },
});

export default Home;
