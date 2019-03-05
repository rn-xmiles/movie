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
import ScrollViewPager from 'react-native-scrollviewpager'

const tabBarOptions: (t: string) => any = (themeColor) => ({
    style: {
        paddingHorizontal: 10,
        height: 40,
        backgroundColor: '#fff',
    },
    labelStyle: {
        color: '#666',
    },
    activeTintColor: themeColor,
    indicatorStyle: {
        width: 20,
        borderRadius: 4,
        height: 3,
        backgroundColor: themeColor,
        bottom: 2,
    },
})

type Props = {
    themeColor: string,
    children: React.Node,
}

// RPC is RenderProps Component
export default function ScrollViewPagerRPC(props: Props) {
    const { themeColor, children } = props
    return <ScrollViewPager tabBarOptions={tabBarOptions(themeColor)}>{children}</ScrollViewPager>
}
