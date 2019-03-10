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
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

type Props = {
    size: 'large' | 'small' | number,
    style: any,
    text: string,
    textColor: string,
    themeColor: string,
}
export default class Loading extends React.PureComponent<Props> {
    static defaultProps = {
        size: 'large',
        textColor: '#666',
        text: '努力加载中...',
        style: {},
    }

    render() {
        const { style, size, text, textColor, themeColor } = this.props
        return (
            <View style={[styles.content, style]}>
                <ActivityIndicator color={themeColor} size={size} />
                <Text style={[styles.loadText, { color: textColor }]}>{text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadText: {
        fontSize: 12,
        margin: 10,
    },
})
