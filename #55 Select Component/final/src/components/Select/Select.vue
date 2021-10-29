<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { provideSelectContext } from './Select.composables';

interface Props {
   multiple?: boolean;
   modelValue: string[];
}
interface Emits {
   (e: 'update:modelValue', value: string[]): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectedOptions = ref<string[]>([]);
const isOpen = ref(false);

const toggleDropdown = () => {
   isOpen.value = !isOpen.value;
};

const handleDropdownClick = (e: MouseEvent) => {
   e.stopPropagation();
};

const handleClickOutside = () => {
   isOpen.value = false;
};

const select = (value: string) => {
   if (props.multiple) {
      if (selectedOptions.value.includes(value)) {
         const index = selectedOptions.value.findIndex((optionValue) => optionValue === value);
         if (index >= 0) {
            selectedOptions.value.splice(index, 1);
            emit('update:modelValue', selectedOptions.value);
         }
         return;
      }
      selectedOptions.value.push(value);
      emit('update:modelValue', selectedOptions.value);
      return;
   }
   selectedOptions.value = [value];
   emit('update:modelValue', selectedOptions.value);
};

provideSelectContext({
   select,
   selectedOptions: computed(() => selectedOptions.value)
});

onMounted(() => {
   window.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
   window.removeEventListener('click', handleClickOutside);
});
</script>

<template>
   <div @click="handleDropdownClick" role="combobox" class="select">
      <div @click="toggleDropdown" class="select-header">Click To Select</div>
      <Transition enterActiveClass="select-enter" leaveActiveClass="select-leave">
         <div v-if="isOpen" class="select-body">
            <slot />
         </div>
      </Transition>
   </div>
</template>

<style lang="scss" scoped>
.select {
   border-radius: 10px;
   display: inline-block;
   position: relative;
   cursor: default;
   .select-header {
      color: rgb(255, 255, 255);
      background-color: rgb(8, 154, 184);
      padding: 7px 10px;
      border-radius: 10px;
      border: 1px solid transparent;
      box-shadow: 0px 3px 7px -0px rgba(0, 0, 0, 0.16);
      transition: box-shadow 0.2s, color 0.25s, background-color 0.25s;

      &:active {
         box-shadow: 0px 3px 7px -0px rgba(0, 0, 0, 0.3);
      }

      &:hover {
         background-color: #fff;
         color: rgb(8, 154, 184);
         border-color: rgb(8, 154, 184);
      }
   }

   .select-body {
      position: absolute;
      background-color: rgb(255, 255, 255);
      padding: 2px;
      min-width: 100%;
      left: 50%;
      transform: translateX(-50%);
      display: inline-block;
      top: calc(100% + 5px);
      border-radius: 10px;
      box-shadow: 0px 3px 7px -0px rgba(0, 0, 0, 0.2), 0px 0px 0px 1px rgba(200, 200, 200, 0.1);
   }
}

.select-enter {
   animation: opacityAnim 0.25s;
   transform-origin: 50% 0%;
}
.select-leave {
   animation: opacityAnim 0.25s reverse;
   transform-origin: 50% 0%;
}
@keyframes opacityAnim {
   0% {
      opacity: 0%;
      transform: translateX(-50%) scale(0);
   }
   100% {
      opacity: 1;
      transform: translateX(-50%) scale(1);
   }
}
</style>
