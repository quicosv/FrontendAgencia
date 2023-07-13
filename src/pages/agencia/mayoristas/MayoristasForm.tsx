import { FormEvent, useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { clienteAxios } from '../../../config/clienteAxios';
import { handlerAxiosError } from '../../../helpers/handlerAxiosError';
import { ICliente } from '../../../interfaces/cliente.interface';
import { IMayorista } from '../../../interfaces/mayorista.interface';

interface IMayoristasFormProps {
  setRefreshMayoristas: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MayoristasForm = ({ setRefreshMayoristas: setRefreshMayoristas }: IMayoristasFormProps) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [ok, setOk] = useState<boolean>(true);
  const { form, onInputChange, onResetForm } = useForm<IMayorista>({
    nombre: '',
    telefono: '',
    direccion: '',
	contacto: ''
  });

  const { nombre, telefono, direccion, contacto } = form;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const mayorista: IMayorista = {
      nombre: nombre,
      telefono: telefono,
	  direccion: direccion,
	  contacto: contacto
    };
    try {
      setLoading(true);
      setErrorMsg('');
      await clienteAxios.post<IMayorista>('/mayoristas', mayorista);
      setLoading(false);
      onResetForm();
      setOk(true);
      setRefreshMayoristas(true);
    } catch (error) {
      setOk(false);
      setLoading(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input className="form-control" id="nombre" type="text" value={nombre} onChange={onInputChange} />
          {nombre.trim() === '' && <small className="text-danger">Nombre obligatorio</small>}
          <label htmlFor="telefono">Teléfono</label>
          <input className="form-control" id="telefono" type="text" value={telefono} onChange={onInputChange} />
          {telefono.trim() === '' && <small className="text-danger">Teléfono obligatorio</small>}
		  <label htmlFor="direccion">Dirección</label>
          <input className="form-control" id="direccion" type="text" value={direccion} onChange={onInputChange} />
          {direccion.trim() === '' && <small className="text-danger">Dirección obligatorio</small>}
          <label htmlFor="contacto">Contacto</label>
          <input className="form-control" id="contacto" type="text" value={contacto} onChange={onInputChange} />
          {contacto.trim() === '' && <small className="text-danger">Contacto obligatorio</small>}
          
        </div>

        <button className="btn btn-success mt-4" type="submit" disabled={nombre.trim() === ''}>
          Agregar cliente
        </button>
      </form>

      {loading && (
        <div className="alert alert-warning" role="alert">
          Agregando cliente...
        </div>
      )}
      {!ok && errorMsg && !loading && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}
    </>
  );
};