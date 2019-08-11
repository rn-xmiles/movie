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
    const result = [
        {
            name: '轮播图',
            list: banner,
            icon: 'solling',
        },
        {
            name: '电影',
            list: list(0),
            icon: 'film',
        },
        {
            name: '电视剧',
            list: list(1),
            icon: 'tv',
        },
        {
            name: '动漫',
            list: list(2),
            icon: 'gitlab',
        },
        {
            name: '娱乐',
            list: list(3),
            icon: 'anchor',
        },
    ]

    return result
}

interface Params {
    pageSize?: number;
    pageIndex: number;
    Type: string;
    Status?: string;
    Area?: string;
    Plot?: string;
    Year?: string;
    orderBy?: 'addtime' | 'hits' | 'gold';
}

/**
 * 获取电影列表
 *
 * orderBy：'addtime' | 'hits' | 'gold'
 * https://www.kankanwu.com/index.php?s=Showlist-show-id-${Type}-mcid-${Plot}-lz-${Status}-area-${Area}-year-${Year}-letter--order-${orderBy}-picm-1-p-${pageIndex}.html
 * https://www.kankanwu.com/index.php?s=Showlist-show-id-4-mcid-16-lz-2-area-%E5%A4%A7%E9%99%86-year-2018-letter--order-addtime-picm-1-p-1.html
 * https://www.kankanwu.com/index.php?s=Showlist-show-id-3-mcid-59-lz-1-area-%E5%A4%A7%E9%99%86-year-2018-letter--order-hits-picm-1-p-2.html
 * https://www.kankanwu.com/index.php?s=Showlist-show-id-3-mcid-59-lz-2-area-%E5%A4%A7%E9%99%86-year-2018-letter--order-hits-picm-1-p-2.html
 * https://www.kankanwu.com/index.php?s=Showlist-show-id-1-mcid-8-lz--area-%E5%A4%A7%E9%99%86-year-2018-letter--order-addtime-picm-1-p-1.html
 * https://www.kankanwu.com/index.php?s=Showlist-show-id-2-mcid-133-lz-1-area-%E5%A4%A7%E9%99%86-year-2018-letter--order-addtime-picm-1-p-1.html
 * https://m.kankanwu.com/Animation/index_1_______1.html
 * https://m.kankanwu.com/Comedy/index_1_58_2_2018__hits_%E5%A4%A7%E9%99%86_1.html
 * https://m.kankanwu.com/Comedy/index_1_58_2_2018__hits_%E6%97%A5%E6%9C%AC_1.html
 * https://m.kankanwu.com/Comedy/index_1_58__2018__hits_%E5%A4%A7%E9%99%86_1.html
 * https://m.kankanwu.com/Comedy/index_1_28_2_2019__hits_%E5%A4%A7%E9%99%86_1.html
 * https://m.kankanwu.com/${Type}/index_${pageIndex}_${Plot}_${Status}_${Year}__${orderBy}_${Area}_1.html
 * https://m.kankanwu.com/${Type}/index_${pageIndex}_${Plot}__${Year}__${orderBy}_${Area}_1.html
 * const html = await fetch(WEBM+`/${Type}/index_${pageIndex}_${Plot}_${Status}_${Year}__${orderBy}_${Area}_1.html`).then(d=>d.text());
 * @param { Params } params
 */
export const getPageList = async (params: Params) => {
    const mapType = {
        movie: 1,
        tv: 2,
        comic: 3,
        variety: 4,
    }

    const {
        // pageSize = 25,
        pageIndex = 1,
        Type = 'movie',
        Status = '',
        Area = '',
        Plot = '',
        Year = '',
        orderBy = 'hits',
    } = params
    // 网络请求异常捕获
    let response
    try {
        const url =
            WEB +
            `/index.php?s=Showlist-show-id-${
                mapType[Type]
            }-mcid-${Plot}-lz-${Status}-area-${Area}-year-${Year}-letter--order-${orderBy}-picm-1-p-${pageIndex}.html`
        response = await fetch(url)
    } catch (err) {
        return Promise.reject(err)
    }

    const html = await response.text()
    const $ = cheerio.load(html)
    const data = $('#contents li').map((i, el) => {
        const video = $(el).find('a')
        return {
            ID: video.attr('href'),
            Name: video.find('img').attr('alt'),
            MovieTitle: $(el)
                .find('.state')
                .text(),
            Cover: getHref(video.find('img').attr('src'), WEB),
        }
    }).get()

    return data
}
