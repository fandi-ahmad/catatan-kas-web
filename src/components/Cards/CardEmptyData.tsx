
const CardEmptyData = () => {
  return (
    <div className='w-full px-3 py-6 mb-3 rounded-md border border-1 border-slate-300 dark:border-slate-600 flex justify-center items-center'>
      <div className="text-center opacity-75">
        <i className="fa-solid fa-martini-glass-empty"></i>
        <p>Data tidak ditemukan</p> 
      </div>
    </div>
  )
}

export default CardEmptyData
