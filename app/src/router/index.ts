import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/dishes',
      name: 'dishes',
      component: () => import('@/views/DishesPage.vue'),
      children: [
        { path: 'add', component: () => import('@/components/AddEditDishForm.vue') },
        { path: 'edit/:id', component: () => import('@/components/AddEditDishForm.vue') },
      ],
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: () => import('@/views/RestaurantsPage.vue'),
      children: [
        { path: 'add', component: () => import('@/components/AddEditRestaurantForm.vue') },
        { path: 'edit/:id', component: () => import('@/components/AddEditRestaurantForm.vue') },
      ],
    },
  ],
})

export default router
