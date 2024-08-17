import { dataCashType } from "../../../interface"

const UpdateDataCash = (dataToSave: dataCashType, idselected: string) => {
  const data = localStorage.getItem('dataCash')
  if (data) {
    const dataCash = JSON.parse(data)
    const index = dataCash.findIndex((item: dataCashType) => item.id === idselected);

    if (index !== -1) {
      // Perbarui objek pada index yang ditemukan
      dataCash[index] = { ...dataCash[index], ...dataToSave };
      // Simpan array yang telah diperbarui kembali ke localStorage
      localStorage.setItem('dataCash', JSON.stringify(dataCash));
    }

  }
}

export default UpdateDataCash