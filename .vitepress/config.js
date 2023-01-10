const pkg = require('../package.json');
const { packagesNav, packagesSidebar } = require('./utils/createPackagesDocs');
const { guideNav, guideSidebar } = require('./utils/createGuideDocs');
module.exports = {
  title: 'Meri Plus',
  lang: 'zh-CN',
  description: 'Vue 3 组件库',
  base: '/meri-plus/',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: './logo.svg' }]],
  themeConfig: {
    repo: pkg.repository,
    logo: './logo.svg',
    docsBranch: 'main',
    // 上次更新时间
    lastUpdated: '最近更新于',
    // 上一个&下一个
    prevLinks: true,
    nextLinks: true,
    // algolia搜索
    algolia: {
      apiKey: 'b573aa848fd57fb47d693b531297403c',
      indexName: 'vitejs',
      searchParameters: {
        facetFilters: ['tags:cn']
      }
    },
    // 广告
    // carbonAds: {
    //   carbon: 'CEBIEK3N',
    //   placement: 'vitejsdev'
    // },
    nav: [
      guideNav,
      packagesNav,
      {
        text: '相关链接',
        items: [
          {
            text: '博锐尚格',
            link: 'http://persagy.com/'
          },
          {
            text: '禹数科技',
            link: 'https://www.ysbdtp.top/home'
          },
          {
            text: 'Coding',
            link: 'https://persagy2021.coding.net/p/zig-web/d/meri-ui/git'
          },
          {
            text: 'meri-design',
            link: 'https://gapmdev.persagy.com/meri-design/'
          },
          {
            text: 'vitepress-demoblock',
            link: 'https://1006008051.github.io/vitepress-demoblock/'
          }
        ]
      }
    ],
    sidebar: {
      '/guide/': guideSidebar,
      '/packages/': packagesSidebar,
    }
  },
}