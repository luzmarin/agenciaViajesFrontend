import { useState } from "react";

//Constante del menú del login para que se abra
export const Login = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);
    //Constante para abrirse
    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    }

//Crear un único objeto con su estado
    const [formdata, setFormData] = useState({
        email:"",
        password:"",
    })

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }) )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const{email, password} = formdata;

        //Se validan los datos del usuario
        if(email.trim() === "" || password.trim() === ""){
            alert("Todos los datos son obligatorios");
            return;
        }

        console.log("Login correctamente con:", email, password);

        //Se envían los datos al backend con fetch
        try {
            const response = await fetch(`${VITE_API}/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            
            if(!response.ok) {
                //El servidor responde con un error
                alert("no se ha podido entrar")
            }

            //Si se registra correctamente
            if (response.ok) {
                alert("Has entrado correctamente")
            }
        } catch (e) {
            alert("Tenemos un error");
            console.error(e)
        }
    };

    return (
        <>
        {/* Icono del login para acceder a la cuenta */}
            <div className="login">
                <div className="login-div" onClick={handleToggleMenu}>      {/* hacer click en el boton del login se despliega */}
                    <svg className="login-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={30} height={30}>
                        <path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z" /></svg>
                </div>
                
            {/* Abrir el menú del login-div para acceder a la cuenta */}
                {isOpen && (
                    <form className="loginForm" onSubmit={handleSubmit}>
                        <input className="loginForm-input" type="text"
                        placeholder="email"
                        value={formdata.email}
                        name="email"
                        onChange={handleChange} />

                        <input className="loginForm-input" type="password"
                        placeholder="contraseña"
                        value={formdata.password}
                        name="password"
                        onChange={(handleChange)}/>
                        <button className="loginForm-boton" type="submit">
                            Iniciar sesión
                        </button>
                    </form>
                )}
            </div>
        </>
    );
}