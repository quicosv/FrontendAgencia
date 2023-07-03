export interface IVenta {
	idventa?: number;
	idcliente: number;
	fechasalida: Date;
	idviaje: number;
	segurocancelacion: boolean;
}