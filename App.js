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
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'

// import { Text, View } from 'react-native'
import {
    createAppContainer,
    createStackNavigator,
    /* createBottomTabNavigator NavigationEvents */
} from 'react-navigation'

// pages/Screen
import ProfileScreen from './src/pages/ProfileScreen'

// StackNavigator config配置
const StackNavigatorConfig = {
    headerMode: 'none',
    mode: 'card',
    cardStyle: {
        //backgroundColor:'red'
    },
    defaultNavigationOptions: {
        gesturesEnabled: false,
    },
    transitionConfig: () => ({
        screenInterpolator: StackViewStyleInterpolator.forHorizontal,
        // screenInterpolator: (sceneProps) => {
        // 	const { scene } = sceneProps;
        // 	const { route } = scene;
        // 	const params = route.params || {};
        // 	const isModal = params.isModal;
        // 	if (isModal){
        // 	  //当为`true`时，采用`modal`效果
        // 	  return StackViewStyleInterpolator.forVertical(sceneProps);
        // 	}else {
        // 	  return StackViewStyleInterpolator.forHorizontal(sceneProps);
        // 	}
        //   },
    }),
}

const AppContainer = createAppContainer(
    createStackNavigator(
        {
            Profile: ProfileScreen,
        },
        StackNavigatorConfig
    )
)

type Props = {}
export default class Movie extends Component<Props> {
    render() {
        return <AppContainer />
    }
}
