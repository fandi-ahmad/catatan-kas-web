import { dataCashFilterType } from "../../../interface";
import filterByMonthYear from "../components/filterByMonthYear";
import getTotalAmountCash from "../components/getTotalAmountCash";

const getDataCashByMonthType = (month: number, year: number, typeCash: 'income' | 'spending' | '') => {
  const data = localStorage.getItem('dataCash')

  if (data) {
    const dataCash = JSON.parse(data)

    const filteredDataByMonthYear = filterByMonthYear(dataCash, month.toString(), year)

    const filteredDataByMonthType = filteredDataByMonthYear.filter((item: any) => item.type === typeCash);
    const totalAmount = filteredDataByMonthType.reduce((total: number, item: any) => total + item.amount, 0);
    const total = getTotalAmountCash(dataCash)
    
    const dataToSave: dataCashFilterType = {
      data: filteredDataByMonthType,
      totalAmountCash: total,
      filterTotalAmountCash: totalAmount
    }

    return dataToSave
  }
}

export default getDataCashByMonthType