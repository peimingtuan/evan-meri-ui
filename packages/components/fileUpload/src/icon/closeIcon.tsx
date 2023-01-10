
import { defineComponent, h } from "vue";


export default defineComponent({
    name: "CloseIcon",
    render() {
        return (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0C3.58214 0 0 3.58214 0 8C0 12.4179 3.58214 16 8 16C12.4179 16 16 12.4179 16 8C16 3.58214 12.4179 0 8 0Z" fill="#1F2429" fill-opacity="0.5"/>
            <mask id="path-2-inside-1_2337_15531" fill="white">
            <rect x="10.8281" y="4.36426" width="1.14286" height="9.14286" rx="0.5" transform="rotate(45 10.8281 4.36426)"/>
            </mask>
            <rect x="10.8281" y="4.36426" width="1.14286" height="9.14286" rx="0.5" transform="rotate(45 10.8281 4.36426)" stroke="white" stroke-width="1.14286" mask="url(#path-2-inside-1_2337_15531)"/>
            <path d="M10.9189 10.8633L10.8179 10.9643L5.05998 5.20643L5.161 5.10541L10.9189 10.8633Z" stroke="white"/>
            </svg>
            
        )
    }
});
