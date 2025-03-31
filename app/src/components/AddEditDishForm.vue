<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { Dish } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import { restaurantStatusList } from '@/constants'
import { useDishStore } from '@/stores/DishStore'

type AddEditType = 'new' | 'edit'
let componentType: AddEditType = 'new'

type PropsState = {
  dish?: Dish
}
const props = defineProps<PropsState>()

let targetDish: Dish = reactive({
  id: uuidv4(),
  name: '',
  status: 'Want to Try',
  diet: '',
})

if (props.dish) {
  componentType = 'edit'

  const dishStore = useDishStore()
  targetDish = { ...dishStore.getDishById(props.dish.id) }
}

const emits = defineEmits<{
  (e: 'add-edit-dish', dish: Dish): void
  (e: 'cancel-dish'): void
}>()

const elNameInput = ref<HTMLInputElement | null>()
const addEditDish = () => {
  emits('add-edit-dish', targetDish)
}
const cancelDish = () => {
  emits('cancel-dish')
}

onMounted(() => {
  elNameInput.value?.focus()
})
</script>

<template>
  <form @submit.prevent>
    <div class="field">
      <div class="field">
        <label for="name" class="label">Name {{ componentType === 'edit' ? targetDish.id : '' }}</label>
        <div class="control">
          <input
            v-model="targetDish.name"
            type="text"
            class="input is-large"
            placeholder="Mystery Flavored Shrimp"
            required
            ref="elNameInput"
          />
        </div>
      </div>

      <div class="field mb-5">
        <label for="status" class="label">Status</label>
        <div class="select">
          <select v-model="targetDish.status" id="status">
            <option v-for="status in restaurantStatusList" :value="status" :key="`option-${status}`">
              {{ status }}
            </option>
          </select>
        </div>
      </div>

      <div class="field">
        <div class="buttons">
          <button @click="addEditDish" class="button is-success">
            {{ componentType === 'edit' ? 'Edit' : 'Add' }}
          </button>
          <button @click="cancelDish" class="button is-light">Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style></style>
