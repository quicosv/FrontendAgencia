import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { AuthLayout } from "../layout/AuthLayout";
import { LoginPage } from "../pages/auth/LoginPage";
import { AgenciaLayout } from "../layout/AgenciaLayout";
import { ClientesPage } from "../pages/agencia/ClientesPage";
import { MayoristasPage } from "../pages/agencia/MayoristasPage";
import { ViajesPage } from "../pages/agencia/ViajesPage";
import { VentasPage } from "../pages/agencia/VentasPage";
import { UsuariosPage } from "../pages/usuarios/UsuariosPage";
import { PorAhiNoPage } from "../pages/PorAhiNoPage";

export const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
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
		</>
	);
};
