### 贡献指南

感谢你使用 Meri Plus

以下是关于向 Meri Plus 提交反馈或代码的指南。在向 Meri Plus 提交 issue 或者 PR 之前，请先花几分钟时间阅读以下文字。

### Issue 规范

- 遇到问题时，请先确认这个问题是否已经在 issue 中有记录或者已被修复。
- 提 issue 时，请用简短的语言描述遇到的问题，并添加出现问题时的环境和复现步骤。

### 本地开发

在进行本地开发前，请先确保你的开发环境中安装了 [Node.js >= 14][https://nodejs.org/en/]

按照下面的步骤操作，即可在本地开发 Meri Plus 组件。

```sh
# 克隆仓库
git clone git@github.com:persagy/meri-ui.git

# 安装依赖
npm i

# 进入开发模式，浏览器访问 localhost
npm run dev
```

### 代码规范

在编写代码时，请注意：

- 确保代码可以通过仓库的 ESLint 和 Stylelint 校验。
- 确保代码格式是规范的，使用 prettier 进行代码格式化。

### 提交 PR

如果你是第一次在 GitHub 上提 Pull Request ，可以阅读下面这两篇文章来学习：
- [如何优雅地在 GitHub 上贡献代码](https://segmentfault.com/a/1190000000736629)
- [第一次参与开源。](https://zhuanlan.zhihu.com/p/471392827)

### Pull Request 规范
在提交 Pull Request 时，请注意：

- 如果遇到问题，建议保持你的 PR 足够小。保证一个 PR 只解决单个问题、添加单个功能。
- 当新增组件或者修改原有组件时，记得增加或者修改对应的单元测试，保证代码的稳定。
- 在 PR 中请添加合适的描述，并关联相关的 Issue。

### Pull Request 流程

- fork 主仓库，如果已经 fork 过，请同步主仓库的最新代码。
- 基于 fork 后仓库的 dev 分支新建一个分支，比如 feature/button_color。
- 在新分支上进行开发，开发完成后，提 Pull Request 到主仓库的 dev 分支。
- Pull Request 会在 Review 通过后被合并到主仓库。
- 等待meri Plus发布新版本，一般是每周一次。

### 同步最新代码

提 Pull Request 前，请依照下面的流程同步主仓库的最新代码：

```sh
# 添加主仓库到 remote，作为 fork 后仓库的上游仓库
git remote add upstream git@github.com:youzan/vant.git

# 拉取主仓库最新代码
git fetch upstream

# 切换至 dev 分支
git checkout dev

# 合并主仓库代码
git merge upstream/dev
```
