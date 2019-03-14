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

declare var $: any
interface Props {
    content: string;
}

const MovieEmpty = ({ content }: Props): React.Node => (
    <View style={styles.wrapper}>
        <Text style={styles.content}>{content}</Text>
    </View>
)

export default MovieEmpty

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        height: ($.WIDTH - 40) / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    content: {
        textAlign: 'center',
        fontSize: 14,
        color: '#666',
    },
})
