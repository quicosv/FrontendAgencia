import { useEffect, useRef } from "react";
import { h1Catalogo, tituloCatalogo } from "../../variables/titulos";


export const CatalogoPage = () => {
	useEffect(() => {
		document.title = tituloCatalogo;
	}, []);
	const h1Ref = useRef<HTMLHeadingElement>(null);
	useEffect(() => {
		if (h1Ref.current) {
			h1Ref.current.focus();
		}
	}, []);
	return <h1 ref={h1Ref} tabIndex={-1}>{h1Catalogo}</h1>;
};
