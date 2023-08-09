import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { fontSize, colors } from '../theme';
import FontIcon from 'react-native-vector-icons/FontAwesome5'

const { width } = Dimensions.get('window')

export default function Selector(props) {
  const { current, setCurrent, dataList } = props
  const [visible, setVisible] = useState(false);

  const showMenu = () => setVisible(true);

  const anchor = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => showMenu()}
      >
        <Text style={styles.label}>{current}</Text>
        <FontIcon
          name="chevron-down"
          color={colors.white}
          size={fontSize.large}
          style={{position: 'absolute', right: 10}}
        />
      </TouchableOpacity>
    )
  }

  const onItemPress = (item) => {
    setCurrent(item)
    setVisible(false)
  }

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        anchor={anchor()}
        onRequestClose={() => setVisible(false)}
      >
        {dataList.map((item, i) => {
          return (
            <MenuItem key={i} onPress={() => onItemPress(item)}>{item}</MenuItem>
          )
        })}
      </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  button: {
    paddingVertical: 5,
    paddingLeft: 20,
    backgroundColor: colors.blueSecondary,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.3,
    height: 32
  },
  label: {
    color: '#ffffff',
    fontSize: fontSize.middle,
  }
})