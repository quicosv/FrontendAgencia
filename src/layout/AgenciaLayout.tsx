import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { aplicacion } from "../variables/titulos";
import { Navbar } from "../components/Navbar";
import { useContext, useEffect } from "react";
import { IUsuarioInfoContext } from "../interfaces/context.interface";
import { AppContext } from "../context/AppContext";

export const AgenciaLayout = () => {
	const { usuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);
	const navigate = useNavigate();
	const location = useLocation();
	const esRutaAbierta = (ruta: string): boolean => {
		let resultado;
		if (ruta === '/' || ruta === '/catalogo') {
			resultado = true;
		}
		else {
			resultado = false;
		}
		return resultado;
	};
	useEffect(() => {
		if (usuarioInfo.rol === 0 && !esRutaAbierta(location.pathname)) {
			navigate('/login', {
				replace: true
			});
		};
		if (usuarioInfo.rol === 2 && location.pathname.includes('usuarios')) {
			navigate('/login', {
				replace: true
			});
		};
	},[location.pathname]);
	return (
		<>
			<header>
				<h1>{aplicacion}</h1>
				<Navbar />
			</header>
			<main className="container mt-2">
				<Outlet />
			</main>
			<footer>
				<p>&copy; 2023 {aplicacion}.</p>
			</footer>
		</>
	);
};
