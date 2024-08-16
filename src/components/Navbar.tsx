import { useEffect, useState } from "react"

const Navbar = () => {
  const [navPosition, setNavPosition] = useState<number>(0)
  const [navWidth, setNavWidth] = useState<number>(0)

  const getSize = () => {
    const screenH = window.innerHeight
    const navbar = document.getElementById('navbar')
    const navH = navbar?.clientHeight
    if (navH) {
      let positionNav = screenH - navH
      setNavPosition(positionNav)
    }

    const header = document.getElementById('header')
    const headerW = header?.clientWidth
    if (headerW) {
      setNavWidth(headerW)      
    }
  }

  useEffect(() => {
    getSize()
  }, [])

  return (
    <div id="navbar" className="fixed px-4 sm:px-6 pb-2" style={{top: navPosition+'px', width: navWidth+'px'}}>
      <div className="px-5 py-3 flex justify-center rounded-full bg-slate-400 dark:bg-slate-700 bg-opacity-50 dark:bg-opacity-50 bg-background/95 backdrop-blur">
        <div className="text-xl">
          <button className="me-8">
            <i className="fa-solid fa-house"></i>
          </button>
          <button>
            <i className="fa-solid fa-gear"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar