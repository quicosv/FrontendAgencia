import { ChangeEvent, useEffect, useState } from 'react';
import { clienteAxios } from '../../../config/clienteAxios';
import { handlerAxiosError } from '../../../helpers/handlerAxiosError';
import { ICliente } from '../../../interfaces/cliente.interface';

interface IComboClientesProps {
  setSelected: ({ target }: React.ChangeEvent<HTMLSelectElement>) => void;
  activa?: number;
}

export const ComboClientes = ({ setSelected, activa }: IComboClientesProps) => {
  const [clientes, setClientes] = useState<ICliente[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [ok, setOk] = useState<boolean>(true);

  const getClientes = async () => {
    try {
      setErrorMsg('');
      const { data } = await clienteAxios.get<ICliente[]>('/clientes');
      setClientes([{ idcliente: 0, nombre: 'Selecciona un cliente', poblacion: '', telefono: '' }, ...data]);
      setOk(true);
    } catch (error) {
      setOk(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  const selectedCliente = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e);
  };

  return (
    <>
      {clientes && (
        <>
          <div className="form-group">
            <label htmlFor="clientes">Cliente</label>
            <select className="form-select" id="cliente" onChange={selectedCliente} value={activa}>
              {clientes.map((x) => (
                <option key={x.idcliente} value={x.idcliente}>
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