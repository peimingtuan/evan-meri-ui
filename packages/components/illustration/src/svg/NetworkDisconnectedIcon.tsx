import {defineComponent, PropType, h} from "vue";

const IconProps = {
    size: {
        type: String as PropType<string>,
        default: "normal"
    },
    
} as const;

export default defineComponent({
    name: "NetworkDisconnectedIcon",
    props: IconProps,
    setup(props) {
        return () => {
            let svgDom = props.size === 'small' ?
            <svg width="90" height="76" viewBox="0 0 90 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_12320_58155)">
                <ellipse cx="42.71" cy="33.8043" rx="2.05962" ry="2.33846" fill="#EFF0F1"/>
                <path d="M58.36 17.6481C68.5934 29.5647 67.1026 47.6906 54.9144 58.3163C42.7262 68.9419 24.4421 68.056 13.878 56.4277L58.36 17.6481Z" fill="white" stroke="#1F2429" stroke-width="0.8"/>
                <path d="M57.9399 17.1689C58.4801 17.7805 58.5687 18.8837 58.034 20.5312C57.5084 22.1503 56.4205 24.1628 54.8431 26.4389C51.6918 30.9858 46.6399 36.5088 40.4318 41.9211C34.2237 47.3333 28.0552 51.5922 23.1078 54.1058C20.6313 55.364 18.4814 56.1742 16.7972 56.4816C15.0834 56.7943 13.9939 56.5637 13.4537 55.9521C12.9135 55.3406 12.8248 54.2373 13.3596 52.5899C13.8852 50.9708 14.9731 48.9582 16.5505 46.6822C19.7018 42.1353 24.7537 36.6123 30.9618 31.2C37.1699 25.7878 43.3384 21.5289 48.2858 19.0153C50.7623 17.7571 52.9122 16.9469 54.5964 16.6395C56.3101 16.3268 57.3997 16.5574 57.9399 17.1689Z" fill="#EFF0F1" stroke="#1F2429" stroke-width="0.8"/>
                <path d="M37.3395 36.5664C36.1831 36.5596 33.4884 36.1618 31.9604 34.6248C30.0505 32.7036 27.7281 30.883 27.0495 27.5753C26.2861 23.854 31.1309 23.9339 31.0102 26.8242C30.8636 30.3336 28.0437 31.377 25.2475 30.4039C22.6822 29.5113 19.2806 26.6521 17.6868 22.0484" stroke="#1F2429" stroke-width="0.8" stroke-linecap="round" stroke-dasharray="2 2"/>
                <path d="M18.8459 6.01734C8.78924 6.4104 0.665497 14.5555 0.273598 24.6305C0.258854 25.0094 0.562584 25.3215 0.940919 25.32L2.95232 25.312C3.31326 25.3108 3.60843 25.0227 3.62406 24.6612C3.985 16.3982 10.6302 9.7366 18.8769 9.37487C19.2375 9.35921 19.5248 9.06309 19.5262 8.70165L19.5342 6.68583C19.5354 6.30696 19.224 6.00256 18.8459 6.01734ZM15.3725 21.1494C14.3301 22.1941 14.3301 23.8875 15.3725 24.9322C16.4149 25.9769 18.1046 25.9769 19.147 24.9322C20.1894 23.8875 20.1894 22.1941 19.147 21.1494C18.1046 20.1047 16.4149 20.1047 15.3725 21.1494ZM18.884 12.6896C12.4794 13.0835 7.32367 18.2571 6.93118 24.6686C6.90759 25.0528 7.21338 25.3723 7.59703 25.3696L9.61491 25.3563C9.96641 25.354 10.2631 25.0803 10.2887 24.7283C10.6243 20.1027 14.3384 16.3899 18.9433 16.0548C19.2945 16.0291 19.5678 15.732 19.5699 15.3795L19.5832 13.3572C19.5861 12.9724 19.2667 12.6659 18.884 12.6896Z" fill="#246FE5"/>
                <path d="M11.9415 12.8704L12.3381 12.8212L12.3381 12.8209C12.2978 12.4953 12.0982 12.2329 11.8596 12.0884C11.6256 11.9467 11.2674 11.8766 10.9651 12.1037C10.965 12.1037 10.965 12.1037 10.9649 12.1038L9.20347 13.4262L6.82129 9.80128C6.82128 9.80127 6.82128 9.80126 6.82128 9.80126C6.6055 9.4729 6.24154 9.30184 5.89097 9.37607C5.71569 9.41318 5.55059 9.51305 5.43947 9.67594C5.32787 9.83954 5.29076 10.0367 5.31508 10.2353L5.31511 10.2355L6.13235 16.8729L6.13239 16.8732C6.17266 17.1983 6.37163 17.461 6.61026 17.6057C6.84471 17.748 7.20298 17.8177 7.50555 17.5903L9.26627 16.2669L11.6483 19.8916C11.6483 19.8916 11.6483 19.8916 11.6483 19.8916C11.8641 20.2199 12.2279 20.391 12.5781 20.3177C12.7533 20.281 12.9188 20.1816 13.0303 20.0185C13.1421 19.8549 13.179 19.6577 13.1545 19.4593C13.0059 18.2501 12.8019 16.5905 12.6349 15.2333L12.4239 13.5183L12.361 13.0072L12.344 12.8692L12.3396 12.8334L12.3385 12.8243L12.3382 12.822L12.3381 12.8214L12.3381 12.8212L11.9415 12.8704Z" fill="#246FE5" stroke="white" stroke-width="0.8"/>
                <path d="M65.3649 74.911L56.4716 57.3726L49.3746 62.4562L43.5918 74.911H65.3649Z" fill="#1F2429"/>
                <path d="M0.75 75.2549L8.0335 75.2549M89.25 75.2549L12.7916 75.2549" stroke="#1F2429" stroke-width="0.8" stroke-linecap="round"/>
                <path d="M76.9181 66.4415C76.7499 67.4399 76.3339 68.0709 75.9712 68.4207C75.7774 68.6077 75.7136 68.9458 75.9124 69.1275C77.8868 70.9324 80.6619 70.8605 81.8701 70.5737C84.0254 70.1001 84.569 67.3454 84.369 65.965C84.3563 65.8767 84.3099 65.7981 84.2408 65.7417C83.4621 65.105 81.7771 63.9565 80.4774 63.8397C78.7751 63.6866 77.2276 64.6049 76.9181 66.4415Z" fill="#F55047"/>
                <path d="M85.3733 63.8109C84.601 65.9927 81.0481 70.0808 73.0156 68.9784M73.0156 68.9784C73.4662 68.8061 74.1833 67.7358 74.9465 66.2039C75.7189 64.6536 77.0705 63.6201 79.1945 63.6201C80.7689 63.6201 82.7808 64.8093 83.7902 65.5343C83.9417 65.6431 84.0464 65.8051 84.0688 65.9903C84.2608 67.5809 83.5473 70.527 80.9323 71.0454C79.3232 71.3899 75.4872 71.4588 73.0156 68.9784Z" stroke="#1F2429" stroke-width="0.703448"/>
                </g>
                <defs>
                <clipPath id="clip0_12320_58155">
                <rect width="90" height="76" fill="white"/>
                </clipPath>
                </defs>
            </svg>
            :
            <svg width="120" height="102" viewBox="0 0 120 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_12320_57832)">
                <ellipse cx="56.9464" cy="45.3689" rx="2.74615" ry="3.13846" fill="#EFF0F1"/>
                <path d="M77.8262 23.4937C91.6187 39.5441 89.6472 64.0298 73.308 78.368C56.9687 92.7063 32.4344 91.4806 18.3117 75.72L77.8262 23.4937Z" fill="white" stroke="#1F2429" stroke-width="0.8"/>
                <path d="M77.3549 22.9535C78.1259 23.832 78.2231 25.3776 77.5075 27.5968C76.801 29.7876 75.3424 32.501 73.2357 35.5605C69.0261 41.6745 62.282 49.0951 53.9986 56.3641C45.7153 63.633 37.4815 69.3561 30.8725 72.7359C27.5652 74.4272 24.6854 75.5211 22.4214 75.937C20.128 76.3583 18.6082 76.0611 17.8372 75.1825C17.0662 74.3039 16.969 72.7584 17.6846 70.5392C18.3911 68.3483 19.8497 65.635 21.9563 62.5754C26.166 56.4615 32.9101 49.0408 41.1934 41.7719C49.4768 34.503 57.7106 28.7799 64.3196 25.4001C67.6268 23.7088 70.5067 22.6149 72.7707 22.199C75.064 21.7777 76.5839 22.0749 77.3549 22.9535Z" fill="#EFF0F1" stroke="#1F2429" stroke-width="0.8"/>
                <path d="M49.7864 49.0761C48.2446 49.0669 44.6516 48.533 42.6144 46.4702C40.0678 43.8917 36.9713 41.4483 36.0665 37.009C35.0486 32.0147 41.5083 32.1219 41.3474 36.0009C41.152 40.711 37.3921 42.1113 33.6638 40.8053C30.2435 39.6073 25.708 35.7699 23.5829 29.5913" stroke="#1F2429" stroke-width="0.8" stroke-linecap="round" stroke-dasharray="2 2"/>
                <path d="M25.1281 8.07569C11.7191 8.60321 0.887492 19.5348 0.36496 33.0565C0.345301 33.565 0.750274 33.9838 1.25472 33.9819L3.93659 33.9711C4.41784 33.9696 4.81141 33.5828 4.83225 33.0978C5.3135 22.0079 14.1738 13.0673 25.1694 12.5818C25.6502 12.5608 26.0332 12.1634 26.0351 11.6783L26.0458 8.97287C26.0473 8.46439 25.6321 8.05585 25.1281 8.07569ZM20.4968 28.3846C19.107 29.7867 19.107 32.0594 20.4968 33.4615C21.8867 34.8636 24.1396 34.8636 25.5295 33.4615C26.9194 32.0594 26.9194 29.7867 25.5295 28.3846C24.1396 26.9825 21.8867 26.9825 20.4968 28.3846ZM25.1788 17.0305C16.6394 17.5592 9.76505 24.5027 9.24174 33.1077C9.21028 33.6233 9.61801 34.0521 10.1295 34.0485L12.82 34.0306C13.2887 34.0275 13.6843 33.6602 13.7185 33.1878C14.1659 26.9797 19.118 21.9968 25.2578 21.547C25.7261 21.5125 26.0906 21.1138 26.0933 20.6407L26.111 17.9265C26.115 17.4101 25.6891 16.9988 25.1788 17.0305Z" fill="#246FE5"/>
                <path d="M15.9227 17.273L16.3181 17.2229L16.318 17.2226C16.2699 16.8317 16.031 16.5143 15.7444 16.3396C15.4624 16.1677 15.0472 16.0914 14.7016 16.3527C14.7016 16.3528 14.7015 16.3528 14.7014 16.3529L12.2386 18.214L8.9836 13.2282C8.98359 13.2282 8.98359 13.2282 8.98358 13.2282C8.7219 12.8274 8.28928 12.6296 7.88361 12.716C7.68073 12.7593 7.49145 12.8751 7.3643 13.0627C7.2367 13.251 7.19174 13.4813 7.22083 13.7204L7.22086 13.7206L8.31052 22.6287L8.31055 22.6289C8.3586 23.0195 8.5968 23.3371 8.88348 23.5122C9.16588 23.6846 9.58122 23.7604 9.92715 23.4987L12.3889 21.6362L15.6439 26.6218C15.6439 26.6218 15.6439 26.6218 15.6439 26.6218C15.9055 27.0226 16.338 27.2205 16.7434 27.1351C16.9462 27.0923 17.136 26.977 17.2634 26.7893C17.3912 26.6011 17.4359 26.3708 17.4065 26.132C17.2085 24.509 16.9364 22.2818 16.7138 20.4603L16.4325 18.1585L16.3486 17.4726L16.326 17.2873L16.3201 17.2393L16.3186 17.227L16.3182 17.224L16.3181 17.2232L16.3181 17.223L15.9227 17.273Z" fill="#246FE5" stroke="white" stroke-width="0.8"/>
                <path d="M87.1538 100.538L75.2962 77L65.8334 83.8227L58.123 100.538H87.1538Z" fill="#1F2429"/>
                <path d="M1 101L10.7113 101M119 101L17.0554 101" stroke="#1F2429" stroke-width="0.8" stroke-linecap="round"/>
                <path d="M102.558 89.1717C102.312 90.6423 101.668 91.5188 101.157 91.9546C100.952 92.1287 100.887 92.4608 101.08 92.6474C103.72 95.2022 107.522 95.1092 109.161 94.7176C112.059 94.0764 112.772 90.3205 112.486 88.4845C112.472 88.3966 112.426 88.3187 112.357 88.2619C111.336 87.4139 109.057 85.8384 107.304 85.6798C105.034 85.4744 102.971 86.7068 102.558 89.1717Z" fill="#F55047"/>
                <path d="M113.831 85.6408C112.801 88.569 108.064 94.0556 97.354 92.5761M97.354 92.5761C97.9547 92.3449 98.9109 90.9084 99.9285 88.8524C100.958 86.7718 102.76 85.3848 105.592 85.3848C107.733 85.3848 110.481 87.0448 111.799 88.0111C111.949 88.1211 112.052 88.2819 112.079 88.4661C112.377 90.575 111.451 94.6435 107.91 95.3502C105.764 95.8126 100.649 95.905 97.354 92.5761Z" stroke="#1F2429" stroke-width="0.703448"/>
                </g>
                <defs>
                <clipPath id="clip0_12320_57832">
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
