import { useState } from 'react';
import { UsuariosTable } from './UsuariosTable';
import { UsuariosForm } from './UsuariosForm';

export const UsuariosPage = () => {
  const [refreshUsuarios, setRefreshUsuarios] = useState<boolean>(true);

  return (
    <>
      <h1>Usuarios</h1>
      <hr />
      <div className="row">
        <div className="col">
          <UsuariosForm setRefreshUsuarios={setRefreshUsuarios} />
        </div>
        <div className="col">
          <UsuariosTable refreshUsuarios={refreshUsuarios} setRefreshUsuarios={setRefreshUsuarios} />
        </div>
      </div>
    </>
  );
};
