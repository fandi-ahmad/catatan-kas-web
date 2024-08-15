import { dataCashType } from "../../../interface";

const getTotalAmountCash = (data: dataCashType[]) => {
  return data.reduce((acc: number, item: dataCashType) => {
    if (item.type === "spending") {
      return acc - item.amount;
    } else if (item.type === "income") {
      return acc + item.amount;
    }
    return acc;
  }, 0);
}

export default getTotalAmountCash