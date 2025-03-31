<script setup lang="ts">
import { computed, ref } from 'vue'
import RestaurantCard from '@/components/RestaurantCard.vue'
import SideMenu from '@/components/SideMenu.vue'
import type { Restaurant } from '@/types'
import { useRestaurantStore } from '@/stores/RestaurantStore'
import { useRouter } from 'vue-router'

const restaurantStore = useRestaurantStore()
const router = useRouter()

const filterText = ref<string>('')
const filteredRestaurantList = computed((): Restaurant[] => {
  return restaurantStore.list.filter((restaurant: Restaurant): boolean => {
    if (restaurant.name) {
      return restaurant.name.toLowerCase().includes(filterText.value.toLowerCase())
    }
    return false
  })
})
const numberOfRestaurants = computed((): number => {
  return filteredRestaurantList.value.length
})

const onAddRestaurantOpen = (): void => {
  router.push('/restaurants/add')
}

const onEditRestaurantOpen = (payload: Restaurant): void => {
  router.push(`/restaurants/edit/:${payload.id}`)
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
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfRestaurants }}</strong> restaurants
              </p>
            </div>

            <p class="level-item">
              <button @click="onAddRestaurantOpen" class="button is-success">New</button>
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

        <RouterView></RouterView>

        <!-- Display Results -->
        <div class="columns is-multiline">
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
