<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import RestaurantCard from '@/components/RestaurantCard.vue'
import SideMenu from '@/components/SideMenu.vue'
import type { Restaurant } from '@/types'
import { useRoute } from 'vue-router'
import { useRestaurantStore } from '@/stores/RestaurantStore'
import AddEditRestaurantForm from '@/components/AddEditRestaurantForm.vue'

type ShowFormState = '' | 'new' | 'edit'
const restaurantStore = useRestaurantStore()

const filterText = ref<string>('')
const filteredRestaurantList = computed((): Restaurant[] => {
  return restaurantStore.list.filter((restaurant: Restaurant): boolean => {
    if (restaurant.name) {
      return restaurant.name.toLowerCase().includes(filterText.value.toLowerCase())
    }
    return false
  })
})
const numberOfRestaurants = computed(() => {
  return filteredRestaurantList.value.length
})
const addRestaurant = (payload: Restaurant): void => {
  restaurantStore.addRestaurant(payload)
  hideForm()
}
const editRestaurantItem = (payload: Restaurant): void => {
  restaurantStore.editRestaurant(payload)
  hideForm()
}

let restaurantToEdit = ref<Restaurant>()
const onEditRestaurantOpen = (payload: Restaurant): void => {
  restaurantToEdit.value = payload
  showForm.value = 'edit'
}
const showForm = ref<ShowFormState>('')
const hideForm = (): void => {
  showForm.value = ''
}
</script>

<template>
  <main class="section">
    <div class="columns">
      <!-- Side Menu -->
      <SideMenu />

      <!-- Main Content -->
      <div class="column">
        <h1 class="title">Restaurants</h1>

        <!-- CTA Bar -->
        <nav v-if="!showForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfRestaurants }}</strong> restaurants
              </p>
            </div>

            <p class="level-item">
              <button @click="showForm = 'new'" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input class="input" type="text" placeholder="Restaurant name" v-model="filterText" />
                </p>
                <p class="control">
                  <button class="button">Search</button>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <!-- New Restaurant Form -->
        <AddEditRestaurantForm
          v-if="showForm === 'new'"
          @add-edit-restaurant="addRestaurant"
          @cancel-restaurant="hideForm"
        />

        <!-- Edit Restaurant Form -->
        <AddEditRestaurantForm
          v-else-if="showForm === 'edit'"
          :restaurant="restaurantToEdit"
          @add-edit-restaurant="editRestaurantItem"
          @cancel-restaurant="hideForm"
        />

        <!-- Display Results -->
        <div v-else class="columns is-multiline">
          <div v-for="item in filteredRestaurantList" class="column is-full" :key="`item-${item}`">
            <RestaurantCard
              :restaurant="item"
              @edit-restaurant="onEditRestaurantOpen"
              @delete-restaurant="restaurantStore.deleteRestaurant"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
