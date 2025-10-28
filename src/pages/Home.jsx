import{ useState, useEffect } from 'react';

import { FormRegistro } from '../components/FormRegistro';

export const Home = ({imgList, autoPlay=false}) => {

    const [indice, setIndice] = useState(0);

    useEffect( ()=> {

        if(!autoPlay) return;

        const indice = setInterval( ()=> {
            handleNext();
        }, 2000);

        return () => {
            clearInterval(indice);
        }
    }, [indice, autoPlay]);

    const handlePrev = () => {
        const newIndex = (indice === 0)? imgList.length -1 : indice -1;
        setIndice(newIndex);
    }
    const handleNext = () => {
        const newIndex = (indice === imgList.length -1)? 0 : indice +1;
        setIndice(newIndex);
    }

    return ( 
    <>
        <div className="marca">
            <h1 className="marca-nombre">wanderlust</h1>
            <h2 className="marca-agencia">agencia</h2>
        </div>
        <div className="carrusel" >
            <div className="carrusel-container" style={{ transform: `translateX(-${indice * 100}%)`}}>
                {
                    imgList.map( (img, i) => (
                        <div className="carrusel-slide" key={i}>
                            <img src={img} alt={`imagen ${i+1}`} />
                            </div>
                    ))
                }
            </div>
        </div>

        {/*Formulario de registro que solo se va a mostrar en la pagina de Home*/}
        <FormRegistro />
    </>
    );
}