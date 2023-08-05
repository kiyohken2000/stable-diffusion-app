import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import Button from '../../components/Button'
import { colors, fontSize } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../contexts/UserContext'
import ScreenTemplate from '../../components/ScreenTemplate'
import { showToast } from '../../utils/showToast'
import * as FileSystem from 'expo-file-system';
import * as ExpoStableDiffusion from 'expo-stable-diffusion';

const MODEL_PATH = FileSystem.documentDirectory + "Model/stable-diffusion-2-1";
const SAVE_PATH =
  FileSystem.documentDirectory + "GeneratedImages/image.jpeg";

export default function Home() {
  const navigation = useNavigation()
  const { user } = useContext(UserContext)

  useEffect(() => {
    console.log('user:', user)
  }, [])

  useEffect(() => {
    const generateImage = async() => {
      Alert.alert(`Loading Model: ${MODEL_PATH}`);
      await ExpoStableDiffusion.loadModel(MODEL_PATH);
      Alert.alert("Model Loaded, Generating Images!");
      await ExpoStableDiffusion.generateImage({
        prompt: "a photo of an astronaut riding a horse on mars",
        stepCount: 25,
        savePath: SAVE_PATH,
      });

      Alert.alert(`Image Generated: ${SAVE_PATH}`);
    }
    generateImage()
  }, [])

  const onToastPress = () => {
    showToast({title: 'Hello', body: 'React Native Developer'})
  }
  
  return (
    <ScreenTemplate>
      <View style={styles.root}>
        <Text style={styles.title}>Home</Text>
        <View style={styles.textContainer}>
          <Text>ヘッダーなしボトムタブあり</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            label="Go to Details"
            color={colors.darkPurple}
            disable={false}
            labelColor={colors.white}
            onPress={() => {
              navigation.navigate('Details', { from: 'Home' })
            }}
          />
          <View style={{marginVertical: 10}} />
          <Button
            label="Go to Modal"
            color={colors.bluePrimary}
            labelColor={colors.white}
            disable={false}
            onPress={() => {
              navigation.navigate('ModalStack', {
                screen: 'Modal',
                params: {from: 'Home'}
              })
            }}
          />
          <View style={{marginVertical: 10}} />
          <Button
            label="Go to Modal"
            color={colors.lightPurple}
            labelColor={colors.white}
            disable={false}
            onPress={() => {
              navigation.navigate('Post')
            }}
          />
          <View style={{marginVertical: 10}} />
          <Button
            label="Go to Modal"
            color={colors.lightPurple}
            labelColor={colors.white}
            disable={false}
            onPress={() => {
              navigation.navigate('Menu')
            }}
          />
          <View style={{marginVertical: 10}} />
          <Button
            label="Show Toast"
            color={colors.lightPurple}
            labelColor={colors.white}
            disable={false}
            onPress={onToastPress}
          />
        </View>
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.xxxLarge,
    marginBottom: 20,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 10
  }
})
