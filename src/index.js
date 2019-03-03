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

import React, { PureComponent } from 'react'
import { View, Text, Button } from 'react-native'

type Props = {
    navigation: any,
}
export default class Index extends PureComponent<Props> {
    render() {
        return (
            <View>
                <Text>Index</Text>
                <Button title="Learn More" color="#841584" onPress={() => this.props.navigation.toggleDrawer()} />
            </View>
        )
    }
}
