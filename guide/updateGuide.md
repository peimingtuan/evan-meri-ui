# 更新指南

Meri Plus 遵循 [Semver](https://semver.org/lang/zh-CN/) 语义化版本规范。 

## 发布节奏

- 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
- 次版本号：每月发布一个带有新特性的向下兼容的版本。
- 主版本号：含有破坏性更新和新特性，不在发布周期内。 

## 版本示例

### 1.0.0

- 🌟 Checkbox 支持添加额外属性
- 🌟 RadioGroup 支持全局 size #5690
- 🌟 Table expandedRowKeys 支持 v-model #5695
- 🐞 修复全局 Form message 未生效问题 #5693
- 🐞 修复 Typography 回车键触发两次 end 事件问题，blur 时不再触发 end #5696