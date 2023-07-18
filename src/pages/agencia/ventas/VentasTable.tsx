import { useEffect, useState } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { clienteAxios } from '../../../config/clienteAxios';
import { handlerAxiosError } from '../../../helpers/handlerAxiosError';
import { IViaje } from '../../../interfaces/viaje.interface';
import { IVenta } from '../../../interfaces/venta.interface';
import { VentasModal } from './VentasModal';

interface IVentasTableProps {
  refreshVentas: boolean;
  setRefreshVentas: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VentasTable = ({ refreshVentas: refreshVentas, setRefreshVentas: setRefreshVentas }: IVentasTableProps) => {
  const [showModificar, setShowModificar] = useState(false);
  const [VentaModal, setVentaModal] = useState<IVenta>({
    idcliente: 0,
    fechasalida: new Date(),
    idviaje: 0,
    segurocancelacion: false,
  });
  
  const [ventas, setVentas] = useState<IVenta[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [ok, setOk] = useState<boolean>(true);

  const confirm = (id: number | undefined) => {
    confirmDialog({
      message: '¿Estás seguro?',
      header: 'Eliminar Venta',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Sí',
      accept: () => deleteViaje(id),
	 ariaCloseIconLabel: 'Cerrar'
      //   reject
    });
  };

  useEffect(() => {
    if (refreshVentas) {
      getVentas();
    }
  }, [refreshVentas]);

  const getVentas = async () => {
    try {
      setErrorMsg('');
      const { data } = await clienteAxios.get<IVenta[]>('/ventas');
      setRefreshVentas(false);
      setVentas(data);
      setOk(true);
    } catch (error) {
      setOk(false);
      setRefreshVentas(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  const editVenta = (e: IVenta) => {
    setVentaModal(e);
    setShowModificar(true);
  };

  const deleteViaje = async (id: number | undefined) => {
    try {
      setErrorMsg('');
      await clienteAxios.delete<IViaje[]>(`/viajes/${id}`);
      setRefreshVentas(true);
      setOk(true);
    } catch (error) {
      setOk(false);
      setRefreshVentas(false);
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
          onClick={() => editVenta(viaje)}
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
      {ventas?.length > 0 && (
        <>
          <h2>Total viajes: {ventas.length}</h2>

          <DataTable
            value={ventas}
            paginator
            loading={refreshVentas}
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="{first} de {last} de un total de {totalRecords}"
            rows={10}
            rowsPerPageOptions={[10, 20, 50]}
          >
            <Column field=".idcliente" header="Cliente" filter filterPlaceholder="Buscar" sortable></Column>
            <Column field="fechasalida" header="Fecha de salida" filter filterPlaceholder="Buscar" sortable></Column>
            <Column field="precio" header="Precio" filter filterPlaceholder="Buscar" sortable style={{ textAlign: 'right' }}></Column>
            <Column field="mayoristas.nombre" header="Vendedor" filter sortable></Column>
            <Column body={actionBodyTemplate}></Column>
          </DataTable>
          <ConfirmDialog />
          {showModificar && (
            <VentasModal
              venta={VentaModal}
              setShowModificar={setShowModificar}
              showModificar={showModificar}
              setRefreshVentas={setRefreshVentas}
            />
          )}
        </>
      )}
      {refreshVentas && (
        <div className="alert alert-warning" role="status" aria-live="polite">
          Actualizando ventas...
        </div>
      )}
      {!ok && errorMsg && !refreshVentas && (
        <div className="alert alert-danger" role="status" aria-live="polite">
          {errorMsg}
        </div>
      )}
    </>
  );
};

