<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useRestaurantStore } from '@/stores/RestaurantStore'
import RestaurantCard from '@/components/RestaurantCard.vue'
import SideMenu from '@/components/SideMenu.vue'
import type { Restaurant } from '@/types'

const restaurantStore = useRestaurantStore()
const router = useRouter()

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
                <strong>{{ restaurantStore.getFiltredRestaurantListLength() }}</strong> restaurants
              </p>
            </div>

            <p class="level-item">
              <button @click="onAddRestaurantOpen" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input class="input" type="text" placeholder="Restaurant name" v-model="restaurantStore.filterText" />
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
          <div v-for="item in restaurantStore.getFilteredRestaurantList()" class="column is-full" :key="`item-${item}`">
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
