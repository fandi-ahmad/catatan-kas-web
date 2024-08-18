import { dataCashType } from "../../../interface"

const CreateDataCash = (dataToSave: dataCashType) => {
  const data = localStorage.getItem('dataCash');
  let dataCash = data ? JSON.parse(data) : [];

  // Tambahkan data baru
  dataCash.push(dataToSave);

  // Urutkan berdasarkan tanggal terbaru (format YYYY-MM-DD)
  dataCash.sort((a: dataCashType, b: dataCashType) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  // Simpan kembali ke localStorage
  localStorage.setItem('dataCash', JSON.stringify(dataCash));
};


export default CreateDataCash