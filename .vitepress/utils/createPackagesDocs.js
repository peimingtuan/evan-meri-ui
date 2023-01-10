/*
 * @Author: wangyongcun
 * @Date: 2021-08-22 11:42:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-26 11:05:34
 * @Description: 创建需要导出组件文件 & 导出所有组件库文档的Sidebar
 */
const fs = require("fs");
const matter = require("gray-matter");
const path = require("path");
const packagesPath = path.join(__dirname, "../../packages/components"); //组件库路径
const packagesDocs = fs.readdirSync(packagesPath); //读取组件下所有的文件
// 组件库侧边栏配置
let packagesNav = {
  text: "组件",
  link: "/packages/components/",
  activeMatch: "^/packages/",
};

let packagesSidebar = [
  {
    text: "全局样式", // 菜单归属0
    children: [],
  },
  {
    text: "数据录入", // 菜单归属1
    children: [],
  },  
  {
    text: "消息提示",
    children: [],
  }, 
  {
    text: "导航",
    children: [],
  }, 
  {
    text: "信息展示",
    children: [],
  }, 
  {
    text: "加载",
    children: [],
  }, 
  // {
  //   text: "未分类",
  //   children: [],
  // }, 
];
// let components = ''; // 需要导出的组件库字符串
// 遍历处理函数
packagesDocs.forEach((docs) => {
  if (docs.indexOf(".") === -1 && docs.indexOf("utils") === -1) {
    const docPath = path.join(packagesPath, docs, "index.md");
    // 设置文档slideBar
    if (fs.existsSync(docPath)) {
      const { componentIndex = 6, text,} = matter.read(docPath).data;
      // 未分类的不进行显示
      if(componentIndex===6)return;
      console.log(matter.read(docPath).data);
      packagesSidebar[componentIndex].children.push({
        text,
        link: `/packages/components/${docs}/`,
      });
      // 导出所有的组件
      // components += `export * from './${docs}'\n`
    }
  }
});
//第一个组件路径为默认
packagesNav.link = packagesSidebar[0].children[0].link;
// 把需要导出的组件库，写入指定文件
// fs.writeFileSync(packagesPath + '/components.ts', components)

exports.packagesNav = packagesNav;
exports.packagesSidebar = packagesSidebar;
