import { defineComponent, h, ref, PropType, computed } from 'vue';
import { Disabled } from '../../utils/types';
import illustrationProps from "./IllustrationProps"

import NocontentIcon from './svg/NoContentIcon'
import NoAccessIcon from './svg/NoAccessIcon'
import NoMessageIcon from './svg/NoMessageIcon'
import NetworkDisconnectedIcon from './svg/NetworkDisconnectedIcon'
import NoSearchResultIcon from './svg/NoSearchResultIcon'
import NoDataIcon from './svg/NoDataIcon'
import PageLoadFailureIcon from './svg/PageLoadFailureIcon'
import SuccessIcon from './svg/SuccessIcon'

const iconRenderMap = {
    noContent: (size:any) => <NocontentIcon size={size}/>,
    noAccess: (size:any) => <NoAccessIcon size={size}/>,
    noMessage: (size:any) => <NoMessageIcon size={size} />,
    networkDisconnected: (size:any) => <NetworkDisconnectedIcon size={size}/>,
    noSearchResult: (size:any) => <NoSearchResultIcon size={size}/>,
    noData: (size:any) => <NoDataIcon size={size} />,
    pageLoadFailure: (size:any) => <PageLoadFailureIcon size={size}/>,
    success: (size:any) => <SuccessIcon size={size} />
}
const Illustration = defineComponent({
    name: "Illustration",
    props: illustrationProps,
    emits: ['click'],
    setup(props, { slots, attrs }) {
        return () => {
            if( !props.title && !slots.title) {
                return ''
            }
            const size = props.size || 'normal';
            let img;
            let title ;
            let content;
            let footer;
            
            if( slots.img ) {
                img = <div  class='img-box'>{slots.img()}</div>
            }else if( props.type ) {
                img = <div  class='img-box'>
                        {iconRenderMap[props.type](size)}
                    </div>
                
            }
            
            if( slots.title ) {
                title = <div  class='title-box'>{slots.title()}</div>
            }else if( props.title ) {
                title = <div  class='title-box'>{props.title}</div>
            }
            if( slots.content ) {
                content = <div  class='description-box'>{slots.content()}</div>
            }else if( props.content ) {
                content = <div  class='description-box'>{props.content}</div>
            }
            if( slots.footer ) {
                footer = <div  class='footer-box'>{slots.footer()}</div>
            }
            return (
                <div  class='illustration-box' v-show={title}>
                    {img ? img : ''}
                    {title ? title : ''}
                    {content ? content : ''}
                    {footer ? footer : ''}
                </div>
            )
        }
    }
})
export default Illustration;
