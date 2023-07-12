import { useContext, useEffect, useState } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { clienteAxios } from '../../config/clienteAxios';
import { handlerAxiosError } from '../../helpers/handlerAxiosError';
import { IUsuario } from '../../interfaces/usuario.interface';
import { IUsuarioInfoContext } from '../../interfaces/context.interface';
import { AppContext } from '../../context/AppContext';

interface IUsuariosTableProps {
  refreshUsuarios: boolean;
  setRefreshUsuarios: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UsuariosTable = ({ refreshUsuarios, setRefreshUsuarios }: IUsuariosTableProps) => {
  const { usuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [ok, setOk] = useState<boolean>(true);

  const confirm = (id: number | undefined) => {
    confirmDialog({
      message: '¿Estás seguro?',
      ariaCloseIconLabel: 'Cerrar',
      header: 'Eliminar usuario',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Sí',
      accept: () => deleteUsuario(id)
      //   reject
    });
  };

  useEffect(() => {
    if (refreshUsuarios) {
      getUsuarios();
    }
  }, [refreshUsuarios]);

  const getUsuarios = async () => {
    try {
      setErrorMsg('');
      const { data } = await clienteAxios.get<IUsuario[]>('/usuarios');
      setRefreshUsuarios(false);
      setUsuarios(data);
      setOk(true);
    } catch (error) {
      setOk(false);
      setRefreshUsuarios(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  const deleteUsuario = async (id: number | undefined) => {
    try {
      setErrorMsg('');
      await clienteAxios.delete<IUsuario[]>(`/usuarios/${id}`);
      setRefreshUsuarios(true);
    } catch (error) {
      setRefreshUsuarios(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  return (
    <>
      {usuarios?.length > 0 && (
        <>
          <h2>Total usuarios: {usuarios.length}</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Rol</th>
                <th scope='col'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((x) => (
                <tr key={x.idUsuario}>
                  <th className='table-cell' scope='row'>{x.email}</td>
                  <td>{x.roles_idRol === 1 ? 'Administrador' : 'Usuario'}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => confirm(x.idUsuario)}
                      disabled={usuarioInfo.usuario === x.email}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ConfirmDialog />
        </>
      )}
      {refreshUsuarios && (
        <div className="alert alert-warning" role="status" aria-live="polite">
          Actualizando usuarios...
        </div>
      )}
      {!ok && errorMsg && !refreshUsuarios && (
        <div className="alert alert-danger" role="status" aria-live="polite">
          {errorMsg}
        </div>
      )}
    </>
  );
};
