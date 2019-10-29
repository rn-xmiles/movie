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

import React, { createContext, PureComponent } from 'react'
import type { Node } from 'react'
import { ToastAndroid } from 'react-native'
import Storage from './storage'

// 默认初始化的context
export const initialValue = {
    historyList: [],
    collectionList: [],
    settings: {
        allowMobileNetwork: true,
        preLoad: false,
        autoPlayNext: true,
    },
}

// Context
export const Context = createContext<State>(initialValue)

type Props = {
    children: Node,
}
type State = {
    historyList: Array<any>,
    collectionList: Array<any>,
    settings: {
        allowMobileNetwork: boolean,
        preLoad: boolean,
        autoPlayNext: boolean,
    },
}
// 全局状态组件 Context.Provider HOC封装
export default class Provider extends PureComponent<Props, State> {
    state = {
        ...initialValue,
    }

    //
    async componentDidMount() {
        // 载入历史记录
        // 载入收藏
        const [historyList, collectionList] = await Promise.all([
            Storage.get('historyList'),
            Storage.get('collectionList'),
        ])
        this.setState({
            historyList: historyList || [],
            collectionList: collectionList || [],
        })
    }

    componentWillUnmount() {
        //应用关闭时保存设置
        const { settings } = this.state
        Storage.save('settings', settings)
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        // 历史记录更新时候本地持久化保存
        const { historyList, collectionList } = this.state

        // 引用类型不能这样比较！！！
        // @TODO
        if (prevState.historyList !== historyList) {
            Storage.save('historyList', historyList)
        }

        if (prevState.collectionList !== collectionList) {
            Storage.save('collectionList', collectionList)
        }
    }

    // 历史记录初始化
    initHistory = (list: Array<any>) => {
        this.setState({
            historyList: list,
        })
    }

    // 添加历史记录
    addHistory = (item: Object) => {
        const { historyList } = this.state
        this.setState(function (/* state, props */) {
            // 删除相同的历史记录，添加新的
            const index = historyList.findIndex((el) => el.id === item.id)
            if (index >= 0) {
                historyList.splice(index, 1)
            }
            return {
                historyList: [item, ...historyList],
            }
        })
    }

    // 删除历史记录
    removeHistory = (idList: Array<string>): void => {
        const { historyList } = this.state
        const historyList2 = historyList.filter((el) => !idList.some((id) => id === el.id))
        this.setState({ historyList: historyList2 })
    }

    // 查找历史记录
    findHistory = (id: number) => {
        const { historyList } = this.state
        return historyList.find((item) => item.id === id)
    }

    // 初始化收藏
    initCollection = (list: Array<any>) => {
        this.setState({
            collectionList: list,
        })
    }

    // 添加收藏
    addCollection = (item: {}) => {
        this.setState(function (state) {
            return {
                collectionList: [...state.collectionList, item],
            }
        })
    }

    //取消收藏
    removeCollection = (idList: Array<string>): void => {
        const { collectionList } = this.state
        const collectionList2 = collectionList.filter((el) => !idList.some((id) => id === el.id))
        this.setState({
            collectionList: collectionList2,
        })
    }

    // 查找收藏
    findCollection = (id: string | number) => {
        const { collectionList } = this.state
        return collectionList.find((el) => el.id === id)
    }

    // 设置收藏
    setCollection = (item: { [key: string]: any }) => {
        if (this.findCollection(item.id)) {
            this.removeCollection([item.id])
            ToastAndroid && ToastAndroid.show(' ╮(╯﹏╰）╭ 已取消收藏 ', ToastAndroid.SHORT)
        } else {
            this.addCollection(item)
            ToastAndroid && ToastAndroid.show('ヾ(ｏ･ω･)ﾉ 收藏成功', ToastAndroid.SHORT)
        }
    }

    // 初始化设置
    initSettings = (settings: { [key: string]: any }) => {
        this.setState({ settings })
    }

    // 设置settings
    setSettings = (type: string, value: string) => {
        const settings = Object.assign({}, this.state.settings, { [type]: value })
        this.setState({
            settings,
        })
    }

    render() {
        const { historyList, collectionList, settings } = this.state
        return (
            <Context.Provider
                value={{
                    // 历史记录
                    historyList: historyList,
                    // initHistory:this.initHistory,
                    addHistory: this.addHistory,
                    removeHistory: this.removeHistory,
                    findHistory: this.findHistory,
                    // 收藏
                    collectionList: collectionList,
                    // initCollection:this.initCollection,
                    addCollection: this.addCollection,
                    removeCollection: this.removeCollection,
                    findCollection: this.findCollection,
                    setCollection: this.setCollection,
                    // 设置
                    settings: settings,
                    initSettings: this.initSettings,
                    setSettings: this.setSettings,
                }}
            >
                {this.props.children}
            </Context.Provider>
        )
    }
}
