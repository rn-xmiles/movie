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
const getHref: (string, string) => string = (s, m) => (s.includes('//') ? `https:${s}` : `${m}${s}`)

/**
 * cheerio DOM解析获取数据
 */
const GetHomeData = async () => {
    const html = await fetch(WEB).then((r) => r.text())
    const $ = cheerio.load(html)
    const banner = $('.focusList > li')
        .map((index, element) => ({
            ID: $(element)
                .find('a')
                .attr('href'),
            Name: $(element)
                .find('.sTxt')
                .text(),
            Cover: getHref(
                $(element)
                    .find('img')
                    .attr('src'),
                WEB_M
            ),
        }))
        .get()

    const list = (index: number) => {
        const data = $('.all_tab>.list_tab_img')
            .eq(index)
            .find('li')
            .map((i, elem) => ({
                ID: $(elem)
                    .find('a')
                    .attr('href'),
                Cover: getHref(
                    $(elem)
                        .find('img')
                        .attr('src'),
                    WEB_M
                ),
                Name: $(elem)
                    .find('a')
                    .attr('title'),
                MovieTitle: $(elem)
                    .find('.title')
                    .text(),
                Score: $(elem)
                    .find('.score')
                    .text(),
            }))
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

//
export { GetHomeData }
