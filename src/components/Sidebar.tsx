import { useState } from "react";
import { useGlobalState } from "../hook/useGlobalState";
import Modal from "./Modal";
import BaseButton from "./Button/BaseButton";
import SidebarOption from "./Options/SidebarOption";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useGlobalState('isOpenSidebar')
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false)

  const toggleDelete = () => {
    setIsOpenModalDelete(!isOpenModalDelete)
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
          <SidebarOption icon="fa-file-export" text="Ekspor data" />
          <SidebarOption icon="fa-trash" text="Hapus semua data" onClick={toggleDelete} />
        </ul>
      </div>

      {/* Overlay untuk menutup sidebar jika diklik di luar sidebar */}
      {isOpenSidebar && (
        <div onClick={() => setIsOpenSidebar(!isOpenSidebar)} className="fixed inset-0 bg-black opacity-50"></div>
      )}

      <Modal isOpen={isOpenModalDelete} onClose={toggleDelete}>
        <div className="w-20 h-20 rounded-full border-4 border-red-500 flex justify-center items-center text-5xl text-red-500 mx-auto">
          <i className="fa-solid fa-exclamation"></i>
        </div>
        <h2 className="font-medium mx-4 mt-4 text-center">Yakin ingin menghapus semua data kas?</h2>

        <div className="flex justify-center mt-4 text-sm">
          <BaseButton color="slate" text="Batal" onClick={toggleDelete} className="me-4" />
          <BaseButton color="red" text="Ya, hapus" onClick={deleteAllData} />
        </div>
      </Modal>
    </>
  )
}

export default Sidebar