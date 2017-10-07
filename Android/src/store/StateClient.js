
//import from system
import Fluxify from 'fluxify';

const StateClient = Fluxify.createStore({
	id: 'StateClient',
	initialState: {
		appData: null,
		news: [],
	},
	actionCallbacks: {
		updateAppData: (updater, appData) => {
			const obj = Object.assign({}, appData);
			updater.set({ appData: obj });
		},
		updateNews: (updater, news) => {
			const _news = news.slice();
			updater.set({ news: _news });
		}
	}
});

export default StateClient;