import React, { useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import List from "./components/List/list"
import { ToastContainer } from "react-toastify"
import { Brightness7, NightsStay } from "@material-ui/icons"
import { Form } from "react-bootstrap"
import useWindowDimensions from './Utils/utils'

function App() {
  const setLS = (key, value) => {
    localStorage.setItem(key, value)
  }

  const getLS = (key) => {
    const value = localStorage.getItem(key)
    if (value === null) return value
    else return value === 'true'
  }

  const { width } = useWindowDimensions()
  const lowWidth = width <= 480

  const [darkmode, setDarkmode] = useState(getLS('darkmode'))
  const [labels, setLabels] = useState(!(lowWidth || getLS('labels')))
  const [typingX, setTypingX] = useState(getLS('typingX'))

  return (
    <div className="App">
      <div className='d-flex flex-column'>
        <div className="group-btn-options">
          <div className="d-flex btn-option">
            {/* <Brightness7 /> */}
            <Form.Check
              type="switch"
              id="darkmode-switch"
              name="darkmode"
              checked={darkmode}
              onChange={() => {
                setLS('darkmode', !darkmode)
                setDarkmode(!darkmode)
              }}
            />
            {darkmode && <Brightness7 className='label-dark' /> || <NightsStay />}
          </div>
          <div className="d-flex btn-option">
            <Form.Check
              type="switch"
              id="labels-switch"
              name="labels"
              checked={labels}
              onChange={() => {
                setLS('labels', !labels)
                setLabels(!labels)
              }}
            />
            <label className={darkmode ? 'label-dark' : 'label'}>{labels ? 'No labels' : 'Labels'}</label>
          </div>
          <div className="d-flex btn-option">
            <Form.Check
              type="switch"
              id="typingX-switch"
              name="typingX"
              checked={typingX}
              onChange={() => {
                setLS('typingX', !typingX)
                setTypingX(!typingX)
              }}
            />
            <label className={darkmode ? 'label-dark' : 'label'}>{typingX ? '() mark' : 'X mark'}</label>
          </div>
        </div>
      </div>
      <header
        className={
          darkmode ? "App-header background-dark" : "App-header"
        }
      >
        <img src={logo} className="App-logo" alt="logo" />
        <List
          darkmode={darkmode}
          labels={labels}
          typingX={typingX}
        ></List>
        <ToastContainer
          theme={darkmode ? 'dark' : 'colored'}
          limit={3}
          position={lowWidth ? 'bottom-center' : 'bottom-left'}
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
