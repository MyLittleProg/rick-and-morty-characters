<template>
    <div class="container">
        <div class="pagination">
            <div v-for="n in props.countPagination" :key="n" class="pagination__btn">
                <button @click="store.changeActivePage(n)">{{ n }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMyStore } from '@/context';

/* eslint-disable */

const store = useMyStore()

const props = defineProps({
    countPagination:{
        type:Number,
        requried:true
    }
})
</script>

<style scoped>
.pagination{
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 0 60px 0 0;
}
.pagination__btn{
    margin: 10px 10px 10px 0;
}
.pagination__btn button{
    cursor: pointer;
}
</style>