import { dataCashType } from "../../../interface"

const CreateDataCash = (dataToSave: dataCashType) => {
  const data = localStorage.getItem('dataCash')
  if (data) {
    // sudah ada data, ambil dan tambahkan data yang baru
    let dataCash = JSON.parse(data)
    dataCash.unshift(dataToSave)
    localStorage.setItem('dataCash', JSON.stringify(dataCash))
  } else {
    // belum ada data, tambah data untuk pertama kali
    let data = []
    data.unshift(dataToSave)
    localStorage.setItem('dataCash', JSON.stringify(data))
  }
}

export default CreateDataCash