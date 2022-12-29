import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Dimensions,
  Pressable,
  ImageBackground,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Home from './Home';
import {colors} from '../constants/colors';
import images from '../constants/images';

const slides = [
  {
    id: 1,
    title: 'Je suis le numero 1',
    description: 'lorem ipsum sit dolor set amet adipiscing elit , sed do',
    image: require('../assets/image11.png'),
  },
  {
    id: 2,
    title: 'Je suis le numero 2',
    description: 'lorem ipsum sit dolor set amet adipiscing elit , sed do',
    image: require('../assets/image12.png'),
  },
  {
    id: 3,
    title: 'Je suis le numero 3',
    description: 'lorem ipsum sit dolor set amet adipiscing elit , sed do',
    image: require('../assets/image13.png'),
  },
];

const Onboarding = () => {
  const [showHomePage, setShowHomePage] = useState(false);

  const buttonLabel = (label: String) => {
    return (
      <View
        style={{
          padding: 12,
          backgroundColor: colors.primary,
          borderRadius: 20,
          minWidth: 90,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: colors.secondary, fontWeight: '600'}}>
          {label}
        </Text>
      </View>
    );
  };

  if (!showHomePage) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({item}) => {
          return (
            <View style={styles.container}>
              <ImageBackground
                style={styles.imagebackground}
                source={images.vegitable}
              />

              <View style={styles.TopContainer}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <View style={styles.bottomContainer} />

              {/* <Text>I am WelcomePage</Text> */}
            </View>
          );
        }}
        activeDotStyle={{backgroundColor: colors.primary}}
        dotStyle={{backgroundColor: '#dcdbdb80'}}
        showSkipButton
        renderNextButton={() => buttonLabel('Next')}
        renderSkipButton={() => buttonLabel('Skip')}
        renderDoneButton={() => buttonLabel('Finish')}
        onDone={() => {
          setShowHomePage(true);
        }}
      />
    );
  }

  return <Home />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: 200,
  },
  TopContainer: {
    backgroundColor: colors.primary,
    top: 0,
    height: '70%',
    width: '100%',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    height: '30%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: 200,
  },
  image: {
    width: 300,
    height: 200,
  },
  title: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  description: {
    color: colors.secondary,
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 10,
  },
  twotexts: {
    marginTop: -10,
  },
  button: {
    padding: 20,
    backgroundColor: colors.primary,
    width: Dimensions.get('screen').width / 1.5,
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
    zIndex: -40,
    opacity: 0.4,
  },
});

export default Onboarding;
