import { useEffect } from "react";
import { h1PorAhiNo, tituloPorAhiNo } from "../variables/titulos";

export const PorAhiNoPage = () => {
	useEffect(() => {
		document.title = tituloPorAhiNo;
	}, []);
	return <h1>{h1PorAhiNo}</h1>;
};
