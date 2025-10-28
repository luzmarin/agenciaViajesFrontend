import { useState } from "react";

export const MenuDropDown = ({items}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleMenu =() => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className="menuHamburguesa">
            <button className="menuHamburguesa-button" onClick={handleToggleMenu}>Menu</button>

            { isOpen && ( <ul className="menuHamburguesa-ul">
                            { items.map( ({label, url}, idx) => (
                                <li className="menuHamburguesa-li" key={idx}>
                                    <a className="menuHamburguesa-a" href={url}>{label}</a>
                                </li>
                            ))}
                          </ul>)}
        </nav>
    )
}