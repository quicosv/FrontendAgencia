import { useEffect } from "react"
import { h1Mayoristas, tituloMayoristas } from "../../variables/titulos";

export const MayoristasPage = () => {
	useEffect(() => {
		document.title = tituloMayoristas;
	},[]);
	return (
		<h1>{h1Mayoristas}</h1>
	)
}