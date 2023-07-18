import { useEffect, useRef, useState } from "react";
import { h1Ventas, tituloVentas } from "../../../variables/titulos";
import { VentasForm } from "./VentasForm";
import { VentasTable } from "./VentasTable";

export const VentasPage = () => {
	useEffect(() => {
		document.title = tituloVentas;
	}, []);
	const h1Ref = useRef<HTMLHeadingElement>(null);
useEffect(() => {
	if (h1Ref.current) {
		h1Ref.current.focus();
	}
},[]);

const [refreshVentas, setRefreshVentas] = useState<boolean>(true);

	return (
		<>
		<h1 ref={h1Ref} tabIndex={-1}>
			{h1Ventas}
		</h1>
		<div className="row">
		<div className="col">
		  <VentasForm setRefresshVentas={setRefreshVentas} />
		</div>
		<div className="col">
		  <VentasTable refreshVentas={refreshVentas} setRefreshVentas={setRefreshVentas} />
		</div>
	  </div>
	  </>		
	);
};
