/*
 * @Author: wangyongcun
 * @Date: 2021-08-22 11:42:04
 * @LastEditors: wangyongcun
 * @LastEditTime: 2022-11-11 17:49:44
 * @Description: 导出指引文档的Sidebar
 */
const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');

const guidePath = path.join(__dirname, '../../guide');
const guideDocs = fs.readdirSync(guidePath);

// 组件库侧边栏配置
let guideNav = { text: '指引', link: '/guide/', activeMatch: '^/guide/' };

let guideSidebar = [
    { text: '开发指南', link: '/guide/introduction' },
    { text: '快速上手', link: '/guide/quickstart' },
    // { text: '主题定制', link: '/guide/customTheme' },
    // { text: '内置过度动画', link: '/guide/transitions' },
    { text: '风格指南', link: '/guide/codeStyle' },
    { text: '设计指南', link: '/guide/design' },
    // {
    //     text: '贡献',
    //     link: '/guide/contributionGuide'
    // },
    {
        text: '版本',
        link: '/guide/updateLog'
    }
]

// guideDocs.forEach(docs => {
//     const docPath = path.join(guidePath, docs);
//     const { slideIndex, slideChildrenIndex, text } = matter.read(docPath).data;
//     guideSidebar[slideIndex].children[slideChildrenIndex] = {
//         text,
//         link: `/guide/${docs.replace(/.md/, '')}`
//     };
// });

//第一个组件路径为默认
guideNav.link = guideSidebar[0].link;

exports.guideNav = guideNav;

exports.guideSidebar = guideSidebar;