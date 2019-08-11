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
import type {
    NavigationDrawerScreenOptions,
    // NavigationNavigatorProps,
    NavigationScreenConfig,
    // NavigationRoute,
    // NavigationScreenProp
} from 'react-navigation'

type Options = NavigationDrawerScreenOptions
type Props = {}

export default class History extends React.PureComponent<Props> {
    static navigationOptions: /* NavigationDrawerScreenOptions */ NavigationScreenConfig<Options> = {
        drawerLabel: '历史记录',
        drawerIcon: ({ tintColor }) => <Icon name="clock" size={18} color={tintColor} />,
    }
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>历史记录</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
})
