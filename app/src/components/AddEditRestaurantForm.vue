<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { onMounted, reactive, ref } from 'vue'
import { restaurantStatusList } from '@/constants'
import type { Restaurant } from '@/types'
import { useRestaurantStore } from '@/stores/RestaurantStore'

type AddEditType = 'new' | 'edit'
let componentType: AddEditType = 'new'

type PropsState = {
  restaurant?: Restaurant
}
const props = defineProps<PropsState>()

let targetRestaurant: Restaurant = reactive({
  id: uuidv4(),
  name: '',
  address: '',
  website: '',
  status: 'Want to Try',
})

if (props.restaurant) {
  componentType = 'edit'

  const restaurantStore = useRestaurantStore()
  targetRestaurant = { ...restaurantStore.getRestaurantById(props.restaurant.id) }
}

const emits = defineEmits<{
  (e: 'add-edit-restaurant', restaurant: Restaurant): void
  (e: 'cancel-restaurant'): void
}>()

const elNameInput = ref<HTMLInputElement | null>()
const addEditRestaurant = () => {
  emits('add-edit-restaurant', targetRestaurant)
}

const cancelRestaurant = () => {
  emits('cancel-restaurant')
}

onMounted(() => {
  elNameInput.value?.focus()
})
</script>

<template>
  <form @submit.prevent>
    <div class="field">
      <div class="field">
        <label for="name" class="label">Name {{ componentType === 'edit' ? targetRestaurant.id : '' }}</label>
        <div class="control">
          <input
            v-model="targetRestaurant.name"
            type="text"
            class="input is-large"
            placeholder="Beignet and the Jets"
            required
            ref="elNameInput"
          />
        </div>
      </div>
      <div class="field">
        <label for="website" class="label">Website</label>
        <div class="control">
          <input v-model="targetRestaurant.website" type="text" class="input" placeholder="www.beignetandthejets.com" />
        </div>
      </div>
      <div class="field mb-5">
        <label for="status" class="label">Status</label>
        <div class="select">
          <select v-model="targetRestaurant.status" id="status">
            <option v-for="status in restaurantStatusList" :value="status" :key="`option-${status}`">
              {{ status }}
            </option>
          </select>
        </div>
      </div>
      <div class="field">
        <div class="buttons">
          <button @click="addEditRestaurant" class="button is-success">
            {{ componentType === 'edit' ? 'Edit' : 'Add' }}
          </button>
          <button @click="cancelRestaurant" class="button is-light">Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style></style>
