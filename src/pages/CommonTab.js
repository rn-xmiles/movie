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
import { View, Text, StyleSheet, NativeModules, InteractionManager, LayoutAnimation } from 'react-native'
import type { /* NavigationDrawerScreenOptions, */ NavigationScreenProp } from 'react-navigation'
import { getPageList } from '../api/index'

import Loading from '../components/Loading'
import MovieList from '../components/MovieList'
import MovieMoreBtn from '../components/details/MovieMoreBtn'

const { UIManager } = NativeModules

type Props = {
    tablabel: string,
    type: string,
    navigation: NavigationScreenProp,
    themeColor: Array<string>,
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

    getData = async () => {
        const data = await getPageList({ pageIndex: 1, /* pageSize: 30, */ Type: this.type })
        if (this.mounted) {
            LayoutAnimation.easeInEaseOut()
            this.setState({
                data,
                isRender: true,
            })
        }
    }

    ListFooterComponent = () => {
        // const { navigation, type, tablabel } = this.props
        return (
            <View style={{ paddingBottom: 10 }}>
                <MovieMoreBtn
                    style={{ marginHorizontal: 5 }}
                    show={true}
                    text="查看更多"
                    onPress={() => console.log('查看更多Press')}
                />
            </View>
        )
    }

    render() {
        const { isRender, data } = this.state
        const { navigation, themeColor, tablabel, type } = this.props
        const movies = {
            name: tablabel,
            icon: type,
            list: data
        }
        return (
            <View style={styles.container}>
                {isRender ? (
                    <MovieList
                        style={{ paddingHorizontal: 5 }}
                        isRender={true}
                        ListFooterComponent={this.ListFooterComponent}
                        data={movies}
                        navigation={navigation}
                        themeColor={themeColor[0]}
                        onEndReached={({ distanceFromEnd }) => {
                            console.log(distanceFromEnd)
                        }}
                    />
                ) : (
                    <Loading size="small" text="正在努力加载中" themeColor={themeColor[0]} />
                )}
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
