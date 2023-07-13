import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { AuthLayout } from "../layout/AuthLayout";
import { LoginPage } from "../pages/auth/LoginPage";
import { AgenciaLayout } from "../layout/AgenciaLayout";
import { ClientesPage } from "../pages/agencia/clientes/ClientesPage";
import { UsuariosPage } from "../pages/usuarios/UsuariosPage";
import { PorAhiNoPage } from "../pages/PorAhiNoPage";
import { MenuPage } from "../pages/MenuPage";
import { CatalogoPage } from "../pages/agencia/CatalogoPage";
import { useContext, useEffect, useState } from "react";
import { IUsuarioInfoContext } from "../interfaces/context.interface";
import { AppContext } from "../context/AppContext";
import { ILocalStorageInfo } from "../interfaces/localStorageInfo.interface";
import { IToken } from "../interfaces/token.interface";
import jwt from 'jwt-decode';
import { VentasPage } from "../pages/agencia/ventas/VentasPage";
import { ViajesPage } from "../pages/agencia/viajes/ViajesPage";
import { MayoristasPage } from "../pages/agencia/mayoristas/MayoristasPage";

export const AppRouter = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const { setUsuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);
	useEffect(() => {
		const infoStorage: ILocalStorageInfo = JSON.parse(localStorage.getItem('usuarioInfo')!);
		if (infoStorage) {
			const { rol } = jwt(infoStorage.token) as IToken;
			setUsuarioInfo({ usuario: infoStorage.email, rol: rol });
		}
		setLoading(false);
	},[]);

	return (
		<>
		{!loading && (
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/menu" element={<MenuPage />} />
				<Route path="/catalogo" element={<CatalogoPage />} />
				<Route path="/login" element={<AuthLayout />}>
					<Route index element={<LoginPage />} />
				</Route>
				<Route path="/clientes" element={<AgenciaLayout />}>
					<Route index element={<ClientesPage />} />
				</Route>
				<Route path="/mayoristas" element={<AgenciaLayout />}>
					<Route index element={<MayoristasPage />} />
				</Route>
				<Route path="/viajes" element={<AgenciaLayout />}>
					<Route index element={<ViajesPage />} />
				</Route>
				<Route path="/ventas" element={<AgenciaLayout />}>
					<Route index element={<VentasPage />} />
				</Route>
				<Route path="/usuarios" element={<AgenciaLayout />}>
					<Route index element={<UsuariosPage />} />
				</Route>
				<Route path="/*" element={<PorAhiNoPage />} />
			</Routes>
			)}
			</>
	);
};
