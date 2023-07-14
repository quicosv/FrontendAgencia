import { useEffect, useState } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { clienteAxios } from '../../../config/clienteAxios';
import { handlerAxiosError } from '../../../helpers/handlerAxiosError';
import { ProductosModal } from './ProductosModal';
import { IViaje } from '../../../interfaces/viaje.interface';

interface IViajesTableProps {
  refreshViajes: boolean;
  setRefreshViajes: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ViajesTable = ({ refreshViajes: refreshViajes, setRefreshViajes: setRefreshViajes }: IViajesTableProps) => {
  const [showModificar, setShowModificar] = useState(false);
  const [viajeModal, setViajeModal] = useState<IViaje>({
    nombre: '',
    idmayorista: 0,
    duracion: 0,
    precio: 0
  });

  const [viajes, setViajes] = useState<IViaje[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [ok, setOk] = useState<boolean>(true);

  const confirm = (id: number | undefined) => {
    confirmDialog({
      message: '¿Estás seguro?',
      header: 'Eliminar viaje',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Sí',
      accept: () => deleteViaje(id),
	 ariaCloseIconLabel: 'Cerrar'
      //   reject
    });
  };

  useEffect(() => {
    if (refreshViajes) {
      getViajes();
    }
  }, [refreshViajes]);

  const getViajes = async () => {
    try {
      setErrorMsg('');
      const { data } = await clienteAxios.get<IViaje[]>('/viajes');
      setRefreshViajes(false);
      setViajes(data);
      setOk(true);
    } catch (error) {
      setOk(false);
      setRefreshViajes(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  const editViaje = (e: IViaje) => {
    setViajeModal(e);
    setShowModificar(true);
  };

  const deleteViaje = async (id: number | undefined) => {
    try {
      setErrorMsg('');
      await clienteAxios.delete<IViaje[]>(`/viajes/${id}`);
      setRefreshViajes(true);
      setOk(true);
    } catch (error) {
      setOk(false);
      setRefreshViajes(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  // PrimeReact datatable

  // Plantlla para dibujar los botones
  const actionBodyTemplate = (viaje: IViaje) => {
    return (
      <>
        <Button
          label="Modificar"
          className="p-button-rounded p-button-success p-mr-2"
          severity="warning"
          onClick={() => editViaje(viaje)}
        />

        <Button
          label="Eliminar"
          className="p-button-rounded p-button-success p-mr-2"
          severity="danger"
          onClick={() => confirm(viaje.idviaje)}
        />
      </>
    );
  };

  return (
    <>
      {viajes?.length > 0 && (
        <>
          <h2>Total viajes: {viajes.length}</h2>

          <DataTable
            value={viajes}
            paginator
            loading={refreshViajes}
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="{first} de {last} de un total de {totalRecords}"
            rows={10}
            rowsPerPageOptions={[10, 20, 50]}
          >
            <Column field=".nombre" header="Nombre" filter filterPlaceholder="Buscar" sortable></Column>
            <Column field="duracion" header="Duración" filter filterPlaceholder="Buscar" sortable></Column>
            <Column field="precio" header="Precio" filter filterPlaceholder="Buscar" sortable style={{ textAlign: 'right' }}></Column>
            <Column field="mayoristas.nombre" header="Vendedor" filter sortable></Column>
            <Column body={actionBodyTemplate}></Column>
          </DataTable>
          <ConfirmDialog />
          {showModificar && (
            <ViajesModal
              viaje={viajeModal}
              setShowModificar={setShowModificar}
              showModificar={showModificar}
              setRefreshViajes={setRefreshViajes}
            />
          )}
        </>
      )}
      {refreshViajes && (
        <div className="alert alert-warning" role="status" aria-live="polite">
          Actualizando viajes...
        </div>
      )}
      {!ok && errorMsg && !refreshViajes && (
        <div className="alert alert-danger" role="status" aria-live="polite">
          {errorMsg}
        </div>
      )}
    </>
  );
};

