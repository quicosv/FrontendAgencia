import { useEffect, useState } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { clienteAxios } from '../../../config/clienteAxios';
import { handlerAxiosError } from '../../../helpers/handlerAxiosError';
import { IProducto } from '../../../interfaces/producto.interface';
import { ProductosModal } from './ProductosModal';

interface IProductosTableProps {
  refreshProductos: boolean;
  setRefreshProductos: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProductosTable = ({ refreshProductos, setRefreshProductos }: IProductosTableProps) => {
  const [showModificar, setShowModificar] = useState(false);
  const [productoModal, setProductoModal] = useState<IProducto>({
    descripcion: '',
    categorias_idCategoria: 0,
    existencias: 0,
    precio: 0
  });

  const [productos, setProductos] = useState<IProducto[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [ok, setOk] = useState<boolean>(true);

  const confirm = (id: number | undefined) => {
    confirmDialog({
      message: '¿Estás seguro?',
      header: 'Eliminar producto',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Sí',
      accept: () => deleteProducto(id)
      //   reject
    });
  };

  useEffect(() => {
    if (refreshProductos) {
      getProductos();
    }
  }, [refreshProductos]);

  const getProductos = async () => {
    try {
      setErrorMsg('');
      const { data } = await clienteAxios.get<IProducto[]>('/productos');
      setRefreshProductos(false);
      setProductos(data);
      setOk(true);
    } catch (error) {
      setOk(false);
      setRefreshProductos(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  const editProducto = (e: IProducto) => {
    setProductoModal(e);
    setShowModificar(true);
  };

  const deleteProducto = async (id: number | undefined) => {
    try {
      setErrorMsg('');
      await clienteAxios.delete<IProducto[]>(`/productos/${id}`);
      setRefreshProductos(true);
      setOk(true);
    } catch (error) {
      setOk(false);
      setRefreshProductos(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  // PrimeReact datatable

  // Plantlla para dibujar los botones
  const actionBodyTemplate = (producto: IProducto) => {
    return (
      <>
        <Button
          label="Modificar"
          className="p-button-rounded p-button-success p-mr-2"
          severity="warning"
          onClick={() => editProducto(producto)}
        />

        <Button
          label="Eliminar"
          className="p-button-rounded p-button-success p-mr-2"
          severity="danger"
          onClick={() => confirm(producto.idProducto)}
        />
      </>
    );
  };

  return (
    <>
      {productos?.length > 0 && (
        <>
          <h2>Total productos: {productos.length}</h2>

          {/* value es la propiedad donde especificaremos la colección de datos a visualizar (paises). paginator es para que salgan de forma automática los botones de desplazamiento
          loading hace aparecer un spinner de espera en la propia tabla. Aprovechamos el loading de nuestro hook useFetch para gestionar esto.
          paginaTorTemplate permite detallar qué botones de desplazamiento queremos ver. Hemos puesto algunos que aparecen en la documentación del componente
          rows son las filas que vemos por página. rowsPerPageOptions nos permite hacer un cambio de filas por página en un desplegable. */}
          <DataTable
            value={productos}
            paginator
            loading={refreshProductos}
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="{first} de {last} de un total de {totalRecords}"
            rows={10}
            rowsPerPageOptions={[10, 20, 50]}
          >
            {/* Aquí elegimos las columnas (Columns) que queremos ver */}
            {/* Primera columna. El nombre del producto. Gracias a filter y sortable, podemos incluir una opción de filtrado automático y una opción de ordenación al pulsar en la cabecera */}
            <Column field="descripcion" header="Descripción" filter filterPlaceholder="Buscar" sortable></Column>
            {/* La segunda columna es la descripción */}
            <Column field="categoria.descripcion" header="Categoría" filter sortable></Column>
            {/* La tercera columna son las existencias.  Incluimos un estilo de alineación por la derecha*/}
            <Column field="existencias" header="Existencias" sortable style={{ textAlign: 'right' }}></Column>
            {/* La cuarta columna es el precio.  Incluimos un estilo de alineación por la derecha*/}
            <Column field="precio" header="Precio" sortable style={{ textAlign: 'right' }}></Column>
            {/* Esta es la columna del botón. Se dibuja mediante la plantilla actionBodyTemplate*/}
            <Column body={actionBodyTemplate}></Column>
          </DataTable>
          {/*  <table className="table">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Existencias</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
               {productos.map((x) => (
                <tr key={x.idProducto}>
                  <td>{x.descripcion}</td>
                  <td>{x.categoria?.descripcion}</td>
                  <td>{x.existencias}</td>
                  <td>{x.precio}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => editProducto(x)}>
                      Modificar
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => confirm(x.idProducto)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))} 
            </tbody>
          </table>*/}
          <ConfirmDialog />
          {showModificar && (
            <ProductosModal
              producto={productoModal}
              setShowModificar={setShowModificar}
              showModificar={showModificar}
              setRefreshProductos={setRefreshProductos}
            />
          )}
        </>
      )}
      {refreshProductos && (
        <div className="alert alert-warning" role="status" aria-live="polite">
          Actualizando productos...
        </div>
      )}
      {!ok && errorMsg && !refreshProductos && (
        <div className="alert alert-danger" role="status" aria-live="polite">
          {errorMsg}
        </div>
      )}
    </>
  );
};
