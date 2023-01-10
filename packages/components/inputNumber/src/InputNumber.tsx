// @ts-nocheck
/*
 * @Author: yanyongkai
 * @Date: 2021-08-15 23:56:12
 * @LastEditors: Devin
 * @LastEditTime: 2022-11-14 10:54:58
 * @Description: 数字输入框 InputNumber
 */
import { h, computed, defineComponent, ref, inject } from 'vue';
import props from './InputNumberProps';
import { MIcon } from '../../icon';
import {MButton } from '../../button'
import * as components from "meri-icon";
import "meri-icon/lib/style.css"
import { FormItemContextKey } from '../../utils/InjectionKey';
const InputNumber = defineComponent({
    name: 'InputNumber',
    props,
    emits: ["change", "blur", "focus", "update:modelValue"],
    setup(props, {slots, attrs, emit  }) {
        const formItemContext = inject(FormItemContextKey)
                /**
         * 小数点后面保留第 n 位
         *
         * @param x 做近似处理的数
         * @param n 小数点后第 n 位
         * @returns 近似处理后的数 
         */
        const roundFractional = (x: number, n: number)=> {
            return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
        }
        const fomatFloat = function(value: number, n: number) {
            if(n==0) {
                return value
            }
            var f = Math.round(value*Math.pow(10,n))/Math.pow(10,n);
            var s = f.toString();
            var rs = s.indexOf('.');   
            if (rs < 0) {     
                s += '.';   
            } 
            for(var i = s.length - s.indexOf('.'); i <= n; i++){
              s += "0";
            }
            return s;
        }
        const actived = ref(props.autofocus);
        const currentValue: any = ref(props.modelValue || props.defaultValue);
        if(props.precision>0&&new RegExp("^[0-9]*[1-9][0-9]*$").test(String(props.precision))) {
            currentValue.value = fomatFloat(currentValue.value,props.precision)
            //currentValue.value.toFixed(props.precision);
        }else if(props.precision!=0&&!new RegExp("^[0-9]*[1-9][0-9]*$").test(String(props.precision))){
            console.error('精度需要输入正整数');
        }
        const classVars = computed(() => [
        props.controls!='operatorIcon'&&'m-input-number',
        props.controls=='operatorIcon'&&'m-input-number-i',
        props.controls, 
        actived.value && 'actived', 
        props.disabled && 'disabled', 
        props.errorText.trim() !== '' && 'error'])
        const styleVars = computed(() => {
            let textAlignVar = props.textAlign;
            if (!props.textAlign && props.controls === 'operator') textAlignVar = 'center';
            return {
                '--width': props.width,
                '--text-align': textAlignVar,
                'height': props.size=='large'?'40px':'32px',
            }
        });
        const rightButtonClass = computed(()=>[
            props.controls=='rightButton'&&'m-input-number-rightButton',
            props.controls, 
            props.errorText.trim() !== '' && 'error'
        ])
        const iconBoxClass = computed(()=>[
            (props.controls=='operator'||props.controls=='normal')&&'m-input-number-box',
            props.controls, 
            props.errorText.trim() !== '' && 'error'
        ])
        //class的计算
        const leftControlsClass = computed(() => [
            props.controls!='operatorIcon'&&"m-input-number-icon m-input-number-icon-left", 
            props.controls=='operatorIcon'&&'m-input-number-i-icon m-input-number-i-icon-left',
            (props.disabled || currentValue.value <= props.min) && 'disabled']);
        const rightControlsClass = computed(() => [
            props.controls!='operatorIcon'&&"m-input-number-icon m-input-number-icon-right", 
            props.controls=='operatorIcon'&&'m-input-number-i-icon m-input-number-i-icon-right',
            (props.disabled || currentValue.value >= props.max) && 'disabled']);
        const leftDisable = computed(()=>
            (props.disabled || currentValue.value <= props.min) 
        )
        //typeof currentValue.value === 'number' && 
        const rightDisable = computed(()=>
            (props.disabled || currentValue.value >= props.max) 
        )
        // 输入框焦点变化
        const onFocuChange = () => {
            actived.value = !actived.value;
        }
        // 失焦
        const onBlur = (event: Event) => {
            // 如果输入的非数字（--,++等）
            currentValue.value = currentValue.value ? Number(currentValue.value) : null;
            if (typeof currentValue.value !== 'number' && Number(currentValue.value) === 0) {
                (event.target as HTMLInputElement).value = '';
            }
            //处理精度
            if (props.precision) {
                currentValue.value = currentValue.value.toFixed(props.precision);
                handelValue();
            }
            formItemContext && formItemContext?.validate('change').catch(()=>{})
            emit('blur', event);
        }
        // 获取焦点
        const onFocus = (event: Event) => {
            emit('focus', event);
        }
        // 输入事件
        const onInput = (event: Event) => {   
            const value = (event.target as HTMLInputElement)?.value;
            currentValue.value = value;
            handelValue();
        }
        // 操作-- 鼠标按下
        let mouseTime: any;
        const onMousedown = (opreate: string) => {
            opreateValue(opreate);
            mouseTime = setTimeout(() => {
                mouseTime = setInterval(() => {
                    opreateValue(opreate);
                }, 200)
            }, 500)
        }
        // 操作-- 鼠标抬起
        const onMouseup = () => {
            clearInterval(mouseTime);   //清除setInterval的时间
        }

        const plus = (num1: number, num2: number)=> {
            let r1, r2, m;
            try {
                r1 = num1.toString().split(".")[1].length
            } catch (e) {
                r1 = 0
            }
            try {
                r2 = num2.toString().split(".")[1].length
            } catch (e) {
                r2 = 0
            }
            m = Math.pow(10, Math.max(r1, r2))
            return (num1 * m + num2 * m) / m
        }
        const subtract = (num1: number, num2: number)=> {
            let r1, r2, m, n;
            try {
                r1 = num1.toString().split(".")[1].length
            } catch (e) {
                r1 = 0
            }
            try {
                r2 = num2.toString().split(".")[1].length
            } catch (e) {
                r2 = 0
            }
            m = Math.pow(10, Math.max(r1, r2));
            n = (r1 >= r2) ? r1 : r2;
            return ((num1 * m - num2 * m) / m).toFixed(n);
        }
        // 操作数据
        const opreateValue = (opreate: string) => {
            if (props.disabled) return;
            if (typeof currentValue.value !== 'number') currentValue.value = Number(currentValue.value);
            
            if (!currentValue.value && currentValue.value !== 0) {
                currentValue.value = props.step;
            } else if (opreate === '+') {
                // currentValue.value = roundFractional(currentValue.value + props.step,props.precision);
                currentValue.value = plus(currentValue.value ,props.step)
            } else if (opreate === '-') {
                // currentValue.value = roundFractional(currentValue.value - props.step,props.precision);
                currentValue.value = subtract(currentValue.value ,props.step)
            }
            currentValue.value = fomatFloat(currentValue.value,props.precision)
            // debugger
            // if(props.precision>0&&new RegExp("^[0-9]*[1-9][0-9]*$").test(String(props.precision))) {
            //     currentValue.value = currentValue.value.toFixed(props.precision);
            // }    
            // 解决计算精度问题
            console.log(currentValue.value);
            console.log(typeof currentValue.value);
            
            // currentValue.value = parseFloat(currentValue.value.toFixed(12));
            handelValue();
        }
        // 处理值
        const handelValue = () => {

            // if (typeof currentValue.value === 'number') {
                currentValue.value > props.max ? currentValue.value = fomatFloat(props.max,props.precision) : null;
                currentValue.value < props.min ? currentValue.value = fomatFloat(props.min,props.precision) : null;
            // }
            // if(props.precision>0) {
            //     currentValue.value = currentValue.value.toFixed(props.precision);
            // } 
            console.log(typeof currentValue.value);
            emit('update:modelValue', Number(currentValue.value));
            
            formItemContext && formItemContext?.validate('change').catch(()=>{})
            emit('change', Number(currentValue.value));
        }
        handelValue();

        return () => {
             // 带数字输入框的后插槽内容
            let suffixText;
            if (slots.suffix) {
                suffixText = <div class="suffix-text">{slots.suffix()}</div>
            }
            //前缀文字
            let prefix;
            if(props.prefix) {
                prefix = <span class="m-input-number-prefix">{props.prefix}</span>
            }
            //后缀文字
            let suffix;
            if(props.suffix) {
                suffix =  <span class="m-input-number-suffix">{props.suffix}</span>
            }
            //提示信息
            const message = props.errorText.trim() !== '' ? (<span class="m-input-tips">{props.errorText}</span>) : '';
            let last = null;
            const IconMeriActionAdd =  components['IconMeriActionAdd']
            const IconMeriActionMinus =  components['IconMeriActionMinus']
            if(props.controls=='operatorIcon') {
                last =  <div  class={classVars.value as any} style={styleVars.value as any} >
                    {
                        //<IconMeriActionAdd size={13} color={'#1B2129'} ></IconMeriActionAdd>
                    <span class={leftControlsClass.value  as any} onMousedown={() => onMousedown("-")} onMouseup={onMouseup} onMousemove={onMouseup}>
                        <MButton  type="icon" icon-size='13'  icon="IconMeriActionMinus" size="small" hoverColor="'#EDF1F5'" disabled={leftDisable.value?true:false}></MButton>
                    </span>
                    }
                    {prefix}
                    <div class='m-input-number-i-box' >
                        < input type='number' min={props.min} max={props.max} value={currentValue.value} autofocus readonly={props.disabled} placeholder={props.placeholder} onFocusin={onFocuChange} onFocusout={onFocuChange} onBlur={onBlur} onFocus={onFocus} onInput={onInput} ></input >
                    </div>
                    {suffix}
                    {<span class={rightControlsClass.value as any} onMousedown={() => onMousedown("+")} onMouseup={onMouseup} onMousemove={onMouseup}>
                        <MButton  type="icon" icon-size='13'   icon="IconMeriActionAdd" size="small" hoverColor="'#EDF1F5'" disabled={rightDisable.value?true:false}></MButton>
                    </span>}
                    {message}
                </div >
            }else if(props.controls=='rightButton'){
                last =  <div  class={classVars.value as any} style={styleVars.value as any}>
                <div class={rightButtonClass.value as any}>
                    < input type='number' min={props.min} max={props.max} value={currentValue.value} autofocus readonly={props.disabled} placeholder={props.placeholder} onFocusin={onFocuChange} onFocusout={onFocuChange} onBlur={onBlur} onFocus={onFocus} onInput={onInput} ></input >
                </div>
                {suffixText}
                {message}
            </div >
            }else{
                last =  <div  class={classVars.value as any} style={styleVars.value as any}>
                    {props.controls !== 'normal' ? (<span class={leftControlsClass.value as any} onMousedown={() => onMousedown("-")} onMouseup={onMouseup} onMousemove={onMouseup}>
                        {/* <MIcon type={props.controls === 'operator' ? "IconBasicMinus" : "IconTreeOpen"}></MIcon> */}
                        <IconMeriActionMinus size={13} color={leftDisable.value?'#C4C9CF':'#1B2129'} hoverColor={leftDisable.value?'#C4C9CF':'#246FE5'}></IconMeriActionMinus>
                    </span>) : ''
                    }
                    {prefix}
                    <div  class={iconBoxClass.value as any} >
                        < input type='number' min={props.min} max={props.max} value={currentValue.value} autofocus readonly={props.disabled} placeholder={props.placeholder} onFocusin={onFocuChange} onFocusout={onFocuChange} onBlur={onBlur} onFocus={onFocus} onInput={onInput} ></input >
                    </div>
                    {suffix}
                    {props.controls !== 'normal' ? (<span class={rightControlsClass.value as any} onMousedown={() => onMousedown("+")} onMouseup={onMouseup} onMousemove={onMouseup}>
                        {/* <MIcon type={props.controls === 'operator' ? "IconBasicPlus" : "IconUp"}></MIcon> */}
                        <IconMeriActionAdd size={13} color={rightDisable.value?'#C4C9CF':'#1B2129'} hoverColor={rightDisable.value?'#C4C9CF':'#246FE5'}></IconMeriActionAdd>
                    </span>) : ''}
                    {message}
                </div >
            }

            return (
                last 
            )
        }
    }
})

export default InputNumber;