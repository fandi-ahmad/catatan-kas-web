import { useState, useRef, useEffect } from "react"
import { cashFormated } from "../../function"

interface cardDataProps {
  note: string
  amount: number
  created_at: string
  type_cash: 'income' | 'spending'
  handleEdit?: () => void
  handleDelete?: () => void
}

const CardData = (props: cardDataProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Menambahkan event listener ketika dropdown terbuka
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    // Cleanup event listener ketika komponen unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className="w-full px-3 py-2 mb-3 rounded-md border border-1 border-slate-300 dark:border-slate-600 flex justify-between items-end">
        <div>
          <p className="text-sm">{props.note}</p>
          <p className={`${props.type_cash === 'income' ? 'text-green-500' : 'text-red-500'} text-lg font-semibold`}>Rp. {cashFormated(props.amount)}</p>
        </div>
        <div className="flex items-center" ref={dropdownRef}>
          <p className="text-sm opacity-75 me-3">{props.created_at}</p>
          <button id="actionDataButton" className="px-2" onClick={toggleDropdown}>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-7 -mt-2 w-32 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md shadow-lg z-10">
          <ul className=" text-sm">
            <li onClick={props.handleEdit} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer">
              <i className="fa-solid fa-pen-to-square w-6"></i>
              <span>Edit</span>
            </li>
            <li onClick={props.handleDelete} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer">
              <i className="fa-solid fa-trash w-6"></i>
              <span>Hapus</span>
            </li>
           
          </ul>
        </div>
      )}
    </>
  )
}

export default CardData