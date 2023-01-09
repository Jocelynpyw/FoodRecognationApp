import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  PermissionsAndroid,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import {
  GestureEvent,
  GestureDetector,
  Gesture,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {launchCamera} from 'react-native-image-picker';
import images from '../constants/images';
import {colors} from '../constants/colors';

const RectangleDraw = ({height, width, x, y, id, name}) => {
  const [clicked, setClicked] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setClicked(prev => !prev)}
      style={{
        position: 'absolute',
        borderWidth: 3,
        borderColor: clicked ? 'yellow' : 'gray',
        top: x,
        left: y,
        width: width,
        height: height,
      }}>
      {name && (
        <Text
          style={{
            backgroundColor: '#fff',
            position: 'absolute',
            top: -25,
            left: 0,
            padding: 2,
            borderRadius: 3,
          }}>
          {name}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export interface IimageAnnotation {
  photo: string;
  label: String;
  x: Number;
  y: Number;
  width: Number;
  height: Number;
}

export default function AnnotationFoods() {
  const start = useSharedValue({x: null, y: null});
  const end = useSharedValue({x: 0, y: 0});
  const dimensions = useSharedValue({w: 0, h: 0});
  const rectangleInfo = useSharedValue({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
    name: '',
  });
  const [modalVisible, setModalVisible] = useState(false);

  const [cameraPhoto, setCameraPhoto] = useState<any>();
  let [annotation, setAnnotation] = useState<IimageAnnotation>({
    photo: '',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    label: '',
  });
  var general: IimageAnnotation[] = [];
  //Image picker launcheCamera Option
  let options = {
    mediaType: 'photo',
    cameraType: 'back',
    // saveToPhotos: true,
  };
  const [showHomePage, setShowHomePage] = useState(false);
  const [save, setSave] = useState(false);
  const [share, setShare] = useState(false);
  const OpenCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setCameraPhoto(result.assets[0].uri);
      setModalVisible(true);
      setAnnotation({photo: result.assets[0].uri});
      setSave(true);
      // console.log('Le set camera contient : ', result.assets[0].uri);
    }
  };
  const OnSavePhoto = () => {
    setAnnotation({
      height: rectangleInfo.value.height,
      width: rectangleInfo.value.width,
      x: rectangleInfo.value.x,
      y: rectangleInfo.value.y,
      label: rectangleInfo.value.name,
    });
    console.log('width is : ', annotation.width);
    console.log('height is : ', annotation.height);
    console.log('x is : ', annotation.x);
    console.log('y is : ', annotation.y);
    console.log('label is : ', annotation.label);
    console.log(`Mon general : ${JSON.stringify(general[0])}`);
    general.push(annotation);
    setShare(true);
  };
  const OnSharePhoto = () => {
    setAnnotation({
      height: rectangleInfo.value.height,
      width: rectangleInfo.value.width,
      x: rectangleInfo.value.x,
      y: rectangleInfo.value.y,
      label: rectangleInfo.value.name,
    });
    console.log("Cette fonctionnalite n'est pas encore disponible ");
  };
  const gesture = Gesture.Pan()
    .onStart(event => {
      const {x, y} = event;
      console.log(x, ' et y ', y);
      start.value = {x: y, y: x};
    })
    .onUpdate(event => {
      const {translationX, translationY, x, y} = event;
      if (start.value.x > y || start.value.y > x) {
        if (translationX < 0 && translationY < 0) {
          start.value = {x: y, y: x};
          dimensions.value = {w: translationX * -1, h: translationY * -1};
        } else {
          if (start.value.x > y) {
            start.value = {...start.value, x: y};
            dimensions.value = {w: translationX, h: translationY * -1};
          }
          if (start.value.y > x) {
            start.value = {...start.value, y: x};
            dimensions.value = {w: translationX * -1, h: translationY};
          }
        }
      } else {
        if (translationX < 0 || translationY < 0) {
          if (translationX < 0) {
            dimensions.value = {w: translationX * -1, h: translationY};
          }
          if (translationY < 0) {
            dimensions.value = {w: translationX, h: translationY * -1};
          }
        } else {
          dimensions.value = {w: translationX, h: translationY};
        }
      }
    })
    .onEnd(event => {
      if (!start.value) return;
      const {x, y} = event;
      end.value = {x: y, y: x};

      rectangleInfo.value = {
        x: start.value.x,
        y: start.value.y,
        width: dimensions.value.w,
        height: dimensions.value.h,
      };
      // runOnJS(() => {});
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      top: start.value?.x ?? end.value?.x,
      left: start.value?.y ?? end.value?.y,
      width: dimensions.value?.w ?? 0,
      height: dimensions.value?.h ?? 0,
      name: annotation.label ?? 'annotation',
    };
  });

  return (
    <View style={{flex: 1}}>
      {modalVisible === false ? (
        <GestureHandlerRootView>
          <GestureDetector gesture={gesture}>
            <Animated.View
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Image source={{uri: cameraPhoto}} style={styles.image} />

              <Animated.View
                style={[
                  {
                    position: 'absolute',
                    borderWidth: 5,
                    borderColor: 'green',
                    backgroundColor: 'transparent',
                  },
                  rStyle,
                ]}
              />
              <RectangleDraw
                height={rectangleInfo.value.height}
                width={rectangleInfo.value.width}
                x={rectangleInfo.value.x}
                y={rectangleInfo.value.y}
                name={rectangleInfo.value.name}
              />
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      ) : (
        <View style={styles.modalView}>
          <View style={styles.modal}>
            <Text>Entrer un Label a votre annotation</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => (rectangleInfo.value = {name: text})}
            />
            <View style={styles.containerbtn}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={styles.textBtn}>Annuler </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnvalid}
                onPress={() => {
                  console.log('Le label est : ', annotation.label);
                  setModalVisible(false);
                }}>
                <Text style={styles.textBtn}>Valider</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {share == false ? (
        <View style={styles.bottomComponent}>
          {save === false ? (
            <TouchableOpacity
              style={styles.pressableContaint}
              onPress={OpenCamera}>
              <Image source={images.camera} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.pressableContaint}
              onPress={OnSavePhoto}>
              <Image style={styles.imageSave} source={images.save} />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.bottomComponent}>
          <TouchableOpacity
            style={styles.pressableContaint}
            onPress={OnSharePhoto}>
            <Image source={images.share} style={styles.imageSave} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

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
    backgroundColor: colors.secondary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height - 100,
  },
  imageSave: {
    height: 30,
    width: 30,
  },
  modalView: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '95%',
    height: 300,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '75%',
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  containerbtn: {
    width: '75%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  btn: {
    backgroundColor: colors.secondary,
    padding: 5,
    width: 120,
    textAlign: 'center ',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 50,
  },
  btnvalid: {
    backgroundColor: 'green',
    padding: 5,
    width: 120,
    textAlign: 'center ',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 50,
  },
  textBtn: {
    color: '#fff',
  },
});
