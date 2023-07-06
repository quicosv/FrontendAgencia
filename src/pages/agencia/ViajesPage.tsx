import { useEffect, useRef } from "react";
import { h1Viajes, tituloViajes } from "../../variables/titulos";

export const ViajesPage = () => {
	useEffect(() => {
		document.title = tituloViajes;
	}, []);
	const h1Ref = useRef(null);

	return (
		<h1 ref={h1Ref} tabIndex={-1}>
			{h1Viajes}
		</h1>
	);
};
