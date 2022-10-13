const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			bookmarks: []
		},
		actions: {
			addBookmark: (index, value) => {
				const store = getStore();
				const actions = getActions();
				let valueExist, valueIndex;
				for (let i = 0; i < store.bookmarks.length; i++) {
					if(store.bookmarks[i].id == index){
						valueExist = true
						valueIndex = i;
					}
				}
				if (valueExist === true) {
					actions.removeBookmark(valueIndex)
				} else {
					setStore({bookmarks: [...store.bookmarks, {id: index, label: value}]})
				}
            },
			removeBookmark: (index) => {
				const store = getStore();
				setStore({bookmarks: [
					...store.bookmarks.slice(0, index),
					...store.bookmarks.slice(index + 1, store.bookmarks.length)
					]})
            }
		}
	};
};

export default getState;
