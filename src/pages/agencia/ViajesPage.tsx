import { useEffect } from "react"
import { viajes } from "../../variables/titulos";

export const ViajesPage = () => {
	useEffect(() => {
		document.title = viajes;
	},[]);
	return (
		<h1>Gestión de viajes</h1>
	)
}