import { FormEvent, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useForm } from "../../../hooks/useForm";
import { clienteAxios } from "../../../config/clienteAxios";
import { handlerAxiosError } from "../../../helpers/handlerAxiosError";
import { IViaje } from "../../../interfaces/viaje.interface";

interface IViajesModalProps {
	viaje: IViaje;
	setShowModificar: React.Dispatch<React.SetStateAction<boolean>>;
	setRefreshViajes: React.Dispatch<React.SetStateAction<boolean>>;
	showModificar: boolean;
}

export const ViajesModal = ({
	viaje: viaje,
	setRefreshViajes: setRefreshViajes,
	setShowModificar,
	showModificar,
}: IViajesModalProps) => {
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [ok, setOk] = useState<boolean>(true);
	const { idviaje } = viaje;
	const { form, onInputChange, onSelectChange } = useForm<IViaje>({
		nombre: viaje.nombre,
		duracion: viaje.duracion,
		precio: viaje.precio,
		idmayorista: viaje.idmayorista,
	});

	const { nombre, duracion, precio, idmayorista } = form;

	const hideModal = () => setShowModificar(false);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		updateViaje();
	};

	const updateViaje = async () => {
		try {
			setErrorMsg("");
			const viaje: IViaje = {
				nombre: nombre,
				duracion: duracion,
				precio: precio,
				idmayorista: idmayorista,
			};
			await clienteAxios.put<IViaje[]>(`/viajes/${idviaje}`, viaje);
			setShowModificar(false);
			setRefreshViajes(true);
			setOk(true);
		} catch (error) {
			setOk(false);
			setRefreshViajes(false);
			const errores = await handlerAxiosError(error);
			setErrorMsg(errores);
		}
	};

	return (
		<>
			<Dialog
				header="Modificar viaje"
				visible={showModificar}
				style={{ width: "50vw" }}
				onHide={() => setShowModificar(false)}
			>
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label htmlFor="nombre">Nombre</label>
						<input
							className="form-control"
							id="nombre"
							type="text"
							value={nombre}
							onChange={onInputChange}
							maxLength={20}
							title='Se permiten 20 caracteres como máximo' 
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="duracion">Duración</label>
						<input
							className="form-control"
							id="duracion"
							type="number"
							value={duracion}
							min={1}
							title='La duración mínima no puede ser menor que un día' 
							onChange={onInputChange}
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="precio">Precio</label>
						<input
							className="form-control"
							id="precio"
							type="number"
							value={precio}
							onChange={onInputChange}
							min={0}
							required
						/>
					</div>

					<button className="btn btn-warning mt-4" type="submit">
						Guardar
					</button>
					<button
						className="btn btn-secondary mt-4"
						onClick={() => hideModal()}
					>
						Cancelar
					</button>
				</form>
				{!ok && errorMsg && (
					<div className="alert alert-danger" role="status" aria-live="polite">
						{errorMsg}
					</div>
				)}
			</Dialog>
		</>
	);
};
