'use strict'

let global = {};

function setup() {
    ReactDOM.render(<GetWeather/>, document.querySelector('#container'));
}

class GetWeather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: '',
            city: '',
            units: 'metric',
            key: 'a67203050719f4d6013a272df6ac734b',
            picture: '',
            promiseKept: false,
            errorReceived: false,
            errorResponse: '',
        };
        this.handleChange = this.change.bind(this);
        this.handleSubmit = this.submit.bind(this);
    }
    change(e) {
        this.setState({
            city: e.target.value
        }); 
    }

    submit(e) {
        e.preventDefault();
        
        let url = new URL('http://api.openweathermap.org/data/2.5/weather');
        url.searchParams.set('q', this.state.city);
        url.searchParams.set('appid', this.state.key);
        url.searchParams.set('units', this.state.units);

        fetch(url.toString())
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                throw new Error('City was not found.');
            }
        })
        .then( json => {
            this.displayWeather(json);
        })
        .catch(err => {
            this.errorHandler(err)
        });
    }

    displayWeather(json) {
        this.setState({
            promiseKept: true,
            errorReceived: false,
            showImg: true,
            weatherResponse: json.weather[0].main, 
            temperature: json.main.temp, 
            icon: json.weather[0].icon, 
            picture: `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
        });
    }

    errorHandler(err) {
        this.setState({
            promiseKept: false,
            errorReceived: true,
            errorResponse: err.toString(),
            showImg: false
        });
    }

    render() {
        const styleResult = {display: this.state.promiseKept ? 'block' : 'none'};
        const styleError = {display: this.state.errorReceived ? 'block' : 'none'};
        const styleImg = {display: this.state.showImg ? 'block' : 'none'};
        return (
            <div id = 'input'>
                <form onSubmit={this.handleSubmit}>
                    <fieldset id='cityWeather'>
                        <legend>Enter the city to get the weather</legend>
                        <label htmlFor='city'>City: </label>
                        <input type='text' name='city' id='city' required onChange={this.handleChange}></input>
                    </fieldset>
                    <button type='submit'>GetWeather</button>
                </form>
                <div id='success' style = {styleResult}>
                    <p>Weather in {this.state.city}: {this.state.weatherResponse}, {this.state.temperature}°C</p>
                </div>
                <figure style = {styleImg}>
                    <img src = {this.state.picture} alt= {this.state.icon}></img>
                </figure>
                <div id = 'error' style = {styleError}>
                    <p> {this.state.errorResponse} </p>
                </div>
            </div>
        );
    }
}

setup();