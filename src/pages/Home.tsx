import BaseButton from "../components/Button/BaseButton"
import CardData from "../components/Cards/CardData"
import TextInput from "../components/Inputs/TextInput"
import Modal from "../components/Modal"
import { useEffect, useState } from "react"
import { cashFormated, generateUniqueId, getCurrentDateTime } from "../function"

const Home = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [noteCash, setNoteCash] = useState<string>('')
  const [amountCash, setAmountCash] = useState<string>('')
  const [typeCash, setTypeCash] = useState<'income' | 'spending' | ''>('')
  const [textHeadModal, setTextHeadModal] = useState<string>('')

  const [allDataCash, setAllDataCash] = useState([])
  const [totalAmountCash, setTotalAmountCash] = useState<number>(0)

  // filter
  const [filterTypeCash, setFilterTypeCash] = useState<'income' | 'spending' | ''>('')
  const [filterTotalAmountCash, setFilterTotalAmountCash] = useState<number>(0)

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

      const total = dataCash.reduce((acc: number, item: dataCashType) => {
        if (item.type === "spending") {
          return acc - item.amount;
        } else if (item.type === "income") {
          return acc + item.amount;
        }
        return acc;
      }, 0);

      setTotalAmountCash(total)
    }
  }

  const filterDataByTypeCash = (type: 'income' | 'spending' | '') => {
    if (filterTypeCash == type) {
      setFilterTypeCash('')
      getDataCash()
      setFilterTotalAmountCash(0)
    } else {
      setFilterTypeCash(type)
      const data = localStorage.getItem('dataCash')
      if (data) {
        const dataCash = JSON.parse(data)
        
        const filteredData = type ? dataCash.filter((item: dataCashType) => item.type === type) : dataCash;
        const totalAmount = type ? filteredData.reduce((acc: number, item: dataCashType) => acc + item.amount, 0) : 0;
  
        setAllDataCash(filteredData)
        setFilterTotalAmountCash(totalAmount)
      }
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
          <p className="ms-2 font-bold">Rp. {cashFormated(totalAmountCash)}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-end">
        <div>
          <BaseButton color="green" text="Pemasukan" icon="fa-plus" className="me-2" onClick={() => openModal('income', 'pemasukan')} />
          <BaseButton color="red" text="Pengeluaran" icon="fa-plus" onClick={() => openModal('spending', 'pengeluaran')} />
        </div>

        <button className="bg-slate-300 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-500 duration-150 rounded-md py-1 px-2">
          <span>Filter</span>
          <i className="fa-solid fa-filter ms-2"></i>
        </button>
      </div>

      <div className="mt-2">
        <div className="w-6 h-6 bg-slate-300 dark:bg-slate-600 ms-auto rotate-45 rounded-md me-0.5"></div>
        <div className="bg-slate-300 dark:bg-slate-600 p-2 rounded-md rounded-tr-none -mt-3.5">
          <p>Filter berdasarkan:</p>
          <div className="mt-2">
            <button onClick={() => filterDataByTypeCash('income')} className={`${filterTypeCash === 'income' ? 'bg-blue-500 text-white' : ''} py-1 px-3 rounded-full border-2 border-blue-500 me-2`}>
              Pemasukan
            </button>
            <button onClick={() => filterDataByTypeCash('spending')} className={`${filterTypeCash === 'spending' ? 'bg-blue-500 text-white' : ''} py-1 px-3 rounded-full border-2 border-blue-500`}>
              Pengeluaran
            </button>
          </div>

          <div className="mt-2">
            <p className="ms-2 text-2xl font-bold">Rp. {cashFormated(filterTotalAmountCash)}</p>

          </div>
        </div>
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
