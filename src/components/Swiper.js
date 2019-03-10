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
import { View, Text, StyleSheet } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'

import Loading from './Loading'

type Props = {
    loading: boolean,
    themeColor: string,
    navigation: NavigationScreenProp,
    data: any,
}

class SwiperConf extends React.Component<Props> {
    render() {
        const { loading, data, navigation, themeColor } = this.props
        if (loading) {
            return <Loading style={styles.item} size="small" themeColor={themeColor} />
        }
    }
}

export default SwiperConf

const styles = StyleSheet.create({
    item: {
        height: 200,
        //margin:5,
        //borderRadius:5,
        overflow: 'hidden',
        backgroundColor: '#f1f1f1',
    },
})
