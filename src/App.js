import React from 'react'
import Widget from './Components/Widget'



const key = ['BTC', 'ETH', 'BNB', 'BIDR', 'EUR', 'TRY', 'BUSD', 'RUB', 'USDT', 'GBP']

function data_filter(data_l, key_l) {
    let l = data_l
    let res = {}

    for (var i = 0; i < key_l.length; i++) {
        res[key_l[i]] = []
    }

    for (var j = 0; j < l.length; j++) {
        if(key_l.includes(l[j].q)) {
            res[l[j].q].push(l[j])
        }
    }

    return res
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            api_data: {}
        }
    }

    componentDidMount() {
        const api = '/get-products'

        fetch(api)
        .then(
            res => {
                return res.json()
            }
        )
        .then((output) => {
            if(output.data) {
                let filtered_data = data_filter(output.data, key)
                this.setState({
                    loaded: true,
                    api_data: filtered_data
                })
            }
        })
    }

    render() {
        if (this.state.loaded) {
            return (
                <div>
                    <Widget tab_data = { this.state.api_data }/>
                </div>
            );
        }
        else {
            return (
                <div>
                    <h1> Loading ... </h1>
                </div>
            );
        }
    }
}

export default App;
