<template>
    <input type="text" placeholder="Nickname" :value="value"
    @input="value = $event.target.value" 
    @change="store.changeNickname(value)">
</template>

<script setup>
import { useMyStore } from '@/context';
import { ref } from 'vue';

const store = useMyStore()

let value = ref('')
</script>

<style scoped>

</style>