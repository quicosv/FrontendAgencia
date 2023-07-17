import { ChangeEvent, useEffect, useState } from 'react';
import { clienteAxios } from '../../../config/clienteAxios';
import { handlerAxiosError } from '../../../helpers/handlerAxiosError';
import { IViaje } from '../../../interfaces/viaje.interface';

interface IComboViajesProps {
  setSelected: ({ target }: React.ChangeEvent<HTMLSelectElement>) => void;
  activa?: number;
}

export const ComboViajes = ({ setSelected, activa }: IComboViajesProps) => {
  const [viajes, setViajes] = useState<IViaje[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [ok, setOk] = useState<boolean>(true);

  const getViajes = async () => {
    try {
      setErrorMsg('');
      const { data } = await clienteAxios.get<IViaje[]>('/viajes');
      setViajes([{idviaje: 0, duracion: 1, nombre: 'Selecciona un viaje', precio: 0.01, idmayorista: 0 }, ...data]);
      setOk(true);
    } catch (error) {
      setOk(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  useEffect(() => {
    getViajes();
  }, []);

  const selectedCliente = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e);
  };

  return (
    <>
      {viajes && (
        <>
          <div className="form-group">
            <label htmlFor="viajes">Viaje</label>
            <select className="form-select" id="viaje" onChange={selectedCliente} value={activa}>
              {viajes.map((x) => (
                <option key={x.idviaje} value={x.idviaje}>
                  {x.nombre}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      {!ok && errorMsg && (
        <div className="alert alert-danger" role="status" aria-live="polite">
          {errorMsg}
        </div>
      )}
    </>
  );
};