import { useEffect, useRef, useState } from "react";
import { h1Clientes, tituloClientes } from "../../../variables/titulos";
import { ClientesTable } from "./ClientesTable";
import { ClientesForm } from "./ClientesForm";

export const ClientesPage = () => {
	const [refreshClientes, setRefreshClientes] = useState<boolean>(true);
	useEffect(() => {
		document.title = tituloClientes;
	}, []);
	const h1Ref = useRef<HTMLHeadingElement>(null);
	useEffect(() => {
		if (h1Ref.current) {
			h1Ref.current.focus();
		}
	}, []);
	return (
		<>
			<h1 ref={h1Ref} tabIndex={-1}>
				{h1Clientes}
			</h1>
			<div className="row">
				<div className="col">
					<ClientesForm setRefreshClientes={setRefreshClientes} />
				</div>
				<div className="col">
					<ClientesTable
						refreshClientes={refreshClientes}
						setRefreshClientes={setRefreshClientes}
					/>
				</div>
			</div>
		</>
	);
};
