<template>
    <el-row>     
        <el-col :span="4">
            <div class="label">Group by</div>
        </el-col>
        <el-col :span="10">
            <el-select v-model="value">
                <el-option value="root" label="Root note"></el-option>
                <el-option value="kind" label="Kind"></el-option>
            </el-select>
        </el-col>
    </el-row>   
</template>
<script>
import Wrapper from '@/mixins/Wrapper'
export default {
    mixins: [Wrapper]
}
</script>
<style scoped>
    .label {
        line-height: 40px;        
    }
</style>


