<script lang="ts" setup>
import { computed } from 'vue';
import { useSelectContext } from './Select.composables';
const { select, selectedOptions } = useSelectContext();

interface Props {
   value: string;
}
const props = defineProps<Props>();

const isSelected = computed(() => selectedOptions.value.includes(props.value));

const handleSelect = () => select(props.value);
</script>

<template>
   <div @click="handleSelect" role="listitem" :class="{ active: isSelected }" class="option">
      <slot />
   </div>
</template>

<style lang="scss" scoped>
.option {
   color: rgb(44, 44, 44);
   padding: 7px 10px;
   font-size: 14px;
   margin: 2px 0px;
   white-space: nowrap;
   border-radius: 10px;
   border: 1px solid transparent;
   position: relative;
   // overflow: hidden;

   &::before {
      position: absolute;
      content: '';
      width: 5px;
      height: 35%;
      left: 0px;
      top: 0;
      bottom: 0;
      margin: auto 0;
      transform: translateX(-50%) scale(0);
      transform-origin: 0% 50%;
      border-radius: 10px;
      background-color: rgb(8, 154, 184);
      transition: transform 0.2s linear;
   }

   &:hover {
      background-color: rgb(238, 238, 238);
   }
   &.active {
      color: rgb(8, 154, 184);
      &::before {
         transform: translateX(-50%) scale(1);
      }
   }
}
</style>
