import React, {useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

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
  const [showHomePage, setShowHomePage] = useState(false);

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
      <Button title="Prendre Une Photo" />
      <Text>.</Text>
      <Button title="Aller a la Gallery" />
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
});

export default App;
