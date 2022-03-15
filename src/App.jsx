import logo from "./logo.svg"
import "./App.css"
import List from "./components/List/list"
import { ToastContainer } from "react-toastify"

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <List></List>
                <ToastContainer
                    style={{
                        fontSize: "2vw",
                    }}
                    theme="colored"
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
