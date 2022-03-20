import React, { useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import List from "./components/List/list"
import { ToastContainer } from "react-toastify"
import { Brightness7, NightsStay } from "@material-ui/icons"
import { Form } from "react-bootstrap"

function App() {
    const [darkmode, setDarkmode] = useState(false)

    return (
        <div className="App">
            <div className="btn-darkmode">
                <Brightness7 />
                <Form.Check
                    type="switch"
                    id="darkmode-switch"
                    name="darkmode"
                    checked={darkmode}
                    onChange={() => {
                        setDarkmode(!darkmode)
                    }}
                />
                <NightsStay />
            </div>
            <header
                className={
                    darkmode ? "App-header App-header-dark" : "App-header"
                }
            >
                <img src={logo} className="App-logo" alt="logo" />
                <List darkmode={darkmode}></List>
                <ToastContainer
                    className="toast-container"
                    theme="colored"
                    limit={3}
                    position="bottom-left"
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
