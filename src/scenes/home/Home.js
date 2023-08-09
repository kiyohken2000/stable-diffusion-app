import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Alert, TextInput, Dimensions } from 'react-native'
import Button from '../../components/Button'
import { colors, fontSize } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../contexts/UserContext'
import ScreenTemplate from '../../components/ScreenTemplate'
import { showToast } from '../../utils/showToast'
import * as FileSystem from 'expo-file-system';
import * as ExpoStableDiffusion from 'expo-stable-diffusion';
import AutoHeightImage from 'react-native-auto-height-image';
import moment from 'moment'
import { calculateElapsedSeconds } from '../../utils/functions'

const MODEL_PATH = FileSystem.documentDirectory + "compiled";
const SAVE_DIR = FileSystem.documentDirectory + "GeneratedImages/"
const IMAGE_NAME = 'image'
const SAVE_PATH = `${SAVE_DIR}${IMAGE_NAME}.jpeg`

const { width } = Dimensions.get('window')

export default function Home() {
  const navigation = useNavigation()
  const { user } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [elapsedSeconds, setElapsedSeconds] = useState('')

  useEffect(() => {
    console.log('user:', user)
  }, [])

  const ensureDirExists = async() => {
    const dirInfo = await FileSystem.getInfoAsync(SAVE_DIR);
    if (!dirInfo.exists) {
      console.log("directory doesn't exist, creating...");
      await FileSystem.makeDirectoryAsync(SAVE_DIR, { intermediates: true });
    }
  }
  
  const generateImage = async() => {
    try {
      setIsLoading(true)
      setResult('')
      const startAt = moment().unix()
      console.log('generate image start')
      await ExpoStableDiffusion.loadModel(MODEL_PATH)
      console.log('Model Loaded, Generating Images!')
      await ensureDirExists()
      await ExpoStableDiffusion.generateImage({
        prompt: text,
        stepCount: 25,
        savePath: SAVE_PATH,
      })
      console.log('image generated')
      const finishAt = moment().unix()
      const elapsed = calculateElapsedSeconds({startAt, finishAt})
      console.log('elapsed', elapsed)
      setElapsedSeconds(elapsed)
      setResult(SAVE_PATH)
    } catch(e) {
      console.log('error', e)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <ScreenTemplate>
      <View style={styles.root}>
        <View style={{flex: 3}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {result?
            <View style={{flex: 1, justifyContent: 'center'}}>
              <AutoHeightImage
                width={width * 0.9}
                source={{ uri: result }}
                defaultSource={require('../../../assets/images/logo-lg.png')}
              />
              <View style={{flex: 0.5, alignItems: 'flex-end'}}>
                <Text>生成にかかった時間: {elapsedSeconds}秒</Text>
              </View>
            </View>
            :
            <Text style={styles.text}>プロンプトを入力してボタンを押してください</Text>
            }
          </View>
        </View>
        <View style={{flex: 1, padding: 5}}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setText(text)}
            placeholder="ここにプロンプトを入力"
            placeholderTextColor={colors.graySecondary}
            multiline={true}
          />
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
  },
  textInput: {
    backgroundColor: 'transparent',
    color: colors.black,
    padding: 5,
    fontSize: fontSize.large,
    borderWidth: 1,
    borderColor: colors.bluePrimary,
    flex: 1,
    borderRadius: 5
  },
  buttonContainer: {
    flex: 0.5,
    paddingHorizontal: 5,
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    color: colors.black,
    fontSize: fontSize.large,
    fontWeight: "bold",
  },
})
