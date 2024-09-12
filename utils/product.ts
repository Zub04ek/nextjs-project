import { getProducts } from '@/app/actions'
import { queryOptions } from '@tanstack/react-query'

export const productOptions = queryOptions({
  queryKey: ['products'],
  queryFn: getProducts,
})