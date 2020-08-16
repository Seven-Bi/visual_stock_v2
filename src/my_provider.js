import React from 'react';
import MyContext from './my_context.js';




const api = '/get-products'

let recur_foo = (num, data_list, data_dict) => {
    if (num <= 0) {
        return data_dict
    }

    var temp_l = []
    var key = data_list[num-1]['b']

    data_list.forEach(
        i => {
            if (i.pm === key) {
                temp_l.push(i.b)
            }
        }
    )

    data_dict[key] = temp_l
    num -= 1
    return recur_foo(num, data_list, data_dict)
}

class MyProvider extends React.Component {
    constructor(props) {
        super(props);
        // this.handle_click = props.callback
        this.state = {
            market_data: [],
            market_structure: [],
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
            var num = api_data.length
            var data_list = api_data
            var data_dict = {}
            var data = recur_foo(num, data_list, data_dict)
            this.setState({
                market_data: api_data,
                market_structure: data,
                loaded: true
            })
            // this.handle_click
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