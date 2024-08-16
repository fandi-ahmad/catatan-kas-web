import BaseButton from "../components/Button/BaseButton"
import CardData from "../components/Cards/CardData"
import TextInput from "../components/Inputs/TextInput"
import Modal from "../components/Modal"
import { useEffect, useState } from "react"
import { cashFormated, generateUniqueId } from "../function"
import getDataCashByType from "../function/dataCash/getDataCashByType"
import getDataCash from "../function/dataCash/getDataCash"
import { dataCashType } from "../interface"
import getCurrentYear from "../function/date/getCurrentYear"
import getCurrentMonth from "../function/date/getCurrentMonth"
import ButtonOption from "../components/Button/ButtonOption"
import getDataCashByMonth from "../function/dataCash/getDataCashByMonth"
import getDataCashByMonthType from "../function/dataCash/getDataCashByMonthType"

const Home = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isModalMonthOpen, setModalMonthOpen] = useState<boolean>(false);
  const [noteCash, setNoteCash] = useState<string>('')
  const [amountCash, setAmountCash] = useState<string>('')
  const [dateCash, setDateCash] = useState('')
  const [typeCash, setTypeCash] = useState<'income' | 'spending' | ''>('')
  const [textHeadModal, setTextHeadModal] = useState<string>('')

  const [allDataCash, setAllDataCash] = useState([])
  const [totalAmountCash, setTotalAmountCash] = useState<number>(0)

  const [isOpenDropdownFilter, setIsOpenDropdownFilter] = useState<boolean>(false)

  // filter
  const [filterTypeCash, setFilterTypeCash] = useState<'income' | 'spending' | ''>('')
  const [filterTotalAmountCash, setFilterTotalAmountCash] = useState<number>(0)
  const [filterYear, setFilterYear] = useState<number>(0)
  const [filterMonth, setFilterMonth] = useState<number>(0)

  // validation input
  const [isValidNoteCash, setIsValidNoteCash] = useState<boolean>(false)
  const [isValidAmountCash, setIsValidAmountCash] = useState<boolean>(false)
  const [isValidDateCash, setIsValidDateCash] = useState<boolean>(false)

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false)

  const openModal = (type: 'income' | 'spending', text: string) => {
    setTypeCash(type)
    setTextHeadModal(text)
    setModalOpen(true);
    setDateCash(getCurrentDate())
    setNoteCash('')
    setAmountCash('')
    setIsValidNoteCash(false)
    setIsValidAmountCash(false)
    setIsValidDateCash(false)
  };

  const closeModal = () => {
    setModalOpen(false);
    setTypeCash('')
  };

  const openModalMonth = () => {
    setModalMonthOpen(true)
  }

  const closeModalMonth = () => {
    setModalMonthOpen(false)
  }

  const getCurrentDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const currentTime = () => {
    setFilterMonth(getCurrentMonth())
    setFilterYear(getCurrentYear())
  }

  const formatDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSaveButton = () => {
    const unformattedAmount = amountCash.replace(/,/g, '');
    const numericAmount = Number(unformattedAmount)
    const trimmedNote = noteCash.trim()     /* <-- check space */

    !trimmedNote ? setIsValidNoteCash(true) : setIsValidNoteCash(false)
    !numericAmount ? setIsValidAmountCash(true) : setIsValidAmountCash(false)
    !dateCash ? setIsValidDateCash(true) : setIsValidDateCash(false)

    if (trimmedNote && numericAmount > 0 && dateCash) {
      const dataToSave = {
        id: generateUniqueId(),
        notes: noteCash,
        amount: numericAmount,
        type: typeCash,
        created_at: formatDate(dateCash)
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
      getDataInConditionFilter()
    }
  }

  const getAllDataByCurrentMonth = () => {
    const currentMonth = getCurrentMonth()
    const currentYear = getCurrentYear()

    const dataByMonth = getDataCashByMonth(currentMonth, currentYear)
    if (dataByMonth) {
      setAllDataCash(dataByMonth.data)
      setTotalAmountCash(dataByMonth.totalAmountCash)
    }
  }

  const handleFilterByTypeButton = (type: 'income' | 'spending') => {
    if (filterTypeCash == type) {
      setFilterTypeCash('')
      filterMonth ? saveDataByMonth() : getAllData()
    } else {
      setFilterTypeCash(type)
      filterMonth ? saveDataByMonthType(type) : saveDataByType(type)
    }
  }

  const handleFilterByMonthButton = () => {
    getDataInConditionFilter()
    closeModalMonth()
  }

  const getDataInConditionFilter = () => {
    filterMonth && filterTypeCash ? saveDataByMonthType() : null
    filterMonth && !filterTypeCash ? saveDataByMonth() : null
    !filterMonth && filterTypeCash ? saveDataByType() : null
    !filterMonth && !filterTypeCash ? getAllData() : null
  }

  // ====== part function for get data start ======

  const getAllData = () => {
    const dataToSave = getDataCash()
    if (dataToSave) {
      setAllDataCash(dataToSave.data)
      setTotalAmountCash(dataToSave.totalAmountCash)
    }
  }

  const saveDataByMonthType = (type?: 'income' | 'spending') => {
    const dataToSave = getDataCashByMonthType(filterMonth, filterYear, type || filterTypeCash)
    if (dataToSave) {
      setAllDataCash(dataToSave.data)
      setTotalAmountCash(dataToSave.totalAmountCash)
      setFilterTotalAmountCash(dataToSave.filterTotalAmountCash)
    }
  }

  const saveDataByMonth = () => {
    const dataToSave = getDataCashByMonth(filterMonth, filterYear)
    if (dataToSave) {
      setAllDataCash(dataToSave.data)
      setTotalAmountCash(dataToSave.totalAmountCash)
      setFilterTotalAmountCash(0)
    }
  }

  const saveDataByType = (type?: 'income' | 'spending') => {
    const dataToSave = getDataCashByType(type || filterTypeCash)
    if (dataToSave) {
      setAllDataCash(dataToSave.data)
      setTotalAmountCash(dataToSave.totalAmountCash)
      setFilterTotalAmountCash(dataToSave.filterTotalAmountCash)      
    }
  }

  // ====== part function for get data end ======

  const [idselected, setIdSelected] = useState<string>('')

  const confirmDelete = (id: string) => {
    setIsModalDeleteOpen(true)
    setIdSelected(id)
  }

  const deleteDataCashById = () => {
    const data = localStorage.getItem('dataCash')
    if (data) {
      const allData = JSON.parse(data)

      // Filter out the object with the matching id
      const updatedData = allData.filter((item: { id: string }) => item.id !== idselected);

      // Simpan kembali array yang sudah diperbarui ke localStorage
      localStorage.setItem('dataCash', JSON.stringify(updatedData));
      
      getDataInConditionFilter()
      setIsModalDeleteOpen(false);
    }
  }

  useEffect(() => {
    currentTime()
    getAllDataByCurrentMonth()
  }, [])

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
          <BaseButton color="green" text="Pemasukan" icon="fa-plus" textSize="text-xs sm:text-sm" className="me-2" onClick={() => openModal('income', 'pemasukan')} />
          <BaseButton color="red" text="Pengeluaran" icon="fa-plus" textSize="text-xs sm:text-sm" onClick={() => openModal('spending', 'pengeluaran')} />
        </div>

        <button onClick={() => setIsOpenDropdownFilter(!isOpenDropdownFilter)} className="text-xs sm:text-sm bg-slate-300 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-500 duration-150 rounded-md py-1 px-2">
          <span>Filter</span>
          <i className="fa-solid fa-filter ms-2"></i>
        </button>
      </div>

      {isOpenDropdownFilter ?
        <div className="mt-2">
          <div className="w-0 h-0 ms-auto border-b-[30px] border-b-slate-300 dark:border-b-slate-600 border-l-[40px] border-l-transparent"></div>
          
          <div className="bg-slate-300 dark:bg-slate-600 p-2 rounded-md rounded-tr-none -mt-3.5">
            <p>Filter berdasarkan:</p>
            <div className="mt-2 flex flex-row items-center text-xs">
              <button onClick={() => handleFilterByTypeButton('income')} className={`${filterTypeCash === 'income' ? 'bg-blue-500 text-white' : ''} py-1 px-3 rounded-full border-2 border-blue-500 me-2`}>
                Pemasukan
              </button>
              <button onClick={() => handleFilterByTypeButton('spending')} className={`${filterTypeCash === 'spending' ? 'bg-blue-500 text-white' : ''} py-1 px-3 rounded-full border-2 border-blue-500 me-3`}>
                Pengeluaran
              </button>

              <div className="w-0.5 h-6 bg-slate-500 dark:bg-slate-300 rounded-full me-3"></div>

              <button onClick={openModalMonth} className="py-1 px-3 rounded-full border-2 border-blue-500">
                <span>{filterMonth ? filterMonth+'/'+filterYear : 'Bulan'}</span>
                <i className="fa-solid fa-calendar ms-2"></i>
              </button>
            </div>

            <div className="mt-2">
              <p className="ms-2 text-2xl font-bold">Rp. {cashFormated(filterTotalAmountCash)}</p>
            </div>
          </div>
        </div>
      : null}

      <div className="mt-4">
        {allDataCash ? allDataCash.map((data: dataCashType) => (
          <CardData
            key={data.id}
            note={data.notes}
            amount={data.amount}
            type_cash={data.type}
            created_at={data.created_at}
            handleDelete={() => confirmDelete(data.id)}
          />
        )): null}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold mr-6 mb-4">Masukan jumlah {textHeadModal}</h2>
        <TextInput isError={isValidNoteCash} label="Catatan" placeholder="Catatan" value={noteCash} onChange={(e) => setNoteCash(e.target.value)} />
        <TextInput isError={isValidAmountCash} label="Jumlah" placeholder="0" icon="Rp" value={amountCash}
          onChange={(e) => {
            let formattedAmount = e.target.value.replace(/[^0-9]/g, '');
            if (formattedAmount === '0') formattedAmount = '';
            setAmountCash(formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
          }}
          inputMode="tel"
        />
        <TextInput isError={isValidDateCash} label="Tanggal" type="date" icon={<i className="fa-solid fa-calendar px-0.5"></i>} value={dateCash} onChange={(e) => setDateCash(e.target.value)} />

        <div className="flex justify-between mt-6">
          <BaseButton color="slate" text="Kembali" onClick={closeModal} />
          <BaseButton color="green" text="Simpan" onClick={handleSaveButton} />
        </div>
      </Modal>

      <Modal isOpen={isModalMonthOpen} onClose={closeModalMonth}>
        <div className="mx-20 text-lg">
          <button onClick={() => setFilterYear(filterYear - 1)}>
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <span className="mx-3">{filterYear}</span>
          <button onClick={() => setFilterYear(filterYear + 1)}>
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-4 text-sm">
          <ButtonOption text="Jan" isActive={filterMonth === 1 ? true : false} onClick={() => filterMonth === 1 ? setFilterMonth(0) : setFilterMonth(1)} />
          <ButtonOption text="Feb" isActive={filterMonth === 2 ? true : false} onClick={() => filterMonth === 2 ? setFilterMonth(0) : setFilterMonth(2)} />
          <ButtonOption text="Mar" isActive={filterMonth === 3 ? true : false} onClick={() => filterMonth === 3 ? setFilterMonth(0) : setFilterMonth(3)} />
          <ButtonOption text="Apr" isActive={filterMonth === 4 ? true : false} onClick={() => filterMonth === 4 ? setFilterMonth(0) : setFilterMonth(4)} />
          <ButtonOption text="Mei" isActive={filterMonth === 5 ? true : false} onClick={() => filterMonth === 5 ? setFilterMonth(0) : setFilterMonth(5)} />
          <ButtonOption text="Jun" isActive={filterMonth === 6 ? true : false} onClick={() => filterMonth === 6 ? setFilterMonth(0) : setFilterMonth(6)} />
          <ButtonOption text="Jul" isActive={filterMonth === 7 ? true : false} onClick={() => filterMonth === 7 ? setFilterMonth(0) : setFilterMonth(7)} />
          <ButtonOption text="Agu" isActive={filterMonth === 8 ? true : false} onClick={() => filterMonth === 8 ? setFilterMonth(0) : setFilterMonth(8)} />
          <ButtonOption text="Sep" isActive={filterMonth === 9 ? true : false} onClick={() => filterMonth === 9 ? setFilterMonth(0) : setFilterMonth(9)} />
          <ButtonOption text="Okt" isActive={filterMonth === 10 ? true : false} onClick={() => filterMonth === 10 ? setFilterMonth(0) : setFilterMonth(10)} />
          <ButtonOption text="Nov" isActive={filterMonth === 11 ? true : false} onClick={() => filterMonth === 11 ? setFilterMonth(0) : setFilterMonth(11)} />
          <ButtonOption text="Des" isActive={filterMonth === 12 ? true : false} onClick={() => filterMonth === 12 ? setFilterMonth(0) : setFilterMonth(12)} />
        </div>

        <div className="flex justify-between mt-8 text-sm">
          <BaseButton color="slate" text="Kembali" onClick={closeModalMonth} />
          <BaseButton color="green" text="Sesuaikan" onClick={handleFilterByMonthButton} />
        </div>
      </Modal>

      <Modal isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)}>
        <div className="w-20 h-20 rounded-full border-4 border-red-500 flex justify-center items-center text-5xl text-red-500 mx-auto">
          <i className="fa-solid fa-exclamation"></i>
        </div>
        <h2 className="font-medium mx-4 mt-4 text-center">Yakin ingin menghapus data kas ini?</h2>

        <div className="flex justify-center mt-4 text-sm">
          <BaseButton color="slate" text="Batal" onClick={() => setIsModalDeleteOpen(false)} className="me-4" />
          <BaseButton color="red" text="Ya, hapus" onClick={deleteDataCashById} />
        </div>
      </Modal>

    </div>
  )
}

export default Home