import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const RedirectHome = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')
  }, [])

  return (
    <div>
      <h1>404</h1>
    </div>
  )
}

export default RedirectHome