import logo from '../../assets/img/logo.png'
import '../../styles/components/baseHeader.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function BaseHeader() {

    const navigate = useNavigate();

    const handleSignOut = () => {
        console.log('signing out')
        if (localStorage.getItem('jwt')) {
            localStorage.removeItem('jwt')
            navigate('/');
        }
    }

    const toProfile = () => {
        navigate('/profile');
    }

    return (
        <nav className="navbar bg-dark navbar-expand-lg">
            <div className="container-fluid">
                <Link to="/" ><img src={logo} alt="Bootstrap" className='logo ms-3' height="60"></img></Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-4">
                        <li className="nav-item me-3">
                            <Link className="nav-link active home-button" aria-current="page" to="/home">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item me-3">
                            <Link className="nav-link jobs-button" aria-current="page" to="/jobs">
                                Jobs
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle people-button"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                People
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/hire">
                                        Hire Talent
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/myhirings">
                                        My Invites
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <button className="btn btn-outline-primary me-3" onClick={toProfile}>
                    <i className="far  fa-user profile-button" /> My Account
                </button>
                <button className="btn btn-outline-danger me-3" onClick={handleSignOut}>Sign out</button>
            </div>
        </nav>
    );
}

export default BaseHeader;