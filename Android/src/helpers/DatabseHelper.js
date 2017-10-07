//import from app
import DB from './DatabaseClient.js';

class DatabaseHelper {
	getAllItems(callback) {
		return DB.ITEMS.get_all((results) => {
			callback(results);
		});
	}

	getItemByQuery(query, callback) {
		return DB.ITEMS.get(query, (results) => {
			callback(results);
		})
	}

	getAllItemsByQuery(query, callback) {
		return DB.ITEMS.get(query, (results) => {
			callback(results);
		})
	}

	addNewItem(data, callback) {
		const _data = Object.assign({}, data);
		if (data['_id'] != null) {
			DB.ITEMS.update({ _id: data['_id'] }, data, (results) => {
				callback(results);
			});
		} else {
			DB.ITEMS.add(data, (results) => {
				callback(results)
			});
		}
	}

	updateItemByQuery(query, data, callback) {
		DB.ITEMS.update(query, data, (results) => {
			callback(results);
		});
	}

	removeItemByQuery(query, callback) {
		DB.ITEMS.remove(query, (results) => {
			callback(results);
		})
	}

	eraseEverything(callback) {
		DB.ITEMS.erase_db((y) => {
			callback('done');
		})
	}
}

const database = new DatabaseHelper();
export default database;  