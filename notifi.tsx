import React, { useEffect, useRef } from "react";

const MyComponent: React.FC = () => {
	const notifierRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const notify = (message: string) => {
			if (notifierRef.current) {
				setTimeout(() => {
					notifierRef.current!.textContent = message;
				}, 10);
			}
		};

		// Ejemplo de uso: notificar después de 2 segundos
		const timeoutId = setTimeout(() => {
			notify("¡Hola! Esta es una notificación");
		}, 2000);

		return () => {
			clearTimeout(timeoutId); // Limpiar el temporizador cuando el componente se desmonte
		};
	}, []);

	return (
		<div>
			<div ref={notifierRef}></div>
			{/* Resto del contenido del componente */}
		</div>
	);
};

export default MyComponent;
