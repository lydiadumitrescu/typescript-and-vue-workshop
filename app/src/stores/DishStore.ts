import type { Dish } from '@/types'
import { defineStore } from 'pinia'

type StoreShape = {
  list: Dish[]
}

export const useDishStore = defineStore('DishStore', {
  state: (): StoreShape => ({
    list: [
      {
        id: '7d9f3f17-964a-4e82-98e5-ecbba4d709a1',
        name: 'Ghost Pepper Poppers',
        status: 'Want to Try',
        diet: 'Vegetarian',
      },
      {
        id: '5c986b74-fa02-4a22-98f2-b1ff3559e85e',
        name: 'A Little More Chowder Now',
        status: 'Recommended',
        diet: 'Pescetarian',
      },
      {
        id: 'c113411d-1589-414f-a283-daf7eedb631e',
        name: 'Full Laptop Battery',
        status: 'Do Not Recommend',
        diet: 'Keto',
      },
    ],
  }),
  getters: {
    getDishById:
      (state: any) =>
      (id: string): Dish =>
        state.list.find((dish: Dish) => dish.id === id),
    getIndexByDish:
      (state: any) =>
      (payload: Dish): number =>
        state.list.findIndex((d: Dish) => d.id === payload.id),
  },
  actions: {
    addDish(payload: Dish): void {
      this.list.push(payload)
    },
    editDish(payload: Dish): void {
      this.list[this.getIndexByDish(payload)] = payload
    },
    deleteDish(payload: Dish): void {
      const index = this.getIndexByDish(payload)
      if (index !== -1) {
        this.list.splice(index, 1)
      }
    },
  },
})
