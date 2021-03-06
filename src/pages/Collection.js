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

import React from 'react'
import { View, Text } from 'react-native'
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

export default class Collection extends React.PureComponent<Props> {
    static navigationOptions: NavigationScreenConfig<Options> = {
        drawerLabel: '收藏',
        drawerIcon: ({ tintColor }) => <Icon name="heart" size={18} color={tintColor} />,
    }
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text>收藏</Text>
            </View>
        )
    }
}
