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

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {
    createAppContainer,
    createStackNavigator,
    createBottomTabNavigator /* NavigationEvents */,
} from 'react-navigation'

class ProfileScreen extends Component<{}> {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>Profile Screen</Text>
            </View>
        )
    }
}

const SettingsStack = createStackNavigator(
    {
        Profile: ProfileScreen,
    },
    {
        navigationOptions: {
            tabBarLabel: '设置',
        },
    }
)

const TabNavigator = createBottomTabNavigator({
    Settings: SettingsStack,
})

const AppContainer = createAppContainer(TabNavigator)

type Props = {}
export default class Movie extends Component<Props> {
    render() {
        return <AppContainer />
    }
}
