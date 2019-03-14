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

import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'

import Swiper from 'react-native-swiper'
import Loading from './Loading'

interface MovieCard {
    Name: string;
    Cover: string;
    ID: string;
}

type Props = {
    loading: boolean,
    themeColor: string,
    navigation: NavigationScreenProp,
    data: {
        name: string,
        icon: string,
        list: Array<MovieCard>,
    },
}

class SwiperConf extends React.Component<Props> {
    render() {
        const { loading, data, navigation, themeColor } = this.props
        if (loading) {
            return <Loading style={styles.item} size="small" themeColor={themeColor} />
        }

        return (
            <Swiper
                style={styles.wrap}
                autoplay={true}
                paginationStyle={{ bottom: 30, right: 10, justifyContent: 'flex-end' }}
                dotColor="rgba(252,255,255,.7)"
                dotStyle={{ width: 6, height: 6 }}
                activeDotStyle={{ width: 8, height: 8 }}
                activeDotColor={themeColor}
            >
                {data.list.map((item, index) => (
                    <TouchableOpacity key={index} activeOpacity={0.9} style={styles.item}>
                        <ImageBackground
                            style={styles.bg}
                            resizeMode="cover"
                            blurRadius={5}
                            source={{ uri: item.Cover }}
                        >
                            <Image style={styles.itemImg} source={{ uri: item.Cover }} />
                            <View style={styles.itemInfo}>
                                <Text style={styles.title}>{item.Name}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                ))}
            </Swiper>
        )
    }
}

export default SwiperConf

const styles = StyleSheet.create({
    wrap: {
        height: 200,
    },

    item: {
        height: 200,
        //margin:5,
        //borderRadius:5,
        overflow: 'hidden',
        backgroundColor: '#f1f1f1',
    },
    bg: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },

    itemImg: {
        width: 180,
        height: (180 * 180) / 447,
        borderRadius: 3,
    },

    itemInfo: {
        flex: 1,
        paddingLeft: 10,
    },
    title: {
        marginTop: 10,
        color: '#fff',
        fontSize: 16,
    },
})
