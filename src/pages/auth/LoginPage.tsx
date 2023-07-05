import { useEffect } from "react"
import { h1Login, tituloLogin } from "../../variables/titulos"

export const LoginPage = () => {
	useEffect(() => {
		document.title = tituloLogin;
	},[]);
	return (
		<h1>{h1Login}</h1>
	)
}