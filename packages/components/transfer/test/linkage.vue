<template>
    <m-transfer :data="transferData.treeData" @change="handleChange" :linkage="true"></m-transfer>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { TreeNode } from '../src/TransferProps';

export default defineComponent({
    setup() {
        const transferData = reactive({
            treeData: [
                {
                    id: '0', name: '顶级', open: true, checked: 'uncheck',
                    children: [
                        {
                            id: '1', name: '一级1', open: true, checked: 'uncheck',
                            children: [
                                { id: '12', name: '一二级2', checked: 'uncheck' },
                                { id: '121', name: '一二级3', checked: 'uncheck' },
                                { id: '122', name: '一二级4', checked: 'uncheck' },
                                {
                                    id: '1321', name: '二级1', open: true, checked: 'uncheck',
                                    children: [
                                        { id: '13', name: '二三级2', checked: 'uncheck' },
                                        { id: '131', name: '二三级3', checked: 'uncheck' },
                                        { id: '132', name: '二三级4', checked: 'uncheck' },
                                    ]
                                }
                            ]
                        },
                        {
                            id: '2', name: '一级2', open: true, checked: 'uncheck',
                            children: [
                                { id: '222', name: '二二级2', checked: 'uncheck', disabled: true },
                                { id: '2221', name: '二二级1', checked: 'uncheck' },
                                { id: '2222', name: '二二级3', checked: 'uncheck' }
                            ]
                        },
                        {
                            id: '3', name: '一级3', open: true, checked: 'uncheck',
                            children: [
                                { id: '3220', name: '三二级0', checked: 'uncheck' },
                                { id: '3221', name: '三二级1', checked: 'uncheck' },
                                { id: '322', name: '三二级2', checked: 'uncheck' }
                            ]
                        }
                    ]
                }
            ],
            value: '',
            selectedIds: [] as string[]
        })

        const handleChange = (row: TreeNode, selectNode: Array<TreeNode>) => {
            console.log(row, selectNode)
        }

        return { transferData, handleChange };
    }
});
</script>
