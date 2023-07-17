import { FormEvent, useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { clienteAxios } from '../../../config/clienteAxios';
import { handlerAxiosError } from '../../../helpers/handlerAxiosError';
import { IViaje } from '../../../interfaces/viaje.interface';
import { ComboMayoristas } from './ComboMayoristas';

interface IViajesFormProps {
  setRefreshViajes: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ViajesForm = ({ setRefreshViajes: setRefreshViajes }: IViajesFormProps) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [ok, setOk] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { form, onInputChange, onSelectChange, onResetForm } = useForm<IViaje>({
    nombre: '',
 idmayorista: 0,
    duracion: 0,
    precio: 0
  });

  const { nombre, idmayorista, duracion, precio } = form;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const viaje: IViaje = {
      nombre: nombre,
      idmayorista: idmayorista,
     duracion: duracion,
      precio: precio
    };
    try {
      setLoading(true);
      setErrorMsg('');
      await clienteAxios.post<IViaje>('/viajes', viaje);
      setLoading(false);
      onResetForm();
      setRefreshViajes(true);
      setOk(true);
    } catch (error) {
      setOk(false);
      setLoading(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  const validForm = (): boolean => {
    return (
      nombre.trim() !== '' &&
      duracion >= 0 &&
      duracion.toString().trim() !== '' &&
      precio >= 0 &&
      precio.toString().trim() !== ''
    );
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input className="form-control" id="nombre" type="text" value={nombre} onChange={onInputChange} maxLength={20} title='Se permiten 20 caracteres como máximo' required/>
        </div>

        <ComboMayoristas setSelected={onSelectChange} activa={idmayorista} />

        <div className="form-group">
          <label htmlFor="duracion">Duración</label>
          <input className="form-control" id="duracion" type="number" value={duracion} onChange={onInputChange} min={1} title='La duración mínima no puede ser menor que un día' required/>
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio</label>
          <input className="form-control" id="precio" type="number" value={precio} onChange={onInputChange} min={0} title='Aquí pone lo que cuesta el viaje' required/>
        </div>

        <button className="btn btn-success mt-4" type="submit" disabled={!validForm()}>
          Agregar viaje
        </button>
      </form>

      {loading && (
        <div className="alert alert-warning" role="alert">
          Agregando viaje...
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
