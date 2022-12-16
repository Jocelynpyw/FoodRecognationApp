import React, {useState} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {colors} from '../constants/colors';
import images from '../constants/images';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
      <ImageBackground
        style={styles.imagebackground}
        source={images.vegitable}
      />

      <View style={styles.TopContainer}>
        <Image source={images.logo_dark} style={styles.image} />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.iconContainer}>
          {/* <Image source={{uri: cameraPhoto}} style={styles.image} /> */}
          {/* <FontAwesome5
            name="back"
            key={123}
            size={40}
            color={colors.secondary}
          /> */}
          {/* <Icon name="close" size={60} color={'lime'} /> */}
        </View>
        <View style={styles.buttonContainer}>
          <View style={{marginBottom: 60}}>
            <TouchableOpacity onPress={OpenCamera}>
              <View style={styles.button}>
                <Image source={images.camera} />
                <Text style={styles.label}>Take a pictute</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={Opengallery}>
              <View style={styles.button}>
                <Image source={images.plus} />
                <Text style={styles.label}>Import a picture</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomCover} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.secondary,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  TopContainer: {
    top: 0,
    height: '25%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    backgroundColor: colors.primary,
    height: '70%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: -200,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 200,
    borderBottomLeftRadius: 20,
  },
  image: {
    width: 350,
    height: 150,
  },
  textOne: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textTwo: {
    color: colors.primary,
    fontSize: 17,
    textAlign: 'center',
  },
  twotexts: {
    marginTop: -10,
  },
  button: {
    padding: 20,
    backgroundColor: colors.secondary,
    width: Dimensions.get('screen').width / 1.3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    height: 80,
    borderRadius: 20,
    marginVertical: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  imagebackground: {
    height: 150,
    width: 250,
    position: 'absolute',
    bottom: -30,
    right: -40,
  },
  bottomCover: {
    width: '100%',
    backgroundColor: 'lime',
    position: 'absolute',
    marginTop: 200,
    bottom: 0,
    borderTopLeftRadius: 400,
  },
});

export default Home;
