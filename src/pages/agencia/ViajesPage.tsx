import { useEffect } from "react"
import { h1Viajes, tituloViajes } from "../../variables/titulos";

export const ViajesPage = () => {
	useEffect(() => {
		document.title = tituloViajes;
	},[]);
	return (
		<h1>{h1Viajes}</h1>
	)
}