import { FormEvent, useState } from 'react';
import { IUsuario } from '../../interfaces/usuario.interface';
import { useForm } from '../../hooks/useForm';
import { clienteAxios } from '../../config/clienteAxios';
import { handlerAxiosError } from '../../helpers/handlerAxiosError';

interface IUsuariosFormProps {
  setRefreshUsuarios: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UsuariosForm = ({ setRefreshUsuarios }: IUsuariosFormProps) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [ok, setOk] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { form, onInputChange, onSelectChange, onResetForm } = useForm<IUsuario>({
    email: '',
    password: '',
    roles_idRol: 2
  });

  const { email, password, roles_idRol } = form;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const usuario: IUsuario = {
      email: email,
      password: password,
      roles_idRol: roles_idRol
    };
    try {
      setLoading(true);
      setErrorMsg('');
      await clienteAxios.post<IUsuario>('/usuarios', usuario);
      setLoading(false);
      onResetForm();
      setRefreshUsuarios(true);
      setOk(true);
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
          <label htmlFor="email">Correo electrónico</label>
          <input className="form-control" id="email" type="email" value={email} onChange={onInputChange} autoComplete='email' required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input className="form-control" id="password" type="password" value={password} onChange={onInputChange} pattern='.{6,}' title='La contraseña debe tener al menos 6 caracteres' required />
        </div>
        <div className="form-group">
          <label htmlFor="roles_idRol">Rol</label>
          <select className="form-select" value={roles_idRol} onChange={onSelectChange} id="roles_idRol">
            <option value="1">Administrador</option>
            <option value="2">Usuario</option>
          </select>
        </div>

        <button className="btn btn-success" type="submit">
          Agregar usuario
        </button>
      </form>

      {loading && (
        <div className="alert alert-warning" role="alert">
          Agregando usuario...
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
