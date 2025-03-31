import type { restaurantStatusList, dietList, statusColorlist as statusColorList } from '@/constants'

export type Restaurant = {
  id: string
  name: string
  address: string
  website: string
  status: Status
  diet?: Diet
}

export type Dish = {
  id: string
  name: string
  status: Status
  diet?: Diet
}

type Status = typeof restaurantStatusList[number]
type Diet = typeof dietList[number]

export type StatusColorType = typeof statusColorList[number]
