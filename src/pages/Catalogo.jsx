import { useState, useEffect } from "react";
import { Footer } from "../components/Footer";


export const Catalogo = () => {
    const [travel, setTravel] = useState([]);
    const [filterTravel, setFilterTravel] = useState([]);
    const [filter, setFilter] = useState('all');

    //Guarda la selección de los viajes
    const [selectTravel, setSelectTravel] = useState(null);

    //Guarda los viajes favoritos
    const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favorites')) || [] );

    //Carga el carrito desde el almacenamiento local cuando se monta el componente
    const [carrito, setCarrito] = useState( () => {
        const guardarCarrito = localStorage.getItem('carrito');
        return guardarCarrito ? JSON.parse(guardarCarrito) : [];
    });

    const [verCarrito, setVerCarrito] = useState(false);

    //Mostrar el historial de compras
    const [verHistorial, setVerHistorial] = useState(false);

    //Estado para guardar las compras
    const [compras, setCompras] = useState(() => {
        const comprasGuardadas = localStorage.getItem("compras");
        return comprasGuardadas ? JSON.parse(comprasGuardadas) : [];
    });

    //Actualizar si cambian los datos en el localStorage
    useEffect(() => {
        const comprasGuardadas = localStorage.getItem("compras");
        if (comprasGuardadas) {
            setCompras(JSON.parse(comprasGuardadas));
        }
    }, [verHistorial])

    //Guardar el carrito en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    //Guardar favoritos en localStorage cuando cambien
    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    //Función abrir/cerrar
    const abrirModal = (travel) => setSelectTravel(travel);
    const cerrarModal = () => setSelectTravel(null);

    useEffect ( () =>{
        const fetchTravel = async ()=>{
            try{
                const response = await fetch('./datos.json');
                const data = await response.json();
                setTravel(data);            //Guardar todas los viajes
                setFilterTravel(data);      //Guarda todas los viajes filtrados
            } catch (e) {
                console.error('Error fetching travel:' , e);
            }
        };
        fetchTravel();
    }, []);

    useEffect(() => {
        let filtered = travel;

        switch (filter) {
            case 'travel':
                filtered = travel.filter(item => !item.isTravel);
                break;
            case 'favourites':
                filtered = travel.filter(item => favourites.includes(item.id));
                break;
            case 'discounted':
                filtered = travel.filter(item => item.isPromo);
                break;
            default:
                filtered = travel;
        }
        setFilterTravel(filtered);
    }, [filter, travel, favourites]);

        const toggleFavourite = (travelId) => {
            const newFavourites = favourites.includes(travelId)
                ? favourites.filter(id => id !== travelId)
                : [...favourites, travelId];

            setFavourites(newFavourites);
        };

        const añadirCarrito = async (travel) => {
            try {
                //Se envía la información de productos al backend
                const response = await fetch(`http://localhost:3000/api/v1/productos`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nombre: travel.viaje,
                        precio: travel.precio,
                        compras: travel.incluye
                    })
                });

                if (!response.ok) {
                    throw new Error("No se ha podido añadir al carrito");
                }

                //Si está bien, se añade
                if (!carrito.some(item => item.id === travel.id)) {
                    setCarrito([...carrito, travel]);
                }
            } catch (error) {
                console.error(error);
                alert("Error al añadir el viaje al carrito")
            }
        };

        const eliminarCarrito = (id) => {
            const nuevoCarrito = carrito.filter(item => item.id !== id);
            setCarrito(nuevoCarrito);
        };

        //Guarda una nueva compra y realiza el viaje de compra final
        const comprarCarrito = async (id) => {
            const viajeComprado = carrito.find(item => item.id === id);
            const nuevoCarrito = carrito.filter(item => item.id !== id);
            setCarrito(nuevoCarrito);

            try {
                //Se envia la información al backend
                const response = await fetch("http://localhost:3000/api/v1/compras", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nombre: viajeComprado.viaje,
                        precio: viajeComprado.precio,
                        producto: viajeComprado.id
                    })
                });

                //Si no se puede enviar
                if (!response.ok) {
                    throw new Error("No se pudo realizar la compra");
                }

                //Guardar en localStorage
                const comprasAnteriores = JSON.parse(localStorage.getItem("Compras")) || [];
                localStorage.setItem("compras", JSON.stringify([...comprasAnteriores, viajeComprado]));

                alert("Gracias por tu compra")
            } catch (error) {
                console.error(e);
                alert("Hay un error al hacer la compra")
            }
        };

    return ( 
        <>
        {/* Icono del carrito con la insignia del número*/}
        <div className="shop-div" onClick={() => setVerCarrito(!verCarrito)}>
            <svg className="shop-svg" xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
            </svg>
            {carrito.length > 0 && (
                <span className="shop-insignia">{carrito.length}</span>
            )}
        </div>
        <div className="cabecera">
            <h1 className="cabecera-titular">Grecia</h1>
            <h2 className="cabecera-fechas"> Ida 06/03/2026</h2>
            <h3 className="cabecera-fechaVuelta"> Vuelta 16/03/2026</h3>
            <picture>
                <img className="cabecera-img" src="uploads/greciaCabecera.jpg" alt="Grecia" loading="lazy"/>
            </picture>
        </div>
        
        <div>
            <div className="catalogo">
                <h1 className="catalogo-h1"></h1>
                <div className="catalogo-div">
                    <button
                        onClick = {() => setFilter('travel')}
                        className="botones">Viajes
                    </button>
                    <button
                        onClick = {() => setFilter('favourites')}
                        className="botones">Favoritos
                    </button>
                    <button
                        onClick = {() => setFilter('discounted')}
                        className="botones">Ofertas
                    </button>
                </div>
            </div>
            
            <div className="catalogo-viajes">
                {filterTravel.map(travel => (
                    <div key={travel.id} className="catalogo-viajes-filter">
                        <img
                            className="catalogo-viajes-img"
                            src={travel.imagen}
                            alt={travel.nombre}
                            loading="lazy"
                        />
                        <div className="catalogo-viajes-div">
                            <div className="catalogo-viajes-favoritos">
                                <h2 className="catalogo-viajes-h2">{travel.viaje}</h2>
                                <button
                                    onClick={()=>toggleFavourite(travel.id)}
                                    className="catalogo-viajes-toggleFavourite"
                                >
                                    {favourites.includes(travel.id) ? '♥️' : '💔'}
                                </button>
                            </div>
                            <p className="catalogo-viajes-p">{travel.descripción}</p>
                            <button 
                                onClick={()=>abrirModal(travel)}
                                className="catalogo-viajes-abrir">Ver
                            </button>
                        </div>
                    </div>
                    ))}
            </div>
        </div>
        
        {/* Esta parte del codigo del modal viajes la he investigado como realizarla en chatGPT.
        Lo he intentado resolver antes sin mirar pero no conseguía hacer lo que quería por lo que he
        tenido que mirar en dicha página.
        Despues de entender como se hace el modal de viajes, ya he conseguido realizar los otros dos
        modal del carrito y el historial de compras */}

        {/* Selección de la información de cada viaje pinchando en el boton de abrir y cerrar*/}
        {/* viajes */}
        {selectTravel && (
            <div className="modalTravel" onClick={cerrarModal}>
                <div className="modalTravel-div" onClick={(e) => e.stopPropagation()}> {/* stopPropagation: Evita la propragación adicional del evento */}
                    <h2 className="modalTravel-h2">{selectTravel.viaje}</h2>
                    <img className="modalTravel-img" src={selectTravel.imagen} alt={selectTravel.nombre} loading="lazy"/>
                    <button className="modalTravel-cerrar" onClick={cerrarModal}>X</button> {/* Boton para cerrar la selección del viaje que se quiera */}
                    <p className="modalTravel-datos">Precio {selectTravel.precio}</p>
                    <p className="modalTravel-datos">Ida {selectTravel.fechaIda}</p>
                    <p className="modalTravel-datos">Vuelta {selectTravel.fechaVuelta}</p>
                    <p className="modalTravel-datos">Incluye {selectTravel.incluye}</p>
                    {/* Boton para reservar el viaje que se quiera */}
                    <button className="modalTravel-boton"
                        onClick={() => {
                            añadirCarrito(selectTravel);
                            cerrarModal();      {/* Al pinchar en el boton de reservar se cierra la ventana */}
                        }}>
                        Reservar
                    </button>
                </div>
            </div>
        )}

        {/* carrito */}
        {/* Variable de estado booleano que controla si el modal se muestra o no. En este caso no se renderiza. */}
        {verCarrito && (
                <div className="modalCarrito" onClick={() => setVerCarrito(false)}>             {/* Al hacer click, se ejecuta setVerCarrito para cerrar el modal. */}
                    <div className="modalCarrito-div" onClick={(e) => e.stopPropagation()}>     {/* Se usa e.stopPropagation para que al hacer click dentro del contenido no se dispare el evento click que cerraría el modal. */}
                        <h2 className="modalCarrito-h2">Carrito de compras</h2>
                        {/* Si el carrito está vacio, muestra un mensaje */}
                        {carrito.length === 0 ? (
                            <p className="modalCarrito-p">No has reservado ningún viaje</p>
                        ) : (
                            <ul className="modalCarrito-ul">    {/* Si hay elementos en el carrito, los muestra en una lista. */}
                                {carrito.map((item) => (
                                    <li className="modalCarrito-li" key={item.id}>
                                        <img className="modalCarrito-img" src={item.imagen} alt={item.viaje} loading="lazy" />
                                        <div className="modalCarrito-info">
                                            <h3 className="modalCarrito-h3">{item.viaje}</h3>
                                            <p className="modalCarrito-precio">{item.precio}</p>
                                            <button className="modalCarrito-eliminar" onClick={() => eliminarCarrito(item.id)}>Eliminar</button>
                                            <button className="modalCarrito-comprar" onClick={() => comprarCarrito(item.id)}>Comprar</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button className="modalcarrito-historial" onClick={() => setVerHistorial(true)}>Que viajes he comprado</button>
                        <button className="modalCarrito-cerrar" onClick={() => setVerCarrito(false)}>X</button>
                    </div>
                </div>
            )}

        {/* Historial de compras */}
        {verHistorial && (
            <div className="historial" onClick={() => setVerHistorial(false)}>
                <div className="historial-div" onClick={(e) => e.stopPropagation()}>
                    <h2 className="historial-h2">Historial de compras</h2>
                    {compras.length === 0 ? (
                        <p className="historial-p">No has comprado ningun viaje.</p>
                    ) : (
                        <ul className="historial-ul">
                            {compras.map((item, idx) => (
                                <li className="historial-li" key={idx}>
                                    <img className="historial-img" src={item.imagen} alt="item.viaje" loading="lazy"/>
                                    <div className="historial-info">
                                        <h3>{item.viaje}</h3>
                                        <p>Precio: {item.precio}</p>
                                        <p>Fecha de ida: {item.fechaIda}</p>
                                        <p>Fecga de vuelta: {item.fechaVuelta}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    <button className="historial-cerrar" onClick={() => setVerHistorial(false)}>Cerrar</button>
                </div>
            </div>
        )}

        <Footer />
        </>

     );
};