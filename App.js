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

declare var $: any

// 配置全局变量
import './utils/global'

import React, { Component } from 'react'
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'

// import { Text, View } from 'react-native'
import {
    createAppContainer,
    createStackNavigator,
    createDrawerNavigator,
    StackNavigatorConfig as IStackNavigatorConfig, // Interface StackNavigatorConfig 接口
    DrawerNavigatorConfig as IDrawerNavigatorConfig, // Interface DrawerNavigatorConfig 接口
} from 'react-navigation'

// pages/Screen
import ProfileScreen from './src/pages/ProfileScreen'
import Index from './src/index'
import History from './src/pages/History'
import Collection from './src/pages/Collection'
import Theme from './src/pages/Theme'
import Settings from './src/pages/Settings'

// theme
import { themesGradient } from './src/pages/Theme'

// DrawerNavigator config 配置
const DrawerNavigatorConfig: IDrawerNavigatorConfig = {
    drawerWidth: $.WIDTH * 0.7,
}

const Drawer = createDrawerNavigator(
    {
        Index: Index, // 首页
        History: History, // 历史记录
        Collection: Collection, // 收藏
        Theme: Theme, // 主题
        Settings: Settings, // 设置
    },
    DrawerNavigatorConfig
)

// StackNavigator config配置
const StackNavigatorConfig: IStackNavigatorConfig = {
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
            Drawer: Drawer,
            Profile: ProfileScreen,
        },
        StackNavigatorConfig
    )
)

type Props = {}
type State = { themeColor: Array<string> }
export default class Movie extends Component<Props, State> {
    state = {
        themeColor: themesGradient[0].color,
    }

    setTheme = (themeColor: Array<string>): void => {
        this.setState({
            themeColor,
        })
    }

    render() {
        const { themeColor } = this.state

        return <AppContainer screenProps={{ themeColor, setTheme: this.setTheme }} />
    }
}
