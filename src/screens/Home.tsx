import React, {useState} from 'react';
import {
  ImageBackground,
  Pressable,
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
      <ImageBackground
        style={styles.imagebackground}
        source={images.vegitable}
      />

      <View style={styles.TopContainer}>
        <Image source={images.logo_dark} style={styles.image} />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome5
            name="wifi"
            key={123}
            size={20}
            color={colors.secondary}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            <Text style={styles.label}>Get Started</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={styles.label}>Get Started</Text>
          </Pressable>
        </View>
      </View>
      {/* <Text>I am WelcomePage</Text> */}
    </View>
    // <View style={styles.container}>
    //   <Image source={{uri: cameraPhoto}} style={styles.image} />

    //   <Button title="Prendre Une Photo" onPress={OpenCamera} />
    //   <Text>.</Text>
    //   <Button title="Aller a la Gallery" onPress={Opengallery} />
    //   <Text>Je suis jocelyn pyw</Text>
    // </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     marginBottom: 20,
//     width: 180,
//     height: 180,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TopContainer: {
    backgroundColor: colors.secondary,
    top: 0,
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    backgroundColor: colors.primary,
    // backgroundColor: 'lime',
    height: '70%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: -200,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
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
    backgroundColor: 'lime',
    width: Dimensions.get('screen').width / 1.3,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    minHeight: 70,
    borderRadius: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  imagebackground: {
    height: 200,
    width: 300,
    position: 'absolute',
    bottom: -40,
    right: -60,
    // zIndex: -40,
    // opacity: 0.4,
  },
});

export default Home;
