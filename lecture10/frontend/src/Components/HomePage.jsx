import {Link} from 'react-router-dom'

export default function HomePage() { 
    return (
        <div>
            <h1>Home Page</h1>
            <a href="/register">Go to Register Page with an anchor tag</a>
            <br />
            <Link to="/register">Go to Register Page with a link</Link>
        </div>
    )
}