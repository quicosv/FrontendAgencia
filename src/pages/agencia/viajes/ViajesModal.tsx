import { FormEvent, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { useForm } from '../../../hooks/useForm';
import { clienteAxios } from '../../../config/clienteAxios';
import { handlerAxiosError } from '../../../helpers/handlerAxiosError';
import { IProducto } from '../../../interfaces/producto.interface';
import { ComboCategorias } from './ComboCategorias';

interface IProductosModalProps {
  producto: IProducto;
  setShowModificar: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshProductos: React.Dispatch<React.SetStateAction<boolean>>;
  showModificar: boolean;
}

export const ProductosModal = ({
  producto,
  setRefreshProductos,
  setShowModificar,
  showModificar
}: IProductosModalProps) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [ok, setOk] = useState<boolean>(true);
  const { idProducto } = producto;
  const { form, onInputChange, onSelectChange } = useForm<IProducto>({
    descripcion: producto.descripcion,
    categorias_idCategoria: producto.categorias_idCategoria,
    existencias: producto.existencias,
    precio: producto.precio
  });

  const { descripcion, categorias_idCategoria, existencias, precio } = form;

  const hideModal = () => setShowModificar(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateProducto();
  };

  const updateProducto = async () => {
    try {
      setErrorMsg('');
      const producto: IProducto = {
        descripcion: descripcion,
        categorias_idCategoria: categorias_idCategoria,
        existencias: existencias,
        precio: precio
      };
      await clienteAxios.put<IProducto[]>(`/Productos/${idProducto}`, producto);
      setShowModificar(false);
      setRefreshProductos(true);
      setOk(true);
    } catch (error) {
      setOk(false);
      setRefreshProductos(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  return (
    <>
      <Dialog
        header="Modificar producto"
        visible={showModificar}
        style={{ width: '50vw' }}
        onHide={() => setShowModificar(false)}
      >
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <input className="form-control" id="descripcion" type="text" value={descripcion} onChange={onInputChange} />
            {descripcion.trim() === '' && <small className="text-danger">Descripción obligatoria</small>}
          </div>

          <ComboCategorias setSelected={onSelectChange} activa={categorias_idCategoria} />

          <div className="form-group">
            <label htmlFor="existencias">Existencias</label>
            <input
              className="form-control"
              id="existencias"
              type="number"
              value={existencias}
              onChange={onInputChange}
            />
            {(existencias.toString().trim() === '' || existencias < 0) && (
              <small className="text-danger">Existencias obligatorias</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="precio">Precio</label>
            <input className="form-control" id="precio" type="number" value={precio} onChange={onInputChange} />
            {(precio.toString().trim() === '' || precio < 0) && (
              <small className="text-danger">Precio obligatorio</small>
            )}
          </div>

          <button className="btn btn-warning mt-4" type="submit">
            Guardar
          </button>
          <button className="btn btn-secondary mt-4" onClick={() => hideModal()}>
            Cancelar
          </button>
        </form>
        {!ok && errorMsg && (
          <div className="alert alert-danger" role="status" aria-live="polite">
            {errorMsg}
          </div>
        )}
      </Dialog>
    </>
  );
};
