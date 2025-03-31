<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import { restaurantStatusList } from '@/constants'
import { useDishStore } from '@/stores/DishStore'
import type { Dish } from '@/types'

type AddEditType = 'add' | 'edit'
let componentType: AddEditType = 'add'
const dishStore = useDishStore()
const route = useRoute()
const router = useRouter()

let targetDish: Dish = reactive({
  id: uuidv4(),
  name: '',
  diet: '',
  status: 'Want to Try',
})

const id = route.params.id as string
if (id) {
  componentType = 'edit'

  const dishStore = useDishStore()
  targetDish = { ...dishStore.getDishById(id.slice(1)) }
}

const addEditDish = () => {
  if (componentType === 'edit') {
    dishStore.editDish(targetDish)
  } else if (componentType === 'add') {
    dishStore.addDish(targetDish)
  }
  cancelDish()
}
const cancelDish = () => {
  router.push('/dishes')
}

const elNameInput = ref<HTMLInputElement | null>()
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
