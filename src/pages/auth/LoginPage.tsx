import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import { useForm } from '../../hooks/useForm';
import { ILogin, ILoginResponse } from '../../interfaces/login.interface';
import { ILocalStorageInfo } from '../../interfaces/localStorageInfo.interface';
import { handlerAxiosError } from '../../helpers/handlerAxiosError';
import { clienteAxios } from '../../config/clienteAxios';
import { IUsuarioInfoContext } from '../../interfaces/context.interface';
import { AppContext } from '../../context/AppContext';
import { IToken } from '../../interfaces/token.interface';
import { h1Login, tituloLogin } from '../../variables/titulos';

export const LoginPage = () => {
  // Nos traemos el contexto con el usuario y la función que lo cambia
  const { setUsuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { form, onInputChange, onResetForm } = useForm<ILogin>({
    email: '',
    password: ''
  });

  const { email, password } = form;

  const login = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMsg('');
      const { data } = await clienteAxios.post<ILoginResponse>('/auth/login', { email, password });
      const infoUsuarioStorage: ILocalStorageInfo = {
        email: data.usuario,
        token: data.token
      };
      const { rol } = jwt(infoUsuarioStorage.token) as IToken;
      setUsuarioInfo({ usuario: data.usuario, rol: rol });
      localStorage.setItem('usuarioInfo', JSON.stringify(infoUsuarioStorage));
      setLoading(false);
      navigate('/menu', {
        replace: true
      });
    } catch (error) {
      setLoading(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };
useEffect(() => {
	document.title = tituloLogin;
},[]);
const loginRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <h1>{h1Login}</h1>

      <form onSubmit={login}>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input id="email" ref={loginRef} type="email" className="form-control" value={email} onChange={onInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={onInputChange}
            required
          />
        </div>
        <button className="btn btn-success" type="submit">
          Iniciar sesión
        </button>
        <button className="btn btn-warning" type="button" onClick={onResetForm}>
          Borrar
        </button>
      </form>
      {loading && (
        <div className="alert alert-warning" role="status" aria-live='polite'>
          Autenticando...
        </div>
      )}
      {/* Si errorFetch es true, mostramos un mensaje de error al usuario */}
      {errorMsg && !loading && (
        <div className="alert alert-danger" role="status" aria-live='polite'>
          {errorMsg}
        </div>
      )}
	  		<Link to="/">Ir a la página principal</Link>
    </>
  );
};