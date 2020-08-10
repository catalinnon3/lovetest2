import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import './css/LoveTest.css';

import html2canvas from 'html2canvas';

import {Panel, View, Placeholder, Button, Gallery, Title, FixedLayout, Div, Snackbar, ScreenSpinner} from '@vkontakte/vkui';

import Icon28StoryOutline from '@vkontakte/icons/dist/28/story_outline';

import Lottie from 'react-lottie';
import animDataHello from './animations/hello.json';
import animDataLove from './animations/love.json';
import animDataBrokenHeart from './animations/broken_heart.json';
import animDataHeart from './animations/heart.json';

import bgLight from './img/bg-light.jpg';
import bgDark from './img/bg-dark.jpg';
import downwards_black_arrow from './img/downwards-black-arrow.png';
import w1 from './img/w1.jpg';
import w2 from './img/w2.jpg';
import w3 from './img/w3.jpg';
import m1 from './img/m1.jpg';
import m2 from './img/m2.jpg';
import m3 from './img/m3.jpg';

const random = require('random');

let app_id = 7561608,
    group_id = 197813900,
    prefix = '________';

class LoveTest extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            popout: null,
            history: [ 'main' ],
            activePanel: 'main',
            data: {}
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.back = this.back.bind(this);
        this.go = this.go.bind(this);
        this.updateTime = this.updateTime.bind(this);

        let array = ('Моя девушка будет волейболисткой. В ней будет сочетаться стремление к победе и кроткий нрав домашней кошечки. Она будет очень вкусно готовить. У нее будет сексуальная фигура, рост 176.\n' +
            ' \n' +
            'Моя девушка будет очень сильной личностью. Она будет работать полицейским. Строгая на работе, но милая и тихая дома. Она будет восхитительно готовить мучные изделия. Рост 168.\n' +
            ' \n' +
            'Моя девушка будет пылкой и страстной. С ней сложно будет строить спокойные отношения, поэтому иногда мы будет ссориться, мирясь каждый раз в постели. Рост 169.\n' +
            ' \n' +
            'Моя девушка будет обожать экстрим. Брюнетка с зелеными глазами, которая любит мотоциклы и машины. От ее идеальной фигуры нельзя будет оторвать взгляд. Рост 182.\n' +
            ' \n' +
            'Моя девушка будет очень обидчивой и милой. Ее надо будет всегда от всего защищать, ведь она неженка. У нее будет красивая фигура и модельная внешность.\n' +
            ' \n' +
            'Моя девушка будет сильной и независимой, но в то же время она всегда будет нуждаться в моей защите и ласке. У нее будет красивая фигура и голубые глаза. Рост 159.\n' +
            ' \n' +
            'Моя девушка будет эстрадной певицей. Ее голос будет удивлять меня изо дня в день. Точеная фигура и красивый бюст будут неистово возбуждать . Рост 173.\n' +
            ' \n' +
            'Моя девушка будет стюардессой. Очень красивая, что называется "русская" красота, длинная русая коса и светящиеся радостью глаза. Она будет вкусно готовить и увлекаться пением. Рост 172.\n' +
            ' \n' +
            'Моя девушка будет очень ревнивой. Ей всегда будет мало времени, проведенного вместе со мной, как и мне с ней. Она будет работать в модельном бизнесе. Брюнетка с идеальной фигурой, рост 174.\n' +
            ' \n' +
            'Моя девушка будет очень своеобразной. Розовые, голубые, сиреневые волосы - она будет часто перекрашиваться. Она будет очень добрая и беззаботная. У нее будет идеальная фигура, рост 167.\n' +
            ' \n' +
            'Моя девушка будет очень ранимой и нежной. Ее золотистые волосы будут очень длинными, а кристально чистый смех будет завораживать. У нее будет фигурка Дюймовочки и изумрудные глаза.\n' +
            ' \n' +
            'Моя девушка будет тренером по кроссфиту. На нее будут заглядываться все парни, ведь там действительно будет на что посмотреть. У нее будет кроткий характер. Рост 169 и голубые глаза.\n' +
            ' \n' +
            'Моя девушка будет очень внимательной и дружелюбной. У нее будет очень много друзей, которые всегда будут готовые помочь. У нее будет изумительная фигура и белоснежная улыбка.\n' +
            ' \n' +
            'Моя девушка будет не по годам молодо выглядеть. Высокая, напористая, она не будет выговаривать букву "р" и это будет очень мило.\n' +
            ' \n' +
            'Моя девушка будет очень яркой и светлой, ведь она блондинка и всегда одевается в яркую одежду. Но она очень стеснительная и уступает в решении вопросов. Рост 165.\n' +
            ' \n' +
            'Моя девушка будет маленькой и скромной. Нашим совместным любимом занятием будет рисование. Её глаза будут цвета неба.\n' +
            '\n' +
            'Моя девушка будет с русыми волосами и большой косой. Одевается немного по-пацански, но это мило. Очень любит подшучивать надо мной.\n' +
            ' \n' +
            'Моя девушка будет маленькой и хрупкой, но очень целеустремленной. Она великолепный кондитер и будет очень хорошей мамой. При росте 168 у нее замечательная фигура модели.\n' +
            ' \n' +
            'Моя девушка будет брюнеткой с длинными волосами, осиной талией и милой улыбкой. Она обладает сильным характером и работает в сфере финансов. Очень любит обнимашки и вечерние прогулки, рост 167\n' +
            ' \n' +
            'У моей девушки будет удивительно женственное, миловидное лицо. У нее будут большие карие глаза, которыми она будут смотреть на меня всегда с любовью. Её рост примерно 170см.').split('\n \n');
        console.log(array);
    }

    async componentDidMount () {
        let data = await this.updateStorage();

        if(data['gen' + prefix] !== false && data['phrase' + prefix] !== false) {
            await this.randomPhrase();
            this.go('panel5');
        }

        bridge.send('VKWebAppInit');

        window.addEventListener('popstate', e => {
            e.preventDefault();
            this.back(e);
        });

        bridge.subscribe(async ({ detail: { type, data }}) => {
            if (type !== undefined) console.log(type, data);
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = false ? data.scheme ? data.scheme : 'bright_light' : 'space_gray';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });
    }

    async updateStorage () {
        let keys = ['gen', 'phrase', 'time'];
        let sValues = await bridge.sendPromise('VKWebAppStorageGet', {keys: (keys.join(prefix+',') + prefix).split(',') });
        sValues = sValues.keys;
        let data = {};
        try{
            for(let value of sValues){
                let nmbr = Number(value.value);
                data[value.key] = (value.value == 'true' || value.value == 'false' || value.value == '') ? value.value == 'true' : nmbr > 0 ? nmbr : value.value;
            }
        }catch (e) {
            console.error('e3', e)
        }
        this.setState({ data, sValues });

        return data;
    }

    back = () => {
        if(this.state.popout !== null){
            this.setState({ popout: null });
            window.history.pushState({ pop: 'popout' }, 'Title');
            return ;
        }
        let { activePanel, history } = this.state;
        if(history.length === 1) {
            bridge.send('VKWebAppClose', { status: 'success' });
        } else if (history.length > 1) {
            history.pop();
            activePanel = history[history.length - 1];
            this.setState({ activePanel, history });
        }
    };
    go(panel) {
        let { history, activePanel } = this.state;
        if(history[history.length-1] !== panel) {
            history.push(panel);
            window.history.pushState({ activePanel: panel }, 'Title');
            activePanel = panel;
            this.setState({ activePanel, history });
        }
    }

    async randomPhrase () {
        let woman = [
                'Мой парень будет вежливый и милый. Он будет обожать спорт, его тело будет восхищать. Тёмные волосы и голубые глаза сведут меня с ума. Рост 191',
                'Мой парень будет бизнесменом. Предприимчивый, сильный, но честный, он будет уникальной личностью. У него будет милая улыбка и красивые глаза.',
                'Мой парень будет статный и красивый. Внешность модели, характер полководца. За ним всегда чувствую себя в безопасности. Рост 187',
                'Мой парень будет очень успешен и силен. Его карие глаза будут полны мудрости и доброты. Его рост будет 178, хобби - велоспорт.',
                'Мой парень будет стройными и высоким. Я сразу полюблю его ласковый и надёжный характер. Он обожает делать сюрпризы. Рост 176',
                'Мой парень будет ревнивым и улыбчивым. Он очень будет дорожить мной. У него будет восхитительный голос и красивое тело. Рост 191',
                'Мой парень будет очень хорошо танцевать. У него будут светлые волосы и голубые глаза. Его хобби - рисование.',
                'Мой парень будет высоким и милым. Его звонкий смех будет заразительным, а глаза цвета морской волны покорят мое сердце. Он будет работать программистом в крупной компании.',
                'Мой парень будет необычным. У него будет много энергии, он будет очень эмоциональным и неусидчивым. Добрый и умный, он будет ростом 182, темноволосый.',
                'Мой парень будет очень миловидным. Худощавый, но жилистый, с русыми волосами и серыми глазами. Он будет очень чуткий, добрый и верный. Он будет любить собачек.',
                'Мой парень будет ветеринаром. Он будет обожать кошек и вообще всех животных. Сильный, добрый, бесстрашный, темноволосый с зелеными глазами.',
                'Мой парень будет успешным банковским служащим, строгим, но справедливым. Я буду без ума от его чувства юмора и бездонных зеленых глаз. У него будет рост 181 и атлетическое тело.',
                'Мой парень на первый взгляд будет внешне самым обыкновенным, рост 175, спортивное телосложение. Но на деле он будет работать пожарным, волонтером в детских домах и будет любить меня бесконечно сильно.',
                'Мой парень будет ярым фанатом футбола. Он будет хорош играть в региональной сборной. У него будет волшебное тело и голубые глаза. Он будет называть меня своей "малышкой".',
                'Мой парень будет фотографом. Его волшебные фотографии будут оцене��ы по достоинству в европейских странах. Он будет среднего телосложения с модельным лицом и глазами изумрудного цвета.',
                'Мой парень будет красивым, накаченным массажистом. Его крепкие руки будут делать со мной такое, от чего я буду таять, как масло. У него будут русые волосы, умные карие глаза и бархатистый голос.',
                'Мой парень будет ебать овец и говорить фразу "ежи бля" каждый день.',
                'Мой парень будет великолепным хирургом. Он будет добрым и нежным. У него будет широкая спина, за которой я буду чувствовать себя в безопасности. У него красивые голубые глаза и рост 185.',
                'Мой парень будет очень строгим, но добрым и милым одновременно. Он будет любить меня больше, чем я себе могла представить. Он будет работать фитнес инструктором. Его статная внешность и карие глаза сведут меня с ума.',
                'Мой парень будет пилотом самолета. Его будут любить и уважать все вокруг. Незабываемые вечера в его крепких объятиях я не забуду никогда. У него будет волшебное чувство юмора и голубые, бездонные глаза.',
                'Мой парень будет очень вспыльчивым и с сильным характером, но тем не менее от меня он будет без ума. С ним у меня будут лучшие свидания. У него будут светлые волосы и изумрудные глаза.',
                'Мой парень будет учителем в школе. У него будет восхитительный смех и харизма, рост 180 и модельная внешность. Он не любит расставания, потому я всегда буду рядом.',
                'Мой парень будет высоким, стройным и с зелеными глазами. Его русые волосы будут очень пышными и красивыми. Он инструктор по вождению, который любит экстрим.',
                'Мой парень будет моделью. Он будет сниматься для линеек одежды и рекламных компаний. Он очень добрый и милый. Любит спать в обнимку со мной. Рост 184 и крепкое тело.'
            ],
            man = [
                'Моя девушка будет волейболисткой. В ней будет сочетаться стремление к победе и кроткий нрав домашней кошечки. Она будет очень вкусно готовить. У нее будет сексуальная фигура, рост 176.',
                'Моя девушка будет очень сильной личностью. Она будет работать полицейским. Строгая на работе, но милая и тихая дома. Она будет восхитительно готовить мучные изделия. Рост 168.',
                'Моя девушка будет пылкой и страстной. С ней сложно будет строить спокойные отношения, поэтому иногда мы будет ссориться, мирясь каждый раз в постели. Рост 169.',
                'Моя девушка будет обожать экстрим. Брюнетка с зелеными глазами, которая любит мотоциклы и машины. От ее идеальной фигуры нельзя будет оторвать взгляд. Рост 182.',
                'Моя девушка будет очень обидчивой и милой. Ее надо будет всегда от всего защищать, ведь она неженка. У нее будет красивая фигура и модельная внешность.',
                'Моя девушка будет сильной и независимой, но в то же время она всегда будет нуждаться в моей защите и ласке. У нее будет красивая фигура и голубые глаза. Рост 159.',
                'Моя девушка будет эстрадной певицей. Ее голос будет удивлять меня изо дня в день. Точеная фигура и красивый бюст будут неистово возбуждать . Рост 173.',
                'Моя девушка будет стюардессой. Очень красивая, что называется "русская" красота, длинная русая коса и светящиеся радостью глаза. Она будет вкусно готовить и увлекаться пением. Рост 172.',
                'Моя девушка будет очень ревнивой. Ей всегда будет мало времени, проведенного вместе со мной, как и мне с ней. Она будет работать в модельном бизнесе. Брюнетка с идеальной фигурой, рост 174.',
                'Моя девушка будет очень своеобразной. Розовые, голубые, сиреневые волосы - она будет часто перекрашиваться. Она будет очень добрая и беззаботная. У нее будет идеальная фигура, рост 167.',
                'Моя девушка будет очень ранимой и нежной. Ее золотистые волосы будут очень длинными, а кристально чистый смех будет завораживать. У нее будет фигурка Дюймовочки и изумрудные глаза.',
                'Моя девушка будет тренером по кроссфиту. На нее будут заглядываться все парни, ведь там действительно будет на что посмотреть. У нее будет кроткий характер. Рост 169 и голубые глаза.',
                'Моя девушка будет очень внимательной и дружелюбной. У нее будет очень много друзей, которые всегда будут готовые помочь. У нее будет изумительная фигура и белоснежная улыбка.',
                'Моя девушка будет не по годам молодо выглядеть. Высокая, напористая, она не будет выговаривать букву "р" и это будет очень мило.',
                'Моя девушка будет очень яркой и светлой, ведь она блондинка и всегда одевается в яркую одежду. Но она очень стеснительная и уступает в решении вопросов. Рост 165.',
                'Моя девушка будет маленькой и скромной. Нашим совместным любимом занятием будет рисование. Её глаза будут цвета неба.',
                'Моя девушка будет с русыми волосами и большой косой. Одевается немного по-пацански, но это мило. Очень любит подшучивать надо мной.',
                'Моя девушка будет маленькой и хрупкой, но очень целеустремленной. Она великолепный кондитер и будет очень хорошей мамой. При росте 168 у нее замечательная фигура модели.',
                'Моя девушка будет брюнеткой с длинными волосами, осиной талией и милой улыбкой. Она обладает сильным характером и работает в сфере финансов. Очень любит обнимашки и вечерние прогулки, рост 167',
                'У моей девушки будет удивительно женственное, миловидное лицо. У нее будут большие карие глаза, которыми она будут смотреть на меня всегда с любовью. Её рост примерно 170см.'
            ];

        let numM = random.int(0, man.length-1),
            numW = random.int(0, woman.length-1);

        let r = this.state.data['gen' + prefix] === 'm' ?
            this.state.data['phrase' + prefix] !== false ? man[this.state.data['phrase' + prefix]] : man[numM]
            :
            this.state.data['phrase' + prefix] !== false ? woman[this.state.data['phrase' + prefix]] : woman[numW];

        if(this.state.data['phrase' + prefix] === false){
            await bridge.sendPromise('VKWebAppStorageSet', {key: 'phrase' + prefix, value: this.state.data['gen' + prefix] === 'm' ? numM.toString() : numW.toString()});
        }

        let timeDate = this.state.data['time' + prefix] !== false ? this.state.data['time' + prefix] : await new Date(Date.now() + this.random(6 * 365 * 24 * 60 * 60 * 1000, 12 * 365 * 24 * 60 * 60 * 1000)).getTime();

        if(this.state.data['time' + prefix] === false){
            await bridge.sendPromise('VKWebAppStorageSet', {key: 'time' + prefix, value: timeDate.toString()});
        }

        this.setState({ r, timeDate });

        await this.updateStorage();

        this.updateTime();
    }

    updateTime() {
        setInterval(()=>{
            try{
                let timeMs = this.state.timeDate - Date.now();

                let years, days, hours, minutes, seconds;
                let yMs = 1000 * 60 * 60 * 24 * 365,
                    dMs = yMs / 365,
                    hMs = dMs / 24,
                    minMs = hMs / 60,
                    sMs = minMs / 60;

                years = Math.floor(timeMs / yMs); timeMs -= yMs;
                days = Math.floor(timeMs / dMs) % 365; timeMs -= dMs;
                hours = Math.floor(timeMs / hMs) % 24; timeMs -= hMs;
                minutes = Math.floor(timeMs / minMs) % 60; timeMs -= minMs;
                seconds = Math.floor(timeMs / sMs) % 60; timeMs -= sMs;

                let times = [ [ years, [ 'год', 'года', 'лет' ] ],
                        [ days, ['день', 'дня', 'дней'] ],
                        [ hours, ['час', 'часа', 'часов'] ],
                        [ minutes, ['минута', 'минуты', 'минут'] ],
                        [ seconds, ['секунда', 'секунды', 'секунд'] ]],

                    timesText = [];

                for(let i = 0; i < times.length; i++){
                    if (times[i][0] > 0) timesText.push(times[i][0] + ' ' + this.decOfNum(times[i][0], times[i][1]));
                }

                this.setState({ time: timesText.join(', ') });
            }catch (e) {
                console.error(e);
            }
        }, 500);
    }

    decOfNum(number, titles){
        let decCache = [],
            decCases = [2, 0, 1, 1, 1, 2];
        if(!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
        return titles[decCache[number]];
    }

    random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    viewportToPixels(value) {
        let parts = value.match(/([0-9\.]+)(vh|vw)/);
        let q = Number(parts[1])
        let side = window[['innerHeight', 'innerWidth'][['vh', 'vw'].indexOf(parts[2])]];
        return side * (q/100)
    }

    render() {
        return (
            <View activePanel={this.state.activePanel} popout={this.state.popout} history={this.state.history} onSwipeBack={this.back}>
                <Panel id='main'>
                    <Placeholder
                        icon={
                            <Lottie style={{ pointerEvents: 'none', transform: 'translateX(20px)' }} options={{
                                animationData: animDataHello,
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice'
                                }
                            }} width={this.viewportToPixels('65vw')}
                            />
                        }
                        action={<div>
                            <Button onClick={async ()=>{
                                await bridge.sendPromise('VKWebAppStorageSet', {key: 'gen' + prefix, value: 'm'});
                                await this.updateStorage();
                                this.go('panel2'); }} size='xl'>Мужской</Button>
                            <Button onClick={async()=>{
                                await bridge.sendPromise('VKWebAppStorageSet', {key: 'gen' + prefix, value: 'w'});
                                await this.updateStorage();
                                this.go('panel2'); }} style={{ marginTop: '12px' }} mode='secondary' size='xl'>Женский</Button>
                        </div>}
                        stretched
                    >
                        Привет! Давай определимся с полом:
                    </Placeholder>
                </Panel>
                <Panel id='panel2'>
                    <Placeholder
                        icon={
                            <Lottie style={{ pointerEvents: 'none' }} options={{
                                animationData: animDataLove,
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice'
                                }
                            }} width={this.viewportToPixels('65vw')}
                            />
                        }
                        action={<div>
                            <Button onClick={()=>{ this.go('panel4') }} size='xl'>Да</Button>
                            <Button onClick={()=>{ this.go('panel3') }} style={{ marginTop: '12px' }} mode='secondary' size='xl'>Нет</Button>
                        </div>}
                        stretched
                    >
                        Ты сейчас в отношениях?
                    </Placeholder>
                </Panel>
                <Panel id='panel3'>
                    <Placeholder
                        icon={
                            <Lottie style={{ pointerEvents: 'none' }} options={{
                                animationData: animDataBrokenHeart,
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice'
                                }
                            }} width={this.viewportToPixels('65vw')}
                            />
                        }
                        action={<div>
                            <Button onClick={()=>{ this.go('panel4') }} size='xl'>В этом месяце</Button>
                            <Button onClick={()=>{ this.go('panel4') }} style={{ marginTop: '12px' }} mode='secondary' size='xl'>Больше месяца назад</Button>
                            <Button onClick={()=>{ this.go('panel4') }} style={{ marginTop: '12px' }} mode='outline' size='xl'>Никогда не состоял в отношениях</Button>
                        </div>}
                        stretched
                    >
                        Когда закончились последние отношения?
                    </Placeholder>
                </Panel>
                <Panel id='panel4'>
                    <Placeholder
                        action={<div>
                            {
                                this.state.data['gen' + prefix] === 'm' ?
                                    <Gallery
                                        slideWidth='80%'
                                        align='center'
                                        style={{ height: 'auto', maxHeight: '70vh' }}
                                    >
                                        <img style={{ margin: '12px' }} src={w1} />
                                        <img style={{ margin: '12px' }} src={w2} />
                                        <img style={{ margin: '12px' }} src={w3} />
                                    </Gallery>
                                    :
                                    <Gallery
                                        slideWidth='80%'
                                        align='center'
                                        style={{ height: 'auto', maxHeight: '70vh' }}
                                    >
                                        <img style={{ margin: '12px' }} src={m1} />
                                        <img style={{ margin: '12px' }} src={m2} />
                                        <img style={{ margin: '12px' }} src={m3} />
                                    </Gallery>
                            }
                            <Button onClick={async ()=>{ 
                                try{
                                    await bridge.sendPromise('VKWebAppAllowMessagesFromGroup', {group_id, key: 'dBuBKe1kFcdemzB'});
                                    await this.randomPhrase();
                                    this.go('panel5');
                                }catch (e) {
                                    console.error(e);
                                    this.setState({ snackbar:
                                            <Snackbar
                                                layout='vertical'
                                                onClose={() => this.setState({ snackbar: null })}
                                            >
                                                Необходимо сначала разрешить сообщения
                                            </Snackbar>
                                    });
                                }
                            }} style={{ marginTop: '12px' }} size='xl'>Выбрать</Button>
                        </div>}
                        stretched
                    >
                        Какую из этих картинок ты выберешь?
                    </Placeholder>
                    { this.state.snackbar }
                </Panel>
                <Panel id='panel5'>
                    <img crossOrigin='anonymous' src={bgDark} style={{ height: '100vh' }}/>
                    { this.state.screen ?
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '90vw',
                            textAlign: 'center'
                        }}>
                            <span style={{
                                fontWeight: '700',
                                fontSize: '26px',
                                color: 'white',
                                lineHeight: '29px'
                            }}>Я <span style={{ padding: '0px' }} className='gradient'>{this.state.data['gen' + prefix] === 'm' ? 'поженюсь' : 'выйду замуж'}</span> через:</span>
                            <br/>
                            <span style={{fontSize: '18px', color: 'white', lineHeight: '37px'}}>
                            {this.state.time ? this.state.time : '0 секунд'}
                        </span>
                            <br/><br/>
                            <div className='gradient'>{this.state.r}</div>
                            <Lottie style={{pointerEvents: 'none'}} options={{
                                animationData: animDataHeart,
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice'
                                }
                            }} width={this.viewportToPixels('45vw')}
                            />
                        </div>
                        :
                        <Placeholder
                            icon={
                                <Lottie style={{pointerEvents: 'none'}} options={{
                                    animationData: animDataHeart,
                                    rendererSettings: {
                                        preserveAspectRatio: 'xMidYMid slice'
                                    }
                                }} width={this.viewportToPixels('55vw')}
                                />
                            }
                            stretched
                        >
                            <span style={{
                                fontWeight: '700',
                                fontSize: '26px',
                                color: 'white',
                                lineHeight: '29px'
                            }}>Я <span style={{ padding: '0px' }} className='gradient'>{this.state.data['gen' + prefix] === 'm' ? 'поженюсь' : 'выйду замуж'}</span> через:</span>
                            <br/>
                            <span style={{fontSize: '18px', color: 'white', lineHeight: '37px'}}>
                            {this.state.time ? this.state.time : '0 секунд'}
                        </span>
                            <br/><br/>
                            <div className='gradient'>{this.state.r}</div>
                        </Placeholder>
                    }
                    {
                        this.state.screen &&
                        <Title level={ false ? 2 : 3} weight='semibold' style={{ position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, 0%)', width: '80vw', textAlign: 'center', color: 'white' }}>
                            Переходи в приложение, если хочешь узнать дату своей свадьбы
                            { false &&
                                <div>
                                    <br/>
                                    <img crossOrigin={'anonymous'} style={{ marginTop: '12px' }} height='26px' src={downwards_black_arrow}/>
                                    <img crossOrigin={'anonymous'} style={{ marginLeft: '6px' }} height='26px' src={downwards_black_arrow}/>
                                    <img crossOrigin={'anonymous'} style={{ marginLeft: '6px' }} height='26px' src={downwards_black_arrow}/>
                                </div>
                            }
                        </Title>
                    }

                    {
                        !this.state.screen &&
                        <FixedLayout vertical='bottom'>
                            <Div style={{ marginBottom: '12px' }}>
                                <Button onClick={async ()=>{
                                    this.setState({ popout: <ScreenSpinner/>, screen: true });
                                    await this.sleep(750);
                                    let element = document.getElementsByClassName('View__panels')[0];
                                    html2canvas(element, { allowTaint: true }).then(async canvas => {
                                        this.setState({ screen: false });
                                        await this.sleep(250);
                                        let blob = canvas.toDataURL('image/png');

                                        try{
                                            await bridge.send('VKWebAppShowStoryBox', {
                                                background_type: 'image', blob, attachment: { url: 'https://vk.com/app' + app_id, text: 'go_to', type: 'url' }
                                            });
                                            this.setState({ shared: true });
                                        }catch (e) {}
                                        this.setState({ popout: null });
                                    });
                                }} before={<Icon28StoryOutline />} size='xl' mode='commerce'>Поделиться в истории</Button>
                            </Div>
                        </FixedLayout>
                    }
                </Panel>
            </View>
        );
    }
}

export default LoveTest;