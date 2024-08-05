import "./App.scss";
import Login from "./components/Login/Login";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
function App() {
    return (
        <Router>
            <div className="app-container">
                {/* <Nav /> */}
                <Routes>
                    <Route path="/news" element="news" />
                    <Route path="/about" element="about" />
                    <Route path="/contact" element="contact" />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/" element="Home" />
                    <Route path="*" element="404 Not Found" />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
