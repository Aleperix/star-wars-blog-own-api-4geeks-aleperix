import axios from 'axios';

const APIUrl = "https://3000-4geeksacade-flaskresthe-fxrpdwb271v.ws-us72.gitpod.io"
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: {},
			bookmarks: [],
			characters: [],
			planets: [],
			auth: false
		},
		actions: {
					//	Inicio API //
			/* POST */
			postData: async (route, bodyData)=>{
				try {
					const response = await axios.post(APIUrl+route, bodyData)
					return response
				} catch (error) {
					console.log(error);
					return error
				}
			},
			/* GET */
			getData: async (route, headers)=>{
				try {
					if (headers != null) {
						const response = await axios.get(APIUrl+route, {headers: headers})
						return response
					}
					const response = await axios.get(APIUrl+route)
					console.log(response);
					return response
				} catch (error) {
					console.log(error);
					return error
				}
			},
			/* PUT */
			putData: async (route, bodyData)=>{
				try {
					const response = await axios.put(APIUrl+route, bodyData)
					return response
				} catch (error) {
					console.log(error);
					return error
				}
			},
			/* DELETE */
			deleteData: async (route)=>{
				try {
					const response = await axios.delete(APIUrl+route,)
					return response
				} catch (error) {
					console.log(error);
					return error
				}
			},


			//Inicio Users
			login: async (value)  => {
				const action = getActions()
				let response = await action.postData('/login', value);
				if (response.status == 200) {
					localStorage.setItem('token', response.data.access_token)
					setStore({auth: true})
					return true
				}else{
					response = response.response
					setStore({auth: false})
					return {message: response.data.message}
				}
			},
			logout: () => {
                localStorage.removeItem('token')
                setStore({auth: false})
			},
			isAuth: async () => {
				const action = getActions()
				let response = await action.getData('/isauth', {Authorization: 'Bearer ' + localStorage.getItem('token')});
				if (response.hasOwnProperty('code')){
					setStore({auth: false})
					return false
				}
                setStore({auth: true})
				return true
			},
			getProfile: async () => {
				const action = getActions()
				const response = await action.getData('/profile', {Authorization: 'Bearer ' + localStorage.getItem('token')});
				setStore({user: response.data.user})
				return response.data.user.id
			},
			//Fin Users

			//Inicio Favoritos
			getAllBookmarks: async (id) => {
				const action = getActions()
				const store = getStore()
				const response = await action.getData('/user/'+id+'/bookmarks');
				console.log(response);
				// setStore({bookmarks: response.data})
			},
			addBookmark: async (value) => {
				const action = getActions();
				let response = await action.postData('/user/bookmarks/new', value);
				if (response.hasOwnProperty('response')) {
					response = response.response
					if (response.status == 403) {
						return response.status
					}else{
						return response.data
					}
					console.log(response)
				}
			},
			addBookmark1: async (value) => {
				const action = getActions();
				let response = await action.postData('/user/bookmarks/new', value);
				if (response.hasOwnProperty('response')) {
					response = response.response
					console.log(response)
				}
				// let valueExist, valueIndex;
				// for (let i = 0; i < store.bookmarks.length; i++) {
				// 	if(store.bookmarks[i].id == index){
				// 		valueExist = true
				// 		valueIndex = i;
				// 	}
				// }
				// if (valueExist === true) {
				// 	actions.removeBookmark(valueIndex)
				// } else {
				// 	setStore({bookmarks: [...store.bookmarks, {id: index, label: value}]})
				// }
            },
			removeBookmark1: (index) => {
				const store = getStore();
				setStore({bookmarks: [
					...store.bookmarks.slice(0, index),
					...store.bookmarks.slice(index + 1, store.bookmarks.length)
					]})
            },
			//Fin Favoritos

			//Inicio Personajes
			getAllCharacters: async () => {
				const action = getActions()
				const response = await action.getData('/characters');
				setStore({characters: response.data})
            },
			getOneCharacter: async (id) => {
				const action = getActions()
				const response = await action.getData('/character/'+id);
				return response.data
            },
			//Fin Personajes

			//Inicio Planetas
			getAllPlanets: async () => {
				const action = getActions()
				const response = await action.getData('/planets');
				setStore({planets: response.data})
            },
			getOnePlanet: async (id) => {
				const action = getActions()
				const response = await action.getData('/planet/'+id);
				return response.data
            },
			//Fin Planetas
					// Fin API //
		}
	};
};

export default getState;
