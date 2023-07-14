import { ChangeEvent, useEffect, useState } from 'react';
import { clienteAxios } from '../../../config/clienteAxios';
import { handlerAxiosError } from '../../../helpers/handlerAxiosError';
import { IMayorista } from '../../../interfaces/mayorista.interface';

interface IComboMayoristasProps {
  setSelected: ({ target }: React.ChangeEvent<HTMLSelectElement>) => void;
  activa?: number;
}

  
export const ComboMayoristas = ({ setSelected, activa }: IComboMayoristasProps) => {
  const [mayoristas, setMayoristas] = useState<IMayorista[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [ok, setOk] = useState<boolean>(true);

  const getMayoristas = async () => {
    try {
      setErrorMsg('');
      const { data } = await clienteAxios.get<IMayorista[]>('/mayoristas');
      setMayoristas([{ nombre: 'Elige un mayorista', idmayorista: 0, contacto: '', direccion: '', telefono: '' }, ...data]);
      setOk(true);
    } catch (error) {
      setOk(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  useEffect(() => {
    getMayoristas();
  }, []);

  const selectedMayorista = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e);
  };

  return (
    <>
      {mayoristas && (
        <>
          <div className="form-group">
            <label htmlFor="mayoristas_idmayorista">Mayorista</label>
            <select className="form-select" id="mayoristas_idMayorista" onChange={selectedMayorista} value={activa}>
              {mayoristas.map((x) => (
                <option key={x.idmayorista} value={x.idmayorista}>
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
