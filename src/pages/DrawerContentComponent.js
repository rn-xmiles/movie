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
import type { Node } from 'react'
import { DrawerItems } from 'react-navigation'
import type { NavigationRoute, NavigationScreenProp, NavigationState } from 'react-navigation'
import { StyleSheet, ScrollView, ImageBackground, Image /* Text, TouchableOpacity, View */ } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Context } from './../../store/context'

const contentOptions = {
    itemsContainerStyle: {
        paddingVertical: 0,
    },
    labelStyle: {
        marginLeft: 0,
        fontSize: 16,
        fontWeight: 'normal',
    },
    itemStyle: {},
}

type _DrawerScene = {
    route: NavigationRoute,
    focused: boolean,
    index: number,
    tintColor?: string,
}
type _DrawerItem = {
    route: NavigationRoute,
    focused: boolean,
}

// 补全contentComponent组件被内部调用时默认传入的props 定义
type Props = {
    navigation: NavigationScreenProp<NavigationState>,
    items: Array<NavigationRoute>,
    activeItemKey?: ?string,
    activeTintColor?: string,
    activeBackgroundColor?: string,
    inactiveTintColor?: string,
    inactiveBackgroundColor?: string,
    getLabel: (scene: _DrawerScene) => ?(Node | string),
    renderIcon: (scene: _DrawerScene) => ?Node,
    onItemPress: (info: _DrawerItem) => void,
    itemsContainerForceInset?: Object,
    itemsContainerStyle?: any,
    itemStyle?: any,
    labelStyle?: any,
    activeLabelStyle?: any,
    inactiveLabelStyle?: any,
    iconContainerStyle?: any,
    drawerPosition: 'left' | 'right',
    screenProps: {
        themeColor: Array<string>,
        setTheme: () => void,
    },
}
export default class DrawerContentComponent extends PureComponent<Props> {
    componentDidMount() {}

    render() {
        const { themeColor } = this.props.screenProps
        return (
            <Context.Consumer>
                {({ historyList: [LatestItem /* 最近一条历史记录 */] }) => (
                    <ScrollView style={{ flex: 1 }}>
                        <ImageBackground
                            source={require('./../img/photo.jpg')}
                            style={[styles.top, { backgroundColor: themeColor[0] }]}
                        >
                            {LatestItem && (
                                <BorderlessButton
                                    style={styles.item}
                                    activeOpacity={0.8}
                                    onPress={() => console.log('Press')}
                                >
                                    {<Image resizeMode="cover" style={styles.cover} source={{ uri: LatestItem.img }} />}
                                </BorderlessButton>
                            )}
                        </ImageBackground>
                        <DrawerItems
                            // DrawerItems 缺少的props 已经在this.props中传递进去了
                            // @see https://github.com/react-navigation/drawer/blob/master/src/views/DrawerSidebar.tsx
                            {...this.props}
                            {...contentOptions}
                            inactiveTintColor="#333"
                            activeTintColor={themeColor[0]}
                        />
                    </ScrollView>
                )}
            </Context.Consumer>
        )
    }
}

const styles = StyleSheet.create({
    top: {
        height: $.WIDTH * 0.7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    cover: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        opacity: 0.5,
    },
    item: {
        width: '100%',
        height: '100%',
    },
})
