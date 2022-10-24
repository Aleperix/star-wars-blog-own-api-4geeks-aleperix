import React, {useContext} from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import {Login} from "../component/login.js";

export const Navbar = () => {
	const {store, actions}= useContext(Context)
	const history = useHistory();

	const handleLogout = ()=>{
		let onLogged = actions.logout();
		if(!onLogged){
			history.push("/");
		}
	}

	return (
		<>
			<nav className="navbar navbar-light bg-dark mb-3 p-3 position-sticky top-0 " style={{zIndex: "100"}}>
				<Link to="/">
				<img src="https://cdn.shopify.com/s/files/1/0013/7332/files/product.star-wars.logo.png" className="mx-2 card-img-top" alt="..." style={{maxWidth: "100px"}}></img>
				</Link>

				{store.auth ?
					<div className="d-flex ml-auto">
						<div className="dropdown mx-4">
							<button className="btn btn-primary dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
								<i className="far fa-heart"></i> Favorties <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{store.bookmarks.length}</span>
							</button>
							<ul className="dropdown-menu dropdown-menu-end bg-light">
							{store.bookmarks == ""
							?
							<li className="text-white text-center">No bookmarks...</li>
							:
								store.bookmarks.map((element, index) => {
									return(
										element.label.includes('(C)') 
										?
											<li key={index} className="d-flex justify-content-between align-items-center bookmark-remove-none"><Link to={"/character/"+(index+1)} className="dropdown-item d-inline text-white bg-light">{element.label} </Link><i className="far fa-trash-alt text-danger d-inline mx-2" role="button" onClick={()=> actions.removeBookmark(index)}></i></li>
										:
											<li key={index} className="d-flex justify-content-between align-items-center bookmark-remove-none"><Link to={"/planet/"+(index+1)} className="dropdown-item d-inline text-white bg-light">{element.label} </Link><i className="far fa-trash-alt text-danger d-inline mx-2" role="button" onClick={()=> actions.removeBookmark(index)}></i></li>
								)})
							}
							</ul>
						</div>
						<button type="button" className="btn btn-danger" onClick={() => handleLogout()}><i className="fas fa-sign-out-alt"></i></button>
					</div>
				:
					<div className="d-flex ml-auto">
						<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Login</button>
					</div>}
			</nav>
			<Login />
		</>
	);
};
