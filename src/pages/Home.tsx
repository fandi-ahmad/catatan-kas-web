import BaseButton from "../components/Button/BaseButton"
import CardData from "../components/Cards/CardData"
import TextInput from "../components/Inputs/TextInput"
import Modal from "../components/Modal"
import { useEffect, useState } from "react"
import { generateUniqueId, getCurrentDateTime } from "../function"

const Home = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [noteCash, setNoteCash] = useState<string>('')
  const [amountCash, setAmountCash] = useState<string>('')
  const [typeCash, setTypeCash] = useState<'income' | 'spending' | ''>('')
  const [textHeadModal, setTextHeadModal] = useState<string>('')

  const [allDataCash, setAllDataCash] = useState([])

  const openModal = (type: 'income' | 'spending', text: string) => {
    setTypeCash(type)
    setTextHeadModal(text)
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setNoteCash('')
    setAmountCash('')
    setTypeCash('')
  };

  const handleSaveButton = () => {
    const unformattedAmount = amountCash.replace(/,/g, '');

    const dataToSave = {
      id: generateUniqueId(),
      notes: noteCash,
      amount: Number(unformattedAmount),
      type: typeCash,
      created_at: getCurrentDateTime()
    }
    
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

    closeModal()
    getDataCash()
  }

  const getDataCash = () => {
    const data = localStorage.getItem('dataCash')
    if (data) {
      const dataCash = JSON.parse(data)
      setAllDataCash(dataCash)
    }
  }

  useEffect(() => {
    getDataCash()
  }, [])

  interface dataCashType {
    id: string
    notes: string
    amount: number
    type: 'income' | 'spending',
    created_at: string
  }

  return (
    <div className="px-4 sm:px-6 pb-4">

      <div className="bg-blue-500 rounded-md px-6 py-8 text-white">
        <p className="text-sm">Uangmu Sekarang</p>
        <div className="text-2xl flex flex-row items-center mt-1">
          <i className="fa-solid fa-wallet"></i>
          <p className="ms-2 font-bold">Rp. 250,000</p>
        </div>
      </div>

      <div className="mt-4">
        <BaseButton color="green" text="Pemasukan" icon="fa-plus" className="me-2" onClick={() => openModal('income', 'pemasukan')} />
        <BaseButton color="red" text="Pengeluaran" icon="fa-plus" onClick={() => openModal('spending', 'pengeluaran')} />
      </div>

      <div className="mt-4">
        {allDataCash ? allDataCash.map((data: dataCashType) => (
          <CardData
            key={data.id}
            note={data.notes}
            amount={data.amount}
            type_cash={data.type}
            created_at={data.created_at}
          />
        )): null}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold mr-6 mb-4">Masukan jumlah {textHeadModal}</h2>
        <TextInput label="Catatan" placeholder="Catatan" value={noteCash} onChange={(e) => setNoteCash(e.target.value)} />
        <TextInput label="Jumlah" placeholder="0" icon="Rp" value={amountCash}
          onChange={(e) => {
            let formattedAmount = e.target.value.replace(/[^0-9]/g, '');
            if (formattedAmount === '0') formattedAmount = '';
            setAmountCash(formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
          }}
        />

        <div className="flex justify-between mt-6">
          <BaseButton color="slate" text="Kembali" onClick={closeModal} />
          <BaseButton color="green" text="Simpan" onClick={handleSaveButton} />
        </div>
      </Modal>

    </div>
  )
}

export default Home
