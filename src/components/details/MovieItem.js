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
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import type { NavigationScreenProp, NavigationRoute } from 'react-navigation'

declare var $: any

interface Props {
    item: {
        Name: string,
        Cover: string,
        ID: string,
    };
    navigation: NavigationScreenProp<NavigationRoute>;
}

const MovieItem = ({ item, /* navigation */ }: Props): React.Node => (
    <TouchableOpacity style={styles.wrapper}>
        <Image style={styles.movieImg} source={{ uri: item.Cover || 'http' }} />
        <View style={styles.movieText}>
            <Text numberOfLines={1} style={styles.movieName}>
                {item.Name}
            </Text>
        </View>
    </TouchableOpacity>
)

export default MovieItem

const styles = StyleSheet.create({
    wrapper: {
        width: ($.WIDTH - 40) / 3,
        marginHorizontal: 5,
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: '#fff',
        //marginTop:10,
    },

    movieImg: {
        width: '100%',
        height: ($.WIDTH - 40) / 2,
        flex: 1,
        backgroundColor: '#f1f1f1',
        resizeMode: 'cover',
    },

    movieText: {
        alignItems: 'center',
        height: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
    },

    movieName: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        flex: 1,
    },
})
