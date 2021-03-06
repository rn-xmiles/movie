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

// import React, { PureComponent } from 'react'
import * as React from 'react'
import type { Node } from 'react'
import { /* View, */ Text, StyleSheet } from 'react-native'
// Announcing Import Type @see: https://flow.org/blog/2015/02/18/Import-Types/
import type { NavigationScreenProp, NavigationRoute } from 'react-navigation'
import Icon from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient'
import { BorderlessButton } from 'react-native-gesture-handler'

declare var $: any
type Props = {
    title: string,
    themeColor: Array<string>,
    navigation: NavigationScreenProp<NavigationRoute>,
    children: Node,
}

export default class AppTop extends React.PureComponent<Props> {
    handleOnPress = () => {
        const { navigation } = this.props
        // openDrawer 是一个可选属性 openDrawer?: () => boolean
        // 即类型为 void | (() => boolean)
        // 所以这个先过滤void 不然flow 类型检测会不通过
        navigation.openDrawer && navigation.openDrawer()
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
        // textAlign: 'center',
    },
})
