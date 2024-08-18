import { dataCashType } from "../../../interface";

const filterByMonthYear = (data: any, month: string, year: number) => {
  return data.filter((item: dataCashType) => {
    const [yearFilter, monthFilter] = item.created_at.split('-');
    const isMatch = monthFilter === String(month).padStart(2, '0') && yearFilter === String(year);
    return isMatch;
  });
}

export default filterByMonthYear