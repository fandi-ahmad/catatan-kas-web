import { useEffect, useState } from "react"
import { useGlobalState } from "../hook/useGlobalState"

const Header = () => {
  const [iconTheme, setIconTheme] = useState('fa-sun')
  const [isOpenSidebar, setIsOpenSidebar] = useGlobalState('isOpenSidebar')

  const toggleTheme = () => {
    const elementHtml = document.querySelector('html')
    const elementClass = elementHtml?.classList
    
    if (elementClass?.value) {
      if (elementClass?.value === 'light') {
        elementClass?.remove('light')
        elementClass?.add('dark')
        setIconTheme('fa-moon')
        localStorage.setItem('theme', 'dark')
      } else {
        elementClass?.remove('dark')
        elementClass?.add('light')
        setIconTheme('fa-sun')
        localStorage.setItem('theme', 'light')
      }
    } else {
      elementClass?.add('dark')
      setIconTheme('fa-moon')
      localStorage.setItem('theme', 'dark')
    }
  }

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme) {
      const elementHtml = document.querySelector('html')
      const elementClass = elementHtml?.classList
      elementClass?.add(theme)
      theme == 'dark' ? setIconTheme('fa-moon') : setIconTheme('fa-sun')
    }
  }, [])

  return (
    <header className="sticky top-0 z-[29] w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6">
      <div className="flex h-12 sm:h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <button className="text-lg" onClick={() => setIsOpenSidebar(!isOpenSidebar)}>
            <i className="fa-solid fa-bars"></i>
          </button>
          <div>
            <img src="/catatan-kas-logo.webp" alt="logo" className="ms-4 w-5 sm:w-6" />
          </div>
          <a className="flex items-center font-bold text-sm sm:text-base ms-2">
            Catatan Kas
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center">
            <div id="darkMode" onClick={toggleTheme} className="ml-auto flex float-right cursor-pointer text-center">
              <i className={`fa-solid ${iconTheme}`}></i>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header