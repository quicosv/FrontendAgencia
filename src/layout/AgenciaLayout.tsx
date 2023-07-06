import { Outlet } from "react-router-dom";
import { aplicacion } from "../variables/titulos";
import { Navbar } from "../components/Navbar";

export const AgenciaLayout = () => {
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
