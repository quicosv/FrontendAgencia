import { FormEvent, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { useForm } from '../../../hooks/useForm';
import { clienteAxios } from '../../../config/clienteAxios';
import { handlerAxiosError } from '../../../helpers/handlerAxiosError';
import { ICliente } from '../../../interfaces/cliente.interface';

interface IClientesModalProps {
  cliente: ICliente;
  setShowModificar: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshClientes: React.Dispatch<React.SetStateAction<boolean>>;
  showModificar: boolean;
}

export const ClientesModal = ({
  cliente: cliente,
  setRefreshClientes: setRefreshClientes,
  setShowModificar,
  showModificar
}: IClientesModalProps) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [ok, setOk] = useState<boolean>(true);
  const { idcliente: idcliente } = cliente;
  const { form, onInputChange } = useForm<ICliente>({
    nombre: cliente.nombre,
    poblacion: cliente.poblacion,
    telefono: cliente.telefono
  });

  const { nombre, poblacion, telefono } = form;

  const hideModal = () => setShowModificar(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateCliente();
  };

  const updateCliente = async () => {
    try {
      setErrorMsg('');
      const cliente: ICliente = {
        nombre: nombre,
        poblacion: poblacion,
        telefono: telefono
      };
      await clienteAxios.put<ICliente[]>(`/clientes/${idcliente}`, cliente);
      setShowModificar(false);
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
      <Dialog
      ariaCloseIconLabel='Cerrar'
        header="Modificar cliente"
        visible={showModificar}
        style={{ width: '50vw' }}
        onHide={() => setShowModificar(false)}
      >
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input className="form-control" id="nombre" type="text" value={nombre} onChange={onInputChange} maxLength={30} title='Se permiten 30 caracteres como máximo' required />
            <label htmlFor="poblacion">Población</label>
            <input className="form-control" id="poblacion" type="text" value={poblacion} onChange={onInputChange} maxLength={40} title='Se permiten 40 caracteres como máximo' required />
            <label htmlFor="telefono">Teléfono</label>
            <input className="form-control" id="telefono" type="text" value={telefono} onChange={onInputChange} autoComplete='tel-local' required />
            <button className="btn btn-warning mt-4" type="submit">
              Guardar
            </button>
            <button className="btn btn-secondary mt-4" onClick={() => hideModal()}>
              Cancelar
            </button>
          </div>
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
