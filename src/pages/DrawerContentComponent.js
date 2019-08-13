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
import { DrawerItems } from 'react-navigation'
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

type Props = {
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
                            {...this.props}
                            onItemPress={() => alert('xxxxx')}
                            drawerPosition="left"
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
