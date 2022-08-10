import React, { useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import List from "./components/List/list"
import { ToastContainer } from "react-toastify"
import useWindowDimensions from "./Utils/utils"
import { LOWWIDTH } from "./Configs/config"
import Dropdown from "./components/Dropdown/dropdown"

function App() {
  document.title = "Market List - React App"

  const setLS = (key, value) => {
    localStorage.setItem(key, value)
  }

  const getLS = (key) => {
    const value = localStorage.getItem(key)
    if (value === null) return value
    else return value === "true"
  }

  const { width } = useWindowDimensions()
  const lowWidth = width <= LOWWIDTH

  const [darkmode, setDarkmode] = useState(getLS("darkmode"))
  const [labels, setLabels] = useState(getLS("labels") || !lowWidth)
  const [typingX, setTypingX] = useState(getLS("typingX"))

  return (
    <div className="App">
      <div className="d-flex flex-column">
        <div className="group-btn-options">
          <Dropdown
            darkmode={darkmode}
            setDarkmode={setDarkmode}
            labels={labels}
            setLabels={setLabels}
            typingX={typingX}
            setTypingX={setTypingX}
            getLS={getLS}
            setLS={setLS}
          />
        </div>
      </div>
      <header
        className={darkmode ? "App-header background-dark" : "App-header"}
      >
        <img src={logo} className="App-logo" alt="logo" />
        <List darkmode={darkmode} labels={labels} typingX={typingX}></List>
        <ToastContainer
          theme={darkmode ? "dark" : "colored"}
          limit={3}
          position={lowWidth ? "bottom-center" : "bottom-left"}
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
      </header>
    </div>
  )
}

export default App
