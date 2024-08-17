const DeleteDataCash = (id: string) => {
  const data = localStorage.getItem('dataCash')
  if (data) {
    const allData = JSON.parse(data)

    // Filter out the object with the matching id
    const updatedData = allData.filter((item: { id: string }) => item.id !== id);

    // Simpan kembali array yang sudah diperbarui ke localStorage
    localStorage.setItem('dataCash', JSON.stringify(updatedData));
  }
}

export default DeleteDataCash