import {defineComponent, PropType, h} from "vue";

const IconProps = {
    size: {
        type: String as PropType<string>,
        default: "normal"
    },
    
} as const;
export default defineComponent({
    name: "PageLoadFailureIcon",
    props: IconProps,
    setup(props) {
        return () => {
            let svgDom = props.size === 'small' ?
            <svg width="90" height="76" viewBox="0 0 90 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_12821_122405)">
                <path d="M0.75 12.9517C2.32499 16.082 9.5431 19.9402 14.0158 11.5102C20.8713 -1.41058 26.6995 13.1348 32.6983 11.5102" stroke="#1F2429" stroke-width="0.603333" stroke-dasharray="1.18 1.18"/>
                <ellipse cx="7.49118" cy="11.4953" rx="2.05172" ry="2.03831" fill="#F55047"/>
                <ellipse cx="21.5605" cy="11.4953" rx="2.05172" ry="2.03831" fill="#F55047"/>
                <ellipse cx="14.5258" cy="11.4953" rx="2.05172" ry="2.03831" fill="#F55047"/>
                <path d="M31.3716 45.7071L31.2414 45.9533L31.4268 46.1605L45.8849 62.3196L33.8486 73.4144L9.37822 70.6868C7.00939 70.4227 5.30591 68.2887 5.5734 65.9202L10.1501 25.3967C10.4175 23.0283 12.5547 21.3223 14.9235 21.5864L42.5055 24.6609L31.3716 45.7071Z" fill="white" stroke="#1F2429" stroke-width="0.8"/>
                <path d="M30.7354 45.7173L42.997 24.2471L25.1552 45.6633L41.0593 62.2877L33.5103 73.7131L47.0322 62.3455L30.7354 45.7173Z" fill="#EFF0F1"/>
                <path d="M31.3716 45.7071L31.2414 45.9533L31.4268 46.1605L45.8849 62.3196L33.8486 73.4144L19.3608 71.7995L9.37822 70.6868C7.00939 70.4227 5.30591 68.2887 5.5734 65.9202L10.1501 25.3967C10.4175 23.0283 12.5547 21.3223 14.9235 21.5864L42.5055 24.6609L31.3716 45.7071Z" stroke="#1F2429" stroke-width="0.8"/>
                <path d="M57.015 60.5858L57.2564 60.7996L57.0994 61.0804L50.1268 73.549L79.7179 69.7495C82.0172 69.4543 83.6181 67.3236 83.2617 65.0331L76.9462 24.4478C76.597 22.2041 74.4995 20.6608 72.2534 20.9952L47.4818 24.6834L40.2859 45.7725L57.015 60.5858Z" fill="white" stroke="#1F2429" stroke-width="0.8"/>
                <path d="M19.5949 40.4389L33.1509 41.9179M19.5949 50.4225L36.4484 51.9015M18.1294 60.0363L45.6078 62.6246M41.2113 43.0272L67.957 39.3296M47.4397 51.9015L69.7889 49.3132M56.9656 61.1456L70.888 58.927" stroke="#1F2429" stroke-width="0.8" stroke-dasharray="0.94 0.94"/>
                <path d="M14.9346 21.4892L42.66 24.5796L38.7098 32.0464L9.62483 29.1716L10.0523 25.3863C10.3259 22.9639 12.5118 21.2191 14.9346 21.4892Z" fill="#1F2429" stroke="#1F2429" stroke-width="0.603333"/>
                <path d="M72.051 20.926L47.408 24.595L44.8777 32.0105L77.6114 28.0832L77.0726 24.6205C76.6989 22.2195 74.4544 20.5681 72.051 20.926Z" fill="#1F2429" stroke="#1F2429" stroke-width="0.603333"/>
                <ellipse cx="15.7847" cy="25.6237" rx="1.17241" ry="1.16475" fill="white"/>
                <ellipse cx="20.4742" cy="26.2087" rx="1.17241" ry="1.16475" fill="white"/>
                <ellipse cx="25.1641" cy="26.7902" rx="1.17241" ry="1.16475" fill="white"/>
                <circle cx="76.587" cy="60.1255" r="13.5577" fill="#246FE5"/>
                <path d="M75.4532 54.4175C75.4283 53.6707 76.027 53.0518 76.7742 53.0518C77.5199 53.0518 78.1179 53.6683 78.0952 54.4136L77.8359 62.9431C77.8313 63.0953 77.7712 63.2406 77.667 63.3516C77.5489 63.4774 77.3841 63.5488 77.2116 63.5488H76.3018C76.168 63.5488 76.0386 63.5011 75.9368 63.4143C75.8164 63.3116 75.7447 63.163 75.7395 63.0048L75.4532 54.4175Z" fill="white"/>
                <path d="M75.4814 66.2577C75.4814 66.6636 75.6328 67.053 75.9023 67.34C76.1717 67.6271 76.5372 67.7883 76.9182 67.7883C77.2993 67.7883 77.6648 67.6271 77.9342 67.34C78.2037 67.053 78.355 66.6636 78.355 66.2577C78.355 65.8517 78.2037 65.4624 77.9342 65.1753C77.6648 64.8883 77.2993 64.727 76.9182 64.727C76.5372 64.727 76.1717 64.8883 75.9023 65.1753C75.6328 65.4624 75.4814 65.8517 75.4814 66.2577Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_12821_122405">
                <rect width="90" height="76" fill="white"/>
                </clipPath>
                </defs>
            </svg>

            :
            <svg width="120" height="102" viewBox="0 0 120 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_12320_57923)">
                <path d="M1 17.3828C3.09998 21.5841 12.7241 26.7621 18.6877 15.4483C27.8284 -1.89282 35.5993 17.6286 43.5977 15.4483" stroke="#1F2429" stroke-width="0.8" stroke-dasharray="1.56 1.56"/>
                <circle cx="9.98856" cy="15.429" r="2.73563" fill="#F55047"/>
                <circle cx="28.7474" cy="15.429" r="2.73563" fill="#F55047"/>
                <circle cx="19.368" cy="15.429" r="2.73563" fill="#F55047"/>
                <path d="M41.9457 61.4087L41.8169 61.6537L42.0008 61.8606L61.3682 83.6489L45.1755 98.6732L12.4535 95.0018C9.24123 94.6414 6.92932 91.7451 7.28974 88.5328L13.4088 33.9958C13.7692 30.7835 16.6655 28.4716 19.8778 28.832L56.8846 32.9842L41.9457 61.4087Z" fill="white" stroke="#1F2429" stroke-width="0.8"/>
                <path d="M40.9802 61.359L57.329 32.5438L33.5399 61.2865L54.7454 83.5982L44.68 98.9323L62.7093 83.6758L40.9802 61.359Z" fill="#EFF0F1"/>
                <path d="M41.9457 61.4087L41.8169 61.6537L42.0008 61.8606L61.3682 83.6489L45.1755 98.6732L12.2022 94.9736C9.12872 94.6287 6.91669 91.8576 7.26154 88.7841L13.437 33.7445C13.7818 30.671 16.553 28.459 19.6265 28.8038L56.8846 32.9842L41.9457 61.4087Z" stroke="#1F2429" stroke-width="0.8"/>
                <path d="M75.9326 81.4146L76.1716 81.6276L76.0162 81.9075L66.5871 98.8798L106.342 93.7417C109.463 93.3383 111.639 90.4427 111.158 87.3323L102.716 32.7194C102.245 29.6729 99.4 27.5799 96.3513 28.0368L63.2091 33.0037L53.5586 61.4726L75.9326 81.4146Z" fill="white" stroke="#1F2429" stroke-width="0.8"/>
                <path d="M26.1259 54.2734L44.2006 56.2585M26.1259 67.6725L48.5972 69.6575M24.1719 80.5752L60.8098 84.049M54.9477 57.7473L90.6087 52.7847M63.2523 69.6575L93.0512 66.1837M75.9535 82.064L94.5167 79.0864" stroke="#1F2429" stroke-width="0.8" stroke-dasharray="1.25 1.25"/>
                <path d="M19.8778 28.832L56.8846 32.9842L51.613 43.0146L12.8298 39.1559L13.4088 33.9958C13.7692 30.7835 16.6655 28.4716 19.8778 28.832Z" fill="#1F2429" stroke="#1F2429" stroke-width="0.8"/>
                <path d="M96.1024 28.0741L63.2091 33.0037L59.832 42.9662L103.485 37.6944L102.754 32.9682C102.262 29.7841 99.2887 27.5966 96.1024 28.0741Z" fill="#1F2429" stroke="#1F2429" stroke-width="0.8"/>
                <circle cx="21.0461" cy="34.3909" r="1.56322" fill="white"/>
                <circle cx="27.2986" cy="35.1726" r="1.56322" fill="white"/>
                <circle cx="33.5515" cy="35.9538" r="1.56322" fill="white"/>
                <circle cx="101.552" cy="79.7241" r="17.977" fill="#246FE5"/>
                <path d="M99.9883 70.3447H103.607L103.198 83.7736H102.739V84.2634H100.899V83.8714H100.439L99.9883 70.3447Z" fill="white"/>
                <path d="M100.086 87.8553C100.086 88.3936 100.287 88.9099 100.644 89.2905C101.001 89.6711 101.486 89.885 101.991 89.885C102.496 89.885 102.981 89.6711 103.338 89.2905C103.696 88.9099 103.896 88.3936 103.896 87.8553C103.896 87.3171 103.696 86.8008 103.338 86.4202C102.981 86.0396 102.496 85.8257 101.991 85.8257C101.486 85.8257 101.001 86.0396 100.644 86.4202C100.287 86.8008 100.086 87.3171 100.086 87.8553Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_12320_57923">
                <rect width="120" height="102" fill="white"/>
                </clipPath>
                </defs>
            </svg>
            return (
                <span>
                    {svgDom}
                </span>
                

            )
        }
    }
});
