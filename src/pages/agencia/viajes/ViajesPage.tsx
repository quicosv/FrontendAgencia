import { useEffect, useRef, useState } from "react";
import { h1Viajes, tituloViajes } from "../../../variables/titulos";
import { ViajesForm } from "./ViajesForm";
import { ViajesTable } from "./ViajesTable";

export const ViajesPage = () => {
	useEffect(() => {
		document.title = tituloViajes;
	}, []);
	const h1Ref = useRef<HTMLHeadingElement>(null);
useEffect(() => {
	if(h1Ref.current) {
		h1Ref.current.focus();
	}
},[]);
const [refreshViajes, setRefreshViajes] = useState<boolean>(true);

	return (
		<>
		<h1 ref={h1Ref} tabIndex={-1}>
			{h1Viajes}
		</h1>
			  <div className="row">
				<div className="col">
				  <ViajesForm setRefreshViajes={setRefreshViajes} />
				</div>
				<div className="col">
				  <ViajesTable refreshViajes={refreshViajes} setRefreshViajes={setRefreshViajes} />
				</div>
			  </div>
			  </>		
	);
};
