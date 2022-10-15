import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { useState } from "react";
import { ToastContainer } from "react-toastify";



export const App = () => {
  const [input, setInput] = useState('')


  const handleSubmit = (e) => {
    setInput(e)
  }
  return (
      <div>
      <Searchbar onSubmit ={handleSubmit} />
      <ImageGallery input={input} />
      <ToastContainer autoClose={3000} />
      </div>
  )
}