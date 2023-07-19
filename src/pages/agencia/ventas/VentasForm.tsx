import { FormEvent, useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { clienteAxios } from '../../../config/clienteAxios';
import { handlerAxiosError } from '../../../helpers/handlerAxiosError';
import { IVenta } from '../../../interfaces/venta.interface';
import { ComboClientes } from './ComboClientes';
import { ComboViajes } from './ComboViajes';

interface IVentasFormProps {
  setRefresshVentas: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VentasForm = ({ setRefresshVentas: setRefreshViajes }: IVentasFormProps) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [ok, setOk] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const { form, onInputChange, onSelectChange, onCheckBoxChange, onResetForm } = useForm<IVenta>({
    idcliente: 0,
    fechasalida: currentDate,
    idviaje: 0,
    segurocancelacion: false
  });

  const { idcliente, fechasalida, idviaje, segurocancelacion } = form;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const venta: IVenta = {
      idcliente: idcliente,
      fechasalida: fechasalida,
      idviaje: idviaje,
      segurocancelacion: segurocancelacion
    };
    try {
      setLoading(true);
      setErrorMsg('');
      await clienteAxios.post<IVenta>('/ventas', venta);
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

  return (
    <>
      <form onSubmit={onSubmit}>
        <ComboClientes setSelected={onSelectChange} activa={idcliente} />
        <div className="form-group">
          <label htmlFor="fechasalida">Fecha de salida</label>
          <input className="form-control" id="fechasalida" type="date" value={fechasalida.toISOString().slice(0, 10)} onChange={onInputChange} required />
        </div>

        <ComboViajes setSelected={onSelectChange} activa={idviaje} />
        <div className='form-group'>
          <input type="checkbox" className='form-check-input' id='segurocancelacion' onChange={onCheckBoxChange} defaultChecked={segurocancelacion} />
          <label htmlFor="segurocancelacion">Se incluye seguro de cancelación</label>
        </div>

        <button className="btn btn-success mt-4" type="submit">
          Agregar venta
        </button>
      </form>

      {loading && (
        <div className="alert alert-warning" role="alert">
          Agregando venta...
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
