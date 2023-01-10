<template>
    <m-illustration>
        <template #title>
            <div class="title-box">标题</div>
        </template>
        <template #img>
            <svg width="90" height="76" viewBox="0 0 90 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 75.2549L29.2581 75.2549M69 75.2549L31.8387 75.2549" stroke="#1B2129" stroke-width="0.8" stroke-linecap="round"/>
                <ellipse rx="3.52963" ry="3.50884" transform="matrix(0.975218 0.221248 -0.224023 0.974584 15.9862 63.8314)" fill="#F55047"/>
                <path d="M14.2777 63.8977C13.6389 64.0807 12.1081 64.2801 11.095 63.614C9.82855 62.7814 7.60522 62.2159 7.60526 60.22C7.60531 57.9757 10.0333 57.8206 10.2866 59.5572C10.5941 61.666 8.57449 62.3178 6.924 62.1919C5.40987 62.0764 3.21663 60.9278 1.82779 58.4504" stroke="#1B2129" stroke-width="0.8" stroke-linecap="round" stroke-dasharray="1.26 1.26"/>
                <path d="M75.5003 39.7538C75.5003 54.7055 63.2991 66.8307 48.2427 66.8307H31.5594C30.4803 66.8307 29.6055 65.9559 29.6055 64.8769V62.056C29.6055 60.4279 28.9119 58.9091 27.851 57.7219C23.5787 52.941 20.985 46.6486 20.985 39.7538C20.985 24.8021 33.1862 12.6769 48.2427 12.6769C63.2991 12.6769 75.5003 24.8021 75.5003 39.7538Z" fill="#EDF1F5" stroke="#1B2129" stroke-width="0.8"/>
                <ellipse cx="50.9196" cy="40.0492" rx="24.3864" ry="24.227" fill="white"/>
                <ellipse cx="38.239" cy="50.8613" rx="1.76538" ry="1.75385" fill="#1B2129"/>
                <ellipse cx="47.8191" cy="50.8613" rx="1.76538" ry="1.75385" fill="#1B2129"/>
                <ellipse cx="57.658" cy="50.8613" rx="1.76538" ry="1.75385" fill="#1B2129"/>
                <path d="M73.2516 67.8156C66.9141 67.8156 61.7766 62.7117 61.7766 56.4156C61.7766 50.1196 66.9141 45.0156 73.2516 45.0156C79.589 45.0156 84.7266 50.1196 84.7266 56.4156C84.7266 59.0644 83.8173 61.5022 82.2919 63.4377C81.6231 64.2863 81.1499 65.2978 81.1499 66.3783V67.031C81.1499 67.4643 80.7987 67.8156 80.3653 67.8156H73.2516Z" fill="#246FE5"/>
                <path d="M12.9345 16.9536H29.4114C32.0114 16.9536 34.1191 19.0613 34.1191 21.6613V32.1536V32.966C34.1191 34.1689 32.8213 34.9245 31.7752 34.3307L29.3817 32.9719C28.4369 32.4356 27.3692 32.1536 26.2828 32.1536H12.9345C10.3345 32.1536 8.22683 30.0459 8.22683 27.4459V21.6613C8.22683 19.0613 10.3345 16.9536 12.9345 16.9536Z" fill="#1B2129"/>
                <rect x="12.3457" y="21.6309" width="17.6538" height="1.16923" rx="0.584615" fill="white"/>
                <rect x="12.3457" y="26.3076" width="12.9462" height="1.16923" rx="0.584615" fill="white"/>
            </svg>

        </template>
        <template #content>
            <div class="content-box">我是自定义描述<a class="link-text">查看详情</a></div>
        </template>
        <template #footer>
            <m-button type="primary" >按钮</m-button>
        </template>
    
    </m-illustration>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>

<style lang="less" scoped>
.title-box{
    font-size: 14px;
    line-height: 17px;
}
.link-text{
    cursor: pointer;
    margin-left: 5px;
}
</style>