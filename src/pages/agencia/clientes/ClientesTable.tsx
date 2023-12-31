import { useEffect, useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { clienteAxios } from "../../../config/clienteAxios";
import { handlerAxiosError } from "../../../helpers/handlerAxiosError";
import { ClientesModal } from "./ClientesModal";
import { ICliente } from "../../../interfaces/cliente.interface";

interface IClientesTableProps {
	refreshClientes: boolean;
	setRefreshClientes: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ClientesTable = ({
	refreshClientes: refreshClientes,
	setRefreshClientes: setRefreshClientes,
}: IClientesTableProps) => {
	const [showModificar, setShowModificar] = useState(false);
	const [clienteModal, setClienteModal] = useState<ICliente>({
		nombre: "",
		poblacion: "",
		telefono: "",
	});
	const [clientes, setClientes] = useState<ICliente[]>([]);

	const [errorMsg, setErrorMsg] = useState<string>("");
	const [ok, setOk] = useState<boolean>(true);

	const confirm = (id: number | undefined) => {
		confirmDialog({
			message: "¿Estás seguro?",
			id: "probando",
			ariaCloseIconLabel: "Cerrar",
			header: "Eliminar cliente",

			acceptClassName: "p-button-danger",
			acceptLabel: "Sí",
			accept: () => deleteCliente(id),
			//   reject
		});
	};

	useEffect(() => {
		if (refreshClientes) {
			getClientes();
		}
	}, [refreshClientes]);

	const getClientes = async () => {
		try {
			setErrorMsg("");
			const { data } = await clienteAxios.get<ICliente[]>("/clientes");
			setRefreshClientes(false);
			setClientes(data);
			setOk(true);
		} catch (error) {
			setOk(false);
			setRefreshClientes(false);
			const errores = await handlerAxiosError(error);
			setErrorMsg(errores);
		}
	};

	const editCliente = (e: ICliente) => {
		setClienteModal(e);
		setShowModificar(true);
	};

	const deleteCliente = async (id: number | undefined) => {
		try {
			setErrorMsg("");
			await clienteAxios.delete<ICliente[]>(`/clientes/${id}`);
			setRefreshClientes(true);
			setOk(true);
		} catch (error) {
			setOk(false);
			setRefreshClientes(false);
			const errores = await handlerAxiosError(error);
			setErrorMsg(errores);
		}
	};

	return (
		<>
			{clientes?.length > 0 && (
				<>
					<h2>Total clientes: {clientes.length}</h2>
					<table className="table">
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Población</th>
								<th>Teléfono</th>
								<th scope="col" colSpan={2}>
									Acciones
								</th>
							</tr>
						</thead>
						<tbody>
							{clientes.map((x) => (
								<tr key={x.idcliente}>
									<th className="table-cell" scope="row">
										{x.nombre}
									</th>
									<td>{x.poblacion}</td>
									<td>{x.telefono}</td>
									<td>
										<button
											className="btn btn-warning"
											onClick={() => editCliente(x)}
										>
											Modificar
										</button>
									</td>
									<td>
										<button
											id="cliente+{x.idcliente}"
											className="btn btn-danger"
											onClick={() => confirm(x.idcliente)}
										>
											Eliminar
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<ConfirmDialog />
					{showModificar && (
						<ClientesModal
							cliente={clienteModal}
							setShowModificar={setShowModificar}
							showModificar={showModificar}
							setRefreshClientes={setRefreshClientes}
						/>
					)}
				</>
			)}
			{refreshClientes && (
				<div className="alert alert-warning" role="status" aria-live="polite">
					Actualizando clientes...
				</div>
			)}
			{!ok && errorMsg && !refreshClientes && (
				<div className="alert alert-danger" role="status" aria-live="polite">
					{errorMsg}
				</div>
			)}
		</>
	);
};
