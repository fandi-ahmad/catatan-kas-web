import { useState } from "react";
import { useGlobalState } from "../hook/useGlobalState";
import Modal from "./Modal";
import BaseButton from "./Button/BaseButton";
import SidebarOption from "./Options/SidebarOption";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import { driver } from "driver.js";

const Sidebar = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useGlobalState('isOpenSidebar')
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [modalType, setModalType] = useState<'delete' | 'export'>('delete')

  const openModal = (type: 'delete' | 'export') => {
    setIsOpenModal(true)
    setModalType(type)
  }

  const deleteAllData = () => {
    localStorage.removeItem('dataCash')
    window.location.reload()
  }

  const navigate = useNavigate()
  const pathname = window.location.pathname

  const toPage = (route:string) => {
    navigate(route)
    setIsOpenSidebar(false)
  }

  const exportToExcel = () => {
    const data = localStorage.getItem('dataCash')
    
    // 2 = []
    if (data && data.length > 2) {
      const dataCash = JSON.parse(data)
    
      // Buat worksheet dari JSON data
      const worksheet = XLSX.utils.json_to_sheet(dataCash);
    
      // Buat workbook dan tambahkan worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
      // Buat file Excel dan trigger download
      XLSX.writeFile(workbook, 'data.xlsx');
    } else {
      openModal('export')
    }
  }

  const openGuide = () => {
    const runGuide = () => {
      const driverObj = driver({
        showProgress: true,
        steps: [
          { element: '#addDataContainer', popover: { title: 'Menambahkan data kas', description: 'Pilih salah satu untuk menambahkan jumlah pemasukan atau pengeluaran.' } },
          { element: '#filterButton', popover: { title: 'Filter', description: 'Untuk menampilkan data kas berdasarkan pemasukan, pengeluaran dan bulan yang dapat disesuaikan.' } },
          { element: '#actionDataButton', popover: { title: 'Aksi', description: 'Untuk memperbarui atau mengapus data kas' } },
          { element: '#feedbackButton', popover: { title: 'Pesan', description: 'Kirim pesan jika kamu punya masukan atau mau melaporkan masalah saat menggunakan aplikasi web ini 😊' } },
        ]
      });
      driverObj.drive();
    }

    if (pathname === '/') {
      setIsOpenSidebar(false)
      runGuide()
    } else {
      toPage('/')
      setTimeout(() => runGuide(), 200)
    }
  }

  return (
    <>
      <div className={`${isOpenSidebar ? "translate-x-0" : "-translate-x-full"} fixed z-[32] top-0 left-0 h-full w-64 bg-white dark:bg-slate-800 p-4 transform transition-transform`}>
        <div className="flex justify-end mb-4">
          <button onClick={() => setIsOpenSidebar(!isOpenSidebar)} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-500 text-lg">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <ul>
          <SidebarOption
            icon="fa-house"
            text="Utama"
            onClick={() => toPage('/')}
            isActive={pathname == '/' ? true : false}
          />
          
          <SidebarOption
            icon="fa-info-circle"
            text="Tentang"
            onClick={() => toPage('/about')}
            isActive={pathname == '/about' ? true : false}
          />

          
          <hr className="my-4" />
          <SidebarOption icon="fa-file-export" text="Ekspor data" onClick={exportToExcel} />
          <SidebarOption icon="fa-trash" text="Hapus semua data" onClick={() => openModal('delete')} />
          <SidebarOption icon="fa-circle-question" text="Panduan" onClick={openGuide} />
        </ul>
      </div>

      {/* Overlay untuk menutup sidebar jika diklik di luar sidebar */}
      {isOpenSidebar && (
        <div onClick={() => setIsOpenSidebar(!isOpenSidebar)} className="fixed inset-0 z-[31] bg-black opacity-50"></div>
      )}

      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        {modalType === 'delete' ? 
          <>
            <div className="w-20 h-20 rounded-full border-4 border-red-500 flex justify-center items-center text-5xl text-red-500 mx-auto">
              <i className="fa-solid fa-exclamation"></i>
            </div>
            <h2 className="font-medium mx-4 mt-4 text-center">Yakin ingin menghapus semua data kas?</h2>

            <div className="flex justify-center mt-4 text-sm">
              <BaseButton color="slate" text="Batal" onClick={() => setIsOpenModal(false)} className="me-4" />
              <BaseButton color="red" text="Ya, hapus" onClick={deleteAllData} />
            </div>
          </>
        :
          <>
            <h2 className="mx-4 mt-4 text-center text-lg">Data kas belum ada!</h2>
            <div className="flex justify-center mt-4 text-sm">
              <BaseButton color="slate" text="Kembali" onClick={() => setIsOpenModal(false)} />
            </div>
          </>
        }
      </Modal>
    </>
  )
}

export default Sidebar