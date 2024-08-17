import { dataCashFilterType } from "../../../interface";
import filterByMonthYear from "../components/filterByMonthYear";
import getTotalAmountCash from "../components/getTotalAmountCash";

const getDataCashByMonth = (month: number, year: number) => {
  const data = localStorage.getItem('dataCash')
  if (data) {
    const dataCash = JSON.parse(data)
    
    const filteredDataByMonthYear = filterByMonthYear(dataCash, month.toString(), year)
    const total = getTotalAmountCash(dataCash)

    const dataToSave: dataCashFilterType = {
      data: filteredDataByMonthYear,
      totalAmountCash: total,
      filterTotalAmountCash: 0
    }

    return dataToSave
  }
}

export default getDataCashByMonth