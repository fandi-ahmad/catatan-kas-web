import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";

export const RoutesTemplate = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default RoutesTemplate;