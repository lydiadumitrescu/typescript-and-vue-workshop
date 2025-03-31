<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import type { Restaurant, StatusColorType } from '@/types'

type PropType = { restaurant: Restaurant }
const props = defineProps<PropType>()
const emits = defineEmits<{
  (e: 'edit-restaurant', restaurant: Restaurant): void
  (e: 'delete-restaurant', restaurant: Restaurant): void
}>()

const statusColor = computed((): StatusColorType => {
  switch (props.restaurant.status) {
    case 'Want to Try':
      return 'is-warning'
    case 'Recommended':
      return 'is-success'
    case 'Do Not Recommend':
      return 'is-danger'
    default:
      return '' 
  }
})

const editRestaurant = (): void => {
  emits('edit-restaurant', props.restaurant)
}

const deleteRestaurant = (): void => {
  emits('delete-restaurant', props.restaurant)
}
</script>

<template>
  <article class="box">
    <div class="media">
      <aside class="media-left">
        <img src="https://placehold.jp/150x150.png" alt="" />
      </aside>
      <div class="media-content">
        <p class="title is-4 is-spaced mb-1">
          {{ restaurant.name }}
        </p>
        <p class="subtitle mb-2">
          <span class="tag" :class="statusColor">{{ restaurant.status }}</span>
        </p>
        <div class="content mb-2">
          {{ restaurant.address }}
        </div>
        <div>
          <button @click="editRestaurant" class="button is-small is-warning is-light">Edit</button>
          <button @click="deleteRestaurant" class="button is-small is-danger is-light">Delete</button>
        </div>
      </div>
    </div>
  </article>
</template>

<style></style>
