import { useEffect, useRef } from "react";
import { h1Mayoristas, tituloMayoristas } from "../../variables/titulos";

export const MayoristasPage = () => {
	useEffect(() => {
		document.title = tituloMayoristas;
	}, []);
	const h1Ref = useRef<HTMLHeadingElement>(null);
useEffect(() => {
	if (h1Ref.current){
		h1Ref.current.focus();
	}
},[]);
	return (
		<h1 ref={h1Ref} tabIndex={-1}>
			{h1Mayoristas}
		</h1>
	);
};
