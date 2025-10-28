import { useEffect, useState } from "react";

//Importar los archivos css
import './css/App.css'
import './css/Catalogo.css'
import './css/Home.css'
import './css/Layout.css'
import './css/MenuDropDown.css'
import './css/FormRegistro.css'
import './css/PerfilContacto.css'
import './css/Login.css'
import './css/Footer.css'

//Importar los componentes
import { MenuDropDown } from "./components/MenuDropDown";
import { Login } from "./components/Login"


//Enlaces de los menús hamburguesa y del login
const menuItems =[
  {label: "home", url: "./"},
  {label: "Viajes", url: "./Catalogo"},
  {label: "Contacto", url: "./Contacto"}
]

const loginItems = [
  {label: "Inicia sesión"},
  {label: "Regístrate"},
  {label: "Cerrar sesión"}  
]

function App() {

  return (
    <>
     <MenuDropDown items={menuItems} />
     <Login items={loginItems}/>
    </>
  );
}

export default App
