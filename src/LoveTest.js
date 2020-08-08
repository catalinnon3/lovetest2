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
    group_id = 197766831,
    prefix = '_____';

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
        let keys = ['gen', 'phrase'];
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
            'На линейке 1 сентября 2021 года жди очень крутых сюрпризов в твоей судьбе. Твой парень будет стоять слева от тебя и очень красиво смеяться. Посмейся ему в ответ.',
            'Твои следующие отношения начнутся осенью этого года. Твоя половинка напишет тебе в вк, вы будете долго общаться в сети, пока не решите встретиться. Но когда вы встретитесь, это будет уже необратимый процесс.',
            'Твои первые отношения начнутся после мучительных страданий от расставания с твоим нынешним парнем 13 января. Ты будешь гулять по парку в своих мыслях, когда твой будущий парень врежется прямо в тебя и ты упадешь. Он очень долго будет просить прощения, в итоге вы начнете встречаться.',
            'Ты познакомишься со своей второй половинкой на отдыхе в турции следующим летом. Отдыхая на пляже твоя мама заговорит с мамой твоей половинки. Из-за этого вы начнете проводить время вместе. Одна неделя и ты уже никогда не сможешь его забыть.',
            'Ты познакомишься со своей половинкой в интернете. В беседу твоей компании пригласят парня с очень странным именем. Ты поинтересуешься "почему тебя так зовут!?". 22 августа 2021 года вы уже будете встречаться.',
            'Музыка сближает, правда ? Именно музыка сблизит тебя с твоим будущим парнем. На перемене ты будешь слушать "The doors" в наушника. Удивленный парень из параллельного класса спросит " Что ты слушаешь? ". C тех пор вы будете неразделимы.',
            'Твои следующие отношения начнутся в июне 2021 года. Твой будущий парень подойдет к тебе на прогулке в парке и неловко спросит как тебя зовут. Его робкий голос сразу застрянет в твоём сердечке.',
            'На линейке 1 сентября 2020 года жди очень крутых сюрпризов в твоей судьбе. Твой парень будет стоять слева от тебя и очень красиво смеяться. Посмейся ему в ответ.',
            'Твои следующие отношения начнутся 8 октября этого года, ты будешь как обычно выпивать с подругами на улице и к вам подойдет компания парней, один из них посмотрит на тебя и это будет влюбленность с первого взгляда.',
            'Следующие отношения начнутся 14 сентября 2020 года. Ты будешь ожидать автобус и увидишь своего будущего парня. После неловких взглядов вы зайдете в автобус, случайно сев рядом, познакомитесь и разговоритесь.',
            'Следующие отношения начнутся 28 декабря 2020 года. Ты пойдешь в магазин под новый год, подскользнешься на наледи и упадешь. Твоя будущая половинка подбежит помочь тебе подняться. Посмеявшись и отряхнувшись, вы узнаете имена друг друга. Он будет очень милый и высокий.',
            'Следующие отношения начнутся 11 мая 2021 года. Ранним утром ты отправишься по делам. Вы не первый раз столкнетесь в лифте, но сегодня твой будущий парень наберется храбрости и напрямую спросит: "не хочешь ли ты погулять вечером?". Ты ответишь "да".',
            'Следующие отношения начнутся 28 апреля 2021 года. На протяжении нескольких месяцев вы будете сталкиваться взглядами в метро. В очередной раз он не выдержит и подойдет познакомиться. "Не может так быть, что бы мы случайно столько раз встретились" - скажет он и вы договоритесь о свидании.',
            'Следующие отношения начнутся 29 декабря 2020 года. Под новый год случаются чудеса, ведь ты познакомишься с ним. С первого взгляда ты поймешь, что он тот самый. Он будет двоюродным братом твоего одноклассника. Вы быстро найдете общий язык и договоритесь о свидании.',
            'Вы встретитесь 1 января, в 00:15, он запустит феирверк прямо в твое окно. Ты спустишься к нему на разборку, вся такая потрепанная, и он влюбится в тебя. И не важно, что ты будешь крыть его матом.',
            'Вы встретитесь где то в июле 2021. Ты заблудишься в лесу, выйдешь к дому лесника. Лесник умер, а его сын- красавчик пришел собрать вещи отца. И встретившись, вы сразу поймете, что будите жить на краю земли в этом доме и умрете в один день.',
            'Следующие отношения начнутся 21 января 2021 года. Он будет около входа в кабинет к стоматологу. Ты подойдешь и тихо спросишь людей "кто последний?". Он единственных отзовется на твой вопрос. Вы познакомитесь и обменяетесь телефонами. На следующий день состоится ваше первое свидание.'
        ],
            man = [
                'Следующие отношения начнутся 14 сентября 2020 года. Ты будешь ожидать автобус и увидишь свою будущую девушку. После неловких взглядов вы зайдете в автобус, случайно сев рядом, познакомитесь и разговоритесь.',
                'Следующие отношения начнутся 28 декабря 2020 года. Ты пойдешь в магазин под новый год, подскользнешься на наледи и упадешь. Твоя будущая половинка подбежит помочь тебе подняться. Посмеявшись и отряхнувшись, вы узнаете имена друг друга. Она будет очень милой и красивой.',
                'Следующие отношения начнутся 11 мая 2021 года. Ранним утром ты отправишься по делам. Вы не первый раз столкнетесь в лифте, но сегодня твоя будущая девушка наберется храбрости и напрямую спросит: "не хочешь ли ты погулять вечером?". Ты ответишь "да".',
                'Следующие отношения начнутся 28 апреля 2021 года. На протяжении нескольких месяцев вы будете сталкиваться взглядами в метро. В очередной раз ты не выдержишь и подойдешь познакомиться. "Не может так быть, что бы мы случайно столько раз встретились" - скажешь ты и вы договоритесь о свидании.',
                'Следующие отношения начнутся 22 октября 2020 года. Ты будешь в плохом настроении в перерыве между учебой, но вдруг увидишь ее. Она будет стоять и изучать что-то на доске с информацией. Ты аккуратно подойдешь и пошутишь. Тебя заворожит ее звонкий смех. С этого дня вы начнете строить отношения.',
                'Следующие отношения начнутся 18 ноября 2020 года. Ты не будешь знать как ее зовут, но она позвонит тебе и ты влюбишься в ее голос. Окажется, что она просто ошиблась номером, но ты найдешь ее в соц.сети по номеру телефона и вы начнете общаться.',
                'Следующие отношения начнутся 12 февраля 2021 года. Ты не будешь ждать, что в такой пасмурный день может случиться что-то хорошее, но тут появится она. Ты столкнешься с ней около магазина и помимо своей воли увяжешься за ней. Она заметит, что ты идешь следом и повернется поздороваться. Окажется, что вы учились в параллельном классе.',
                'Следующие отношения начнутся 27 сентября 2020 года. Это будет девушка из компании твоего друга. Вы познакомитесь на вечеринке. Она будет такой беззащитной и милой, что ты не сможешь не влюбиться. Через неделю вы пойдете на ваше первое свидание.',
                'Следующие отношения начнутся 4 апреля 2021 года. Вы познакомитесь во время вечерней прогулки с друзьями. Встретившись с компанией девушек, твои друзья быстро найдут с ними общий язык, а ты будешь плестись сзади. Одна из девушек заметит это и присоединится к тебе. Ты узнаешь ее имя и полюбишь ее чудный голос. В этот день будет ваш первый поцелуй',
                'Следующие отношения начнутся 12 февраля 2021 года. Голодный, ты зайдешь в кафе быстрого питания. Твоя будущая девушка будет стоять в соседней очереди. У нее будет волшебная фигура. Позже ты подсядешь к ней за столик и узнаешь, что она обожает бургеры и что "у меня просто хороший обмен веществ". Вы весело проведете время и уже через неделю начнете встречаться.',
                'Следующие отношения начнутся 9 ноября 2020 года. Ты не первый месяц испытываешь симпатию к этой девушке, но все как-то не складывалось общение. В этот день вы случайно столкнетесь на светофоре. Ты проводишь ее до дома и предложишь встретиться еще раз. Она согласится и поцелует тебя в щечку.',
                'Следующие отношения начнутся 3 декабря 2020 года. Она подойдет неожиданно и спросит, как пройти к какому-то дому. Ты застесняешься, но быстро посмотришь по картам в телефоне и попытаешься объяснить, как туда дойти. Видя, что она запуталась, ты решишь проводить ее. В конце пути ты возьмешь ее номер и уже на следующий день вы пойдете на свидание.',
                'Следующие отношения начнутся 23 октября 2020 года. Тебя познакомит с ней твоя подруга. Окажется, что вы учились с ней в начальных классах. В этот же день будет ваш первый поцелуй.',
                'Следующие отношения начнутся 29 декабря 2020 года. Под новый год случаются чудеса, ведь ты познакомишься с ней. С первого взгляда ты поймешь, что она та самая. Она будет двоюродной сестрой твоего одноклассника. Вы быстро найдете общий язык и договоритесь на свидание.',
                'Следующие отношения начнутся 6 мая 2021 года. После неудачных отношений ты будешь отдыхать с друзьями, тусить и развлекаться. Ее пригласит один из твоих друзей. Странно, но она сама подойдет к тебе и познакомится. Тебя подкупит ее смелость и уже через пару дней вы начнете встречаться.',
                'Следующие отношения начнутся 17 ноября 2020 года. Ты неожиданно поймешь, что тебе нравится твоя давняя знакомая. Вы всегда проводили много времени вместе, но ты не думал о ней, как о будущей девушке. Тогда ты решил пригласить ее на свидание, на что она с радостью согласилась. Через пару дней вы впервые поцелуетесь.'
            ];

        let numM = random.int(0, man.length-1),
            numW = random.int(0, woman.length-1);

        let r = this.state.data['gen' + prefix] === 'm' ?
            this.state.data['phrase' + prefix] !== false ? man[this.state.data['phrase' + prefix]] : man[numM]
            :
            this.state.data['phrase' + prefix] !== false ? woman[this.state.data['phrase' + prefix]] : woman[numW];

        if(this.state.data['phrase' + prefix] === false){
            await bridge.sendPromise('VKWebAppStorageSet', {key: 'phrase' + prefix, value: this.state.data['gen' + prefix] === 'm' ? numM.toString() : numW.toString()});
            await this.updateStorage();
        }

        this.setState({ r });
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
                            <Button onClick={()=>{ this.go('panel3') }} size='xl'>Да</Button>
                            <Button onClick={()=>{ this.go('panel4') }} style={{ marginTop: '12px' }} mode='secondary' size='xl'>Нет</Button>
                        </div>}
                        stretched
                    >
                        У тебя когда-нибудь были отношения?
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
                    <Placeholder
                        icon={
                            <Lottie style={{ pointerEvents: 'none' }} options={{
                                animationData: animDataHeart,
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice'
                                }
                            }} width={this.viewportToPixels('65vw')}
                            />
                        }
                        stretched
                    >
                        { this.state.r }
                    </Placeholder>
                    {
                        this.state.screen &&
                        <Title level={2} weight='semibold' style={{ position: 'absolute', top: '75%', left: '50%', transform: 'translate(-50%, 0%)', width: '80vw', textAlign: 'center', color: 'white' }}>
                            Переходи в приложение, чтобы узнать когда у тебя будут следующие отношения
                            <br/>
                            <img crossOrigin={'anonymous'} style={{ marginTop: '12px' }} height='26px' src={downwards_black_arrow}/>
                            <img crossOrigin={'anonymous'} style={{ marginLeft: '6px' }} height='26px' src={downwards_black_arrow}/>
                            <img crossOrigin={'anonymous'} style={{ marginLeft: '6px' }} height='26px' src={downwards_black_arrow}/>
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
                                                background_type: 'image', blob, attachment: { url: 'https://vk.com/app' + app_id, text: 'open', type: 'url' }
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