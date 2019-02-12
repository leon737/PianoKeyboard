<template>
    <el-row>     
        <el-col :span="4">
            <div class="label">Select modes</div>
        </el-col>
        <el-col :span="10">
             <el-select v-model="selectedModes" multiple placeholder="Select">
                <el-option v-for="mode in modes" :key="mode.name" :label="mode.name" :value="mode.name"></el-option>
            </el-select>
        </el-col>
    </el-row>      
</template>
<script>
import modes from '@/models/modes'

export default {
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: Array
    },
    data: () => ({
        selectedModes:[]
    }),
    computed: {
        modes: () => modes
    },
    created() {
        this.selectedModes = this.value
    },
    watch: {
        selectedModes() {
            this.$emit('change', this.selectedModes)
        }
    }
}
</script>
<style scoped>
    .label {
        line-height: 40px;        
        font-size: 14px;
    }    
</style>


