import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { AuthLayout } from "../layout/AuthLayout";
import { LoginPage } from "../pages/auth/LoginPage";

export const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/login" element={<AuthLayout />}>
					<Route index element={<LoginPage />} />
				</Route>
			</Routes>
		</>
	);
};
