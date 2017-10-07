//import from system
const RNDBModel = require('react-native-database-model');
const DB = {
	'ITEMS': new RNDBModel.create_db('items')
}

export default DB;