<template>
  <CardsList/>
</template>

<script setup>
import CardsList from './components/CardsList.vue';
</script>

<style>
@import url('../src/assets/styles/reset.css');
body{
  font-family: Roboto;
  background-color: #272B33;
}
.container{
  display: flex;
  flex-wrap: wrap;
  width: 1200px;
  margin: 0 auto;
}
</style>
