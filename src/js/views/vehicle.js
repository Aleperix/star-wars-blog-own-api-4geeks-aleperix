import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

export const Vehicle = () => {
    const theid = useParams()
    const [vehicle, setVehicle] = useState("")

    const getData = async ()=>{
        try {
            const response = await fetch("https://www.swapi.tech/api/vehicles/"+theid.theid, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
			setVehicle(data.result.properties)
            console.log(data.result.properties);
        } catch (error) {
            console.log(error);
        }
    }

	useEffect(()=>{
        getData()
    },[])
	return (
		<div className="container">
            <div className="container d-flex justify-content-center m-5">
                <div className="card mb-3 rounded-0" style={{maxWidth: "740px"}}>
                    <div className="row g-0">
                        <div className="col-md-6">
                        <img src={"https://starwars-visualguide.com/assets/img/vehicles/"+theid.theid+".jpg"} className="img-fluid h-100 w-100" alt="Imagen no encontrada"/>
                        </div>
                        <div className="col-md-6 p-4">
                        <div className="card-body">
                            <h1 className="card-title">{vehicle.name}</h1>
                            <p className="card-text">Star Wars, conocida también en español como La guerra de las galaxias, es una franquicia y universo compartido de fantasía compuesta primordialmente de una serie de películas concebidas por el cineasta estadounidense George Lucas en la década de 1970, y producidas y distribuidas por The Walt Disney Company a partir de 2012.</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <hr/>
            <div className="container d-flex justify-content-center m-3">
                <ul>
                    <li className="d-inline text-danger"></li>
                </ul>
            </div>
		</div>
	);
};