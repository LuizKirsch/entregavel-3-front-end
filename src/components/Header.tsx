import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header>
            <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/primeira">Primeira Aula</Link>
                        </li>
                        <li>
                            <Link to="/segunda">Segunda Aula</Link>
                        </li>
                        <li>
                            <Link to="/terceira">Terceira Aula</Link>
                        </li>
                        <li>
                            <Link to="/quarta">Quarta Aula</Link>
                        </li>
                    </ul>
                </nav>
        </header>
    )
}