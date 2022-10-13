import React from "react";
import {Characters} from "../component/characters.js";
import {Planets} from "../component/planets.js";
import { Vehicles } from "../component/vehicles.js";

export const Home = () => (
	<div className="mt-5">
		<Characters />
		<hr/>
		<Planets />
		<hr/>
		{/* <Vehicles /> */}
	</div>
);
