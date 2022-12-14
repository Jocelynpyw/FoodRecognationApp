import {StyleSheet, View, Image, Dimensions} from 'react-native';
import React from 'react';
import {colors} from '../constants/colors';

const Splash = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topcontainer} />
      <Image source={require('../assets/Logo.png')} style={styles.image} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  topcontainer: {
    height: Dimensions.get('screen').height / 5,
  },
  image: {
    height: 150,
    width: 350,
  },
});
