<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { onMounted, reactive, ref } from 'vue'
import { restaurantStatusList } from '@/constants'
import { useRestaurantStore } from '@/stores/RestaurantStore'
import { useRoute, useRouter } from 'vue-router'
import type { Restaurant } from '@/types'

type AddEditType = 'add' | 'edit'
let componentType: AddEditType = 'add'
const restaurantStore = useRestaurantStore()
const route = useRoute()
const router = useRouter()

let targetRestaurant: Restaurant = reactive({
  id: uuidv4(),
  name: '',
  address: '',
  website: '',
  status: 'Want to Try',
})

const id = route.params.id as string
if (id) {
  componentType = 'edit'

  const restaurantStore = useRestaurantStore()
  targetRestaurant = { ...restaurantStore.getRestaurantById(id.slice(1)) }
}

const elNameInput = ref<HTMLInputElement | null>()
const addEditRestaurant = () => {
  if (componentType === 'edit') {
    restaurantStore.editRestaurant(targetRestaurant)
  } else if (componentType === 'add') {
    restaurantStore.addRestaurant(targetRestaurant)
  }
  router.push('/restaurants')
}

const cancelRestaurant = () => {
  router.push('/restaurants')
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
