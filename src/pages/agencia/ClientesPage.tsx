import { useEffect, useRef } from "react";
import { h1Clientes, tituloClientes } from "../../variables/titulos";

export const ClientesPage = () => {
	useEffect(() => {
		document.title = tituloClientes;
	}, []);
	const h1Ref = useRef(null);

	return (
		<h1 ref={h1Ref} tabIndex={-1}>
			{h1Clientes}
		</h1>
	);
};
