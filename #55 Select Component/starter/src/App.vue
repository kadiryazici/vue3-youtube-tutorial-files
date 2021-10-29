<script setup lang="ts">
import Select from './components/Select/Select.vue';
import Option from './components/Select/Option.vue';
</script>

<template>
   <div style="display: flex; justify-content: center">
      <Select>
         <Option value="choice 1">Seçim Bir bruh momento</Option>
         <Option value="choice 2">Seçim İki</Option>
         <Option value="choice 3">Seçim Üç</Option>
      </Select>
   </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@500&display=swap');
* {
   box-sizing: border-box;
}
#app {
   font-family: 'Zen Kaku Gothic Antique', sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   color: #2c3e50;
   margin-top: 60px;
}
</style>
