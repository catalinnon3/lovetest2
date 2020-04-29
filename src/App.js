import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import './css/App.css'
import eruda from 'eruda';

import { Panel, PanelHeader, View , ScreenSpinner, List , Cell , Gallery , FormLayout , Input , Avatar , Group , Epic, Tabbar, TabbarItem, Separator, Button, PanelHeaderContext, Header, PanelHeaderSimple, PanelHeaderContent, Placeholder, Tabs,
	TabsItem, PullToRefresh, Snackbar, Textarea, PanelHeaderBack, PanelHeaderClose, CellButton, Alert, Link  } from '@vkontakte/vkui';

const blueBackground = {
	backgroundColor: 'var(--accent)'
}, redBackground = {
	backgroundColor: 'var(--dynamic_red)'
};

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			popout: null,
			history: ["main"],
			activePanel: "main"
		};

		this.componentDidMount = this.componentDidMount.bind(this);
		this.initializeApp = this.initializeApp.bind(this);
		this.back = this.back.bind(this);
		this.go = this.go.bind(this);
		this.change_hash = this.change_hash.bind(this);
	}

	componentDidMount () {
		window.addEventListener('popstate', e => {
			e.preventDefault();
			this.back(e);
		});

		bridge.subscribe(async ({ detail: { type, data }}) => {
			if(type !== undefined) console.log(type, data);
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		this.initializeApp();
	}

	initializeApp() {
		let hash = window.location.hash;
		if (hash) {
			hash = hash.replace('#','');
			this.go(hash);
		}else{
			this.change_hash('main');
		}
	}

	back = () => {
		if(this.state.popout !== null){
			this.setState({ popout: null });
			return ;
		}
		let { activePanel, history } = this.state;
		if(activePanel === 'main'){
			bridge.send("VKWebAppClose", {"status": "success"});
		}else {
			if(history.length === 1) {
				bridge.send("VKWebAppClose", {"status": "success"});
			} else if (history.length > 1) {
				history.pop();
				this.setState({activePanel: history[history.length - 1]});
				this.change_hash(p);
			}
		}
	};
	go(panel) {
		let history = this.state.history;
		if(history[history.length-1] !== panel) {
			history.push(panel);
			window.history.pushState({activePanel: panel}, 'Title');
			this.setState({activePanel: panel, history, snackbar: null});
		}
		this.change_hash(panel);
	}
	change_hash (panel){
		bridge.send("VKWebAppSetLocation", {"location": panel});
	}

	async showSnackBar (text, icon, style, action, onActionClick){
		this.setState({ snackbar: null });
		await this.sleep(150);
		if(onActionClick === null) onActionClick = ()=> {};
		this.setState({ snackbar:
				<Snackbar
					layout="vertical"
					onClose={() => this.setState({ snackbar: null })}
					before={<Avatar size={24} style={style}>{icon}</Avatar>}
					action={action}
					onActionClick={onActionClick}
				>
					{text}
				</Snackbar>
		});
	}
	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	render() {
		return (
			<View activePanel={this.state.activePanel} popout={this.state.popout} history={this.state.history} onSwipeBack={this.back}>
				<Panel id="main">
					<PanelHeader>Mini App</PanelHeader>
				</Panel>
			</View>
		);
	}
}

export default App;