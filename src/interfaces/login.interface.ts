export interface ILogin {
	email: string;
	password: string;
}

export interface ILoginResponse {
	usuario: string; // Devuelve el email
	token: string;
}
