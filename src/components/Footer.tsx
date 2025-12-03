const texts = {
    footerText: "© 2024 Minha Aplicação. Todos os direitos reservados."
}

export default function Footer() {
    return (
        <footer className="footer">
            {texts.footerText}
        </footer>
    )
}