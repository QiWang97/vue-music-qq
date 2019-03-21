const path = require('path');
const express = require('express')
const apiserver = express()
const apiRouter = express.Router()
const axios = require('axios')
apiserver.use('/api', apiRouter)

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: "/",
    // 输出目录
    outputDir: 'dist',
    lintOnSave: true,
    // 是否为生产环境构建生成 source map？
    productionSourceMap: false,
    devServer: {
        before(apiserver) {
            apiserver.get('/apl/getLyric', (req, res) => {
                var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg'
                axios.get(url, {
                    headers: {
                        'Referer': 'https://y.qq.com/portal/player.html'
                    },
                    params: req.query
                }).then(resp => {
                    res.json(resp.data)
                }).catch(e => {
                    console.log('\n \/apl\/getLyric \n')
                    console.log(e)
                })
            })
            apiserver.get('/apl/getSongLists', (req, res) => {
                var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
                axios.get(url, {
                    headers: {
                        'Referer': 'https://y.qq.com/portal/player.html'
                    },
                    params: req.query
                }).then(resp => {
                    res.json(resp.data)
                }).catch(e => {
                    console.log('\n  \/apl\/getSongLists \n')
                    console.log(e)
                })
            })
            apiserver.get('/apl/getSongListInfo', (req, res) => {
                var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
                axios.get(url, {
                    headers: {
                        'Referer': 'https://y.qq.com/portal/player.html'
                    },
                    params: req.query
                }).then(resp => {
                    res.json(resp.data)
                }).catch(e => {
                    console.log('\n  \/apl\/getSongListInfo \n')
                    console.log(e)
                })
            })
            apiserver.get('/apl/searchAlbums', (req, res) => {
                var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
                axios.get(url, {
                    headers: {
                        'Referer': 'https://y.qq.com/m/index.html'
                    },
                    params: req.query
                }).then(resp => {
                    res.json(resp.data)
                }).catch(e => {
                    console.log('\n  \/apl\/searchAlbums \n')
                    console.log(e)
                })
            })
        },
        proxy: {
            '/api': {
                target: 'https://c.y.qq.com',
                changeOrigin: true,
                secure: false,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/apu': {
                target: 'https://u.y.qq.com',
                changeOrigin: true,
                secure: false,
                ws: true,
                pathRewrite: {
                    '^/apu': ''
                }
            }
        }
    },
    // alias 配置
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
        config.module.rules.delete("svg");
        config.module
            .rule('svg-smart')
            .test(/\.svg$/)
            .include
            .add(resolve('src/icons/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: '[name]'
            })
    }
}