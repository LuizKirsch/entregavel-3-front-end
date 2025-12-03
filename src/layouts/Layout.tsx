import { Header } from '../components/Header.tsx';
import Footer from "../components/Footer.tsx"; 
// import "./style.css";
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </div>
    )
}