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
import { View, Text, StyleSheet, NativeModules, InteractionManager } from 'react-native'

import Loading from '../components/Loading'

const { UIManager } = NativeModules

type Props = {
    tablabel: string,
    type: string,
}
type State = {
    data: Array<any>,
    isRender: boolean,
}

export default class Screen extends React.PureComponent<Props, State> {
    mounted: boolean
    type: string

    constructor(props: Props) {
        super(props)
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
        this.state = {
            data: [],
            isRender: false,
        }

        this.mounted = false
        this.type = ''
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const { type } = this.props
            this.mounted = true
            this.type = type
            this.getData()
        })
    }

    componentWillUnmount() {
        this.mounted = false
    }

    getData = async () => {}

    render() {
        const { tablabel } = this.props
        return (
            <View>
                <Text>{tablabel}</Text>
            </View>
        )
    }
}
