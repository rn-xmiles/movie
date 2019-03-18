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
import { NavigationDrawerScreenOptions } from 'react-navigation'

type Props = {}
export default class History extends React.PureComponent<Props> {
    static navigationOptions: NavigationDrawerScreenOptions = {
        drawerLabel: '历史记录',
        drawerIcon: ({ tintColor }) => <Icon name="clock" size={18} color={tintColor} />,
    }
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text>历史记录</Text>
            </View>
        )
    }
}
