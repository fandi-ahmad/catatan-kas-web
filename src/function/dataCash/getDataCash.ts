import { dataCashType, dataCashFilterType } from "../../interface"

const getDataCash = () => {
  const data = localStorage.getItem('dataCash')
  if (data) {
    const dataCash = JSON.parse(data)

    const total = dataCash.reduce((acc: number, item: dataCashType) => {
      if (item.type === "spending") {
        return acc - item.amount;
      } else if (item.type === "income") {
        return acc + item.amount;
      }
      return acc;
    }, 0);

    const dataToSave: dataCashFilterType = {
      data: dataCash,
      totalAmountCash: total,
      filterTotalAmountCash: 0
    }

    return dataToSave
  }
}

export default getDataCash