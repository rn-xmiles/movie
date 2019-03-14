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
import { View, StyleSheet, FlatList, NativeModules } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'

import Loading from './Loading'
import MovieEmpty from './details/MovieEmpty'
import MovieItem from './details/MovieItem'

const { UIManager } = NativeModules

declare var $: any

interface MovieCard {
    Name: string;
    Cover: string;
    ID: string;
}

interface Props {
    loading: boolean;
    navigation: NavigationScreenProp;
    themeColor: string;
    style: {
        marginTop: number,
    };
    data: {
        name: string,
        list: Array<MovieCard>,
        icon: string,
    };
    onEndReached: (info: { distanceFromEnd: number }) => void;
}

export default class MovieList extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    render() {
        const { data, loading, themeColor, style, navigation, onEndReached } = this.props
        const { /* name,  */ list = [] } = data
        const height = ($.WIDTH - 40) / 2 + 40

        if (loading) {
            return <Loading style={{ height: 100 }} size="small" text="" themeColor={themeColor} />
        }

        if (list.length === 0) {
            return <MovieEmpty content="空空如也~~" />
        }

        return (
            <FlatList
                style={[styles.wrapper, style]}
                numColumns={3}
                data={list}
                renderItem={({ item }) => <MovieItem item={item} navigation={navigation} />}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.1}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                keyExtractor={(item) => item.ID.toString()}
                getItemLayout={(data, index) => ({ length: height, offset: height * index, index })}
                // ListFooterComponent={this.renderFooter}
            />
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 5,
        paddingTop: 10,
    },
})
