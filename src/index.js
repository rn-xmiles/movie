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
import { View, Text, Button, StyleSheet } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { NavigationDrawerScreenOptions, NavigationScreenProp } from 'react-navigation'
import Icon from 'react-native-vector-icons/Feather'

import AppTop from './components/AppTop'
import ScrollViewPagerRPC from './components/ScrollViewPager'

import Home from './pages/Home'

type Props = {
    navigation: NavigationScreenProp,
    screenProps: {
        themeColor: Array<string>,
    },
}
export default class Index extends PureComponent<Props> {
    static navigationOptions: NavigationDrawerScreenOptions = {
        drawerLabel: '首页',
        drawerIcon: ({ tintColor }) => <Icon name="home" size={18} color={tintColor} />,
    }
    render() {
        const {
            navigation,
            screenProps: { themeColor },
        } = this.props

        return (
            <View style={styles.container}>
                <AppTop title="影视经典" navigation={navigation} themeColor={themeColor}>
                    <BorderlessButton
                        activeOpacity={0.8}
                        style={styles.btn}
                        onPress={() => navigation.navigate('Search')}
                    >
                        <Icon name="search" size={20} color="#fff" />
                    </BorderlessButton>
                </AppTop>

                <ScrollViewPagerRPC themeColor={themeColor[0]}>
                    <Home themeColor={themeColor} navigation={navigation} />
                </ScrollViewPagerRPC>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },

    btn: {
        width: 48,
        height: 48,
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
