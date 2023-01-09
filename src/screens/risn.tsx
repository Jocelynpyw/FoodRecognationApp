import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import images from '../constants/images';
import {launchCamera} from 'react-native-image-picker';
import {
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  GestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnnotationFoods = () => {
  const [start, setStart] = useState<{startX: number; startY: number}>({
    startX: 0,
    startY: 0,
  });
  const [end, setEnd] = useState<{endX: number; endY: number}>({
    endX: 0,
    endY: 0,
  });
  const [dimensions, setDimensions] = useState<{
    dimensionsW: number;
    dimensionsH: number;
  }>({
    dimensionsW: 0,
    dimensionsH: 0,
  });
  const onStart = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    const {x, y} = event.nativeEvent;
    setStart({startX: y, startY: x});
  };

  const onPress = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    const {x, y, translationX, translationY} = event.nativeEvent;

    if (start.startX > y || start.startY > x) {
      if (translationX < 0 && translationY < 0) {
        setStart({startX: y});
        setStart({startY: x});
        setDimensions({
          dimensionsW: translationX * -1,
          dimensionsH: translationY * -1,
        });
      } else {
        if (start.startX > y) {
          setStart({startX: y});
          setDimensions({
            dimensionsH: translationY * -1,
            dimensionsW: translationX,
          });
        }
        if (start.startY > x) {
          setStart({startY: x});
          setDimensions({
            dimensionsW: translationX * -1,
            dimensionsH: translationY,
          });
        }
      }
    } else {
      if (translationX < 0 || translationY < 0) {
        if (translationX < 0) {
          setDimensions({
            dimensionsW: translationX * -1,
            dimensionsH: translationY,
          });
        }
        if (translationY < 0) {
          setDimensions({
            dimensionsW: translationX,
            dimensionsH: translationY * -1,
          });
        }
      } else {
        setDimensions({dimensionsW: translationX, dimensionsH: translationY});
      }
    }
  };

  const onEnd = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    const {x, y} = event.nativeEvent;
    setEnd({endX: y, endY: x});
  };
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
  return (
    <PanGestureHandler
      onBegin={onStart}
      onGestureEvent={onPress}
      onEnded={onEnd}>
      <View
        style={{
          position: 'absolute',
          top: start.startX ?? end.endX,
          left: start.startY ?? end.endY,
          width: dimensions.dimensionsW ?? 0,
          height: dimensions.dimensionsH ?? 0,

          borderColor: '#000',
          borderWidth: 4,
          borderRadius: 15,
        }}
      />
    </PanGestureHandler>
    // <SafeAreaView style={styles.container}>
    //   <Text>AnnotationFoods</Text>

    //   <Image source={{uri: cameraPhoto}} style={styles.image} />

    //   <View style={styles.bottomComponent}>
    //     <TouchableOpacity style={styles.pressableContaint} onPress={OpenCamera}>
    //       <Image source={images.camera} />
    //     </TouchableOpacity>
    //   </View>
    // </SafeAreaView>
  );
};

export default AnnotationFoods;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.primary},
  bottomComponent: {
    height: 40,
    width: Dimensions.get('screen').width,
    backgroundColor: colors.secondary,
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressableContaint: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: 'lime',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 500,
    height: 500,
  },
});
