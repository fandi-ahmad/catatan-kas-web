import { dataCashFilterType } from "../../../interface"
import getTotalAmountCash from "../components/getTotalAmountCash"

const getDataCash = () => {
  const data = localStorage.getItem('dataCash')
  if (data) {
    const dataCash = JSON.parse(data)
    const total = getTotalAmountCash(dataCash)

    const dataToSave: dataCashFilterType = {
      data: dataCash,
      totalAmountCash: total,
      filterTotalAmountCash: 0
    }

    return dataToSave
  }
}

export default getDataCash