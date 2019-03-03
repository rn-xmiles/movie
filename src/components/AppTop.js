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
import LinearGradient from 'react-native-linear-gradient'
import { BorderlessButton } from 'react-native-gesture-handler'

interface Props {
    title: String;
    themeColor: Array<String>;
    navigation: NavigationScreenProp;
}

export default class AppTop extends PureComponent<Props> {
    handleOnPress = () => {
        const { navigation } = this.props
        navigation.openDrawer()
    }

    render() {
        const { title, themeColor, children } = this.props
        return (
            <LinearGradient
                colors={themeColor.length > 1 ? themeColor : [...themeColor, ...themeColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.appBar}
            >
                <BorderlessButton activeOpacity={0.8} style={styles.btn} onPress={this.handleOnPress}>
                    <Icon name="menu" size={20} color="#fff" />
                </BorderlessButton>
                <Text style={styles.appTitle} numberOfLines={1}>
                    {title}
                </Text>
                {children || null}
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    appBar: {
        paddingTop: $.STATUS_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
    },

    btn: {
        width: 48,
        height: 48,
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    appTitle: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
})
