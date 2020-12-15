'use strict'

/**
 * @author Nael Louis
 * @description This jsx creates a form with the input from the user and returns a form
 * to show the user the weather and an image of the current weather for that city
 */
let global = {};

/**
 * @description render the html
 */
function setup() {
    ReactDOM.render(<GetWeather/>, document.querySelector('#container'));
}

/**
 * @description creates a form with the data we get from the urls 
 */
class GetWeather extends React.Component {

    /**
     * @description parameterized constructor that call super from the React.Component
     * @param {Obj} props 
     */
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

    /**
     * @description get the values from the user and change city accordingly
     * @param {Event} e - modifying target value event
     */
    change(e) {
        this.setState({
            city: e.target.value
        }); 
    }

    /**
     * @description Fetch json object from the url given and call displayWeather and errorHandler accordingly
     * @param {Event} e - onClick event
     */
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

    /**
     * @description set the values to the state to display once the html is rendered
     * @param {JSON} json - JSON obj
     */
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
    /**
     * @description set values in the state
     * @param {Error} err - Error obj
     */
    errorHandler(err) {
        this.setState({
            promiseKept: false,
            errorReceived: true,
            errorResponse: err.toString(),
            showImg: false
        });
    }

    /**
     * @description this function manipulate the DOM to add the html 
     */
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