import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Home from "./components/home"

function App() {
  

    const wallet = {
        'wallet': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        'currencies': ['bitcoin', 'ether', 'monero', 'ether'],
    }

    const transactions = [
        {'hash': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'date': '12-32-2992', 'time': '29310927', 'id': '2', 'rec': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'amount': 3213431, 'usd': 3289.321, 'currency': 'bitcoin'},
        {'hash': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'date': '12-32-2992', 'time': '29310927', 'id': '2', 'rec': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'amount': 3213431, 'usd': 3289.321, 'currency': 'bitcoin'},
        {'hash': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'date': '12-32-2992', 'time': '29310927', 'id': '2', 'rec': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'amount': 3213431, 'usd': 3289.321, 'currency': 'bitcoin'},
        {'hash': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'date': '12-32-2992', 'time': '29310927', 'id': '2', 'rec': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'amount': 3213431, 'usd': 3289.321, 'currency': 'bitcoin'},
        {'hash': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'date': '12-32-2992', 'time': '29310927', 'id': '2', 'rec': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'amount': 3213431, 'usd': 3289.321, 'currency': 'bitcoin'},
    ]

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/dashboard" element={<Dashboard />}/>
            </Routes>
        </div>
    )
}

export default App
