// El context es un espacio para uso común de elementos de la aplicación. En este ejemplo, la información del usuario (usuarioInfo) es la que
// va formar parte de este espacio
import { createContext } from 'react';
import { IUsuarioInfo, IUsuarioInfoContext } from '../interfaces/context.interface';

// Comenzamos con un usuario vacío
const usuarioInfo: IUsuarioInfo = {
  usuario: '',
  rol: 0
};

// Creamos el objeto que va a formar parte del context
const usuarioInfoContext: IUsuarioInfoContext = {
  usuarioInfo: usuarioInfo,
  setUsuarioInfo: () => null
};

// Y aquí creamos el context
export const AppContext = createContext<IUsuarioInfoContext>(usuarioInfoContext);
