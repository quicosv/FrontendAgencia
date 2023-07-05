import { useEffect } from "react"
import { h1Home, tituloHome } from "../variables/titulos";

export const HomePage = () => {
	useEffect(() => {
		document.title = tituloHome;
	},[]);
	return (
		<h1>{h1Home}</h1>
	)
}