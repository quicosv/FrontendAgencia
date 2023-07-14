import { useEffect, useRef, useState } from "react";
import { h1Catalogo, tituloCatalogo } from "../../variables/titulos";
import { Link } from "react-router-dom";
import { clienteAxios } from "../../config/clienteAxios";
import { IViaje } from "../../interfaces/viaje.interface";
import { handlerAxiosError } from "../../helpers/handlerAxiosError";

export const CatalogoPage = () => {
	const [viajes, setViajes] = useState<IViaje[]>([]);
	const [ok, setOk] = useState<boolean>(true);
	const [errorMsg, setErrorMsg] = useState<string>('');
	useEffect(() => {
		document.title = tituloCatalogo;
	}, []);

	const h1Ref = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		if (h1Ref.current) {
			h1Ref.current.focus();
		}
	}, []);
useEffect(() => {
	getViajes();
},[]);
const getViajes = async () => {
	try {
		setErrorMsg('');
		const {data} = await clienteAxios.get<IViaje[]>('/viajes');
		setViajes(data);
		setOk(true);
	} catch (error) {
		setOk(false);
		const errores = await handlerAxiosError(error);
		setErrorMsg(errores);
	}
}
	return (
		<>
			<h1 ref={h1Ref} tabIndex={-1}>
				{h1Catalogo}
			</h1>
			{viajes?.length > 0 && (
				<ul>
					{viajes.map((x) => (
						<li key={x.idviaje}>{x.nombre} durante {x.duracion} días por {x.precio} euros.</li>
					))}
				</ul>
			)}
			{!ok && errorMsg && (
				<div className="alert alert-danger" role="status" aria-live="polite">
					{errorMsg}
				</div>
			)}
			<Link to="/">Ir a la página principal</Link>
		</>
	);
};
