import { createBrowserRouter } from 'react-router'

//Importar Layout
import {Layout} from '../../Layout'

//Importar las páginas
import { Home } from "../../pages/Home"
import { Catalogo } from "../../pages/Catalogo"
import { Contacto } from '../../pages/Contacto'

const listaImagenes= [
    "uploads/vistas-florencia.jpg",
    "uploads/tenerife-vistas.jpg",
    "uploads/barcelona.jpg"
  ]

export const router = createBrowserRouter([{
    path: '/',
    element: <Layout />,
    children: [
        {
            index: true,
            element: <Home imgList={listaImagenes} autoPlay />,
        },
        {
            path: '/Catalogo',
            element: <Catalogo />
        },
        {
            path: '/Contacto',
            element: <Contacto />
        }

    ]
}])