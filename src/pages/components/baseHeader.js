import logo from '../../assets/img/logo.png'
import '../../styles/components/baseHeader.css'

function baseHeader() {
    return (
        <header className = "base-header" >
            <img src={logo} className ="base-header-logo"></img>
        </header>
    );
}

export default baseHeader;