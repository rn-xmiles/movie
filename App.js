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

import { /* Text, View */ StatusBar } from 'react-native'
import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation'

import type {
    StackNavigatorConfig as IStackNavigatorConfig, // Interface StackNavigatorConfig 接口
} from 'react-navigation'

import Provider from './store/context'
import Storage from './store/storage'

// pages/Screen
import ProfileScreen from './src/pages/ProfileScreen'
import MovieDetail from './src/pages/MovieDetail'
import Index from './src/index'
import History from './src/pages/History'
import Collection from './src/pages/Collection'
import Theme from './src/pages/Theme'
import Settings from './src/pages/Settings'
import DrawerContentComponent from './src/pages/DrawerContentComponent'

// theme
import { themesGradient } from './src/pages/Theme'

// DrawerNavigator config 配置
const DrawerNavigatorConfig = {
    drawerWidth: $.WIDTH * 0.7,
    // @see https://kmagiera.github.io/react-native-gesture-handler/docs/component-drawer-layout.html
    drawerType: 'back', // slide|back|front
    contentComponent: DrawerContentComponent,
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
            MovieDetail: MovieDetail,
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
        Storage.save('themeColor', {
            themeColor,
        })
    }

    render() {
        const { themeColor } = this.state

        return (
            <Provider>
                <StatusBar translucent={true} backgroundColor="transparent" />
                <AppContainer screenProps={{ themeColor, setTheme: this.setTheme }} />
            </Provider>
        )
    }
}
