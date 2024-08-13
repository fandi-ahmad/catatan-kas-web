import BaseButton from "../components/Button/BaseButton"
import CardData from "../components/Cards/CardData"
import Modal from "../components/Modal"
import { useState } from "react"

const Home = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="px-4 sm:px-6">
      
      <div className="bg-blue-500 rounded-md px-6 py-8 text-white">
        <p className="text-sm">Uangmu Sekarang</p>
        <div className="text-2xl flex flex-row items-center mt-1">
          <i className="fa-solid fa-wallet"></i>
          <p className="ms-2 font-bold">Rp. 250,000</p>
        </div>
      </div>

      <div className="mt-4">
        <BaseButton color="green" text="Pemasukan" className="me-2" onClick={openModal} />
        <BaseButton color="red" text="Pengeluaran" />
      </div>

      <div className="mt-4">
        <CardData note="saldo awal" amount="300,000" type_cash="income" created_at="11:43, 13/08/2024" />
        <CardData note="beli bahan dapur" amount="50,000" type_cash="spending" created_at="12:03, 13/08/2024" />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold mb-4">Ini Modalnya!</h2>
        <p>Konten modal bisa di sini.</p>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          onClick={closeModal}
        >
          Tutup Modal
        </button>
      </Modal>
      
    </div>
  )
}

export default Home
