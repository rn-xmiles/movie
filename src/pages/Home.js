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
import type {
    // NavigationDrawerScreenOptions,
    // NavigationNavigatorProps,
    // NavigationScreenConfig,
    NavigationRoute,
    NavigationScreenProp
} from 'react-navigation'
import Icon from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient'

import Swiper from './../components/Swiper'
import MovieTitle from './../components/MovieTitle'
import MovieList from '../components/MovieList'
import MovieMoreBtn from '../components/details/MovieMoreBtn'

import { GetHomeData } from './../api/index'

const { UIManager } = RN.NativeModules
type Props = {
    navigation: NavigationScreenProp<NavigationRoute>,
    themeColor: string[],
}

interface MovieCard {
    Name: string;
    Cover: string;
    ID: string;
}
interface State {
    loading: boolean;

    data: Array<{
        name: string,
        icon: string,
        list: Array<MovieCard>,
    }>;
}
export default class Home extends React.PureComponent<Props, State> {
    mounted: boolean

    constructor(props: Props) {
        super(props)
        this.state = {
            loading: true,
            data: [],
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

        const banner = data[0]
        const movies = data.slice(1, data.length)

        return (
            <RN.ScrollView style={styles.content}>
                <Swiper loading={loading} navigation={navigation} themeColor={themeColor[0]} data={banner} />

                <RN.View style={styles.links}>
                    {movies.map((item, index) => (
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

                {movies.map((item, index) => (
                    <React.Fragment key={index}>
                        <MovieTitle title={item.name} themeColor={themeColor[0]} icon={item.icon} />
                        <MovieList
                            loading={loading}
                            navigation={navigation}
                            themeColor={themeColor[0]}
                            data={item}
                            style={{ marginTop: -10 }}
                            onEndReached={({ distanceFromEnd }) => {
                                console.log(distanceFromEnd)
                            }}
                        />
                        <MovieMoreBtn
                            show={!loading}
                            text={`查看更多${item.name}`}
                            onPress={() => console.log('查看更多Press')}
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
