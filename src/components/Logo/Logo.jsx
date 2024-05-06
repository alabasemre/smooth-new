import { Link } from 'react-router-dom';

function Logo() {
    return (
        <div className='logo-container'>
            <Link to={'/'}>
                <h1>SMOOTH</h1>
            </Link>
        </div>
    );
}

export default Logo;
