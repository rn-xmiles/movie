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
import cheerio from 'cheerio'

const WEB_M = 'https://m.kankanwu.com'
const WEB = 'https://www.kankanwu.com'

/**
 * 格式化href
 * @param {String} s 图片的src值
 * @param {String} m 常量 WEB_M
 */
const getHref: (s: string, m: string) => string = (s, m) => (s.includes('//') ? `https:${s}` : `${m}${s}`)

/**
 * cheerio DOM解析获取数据
 */
export const GetHomeData = async () => {
    let response

    // 网络请求异常捕获
    try {
        response = await fetch(WEB_M)
    } catch (err) {
        return Promise.reject(err)
    }

    const html = await response.text()
    const $ = cheerio.load(html)
    const banner = $('.focusList>li')
        .map((i, item) => {
            return {
                ID: $(item)
                    .find('a')
                    .attr('href'),
                Cover: getHref(
                    $(item)
                        .find('img')
                        .attr('src'),
                    WEB_M
                ),
                Name: $(item)
                    .find('.sTxt')
                    .text(),
            }
        })
        .get()

    const list = (index) => {
        const data = $('.all_tab>.list_tab_img')
            .eq(index)
            .find('li')
            .map((i, item) => {
                return {
                    ID: $(item)
                        .find('a')
                        .attr('href'),
                    Cover: getHref(
                        $(item)
                            .find('img')
                            .attr('src'),
                        WEB_M
                    ),
                    Name: $(item)
                        .find('a')
                        .attr('title'),
                    MovieTitle: $(item)
                        .find('.title')
                        .text(),
                    Score: $(item)
                        .find('.score')
                        .text(),
                }
            })
            .get()
        return data
    }

    // 最终数据
    const result = {
        solling: {
            name: '轮播图',
            list: banner,
        },
        movie: {
            name: '电影',
            list: list(0),
        },
        tv: {
            name: '电视剧',
            list: list(1),
        },
        comic: {
            name: '动漫',
            list: list(2),
        },
        variety: {
            name: '娱乐',
            list: list(3),
        },
    }
    return result
}
