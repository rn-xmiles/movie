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

import { AsyncStorage } from 'react-native'

class Storage {
    /**
     * 获取
     */
    static get = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null) {
                return JSON.parse(value)
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }

    /**
     * 保存
     */
    static save = async (key: string, value: string | { [key: string]: any } | Array<any>) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value))
            return true
        } catch (error) {
            // 保存失败
            return false
        }
    }

    /**
     * 更新
     */
    static update = async (key: string, value: string | { [key: string]: any }) => {
        try {
            await AsyncStorage.mergeItem(key, JSON.stringify(value))
            return true
        } catch (error) {
            return false
        }
    }

    /**
     * 删除
     */
    static delete = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key)
            return true
        } catch (error) {
            // 删除失败
            return false
        }
    }
}

export default Storage
