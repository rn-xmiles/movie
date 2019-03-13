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
import * as RN from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import Icon from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient'

import Swiper from './../components/Swiper'
import MovieTitle from './../components/MovieTitle'
import MovieList from '../components/MovieList'

import { GetHomeData } from './../api/index'

const { UIManager } = RN.NativeModules

const maps = [
    // {
    //     listType: 'solling',
    //     name: '轮播图',
    //     isRender: true,
    // },
    {
        listType: 'movie',
        name: '电影',
        icon: 'film',
    },
    {
        listType: 'tv',
        name: '电视剧',
        icon: 'tv',
    },
    {
        listType: 'comic',
        name: '动漫',
        icon: 'gitlab',
    },
    {
        listType: 'variety',
        name: '娱乐',
        icon: 'anchor',
    },
]
type Props = {
    navigation: NavigationScreenProp,
    themeColor: string[],
}
type State = {
    loading: boolean,
    data: any,
}
export default class Home extends React.PureComponent<Props, State> {
    mounted: boolean

    constructor(props: Props) {
        super(props)
        this.state = {
            loading: true,
            data: {},
        }
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    componentDidMount() {
        this.mounted = true
        this.getHomeData()
    }

    componentWillUnmount() {
        this.mounted = false
    }

    // 获取首页数据
    getHomeData = async () => {
        let data
        try {
            data = await GetHomeData()
        } catch (err) {
            console.warn(err)
            return
        }

        if (this.mounted) {
            RN.LayoutAnimation.easeInEaseOut()
            this.setState({
                data,
                loading: false,
            })
        }
    }

    render() {
        const { loading, data } = this.state
        const { navigation, themeColor } = this.props
        return (
            <RN.ScrollView style={styles.content}>
                <Swiper
                    loading={loading}
                    navigation={navigation}
                    themeColor={themeColor[0]}
                    data={data.solling && data.solling.list}
                />

                <RN.View style={styles.links}>
                    {maps.map((item, index) => (
                        <RN.TouchableOpacity key={index} style={styles.linkItem}>
                            <LinearGradient
                                colors={themeColor.length > 1 ? themeColor : [...themeColor, ...themeColor]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.linkIcon}
                            >
                                <Icon name={item.icon} color="#fff" size={16} />
                            </LinearGradient>
                            <RN.Text style={styles.linkText}>{item.name}</RN.Text>
                        </RN.TouchableOpacity>
                    ))}
                </RN.View>

                {maps.map((item, index) => (
                    <React.Fragment key={index}>
                        <MovieTitle title={item.name} themeColor={themeColor[0]} icon={item.icon} />
                        <MovieList
                            loading={loading}
                            navigation={navigation}
                            themeColor={themeColor[0]}
                            data={data[item.listType] || {}}
                            style={{ marginTop: -10 }}
                            onEndReached={({ distanceFromEnd }) => {
                                console.log(distanceFromEnd)
                            }}
                        />
                    </React.Fragment>
                ))}
            </RN.ScrollView>
        )
    }
}

const styles = RN.StyleSheet.create({
    content: {
        flex: 1,
    },

    links: {
        borderRadius: 5,
        backgroundColor: '#fff',
        overflow: 'hidden',
        marginHorizontal: 10,
        padding: 10,
        marginTop: -25,
        flexDirection: 'row',
    },

    linkItem: {
        flex: 1,
        alignItems: 'center',
    },

    linkIcon: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    linkText: {
        marginTop: 5,
        fontSize: 12,
    },
})
