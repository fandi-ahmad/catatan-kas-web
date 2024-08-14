import { cashFormated } from "../../function"

interface cardDataProps {
  note: string
  amount: number
  created_at: string
  type_cash: 'income' | 'spending'
}

const CardData = (props: cardDataProps) => {
  return (
    <div className="w-full px-3 py-2 mb-3 rounded-md border border-1 border-slate-300 dark:border-slate-600 flex justify-between items-end">
      <div>
        <p className="text-sm">{props.note}</p>
        <p className={`${props.type_cash === 'income' ? 'text-green-500' : 'text-red-500'} text-lg font-semibold`}>Rp. {cashFormated(props.amount)}</p>
      </div>
      <div>
        <p className="text-sm opacity-75">{props.created_at}</p>
      </div>
    </div>
  )
}

export default CardData