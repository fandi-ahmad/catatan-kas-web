import { dataCashType, dataCashFilterType } from "../../interface"

const getDataCashByType = (type: 'income' | 'spending' | '') => {
  const data = localStorage.getItem('dataCash')
  if (data) {
    const dataCash = JSON.parse(data)
    
    const filteredData = type ? dataCash.filter((item: dataCashType) => item.type === type) : dataCash;
    const totalAmount = type ? filteredData.reduce((acc: number, item: dataCashType) => acc + item.amount, 0) : 0;

    const dataToSave: dataCashFilterType = {
      data: filteredData,
      totalAmountCash: 0,
      filterTotalAmountCash: totalAmount
    }

    return dataToSave
  }
}

export default getDataCashByType