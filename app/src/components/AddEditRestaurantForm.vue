<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { restaurantStatusList } from '@/constants'
import { useRestaurantStore } from '@/stores/RestaurantStore'
import type { Restaurant } from '@/types'

const restaurantStore = useRestaurantStore()
const route = useRoute()
const router = useRouter()

type AddEditType = 'add' | 'edit'
let componentType: AddEditType = 'add'

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

const addEditRestaurant = () => {
  if (componentType === 'edit') {
    restaurantStore.editRestaurant(targetRestaurant)
  } else if (componentType === 'add') {
    restaurantStore.addRestaurant(targetRestaurant)
  }
  cancelRestaurant()
}

const cancelRestaurant = () => {
  router.push('/restaurants')
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
