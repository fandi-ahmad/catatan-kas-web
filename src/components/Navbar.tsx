import { useState } from "react"

const Navbar = () => {
  const [iconTheme, setIconTheme] = useState('fa-sun')

  const toggleTheme = () => {
    const elementHtml = document.querySelector('html')
    const elementClass = elementHtml?.classList
    
    if (elementClass?.value) {
      if (elementClass?.value === 'light') {
        elementClass?.remove('light')
        elementClass?.add('dark')
        setIconTheme('fa-moon')
      } else {
        elementClass?.remove('dark')
        elementClass?.add('light')
        setIconTheme('fa-sun')
      }
    } else {
      elementClass?.add('dark')
      setIconTheme('fa-moon')
    }
  }

  return (
    <header className="sticky top-0 z-[29] w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6">
      <div className="flex h-10 sm:h-14 max-w-screen-2xl items-center">
        <div className="mr-4 md:flex">
          <a className="flex items-center font-bold text-sm sm:text-base">
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

export default Navbar
