/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 * @author singcl <iambabyer@gmail.com>
 * @see https://github.com/singcl
 */

import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import Icon from 'react-native-vector-icons/Feather'
// import LinearGradient from 'react-native-linear-gradient'
import { BorderlessButton } from 'react-native-gesture-handler'

type Props = {
    title: String,
    themeColor: Array<String>,
    navigation: NavigationScreenProp,
}

export default class AppTop extends PureComponent<Props> {
    handleOnPress = () => {
        const { navigation } = this.props
        navigation.openDrawer()
    }

    render() {
        const { title, themeColor, children } = this.props
        return (
            <View>
                <Text>{title}</Text>
            </View>
        )
    }
}
