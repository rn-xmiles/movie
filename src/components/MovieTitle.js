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
import Icon from 'react-native-vector-icons/Feather'

interface Props {
    icon: string;
    title: string;
    themeColor: string;
}
function MovieTitle(props: Props): React.Node {
    const { title, icon, themeColor } = props
    return (
        <View style={styles.wrapper}>
            <Icon name={icon} size={16} color={themeColor} />
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default MovieTitle

const styles = StyleSheet.create({
    wrapper: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },

    title: {
        flex: 1,
        marginLeft: 5,
        fontSize: 16,
        color: '#333',
    },
})
