export interface dataCashType {
  id: string
  notes: string
  amount: number
  type: 'income' | 'spending'
  created_at: string
}

export interface dataCashFilterType {
  data: []
  totalAmountCash: number
  filterTotalAmountCash: number
}
