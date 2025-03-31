<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import type { Dish, StatusColorType } from '@/types'

type PropType = { dish: Dish }
const props = defineProps<PropType>()
const emits = defineEmits<{
  (e: 'edit-dish', dish: Dish): void
  (e: 'delete-dish', dish: Dish): void
}>()

const statusColor = computed((): StatusColorType => {
  switch (props.dish.status) {
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

const editDish = (): void => {
  emits('edit-dish', props.dish)
}

const deleteDish = (): void => {
  emits('delete-dish', props.dish)
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
          {{ dish.name }}
        </p>
        <p class="subtitle mb-2">
          <span class="tag" :class="statusColor">{{ dish.status }}</span>
        </p>
        <div>
          <button @click="editDish" class="button is-small is-warning is-light">Edit</button>
          <button @click="deleteDish" class="button is-small is-danger is-light">Delete</button>
        </div>
      </div>
    </div>
  </article>
</template>

<style></style>
 