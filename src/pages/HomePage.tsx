import { useEffect, useRef } from "react";
import { h1Home, tituloHome } from "../variables/titulos";
import { Link } from "react-router-dom";

export const HomePage = () => {
	useEffect(() => {
		document.title = tituloHome;
	}, []);
	const h1Ref = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		if (h1Ref.current) {
			h1Ref.current.focus();
		}
	}, []);

	return (
		<>
			<h1 ref={h1Ref}>{h1Home}</h1>
			<ul>
				<li>
					<Link to="/login">Acceso de empleados</Link>
				</li>
				<li>
					<Link to="/catalogo">Ir al catálogo de viajes</Link>
				</li>
			</ul>
		</>
	);
};
