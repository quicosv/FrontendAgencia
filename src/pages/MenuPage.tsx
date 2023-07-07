import { useEffect } from "react"
import { h1Menu, tituloMenu } from "../variables/titulos"
import { Navbar } from "../components/Navbar";

export const MenuPage = () => {
	useEffect(() => {
		document.title = tituloMenu;
	});
	return (
		<>
		<h1>{h1Menu}</h1>
		<Navbar />
		</>
	)
}