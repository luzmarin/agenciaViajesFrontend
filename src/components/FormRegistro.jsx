import { useState } from "react";


export const FormRegistro = () => {

    //CREAR UN ÚNICO OBJETO CON SU ESTADO   
    const [formdata, setFormData] = useState({
        nombre: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { nombre, email, password } = formdata;

        // Se validan los datos del usuario
        if (nombre.trim() === "" || email.trim() === "" || password.trim() === "") {
            alert("Todos los datos son obligatorios");
            return;
        }

        //Se envían los datos al backend con fetch
        try {
            const response = await fetch(`http://localhost:3000/api/v1/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre,
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                //El servidor responde con un error
                alert("no se ha podido registrar");
                return;
            }

            //Si se registra correctamente 
            if (response.ok) {
                alert(`Se ha registrado correctamente`);
                return
            }

        } catch (e) {
            alert("Tenemos un error");
            console.error(e)
        }
    };


    return (
        <>
            <h3 className="form-h3">regístrate</h3>

            { /* Formulario de registro */}
            <form className="form" onSubmit={handleSubmit}>
                <input className="form-input" type="text"
                    placeholder="nombre"
                    value={formdata.nombre}
                    name="nombre"
                    onChange={(handleChange)} />

                <input className="form-input" type="email"
                    placeholder="direccion"
                    value={formdata.email}
                    name="email"
                    onChange={(handleChange)} />

                <input className="form-input" type="password"
                    placeholder="contraseña"
                    value={formdata.password}
                    name="password"
                    onChange={(handleChange)} />
                <button className="form-button" type="submit">Registrarse</button>
            </form>


        </>
    );

}