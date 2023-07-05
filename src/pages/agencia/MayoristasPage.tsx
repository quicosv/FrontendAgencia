import { useEffect } from "react"
import { mayoristas } from "../../variables/titulos";

export const MayoristasPage = () => {
	useEffect(() => {
		document.title = mayoristas;
	},[]);
	return (
		<h1>Gestión de mayoristas</h1>
	)
}