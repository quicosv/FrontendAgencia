import { FormEvent, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { useForm } from '../../../hooks/useForm';
import { clienteAxios } from '../../../config/clienteAxios';
import { handlerAxiosError } from '../../../helpers/handlerAxiosError';
import { IMayorista } from '../../../interfaces/mayorista.interface';

interface IMayoristasModalProps {
  mayorista: IMayorista;
  setShowModificar: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshMayoristas: React.Dispatch<React.SetStateAction<boolean>>;
  showModificar: boolean;
}

export const MayoristasModal = ({
  mayorista: mayorista,
  setRefreshMayoristas: setRefreshMayoristas,
  setShowModificar,
  showModificar
}: IMayoristasModalProps) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [ok, setOk] = useState<boolean>(true);
  const { idmayorista: idmayorista } = mayorista;
  const { form, onInputChange } = useForm<IMayorista>({
    nombre: mayorista.nombre,
    telefono: mayorista.telefono,
    direccion: mayorista.direccion,
    contacto: mayorista.contacto
  });

  const { nombre, telefono, direccion, contacto } = form;

  const hideModal = () => setShowModificar(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateMayorista();
  };

  const updateMayorista = async () => {
    try {
      setErrorMsg('');
      const mayorista: IMayorista = {
        nombre: nombre,
        telefono: telefono,
        direccion: direccion,
        contacto: contacto
      };
      await clienteAxios.put<IMayorista[]>(`/mayoristas/${idmayorista}`, mayorista);
      setShowModificar(false);
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
      <Dialog
        ariaCloseIconLabel='Cerrar'
        header="Modificar mayorista"
        visible={showModificar}
        style={{ width: '50vw' }}
        onHide={() => setShowModificar(false)}
      >
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input className="form-control" id="nombre" type="text" value={nombre} onChange={onInputChange} />
            {nombre.trim() === '' && <small className="text-danger">Nombre obligatorio</small>}
            <label htmlFor="telefono">Teléfono</label>
            <input className="form-control" id="telefono" type="tel" value={telefono} onChange={onInputChange} />
            {telefono.trim() === '' && <small className="text-danger">Teléfono obligatorio</small>}
            <label htmlFor="direccion">Dirección</label>
            <input type="text" id='direccion' value={direccion} />
            <label htmlFor="contacto">Contacto</label>
            <input type="text" id='contacto' value={contacto} />
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
      </Dialog>
    </>
  );
};
