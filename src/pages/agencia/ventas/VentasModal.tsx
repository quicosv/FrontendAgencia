import { FormEvent, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { useForm } from '../../../hooks/useForm';
import { clienteAxios } from '../../../config/clienteAxios';
import { handlerAxiosError } from '../../../helpers/handlerAxiosError';
import { IVenta } from '../../../interfaces/venta.interface';
import { ComboClientes } from './ComboClientes';
import { ComboViajes } from './ComboViajes';

interface IVentasModalProps {
  venta: IVenta;
  setShowModificar: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshVentas: React.Dispatch<React.SetStateAction<boolean>>;
  showModificar: boolean;
}

export const VentasModal = ({
  venta: venta,
  setRefreshVentas: setRefreshVentas,
  setShowModificar,
  showModificar
}: IVentasModalProps) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [ok, setOk] = useState<boolean>(true);
  const { idventa: idventa } = venta;
  const { form, onInputChange, onSelectChange, onCheckBoxChange, } = useForm<IVenta>({
    idcliente: venta.idcliente,
    fechasalida: venta.fechasalida,
    idviaje: venta.idviaje,
    segurocancelacion: venta.segurocancelacion
  });

  const { idcliente, fechasalida, idviaje, segurocancelacion } = form;

  const hideModal = () => setShowModificar(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateVenta();
  };

  const updateVenta = async () => {
    try {
      setErrorMsg('');
      const venta: IVenta = {
        idcliente: idcliente,
        fechasalida: fechasalida,
        idviaje: idviaje,
        segurocancelacion: segurocancelacion
      };

      await clienteAxios.put<IVenta[]>(`/ventas/${idventa}`, venta);
      setShowModificar(false);
      setRefreshVentas(true);
      setOk(true);
    } catch (error) {
      setOk(false);
      setRefreshVentas(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  return (
    <>
      <Dialog
        ariaCloseIconLabel='Cerrar'
        header="Modificar venta"
        visible={showModificar}
        style={{ width: '50vw' }}
        onHide={() => setShowModificar(false)}
      >
        <form onSubmit={onSubmit}>
          <div className='form-group'>
          <ComboClientes setSelected={onSelectChange} activa={idcliente} />
            <label htmlFor="fechasalida">Fecha de salida</label>
            <input className="form-control" id="fechasalida" type="date" value={fechasalida.toLocaleDateString()} onChange={onInputChange} required />
          <ComboViajes setSelected={onSelectChange} activa={idviaje} />
            <input type="checkbox" className='form-check-input' id='segurocancelacion' onChange={onCheckBoxChange} defaultChecked={segurocancelacion} />
            <label htmlFor="segurocancelacion">Se incluye seguro de cancelación</label>
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
    </Dialog >
    </>
  );
};