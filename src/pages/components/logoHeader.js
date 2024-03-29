import logo from '../../assets/img/logo.png'
import '../../styles/components/logoHeader.css'

function LogoHeader() {
    return (
        <header className="base-header" >
            <img src={logo} className="base-header-logo"></img>
        </header>
    );
}

export default LogoHeader;