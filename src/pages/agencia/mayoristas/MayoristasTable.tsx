import { useEffect, useState } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { clienteAxios } from '../../../config/clienteAxios';
import { handlerAxiosError } from '../../../helpers/handlerAxiosError';
import { IMayorista } from '../../../interfaces/mayorista.interface';

interface IMayoristasTableProps {
  refreshMayoristas: boolean;
  setRefreshMayoristas: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MayoristasTable = ({ refreshMayoristas: refreshMayoristas, setRefreshMayoristas: setRefreshMayoristas }: IMayoristasTableProps) => {
  const [showModificar, setShowModificar] = useState(false);
  const [mayoristaModal, setMayoristaModal] = useState<IMayorista>({ nombre: '', telefono: '', direccion: '', contacto: '' });
  const [mayoristas, setMayoristas] = useState<IMayorista[]>([]);

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [ok, setOk] = useState<boolean>(true);

  const confirm = (id: number | undefined) => {
    confirmDialog({
      message: '¿Estás seguro?',
      ariaCloseIconLabel: 'Cerrar',
      header: 'Eliminar mayorista',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Sí',
      accept: () => deleteMayorista(id)
      //   reject
    });
  };

  useEffect(() => {
    if (refreshMayoristas) {
      getMayoristas();
    }
  }, [refreshMayoristas]);

  const getMayoristas = async () => {
    try {
      setErrorMsg('');
      const { data } = await clienteAxios.get<IMayorista[]>('/mayoristas');
      setRefreshMayoristas(false);
      setMayoristas(data);
      setOk(true);
    } catch (error) {
      setOk(false);
      setRefreshMayoristas(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  const editMayorista = (e: IMayorista) => {
    setMayoristaModal(e);
    setShowModificar(true);
  };

  const deleteMayorista = async (id: number | undefined) => {
    try {
      setErrorMsg('');
      await clienteAxios.delete<IMayorista[]>(`/clientes/${id}`);
      setRefreshMayoristas(true);
      setOk(true);
    } catch (error) {
      setOk(false);
      setRefreshMayoristas(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  return (
    <>
      {mayoristas?.length > 0 && (
        <>
          <h2>Total mayoristas: {mayoristas.length}</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
				<th>Dirección</th>
				<th>Contacto</th>
                <th scope='col' colSpan={2}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mayoristas.map((x) => (
                <tr key={x.idmayorista}>
                  <th className='table-cell' scope='row'>{x.nombre}</th>
                  <td>{x.telefono}</td>
				  <td>{x.direccion}</td>
				  <td>{x.contacto}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => editMayorista(x)}>
                      Modificar
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => confirm(x.idmayorista)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ConfirmDialog />
          {showModificar && (
            <mayoristaModal
              mayorista={mayoristaModal}
              setShowModificar={setShowModificar}
              showModificar={showModificar}
              setRefreshMayoristas={setRefreshMayoristas}
            />
          )}
        </>
      )}
      {refreshMayoristas && (
        <div className="alert alert-warning" role="status" aria-live="polite">
          Actualizando mayoristas...
        </div>
      )}
      {!ok && errorMsg && !refreshMayoristas && (
        <div className="alert alert-danger" role="status" aria-live="polite">
          {errorMsg}
        </div>
      )}
    </>
  );
};
function getMayoristas() {
	throw new Error('Function not implemented.');
}

