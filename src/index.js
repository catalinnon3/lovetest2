import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import LoveTest from './LoveTest';
import bridge from "@vkontakte/vk-bridge";

bridge.send('VKWebAppInit');

ReactDOM.render(<LoveTest />, document.getElementById('root'));
