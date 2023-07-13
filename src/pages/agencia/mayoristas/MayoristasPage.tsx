import { useEffect, useRef, useState } from "react";
import { h1Mayoristas, tituloMayoristas } from "../../../variables/titulos";
import { MayoristasForm } from "./MayoristasForm";
import { MayoristasTable } from "./MayoristasTable";

export const MayoristasPage = () => {
	const [refreshMayoristas, setRefreshMayoristas] = useState<boolean>(true);
	useEffect(() => {
		document.title = tituloMayoristas;
	}, []);
	const h1Ref = useRef<HTMLHeadingElement>(null);
	useEffect(() => {
		if (h1Ref.current) {
			h1Ref.current.focus();
		}
	}, []);
	return (
		<>
			<h1 ref={h1Ref} tabIndex={-1}>
				{h1Mayoristas}
			</h1>
			<div className="row">
				<div className="col">
					<MayoristasForm setRefreshMayoristas={setRefreshMayoristas} />
				</div>
				<div className="col">
					<MayoristasTable
						refreshMayoristas={refreshMayoristas}
						setRefreshMayoristas={setRefreshMayoristas}
					/>
				</div>
			</div>
		</>
	);
};
