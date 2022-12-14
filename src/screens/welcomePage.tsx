import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {colors} from '../constants/colors';
import images from '../constants/images';

const WelcomePage = (props: any) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imagebackground}
        source={images.vegitable}
      />

      <View style={styles.TopContainer}>
        <Image source={images.logo} style={styles.image} />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.textOne}>Identify the food in your dishes</Text>
        <View style={styles.twotexts}>
          <Text style={styles.textTwo}>The most sensible way to </Text>
          <Text style={styles.textTwo}>Find foods your dishes</Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('Onboarding');
          }}>
          <Text style={styles.label}>Get Started</Text>
        </Pressable>
      </View>
      {/* <Text>I am WelcomePage</Text> */}
    </View>
  );
};

export default WelcomePage;

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
    height: '55%',
    width: '100%',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    // backgroundColor: 'lime',
    height: '45%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    // justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 200,
  },
  image: {
    width: 350,
    height: 250,
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
