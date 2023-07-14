import { FormEvent, useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { clienteAxios } from '../../../config/clienteAxios';
import { handlerAxiosError } from '../../../helpers/handlerAxiosError';
import { ICliente } from '../../../interfaces/cliente.interface';

interface IClientesFormProps {
  setRefreshClientes: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ClientesForm = ({ setRefreshClientes: setRefreshClientes }: IClientesFormProps) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [ok, setOk] = useState<boolean>(true);
  const { form, onInputChange, onResetForm } = useForm<ICliente>({
    nombre: '',
    poblacion: '',
    telefono: ''
  });

  const { nombre, poblacion, telefono } = form;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const cliente: ICliente = {
      nombre: nombre,
      poblacion: poblacion,
      telefono: telefono
    };
    try {
      setLoading(true);
      setErrorMsg('');
      await clienteAxios.post<ICliente>('/clientes', cliente);
      setLoading(false);
      onResetForm();
      setOk(true);
      setRefreshClientes(true);
    } catch (error) {
      setOk(false);
      setLoading(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input className="form-control" id="nombre" type="text" value={nombre} onChange={onInputChange} maxLength={30} title='Se permiten 30 caracteres como máximo' required />
          <label htmlFor="poblacion">Población</label>
          <input className="form-control" id="poblacion" type="text" value={poblacion} onChange={onInputChange} maxLength={40} title='Se permiten 40 caracteres como máximo' required />
          <label htmlFor="telefono">Teléfono</label>
          <input className="form-control" id="telefono" type="tel" value={telefono} onChange={onInputChange} autoComplete='tel-local' required />
        </div>

        <button className="btn btn-success mt-4" type="submit">
          Agregar cliente
        </button>
      </form>

      {loading && (
        <div className="alert alert-warning" role="alert">
          Agregando cliente...
        </div>
      )}
      {!ok && errorMsg && !loading && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}
    </>
  );
};