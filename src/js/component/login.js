import React, {useState, useContext, useRef} from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const {actions} = useContext(Context)
    const history = useHistory();
    const closeModal = useRef()
    const showAlert = useRef("")

    const handleSubmit = async ()=>{
        let onLogged = await actions.login({"username":username, "password":password});
        if (username == "" || password == ""){
            setTimeout(() => {showAlert.current.classList.add('d-none')}, 3000);
            showAlert.current.classList.remove('d-none');
            setLoginError('Hay campos vacíos');
        }
        else if (onLogged == true) {
            history.go(0)
            closeModal.current.click() 
            setUsername("")
            setPassword("")
        }else{
            setTimeout(() => {showAlert.current.classList.add('d-none')}, 3000);
            showAlert.current.classList.remove('d-none');
            setLoginError(onLogged.message);
        }
      }

	return (
		<>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Login</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" ref={closeModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="alert alert-danger d-none" ref={showAlert} role="alert">{loginError}</div>
                        <div className="input-group input-group-lg">
                            <label className="input-group-text" id="inputGroup-sizing-lg" htmlFor="loginUsername"><i className="fas fa-user"></i></label>
                            <input value={username} type="text" id="loginUsername" className="form-control" onChange={(e) => setUsername(e.target.value)} placeholder="Your username" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
                        </div>
                        <div className="input-group input-group-lg mt-2">
                            <label className="input-group-text" htmlFor="loginPassword" id="inputGroup-sizing-lg"><i className="fas fa-lock"></i></label>
                            <input value={password} type="password" id="loginPassword" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Your password" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
                        </div>
                        <div className="mb-3 mt-4 form-check">
                            <input type="checkbox" className="form-check-input" id="loginCheck"/>
                            <label className="form-check-label" htmlFor="loginCheck">Check me out!</label>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={() => handleSubmit()} className="btn btn-secondary">Submit</button>
                </div>
                </div>
            </div>
            </div>
		</>
	);
};
