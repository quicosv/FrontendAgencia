import { useEffect } from "react"
import { home } from "../variables/titulos";

export const HomePage = () => {
	useEffect(() => {
		document.title = home;
	},[]);
	return (
		<h1>Página principal</h1>
	)
}