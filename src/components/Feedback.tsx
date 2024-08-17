import BaseButton from "./Button/BaseButton"
import TextInput from "./Inputs/TextInput"
import Modal from "./Modal"
import { useState } from "react"

const Feedback = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenSuccess, setIsOpenSuccess] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [isValidMessage, setIsValidMessage] = useState<boolean>(false)

  const clearInput = () => {
    setName('')
    setEmail('')
    setMessage('')
    setIsValidMessage(false)
  }

  const openModal = () => {
    setIsOpen(true)
    clearInput()
  }

  const handleSendMessageButton = async () => {
    !message ? setIsValidMessage(true) : setIsValidMessage(false)

    if (message) {
      setIsOpenSuccess(true)
      try {
        (function(){
          emailjs.init(import.meta.env.VITE_EMAIL_PUBLIC_KEY); // Account Public Key
        })();

        const params = {
          webapp_name: 'Catatan Kas',
          fullname: name ? name : 'unknow',
          email: email,
          message: message,
        };
    
        const serviceID = import.meta.env.VITE_EMAIL_SERVICE_ID; // Email Service ID
        const templateID = import.meta.env.VITE_EMAIL_TEMPLATE_ID; // Email Template ID
    
        await emailjs.send(serviceID, templateID, params)
      } catch (error) {
      }
    }
  }


  const closeModalSuccess = () => {
    setIsOpenSuccess(false)
    setIsOpen(false)
  }

  return (
    <>
      <div className='fixed bottom-3 right-3 text-white'>
        <button onClick={openModal} title='Berikan komentar' className='bg-blue-500 hover:bg-blue-400 duration-200 w-8 h-8 rounded-full'>
          <i className="fa-solid fa-message"></i>
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p className="text-xl font-semibold mb-2">Berikan komentarmu!</p>
        <p className="text-sm">Jika kamu punya masukan atau mau melaporkan masalah saat menggunakan aplikasi web ini, silahkan tulis di bawah ini.</p>

        <div className="mt-6">
          <div className="flex flex-col md:flex-row">
            <TextInput label="Nama" className="w-full md:me-2" value={name} onChange={(e) => setName(e.target.value)} />
            <TextInput label="Email" className="w-full md:ms-2" value={email} onChange={(e) => setEmail(e.target.value)} inputMode="email" type="email" />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Pesan<span className="text-red-500">*</span></label>
            <div className='flex flex-row items-stretch '>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6}
                className={`${isValidMessage ? 'border-red-400 border-2' : 'border-gray-400 focus:border-gray-500 border'} rounded-sm w-full py-2 px-3 text-gray-700 leading-tight outline-none resize-none`}
              ></textarea>
            </div>
            {isValidMessage? <p className="text-red-500 text-sm">Pesan tidak boleh kosong</p> : null}
          </div>
          <BaseButton onClick={handleSendMessageButton} text="Kirim pesan" color="blue" className="w-full py-2" />
        </div>
      </Modal>

      <Modal isOpen={isOpenSuccess} onClose={closeModalSuccess}>
        <div className="text-center">
          <i className="fa-regular fa-circle-check text-5xl text-green-500"></i>
          <p className="mt-2 mb-6 mx-4">Pesan berhasil terkirim!</p>
          <BaseButton color="slate" text="Kembali" onClick={closeModalSuccess} />
        </div>
      </Modal>
    </>
  )
}

export default Feedback
