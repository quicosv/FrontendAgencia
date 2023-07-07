// Crea un nuevo archivo, por ejemplo "NotificationManager.tsx", donde definirás el componente NotificationManager.
// import React, { useEffect, useRef } from "react";

// interface NotificationManagerProps {
//   children: React.ReactNode;
// }

// const NotificationManager: React.FC<NotificationManagerProps> = ({
//   children,
// }) => {
//   const notifierRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const notify = (message: string) => {
//       if (notifierRef.current) {
//         setTimeout(() => {
//           notifierRef.current!.textContent = message;
//         }, 10);
//       }
//     };

//     // Ejemplo de uso: notificar después de 2 segundos
//     const timeoutId = setTimeout(() => {
//       notify("¡Hola! Esta es una notificación");
//     }, 2000);

//     return () => {
//       clearTimeout(timeoutId); // Limpiar el temporizador cuando el componente se desmonte
//     };
//   }, []);

//   return (
//     <div>
//       <div ref={notifierRef}></div>
//       {children}
//     </div>
//   );
// };

// export default NotificationManager;
// Ahora, puedes utilizar el componente NotificationManager en tus otros componentes. Asegúrate de envolver el contenido que necesita las notificaciones dentro del NotificationManager.
// typescript
// Copy code
// import React from "react";
// import NotificationManager from "./NotificationManager";

// const Component1: React.FC = () => {
//   return (
//     <NotificationManager>
//       {/* Contenido de Component1 */}
//     </NotificationManager>
//   );
// };

// export default Component1;
// typescript
// Copy code
// import React from "react";
// import NotificationManager from "./NotificationManager";

// const Component2: React.FC = () => {
//   return (
//     <NotificationManager>
//       {/* Contenido de Component2 */}
//     </NotificationManager>
//   );
// };

// export default Component2;
// De esta manera, puedes utilizar el componente NotificationManager para gestionar las notificaciones en todos tus componentes que lo necesiten. Recuerda que puedes personalizar el contenido y la lógica de las notificaciones según tus necesidades.