import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import { Context } from "../store/appContext";

export const Characters = () => {
	const [characters, setCharacters] = useState([])
	const {store, actions} = useContext(Context)

	const getList = async ()=>{
        try {
            const response = await fetch("https://swapi.dev/api/people", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
			setCharacters(data.results)
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
				<h2 className="text-danger">Characters</h2>
				<hr/>
			</div>
			<div className="container py-2 overflow-auto">
				<div className="d-flex flex-row flex-nowrap">
					{characters.map((element, index) => {
						return(
							<div className="card mx-1" key={index} style={{minWidth: "18rem"}}>
								<Link to={"/character/"+(index+1)}><img src={"https://starwars-visualguide.com/assets/img/characters/"+(index+1)+".jpg"} className="card-img-top" alt="Imagen no encontrada"/></Link>
								<div className="card-body d-flex flex-column bg-dark">
									<h5 className="card-title">{element.name}</h5>
									<p className="card-text">Gender: {element.gender}</p>
									<p className="card-text">Hair Color: {element.hair_color}</p>
									<p className="card-text">Eye-Color: {element.eye_color}</p>
									<div className="d-flex mt-auto">
										<Link to={"/character/"+(index+1)} className="btn btn-outline-primary">Learn more!</Link>
										<button className="btn btn-outline-warning ms-auto" onClick={()=> actions.addBookmark("c-"+index, "(C) "+element.name)}><i className={bookmarkExist("c-"+index) === true ? "fas fa-heart text-danger" :"far fa-heart"}></i></button>
									</div>
								</div>
							</div>
					)})}
				</div>
			</div>
		</>
	);
};
