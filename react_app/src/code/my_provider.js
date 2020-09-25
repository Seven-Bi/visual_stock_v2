import React from 'react';
import MyContext from './my_context.js';




const api = '/get-products'

class MyProvider extends React.Component {
    constructor(props) {
        super(props);
        this.handle_click = props.callback
        this.state = {
            market_data: [],
            loaded: false
        };
    }

    componentDidMount() {
        fetch(api)
        .then(
            res => {
                return res.json()
            }
        )
        .then((output) => {
            var api_data = output.data
            this.setState({
                market_data: api_data,
                loaded: true
            })
            this.handle_click(api_data)
        })
    }

    render() {
        if (this.state.loaded) {
            return (
                <MyContext.Provider
                    value = {{
                        data: this.state.market_data
                    }}
                >
                    {this.props.children}
                </MyContext.Provider>
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

export default MyProvider;