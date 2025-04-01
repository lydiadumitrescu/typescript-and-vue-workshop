<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useDishStore } from '@/stores/DishStore'
import DishCard from '@/components/DishCard.vue'
import SideMenu from '@/components/SideMenu.vue'
import type { Dish } from '@/types'

const dishStore = useDishStore()
const router = useRouter()

const onAddDishOpen = (): void => {
  router.push('/dishes/add')
}

const onEditDishOpen = (payload: Dish): void => {
  router.push(`/dishes/edit/:${payload.id}`)
}
</script>

<template>
  <main class="section">
    <div class="columns">
      <!-- Side Menu -->
      <SideMenu />

      <!-- Main Content -->
      <div class="column">
        <h1 class="title">Dishes</h1>

        <!-- CTA Bar -->
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ dishStore.getFiltredDishListLength() }}</strong> dishes
              </p>
            </div>

            <p class="level-item">
              <button @click="onAddDishOpen" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input class="input" type="text" placeholder="Dish name" v-model="dishStore.filterText" />
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
          <div v-for="item in dishStore.getFilteredDishList()" class="column is-full" :key="`item-${item}`">
            <DishCard :dish="item" @edit-dish="onEditDishOpen" @delete-dish="dishStore.deleteDish" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
