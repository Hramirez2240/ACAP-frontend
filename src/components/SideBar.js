import {ReactComponent as HomeIcon} from '../img/HomeIcon.svg';
import {ReactComponent as SearchIcon} from '../img/SearchIcon.svg';
import {ReactComponent as RightIcon} from '../img/RightIcon.svg';
import {Link} from "react-router-dom";

function SideBar(){
    return(
        <div className='sideBarContainer'>
            <img className='CibaoLogo-img' src="https://invertix.com.do/wp-content/uploads/2019/05/logo-ACAP.jpeg" alt="CibaoLogo"/>
            <div className='containerInputSearch'>
                <input className='inputSearch' type="text" placeholder={"Buscar..."}/>
                <SearchIcon />
            </div>
            <div style={{margin: "0 0 5px 0"}}>
                <h2 className='inicioTitle'>Inicio</h2>
                <HomeIcon />
            </div>
            <hr className='lineOne'/>

            <div className='dropdown-links'>
                <RightIcon />
                <h4 className='busquedaTitle'>Búsqueda</h4>
                <div className='links'>
                    <span>
                        <Link to={"/cedula"}>Por Cedula</Link>
                    </span>
                    <span>
                        <Link to={"/aleatoria"}>Aleatoria</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SideBar;