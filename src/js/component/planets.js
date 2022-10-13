import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import { Context } from "../store/appContext";

export const Planets = () => {
	const [planets, setPlanets] = useState([])
	const {store, actions} = useContext(Context)

	const getList = async ()=>{
        try {
            const response = await fetch("https://swapi.dev/api/planets", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
			setPlanets(data.results)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

	function bookmarkExist(index) {
		let valueExist;
		for (let i = 0; i < store.bookmarks.length; i++) {
			if(store.bookmarks[i].id == index){
				valueExist = true
			}
		}
		if (valueExist === true) {
			return true
		}
	}

	useEffect(()=>{
        getList()
    },[])
	return (
		<>
			<div className="container mt-2">
				<h2 className="text-danger">Planets</h2>
				<hr/>
			</div>
			<div className="container py-2 overflow-auto">
				<div className="d-flex flex-row flex-nowrap">
					{planets.map((element, index) => {
						return(
							<div className="card mx-1" key={index} style={{minWidth: "18rem"}}>
								{index === 0 ?
									<Link to={"/planet/"+(index+1)}><img src={"https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png"} className="card-img-top" alt="Imagen no encontrada"/></Link>
								:
									<Link to={"/planet/"+(index+1)}><img src={"https://starwars-visualguide.com/assets/img/planets/"+(index+1)+".jpg"} className="card-img-top" alt="Imagen no encontrada"/></Link>
								}
								<div className="card-body d-flex flex-column bg-dark">
									<h5 className="card-title">{element.name}</h5>
									<p className="card-text">Population: {element.population}</p>
									<p className="card-text">Terrain: {element.terrain}</p>
									<div className="d-flex mt-auto">
										<Link to={"/planet/"+(index+1)} className="btn btn-outline-primary">Learn more!</Link>
										<button className="btn btn-outline-warning ms-auto" onClick={()=> actions.addBookmark(("p-"+index), "(P) "+element.name)}><i className={bookmarkExist("p-"+index) === true ? "fas fa-heart text-danger" :"far fa-heart"}></i></button>
									</div>
								</div>
							</div>
					)})}
				</div>
			</div>
		</>
	);
};
