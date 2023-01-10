import { onMounted } from 'vue';
// 添加标题小动效
const animationTitle = () => {
    onMounted(() => {
        const mainTitle = document.getElementById('main-title')
        mainTitle.addEventListener('mouseenter', () => {
            mainTitle.innerText = 'Merï UI'
        })
        mainTitle.addEventListener('mouseleave', () => {
            mainTitle.innerText = 'Meri Plus'
        })
    })
}

// 最新的版本号
const fetchReleaseTag = () => {
    fetch('https://api.github.com/repos/vitejs/docs-cn/releases/latest')
        .then((res) => res.json())
        .then((json) => {
            const mainTitle = document.getElementById('main-title')
            mainTitle.style.position = 'relative'

            const docsReleaseTag = document.createElement('span')
            docsReleaseTag.classList.add('release-tag')
            const releaseTagName = json.tag_name
            docsReleaseTag.innerText = releaseTagName

            if (releaseTagName !== undefined) {
                mainTitle.appendChild(docsReleaseTag)
            }
        })
}

export {
    animationTitle, fetchReleaseTag
}