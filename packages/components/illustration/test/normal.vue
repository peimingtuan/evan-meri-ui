<template>
    <div :class="{'box': true,'small-box': 1817 > width }">
            <m-illustration title="页面暂无内容" type="noContent" content="这一行是说明文本，也可以没有">
            <template #footer>
                <m-button type="primary">Button</m-button>
            </template>
            </m-illustration>

            <m-illustration title="没有访问权限" type="noAccess" content="这一行是说明文本，也可以没有">
            <template #footer>
                <m-button type="primary">Button</m-button>
            </template>
            </m-illustration>

            <m-illustration title="暂时没有消息" type="noMessage" content="这一行是说明文本，也可以没有">
            <template #footer>
                <m-button type="primary">Button</m-button>
            </template>
            </m-illustration>

            <m-illustration title="网络无法连接" type="networkDisconnected" content="这一行是说明文本，也可以没有">
            <template #footer>
                <m-button type="primary">Button</m-button>
            </template>
            </m-illustration>
            <m-illustration title="搜索无结果" type="noSearchResult" content="这一行是说明文本，也可以没有">
            <template #footer>
                <m-button type="primary">Button</m-button>
            </template>
            </m-illustration>
            <m-illustration title="暂无任何数据" type="noData" content="这一行是说明文本，也可以没有">
            <template #footer>
                <m-button type="primary">Button</m-button>
            </template>
            </m-illustration>
            <m-illustration title="页面加载失败" type="pageLoadFailure" content="这一行是说明文本，也可以没有">
            <template #footer>
                <m-button type="primary">Button</m-button>
            </template>
            </m-illustration>
            <m-illustration title="恭喜，已成功/完成" type="success" content="这一行是说明文本，也可以没有">
            <template #footer>
                <m-button type="primary">Button</m-button>
            </template>
            </m-illustration>
            
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
    setup() {
        let width = window.innerWidth;
        onMounted(() => {
            window.addEventListener('resize', () => {
                width = window.innerWidth;
            })
        }) 
        return {
            width
        }
    },
    
})
</script>

<style lang="less" scoped>
.box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.small-box{
    justify-content: flex-start;
}
.illustration-box{
        margin-bottom: 30px;
        justify-content: space-between;
        width: 300px;
        
}
</style>