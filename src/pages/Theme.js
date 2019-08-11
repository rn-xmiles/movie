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

export const themes = [
    {
        color: ['#db4437'],
        name: '姨妈红',
    },
    {
        color: ['#0f9d58'],
        name: '酷安绿',
    },
    {
        color: ['#fb7299'],
        name: '哔哩粉',
    },
    {
        color: ['#3f51b5'],
        name: '颐堤蓝',
    },
    {
        color: ['#009688'],
        name: '水鸭青',
    },
    {
        color: ['#ff9800'],
        name: '伊藤橙',
    },
    {
        color: ['#673ab7'],
        name: '基佬紫',
    },
    {
        color: ['#2196f3'],
        name: '知乎蓝',
    },
    {
        color: ['#795548'],
        name: '古铜棕',
    },
    {
        color: ['#607d8b'],
        name: '低调灰',
    },
    {
        color: ['#212121'],
        name: '暮夜黑',
    },
]

export const themesGradient: Array<{ color: Array<string> }> = [
    {
        color: ['#ff5858', '#f09819'],
    },
    {
        color: ['#8fd3f4', '#84fab0'],
    },
    {
        color: ['#f5576c', '#f093fb'],
    },
    {
        color: ['#4facfe', '#00f2fe'],
    },
    {
        color: ['#fa709a', '#fee140'],
    },
    {
        color: ['#667eea', '#764ba2'],
    },
    {
        color: ['#ff0844', '#ffb199'],
    },
    {
        color: ['#b721ff', '#21d4fd'],
    },
    {
        color: ['#09203f', '#537895'],
    },
    {
        color: ['#16a085', '#f4d03f'],
    },
]

export default class Theme extends React.PureComponent<Props> {
    static navigationOptions: NavigationScreenConfig<Options> = {
        drawerLabel: '主题',
        drawerIcon: ({ tintColor }) => <Icon name="feather" size={18} color={tintColor} />,
    }
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text>主题</Text>
            </View>
        )
    }
}
