import { useEffect, useRef } from "react";
import { h1Ventas, tituloVentas } from "../../variables/titulos";

export const VentasPage = () => {
	useEffect(() => {
		document.title = tituloVentas;
	}, []);
	const h1Ref = useRef(null);

	return (
		<h1 ref={h1Ref} tabIndex={-1}>
			{h1Ventas}
		</h1>
	);
};
