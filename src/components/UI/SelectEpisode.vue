<template>
    
        <select v-model="selectValue" @change="store.changeIdEpisode(selectValue)">
            <option :value="n" v-for="n in props.countEpisode" :key="n">
                Episode: {{ n }}
            </option>
        </select>
    
</template>

<script setup>
/* eslint-disable */
import { useMyStore } from '@/context';
import { ref } from 'vue';

const store = useMyStore();

let selectValue = ref(1)

const props = defineProps({
    countEpisode:{
        type:Number,
        required:true
    }
})

</script>

<style scoped>

</style>