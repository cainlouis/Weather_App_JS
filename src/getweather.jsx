'use strict'

function setup() {
    ReactDOM.render(<GetWeather />, document.querySelector('form'));
}

class GetWeather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
}

setup();