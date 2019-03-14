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
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'

type Props = {
    show: boolean,
    text: string,
    themeColor?: string,
    onPress: () => void,
}

export default class MovieMoreBtn extends React.PureComponent<Props> {
    render() {
        const { show, text, onPress, themeColor } = this.props
        if (!show) {
            return null
        }

        return (
            <TouchableNativeFeedback onPress={onPress} background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.btn}>
                    <Text style={[styles.text, { color: themeColor }]}>{text}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        margin: 10,
        height: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        overflow: 'hidden',
    },
    text: {
        fontSize: 14,
        color: '#666',
    },
})
