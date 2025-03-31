<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AddEditDishForm from '@/components/AddEditDishForm.vue'
import DishCard from '@/components/DishCard.vue'
import SideMenu from '@/components/SideMenu.vue'
import type { Dish } from '@/types'
import { useDishStore } from '@/stores/DishStore'
// import { useRoute } from 'vue-router'

type ShowFormState = '' | 'new' | 'edit'
const dishStore = useDishStore()

const filterText = ref<string>('')
const filteredDishList = computed((): Dish[] => {
  return dishStore.list.filter((dish: Dish): boolean => {
    if (dish.name) {
      return dish.name.toLowerCase().includes(filterText.value.toLowerCase())
    }
    return false
  })
})
const numberOfFiltredDishes = computed((): number => {
  return filteredDishList.value.length
})
const addDishItem = (payload: Dish): void => {
  dishStore.addDish(payload)
  hideForm()
}
const editDishItem = (payload: Dish): void => {
  dishStore.editDish(payload)
  hideForm()
}

let dishToEdit = ref<Dish>()
const onEditDishOpen = (payload: Dish): void => {
  dishToEdit.value = payload
  showForm.value = 'edit'
}
const showForm = ref<ShowFormState>('')
const hideForm = (): void => {
  showForm.value = ''
}

// onMounted(() => {
//   const route = useRoute()
//   if (route.query.new) {
//     showForm.value = 'new'
//   } else if (route.query.new) {
//     showForm.value = 'edit'
//   }
// })
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
        <nav v-if="!showForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfFiltredDishes }}</strong> dishes
              </p>
            </div>

            <p class="level-item">
              <button @click="showForm = 'new'" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input class="input" type="text" placeholder="Dish name" v-model="filterText" />
                </p>
                <p class="control">
                  <button class="button">Search</button>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <!-- New Dish Form -->
        <AddEditDishForm v-if="showForm === 'new'"
         @add-edit-dish="addDishItem"
         @cancel-dish="hideForm" />

        <!-- Edit Dish Form -->
        <AddEditDishForm
          v-else-if="showForm === 'edit'"
          :dish="dishToEdit"
          @cancel-dish="hideForm"
          @add-edit-dish="editDishItem"
        />
        <!-- @edit-new-dish="ediDish" @cancel-new-dish="hideForm" -->

        <!-- Display Results -->
        <div v-else class="columns is-multiline">
          <div v-for="item in filteredDishList" class="column is-full" :key="`item-${item}`">
            <DishCard :dish="item" @edit-dish="onEditDishOpen" @delete-dish="dishStore.deleteDish" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
