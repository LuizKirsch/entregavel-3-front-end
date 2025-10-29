import Layout from "./layouts/Layout"
import { Routes, Route } from "react-router-dom"

export default function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/primeira" element={<h1>Primeira Aula</h1>} />
                <Route path="/segunda" element={<h1>Segunda Aula</h1>} />
                <Route path="/terceira" element={<h1>Terceira Aula</h1>} />
                <Route path="/quarta" element={<h1>Quarta Aula</h1>} />
            </Routes>
        </Layout>
    )
}