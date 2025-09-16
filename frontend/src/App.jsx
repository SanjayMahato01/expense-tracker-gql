import { Navigate, Route, Routes } from "react-router-dom"

import Header from "./components/ui/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignupPage";
import TransactionPage from "./pages/TransactionPage";
import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "./graphql/mutations/transaction.mutation";
import { Toaster } from "react-hot-toast";


const App = () => {
  const { loading, error, data } = useQuery(GET_AUTH_USER);

  if(loading) return null
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={data.authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!data.authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!data.authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/transaction/:id" element={data.authUser ? <TransactionPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
