import { useEffect } from "react";
import { h1Home, tituloHome } from "../variables/titulos";
import { Link } from "react-router-dom";

export const HomePage = () => {
	useEffect(() => {
		document.title = tituloHome;
	}, []);
	return (
		<>
			<h1>{h1Home}</h1>
			<ul>
				<li>
					<Link to="/login">Acceso de empleados</Link>
				</li>
				<li>
					<Link to="/catalogo">Ir al catálogo</Link>
				</li>
			</ul>
		</>
	);
};
