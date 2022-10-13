import React, {useState, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";

export const Planet = () => {
    const theid = useParams()
    const [planet, setPlanet] = useState("")
    const myAudio = useRef()

    const getData = async ()=>{
        try {
            const response = await fetch("https://www.swapi.tech/api/planets/"+theid.theid, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
			setPlanet(data.result.properties)
            console.log(data.result.properties);
        } catch (error) {
            console.log(error);
        }
    }

    function easterEgg(){
        if (myAudio.current.paused === true) {
            myAudio.current.play()
        }else{
            myAudio.current.pause()
        }
    }

	useEffect(()=>{
        getData()
    },[])
	return (
		<div className="container">
            <div className="container d-flex justify-content-center m-5">
                <div className="card mb-3 rounded-0 bg-dark" style={{maxWidth: "940px"}}>
                    <div className="row g-0">
                        <div className="col-md-6">
                        {theid.theid === "1" ?
                            <img src={"https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png"} className="img-fluid h-100 w-100" onClick={()=> easterEgg()} alt="Imagen no encontrada"/>
                        :
                            <img src={"https://starwars-visualguide.com/assets/img/planets/"+theid.theid+".jpg"} className="img-fluid h-100 w-100" onClick={()=> easterEgg()} alt="Imagen no encontrada"/>
                        }
                        </div>
                        <div className="col-md-6 p-4">
                        <div className="card-body">
                            <h1 className="card-title">{planet.name}</h1>
                            <p className="card-text">Star Wars, conocida también en español como La guerra de las galaxias, es una franquicia y universo compartido de fantasía compuesta primordialmente de una serie de películas concebidas por el cineasta estadounidense George Lucas en la década de 1970, y producidas y distribuidas por The Walt Disney Company a partir de 2012.</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <hr/>
            <div className="container d-flex justify-content-center flex-column m-3">
                <ul className="list-unstyled row text-danger text-center">
                    <li className="col"><p><b>Name</b></p><p>{planet.name}</p></li>
                    <li className="col"><p><b>Climate</b></p><p>{planet.climate}</p></li>
                    <li className="col"><p><b>Population</b></p><p>{planet.population}</p></li>
                    <li className="col"><p><b>Orbital Period</b></p><p>{planet.orbital_period}</p></li>
                    <li className="col"><p><b>Rotation Period</b></p><p>{planet.rotation_period}</p></li>
                    <li className="col"><p><b>Diameter</b></p><p>{planet.diameter}</p></li>
                </ul>
            </div>
            <audio ref={myAudio} src="https://www.televisiontunes.com/uploads/audio/Star%20Wars.mp3" type="audio"/>
		</div>
	);
};