<template>
    <select v-model="value" @change="store.changeStatus(value)">
        <option :value="el.value" v-for="el in props.options" :key="el.value">{{ el.text }}</option>
    </select>

<!-- Сделать инпуты для фильтрации по name и status -->
</template>

<script setup>
/* eslint-disable */
import { useMyStore } from '@/context';
import { ref } from 'vue';

const store = useMyStore()

let value = ref('Alive')
const props = defineProps({
    options:{
        type:Array,
        requried:true
    },
})
</script>

<style scoped>

</style>