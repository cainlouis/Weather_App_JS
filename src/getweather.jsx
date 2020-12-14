'use strict'

let global = {};

function setup() {
    global.url = new URL('http://api.openweathermap.org/data/2.5/weather');
    global.urlIcon = 'http://openweathermap.org/img/wn/';
    global.appid = 'appid=' + 'a67203050719f4d6013a272df6ac734b';
    ReactDOM.render(<GetWeather />, document.querySelector('form'));
}

class GetWeather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.city = '';
        this.iconUrl = '';
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    change(e) {
        this.city = e.currentTarget.value;
    }

    submit(e) {
        e.preventDefault();
        
        
    }
}

setup();