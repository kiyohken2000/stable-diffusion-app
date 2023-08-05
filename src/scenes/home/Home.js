import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import Button from '../../components/Button'
import { colors, fontSize } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../contexts/UserContext'
import ScreenTemplate from '../../components/ScreenTemplate'
import { showToast } from '../../utils/showToast'
import * as FileSystem from 'expo-file-system';
import * as ExpoStableDiffusion from 'expo-stable-diffusion';

const MODEL_PATH = FileSystem.documentDirectory + "compiled";
const SAVE_PATH = FileSystem.documentDirectory + "GeneratedImages/image.jpeg";

export default function Home() {
  const navigation = useNavigation()
  const { user } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log('user:', user)
    console.log(SAVE_PATH)
  }, [])
  
  const generateImage = async() => {
    try {
      setIsLoading(true)
      console.log('generate image start')
      await ExpoStableDiffusion.loadModel(MODEL_PATH)
      console.log('Model Loaded, Generating Images!')
      await ExpoStableDiffusion.generateImage({
        prompt: "a photo of an astronaut riding a horse on mars",
        stepCount: 25,
        savePath: SAVE_PATH,
      })
      console.log('image generated')

      Alert.alert(`Image Generated: ${SAVE_PATH}`);
    } catch(e) {
      console.log('error', e)
    } finally {
      setIsLoading(false)
    }
  }

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
            label="Generate Image"
            color={colors.lightPurple}
            labelColor={colors.white}
            disable={false}
            onPress={generateImage}
            isLoading={isLoading}
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
