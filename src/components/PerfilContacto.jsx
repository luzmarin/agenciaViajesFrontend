export const PerfilContacto = ({userData}) => {
	const {nombre, img, email, direccion, horario } = userData;
	const {calle, ciudad} = direccion;

return (
		<>
		<div className="card">
			<picture>
                <img className="card-cabecera" src="uploads/plaza-michelangelo-florenciaCabecera.jpg" alt="Grecia" loading="lazy"/>
			</picture>
			<div className="card-titular">
				<span className="card-span">Vistas desde la plaza-michelangelo. Florencia</span>
			</div>
			<div className="card-datos">
				<picture className="card-picture">
					<img className="card-img" src={img} alt={nombre} loading="lazy" />
				</picture>
				<div className="card-div">
					<h1 className="card-h1">Contactanos si tienes alguna duda</h1>
					<h2 className="card-h2">{nombre}</h2>
					<p className="card-p">{horario}</p>
					<p className="card-p">{email}</p>
					<p className="card-p">{calle}, {ciudad}</p>
				</div>
			</div>
        </div>
        </>
	) };