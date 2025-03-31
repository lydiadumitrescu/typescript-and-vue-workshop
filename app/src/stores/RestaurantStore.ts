import type { Restaurant } from '@/types'
import { defineStore } from 'pinia'

type StoreShape = {
  list: Restaurant[]
}

export const useRestaurantStore = defineStore('RestaurantStore', {
  state: (): StoreShape => ({
    list: [
      {
        id: '9f995ce4-d2fc-4d00-af1d-6cb1647c6bd3',
        name: 'Quiche From a Rose',
        address: '283 Thisisnota St.',
        website: 'www.quichefromarose.com',
        status: 'Want to Try',
      },
      {
        id: 'ae62a3da-791b-4f44-99a1-4be1b0ec30b8',
        name: 'Tamago Never Dies',
        address: '529 Letsgofora Dr.',
        website: 'www.tamagoneverdies.com',
        status: 'Recommended',
        diet: 'Keto',
      },
      {
        id: '9b361dae-2d44-4499-9940-97e188d41a32',
        name: 'Penne For Your Thoughts',
        address: '870 Thisisa St.',
        website: 'www.penneforyourthoughts.com',
        status: 'Do Not Recommend',
      },
    ],
  }),
  getters: {
    getRestaurantById:
      (state: any) =>
      (id: string): Restaurant =>
        state.list.find((r: Restaurant) => r.id === id),
    getIndexByRestaurant:
      (state: any) =>
      (payload: Restaurant): number =>
        state.list.findIndex((r: Restaurant) => r.id === payload.id),
  },
  actions: {
    addRestaurant(payload: Restaurant): void {
      this.list.push(payload)
    },
    editRestaurant(payload: Restaurant): void {
      this.list[this.getIndexByRestaurant(payload)] = payload
    },
    deleteRestaurant(payload: Restaurant): void {
      const index = this.list.findIndex((restaurant) => restaurant.id === payload.id)
      if (index !== -1) {
        this.list.splice(index, 1)
      }
    },
  },
})
