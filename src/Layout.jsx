//Items para el layout
import { Outlet, NavLink } from "react-router";

export const Layout = () => {
    return ( 
        <>
            <Outlet />
            <nav className="nav">
                <ul className="nav-ul">
                    <li className="nav-li">
                        <NavLink className="nav-li a" to="/">Home</NavLink>
                    </li>
                    <li className="nav-li">
                        <NavLink className="nav-li a" to="/Catalogo">Viajes</NavLink>
                    </li>
                    <li className="nav-li">
                        <NavLink className="nav-li a" to="/Contacto">Contacto</NavLink>
                    </li>
                </ul>
            </nav>
        </>
     );
}