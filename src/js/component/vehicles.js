import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

export const Vehicles = () => {
	const [vehicles, setVehicles] = useState([])

	const getList = async ()=>{
        try {
            const response = await fetch("https://swapi.dev/api/vehicles", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
			setVehicles(data.results)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

	useEffect(()=>{
        getList()
    },[])
	return (
		<>
			<div className="container mt-2">
				<h2 className="text-danger">Vehicles</h2>
			</div>
			<div className="container py-2 overflow-auto">
				<div className="d-flex flex-row flex-nowrap">
					{vehicles.map((element, index) => {
						return(
							<div className="card mx-1" key={index} style={{minWidth: "18rem"}}>
                                <Link to={"/vehicle/"+(index+1)}><img src={"https://starwars-visualguide.com/assets/img/vehicles/"+(index+1)+".jpg"} className="card-img-top" alt="Imagen no encontrada"/></Link>
								<div className="card-body">
									<h5 className="card-title">{element.name}</h5>
									<p className="card-text">Gender: {element.gender}</p>
									<p className="card-text">Hair Color: {element.hair_color}</p>
									<p className="card-text">Eye-Color: {element.eye_color}</p>
									<div className="d-flex">
										<Link to={"/vehicle/"+(index+1)} className="btn btn-outline-primary">Learn more!</Link>
										<a href="#" className="btn btn-outline-warning ms-auto"><i className="far fa-heart"></i></a>
									</div>
								</div>
							</div>
					)})}
				</div>
			</div>
		</>
	);
};
