import { dataCashType } from "../../../interface"

const UpdateDataCash = (dataToSave: dataCashType, idselected: string) => {
  const data = localStorage.getItem('dataCash')
  if (data) {
    const dataCash = JSON.parse(data)
    const index = dataCash.findIndex((item: dataCashType) => item.id === idselected);

    if (index !== -1) {
      // Perbarui objek pada index yang ditemukan
      dataCash[index] = { ...dataCash[index], ...dataToSave };
      
      // Urutkan kembali berdasarkan tanggal terbaru (format YYYY-MM-DD)
      dataCash.sort((a: dataCashType, b: dataCashType) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });

      // Simpan array yang telah diperbarui kembali ke localStorage
      localStorage.setItem('dataCash', JSON.stringify(dataCash));
    }

  }
}

export default UpdateDataCash