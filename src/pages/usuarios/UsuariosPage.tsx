import { useEffect, useRef, useState } from 'react';
import { UsuariosTable } from './UsuariosTable';
import { UsuariosForm } from './UsuariosForm';
import { h1Usuarios, tituloUsuarios } from '../../variables/titulos';

export const UsuariosPage = () => {
  const [refreshUsuarios, setRefreshUsuarios] = useState<boolean>(true);
useEffect(() => {
  document.title = tituloUsuarios;
});
const h1Ref = useRef<HTMLHeadingElement>(null);
useEffect(() => {
  if (h1Ref.current) {
    h1Ref.current.focus();
  }
},[]);
  return (
    <>
      <h1 ref={h1Ref} tabIndex={-1}>{h1Usuarios}</h1>
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
