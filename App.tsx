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

const slides = [
  {
    id: 1,
    title: 'Je suis le numero 1',
    description: 'lorem ipsum sit dolor set amet adipiscing elit , sed do',
    image: require('./src/assets/image1.png'),
  },
  {
    id: 2,
    title: 'Je suis le numero 2',
    description: 'lorem ipsum sit dolor set amet adipiscing elit , sed do',
    image: require('./src/assets/image2.png'),
  },
  {
    id: 3,
    title: 'Je suis le numero 3',
    description: 'lorem ipsum sit dolor set amet adipiscing elit , sed do',
    image: require('./src/assets/image3.png'),
  },
];

const App = () => {
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

  const buttonLabel = (label: String) => {
    return (
      <View style={{padding: 12}}>
        <Text style={{color: 'black', fontWeight: '600'}}>{label}</Text>
      </View>
    );
  };

  if (!showHomePage) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 15,
                paddingTop: -100,
              }}>
              <Image
                source={item.image}
                resizeMode="contain"
                style={{height: 300, width: 300}}
              />
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          );
        }}
        activeDotStyle={{backgroundColor: 'black'}}
        showSkipButton
        renderNextButton={() => buttonLabel('Suivant')}
        renderSkipButton={() => buttonLabel('Passer')}
        renderDoneButton={() => buttonLabel('Terminer')}
        onDone={() => {
          setShowHomePage(true);
        }}
      />
    );
  }

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

export default App;
