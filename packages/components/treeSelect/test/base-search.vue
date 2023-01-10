<template>
  <m-tree-select
    :data="data"
    v-model="selected"
		searchable
  >

  </m-tree-select>
</template>


<script lang="ts">
import { defineComponent, ref,watch,Ref } from "vue";
import {TreeNode} from '../../tree/src/TreeProps'
export default defineComponent({
  setup() {
    const data:Ref<TreeNode[]> = ref([])
    data.value = [
			{
				id: 'SE',
				name: '强电专业',
				children: [
					{
						id: 'SESD',
						name: '强电人防系统',
						children: [
							{
								id: 'SDCU',
								obj_code: 'SDCU',
								name: '强电人防控制模块'
							}
						]
					},
					{
						id: 'SELT',
						name: '照明系统',
						children: [
							{
								id: 'LTCU',
								obj_code: 'LTCU',
								name: '照明控制模块'
							},
							{
								id: 'LTLT',
								obj_code: 'LTLT',
								name: '照明灯具'
							},
							{
								id: 'LTCC',
								obj_code: 'LTCC',
								name: '照明回路'
							},
							{
								id: 'LTLG',
								obj_code: 'LTLG',
								name: '照明灯组'
							}
						]
					}
				]
			},
			{
				id: 'LT',
				name: '照明专业',
				children: []
			},
			{
				id: 'FG',
				name: '燃气专业',
				children: []
			},
			
			{
				id: 'SP',
				name: '安防专业',
				children: [
					{
						id: 'SPNP',
						name: '巡更系统',
						children: [
							{
								id: 'NPCU',
								obj_code: 'NPCU',
								name: '巡更控制模块'
							},
							{
								id: 'NPPS',
								obj_code: 'NPPS',
								name: '巡更棒'
							},
							{
								id: 'NPCP',
								obj_code: 'NPCP',
								name: '巡更通讯座'
							}
						]
					},
					{
						id: 'SPVS',
						name: '视频监控系统',
						children: [
							{
								id: 'VSCM',
								obj_code: 'VSCM',
								name: '监控摄像头'
							},
							{
								id: 'VSSD',
								obj_code: 'VSSD',
								name: '监控视频存储设备 '
							},
							{
								id: 'VSCU',
								obj_code: 'VSCU',
								name: '监控控制模块'
							},
							{
								id: 'VSVM',
								obj_code: 'VSVM',
								name: '监视器'
							},
							{
								id: 'VSHT',
								obj_code: 'VSHT',
								name: '监控主机'
							}
						]
					},
					{
						id: 'SPEG',
						name: '门禁系统',
						children: [
							{
								id: 'EGCR',
								obj_code: 'EGCR',
								name: '门禁读卡器'
							},
							{
								id: 'EGWT',
								obj_code: 'EGWT',
								name: '门禁对讲机'
							},
							{
								id: 'EGHT',
								obj_code: 'EGHT',
								name: '门禁主机'
							},
							{
								id: 'EGCP',
								obj_code: 'EGCP',
								name: '门禁控制面板'
							},
						]
					},
				]
			},
			{
				id: 'OT',
				name: '其他',
				children: [
					{
						id: 'OTAA',
						name: '气体管道及附件',
						children: [
							{
								id: 'AAPS',
								obj_code: 'AAPS',
								name: '气体管道支吊架'
							},
							{
								id: 'AAPL',
								obj_code: 'AAPL',
								name: '气体管道'
							}
						]
					},
					{
						id: 'OTAE',
						name: '执行器',
						children: [
							{
								id: 'AERL',
								obj_code: 'AERL',
								name: '继电器'
							},
							{
								id: 'AEIL',
								obj_code: 'AEIL',
								name: '提示灯'
							},
							{
								id: 'AEAL',
								obj_code: 'AEAL',
								name: '声光报警器'
							},
							{
								id: 'AEFC',
								obj_code: 'AEFC',
								name: '变频器'
							}
						]
					},
					{
						id: 'OTXX',
						name: '其他系统',
						children: [
							{
								id: 'XXCD',
								obj_code: 'XXCD',
								name: '打码机'
							},
							{
								id: 'XXCR',
								obj_code: 'XXCR',
								name: '扫地机器人'
							},
							{
								id: 'XXUA',
								obj_code: 'XXUA',
								name: '无人机'
							},
							
						]
					}
				]
			},
			{
				id: 'EL',
				name: '电梯专业',
				children: []
			}
		]
    const selected = ref([])
    watch(selected,()=>{
      console.log(selected.value)
    })
    return { data,selected };
  },
});
</script>