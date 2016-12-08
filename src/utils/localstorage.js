import config from '../config.js';

export default class LStorage {

	static get(field) {
		if ( LStorage._isExist ) {
			const data = JSON.parse( localStorage.getItem(config.localStorage.name) );

			if (!field) return data;
			if (data[field]) return data[field];

			return undefined;
		}

		return undefined;
	}

	static set(field, data = {}) {
		let dataToStorage = {};


		if (field) {
			dataToStorage = LStorage.get();
			if (!dataToStorage) dataToStorage = {};
			dataToStorage[field] = data;
		} else {
			dataToStorage = data;
		}

		localStorage.setItem( config.localStorage.name, JSON.stringify(dataToStorage) );
	}

	static _isExist() {
		return localStorage.getItem( config.localStorage.name ) ? true : false;
	}

}
