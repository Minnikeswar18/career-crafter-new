import logo from '../../assets/img/logo.png'
import '../../styles/components/baseHeader.css'

function BaseHeader() {

    const handleSignOut = () => {
        console.log('signing out')
        if(localStorage.getItem('jwt')){
            localStorage.removeItem('jwt')
            window.location.href = '/entry'
        }
    }

    return (
        <nav className="navbar bg-dark navbar-expand-lg">
            <div className="container-fluid">
                <a href = "/" ><img src={logo} alt="Bootstrap" className='logo ms-3' height="60"></img></a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-4">
                    <li className="nav-item me-3">
                    <a className="nav-link active home-button" aria-current="page" href="/home">
                        Home
                    </a>
                    </li>
                    <li className="nav-item me-3">
                    <a className="nav-link jobs-button" aria-current="page" href="/home">
                        Jobs
                    </a>
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
                        <a className="dropdown-item" href="/hire">
                            Hire Talent
                        </a>
                        </li>
                        <li>
                        <a className="dropdown-item" href="/">
                            My Hirings
                        </a>
                        </li>
                    </ul>
                    </li>
                </ul>
                </div>
                <button className="btn btn-outline-danger me-3" onClick={handleSignOut}>Sign out</button>
            </div>
        </nav>
    );
}

export default BaseHeader;