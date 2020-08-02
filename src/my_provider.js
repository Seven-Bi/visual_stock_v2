import React from 'react';
import MyContext from './my_context.js';



const api = '/get-products'
// const api = 'http://localhost:3000'


class MyProvider extends React.Component {
    state = {
        market_data: []
    }

    componentDidMount() {
        fetch(api)
        .then(res => {
            console.log(res)
            // const j_str = JSON.stringify(res);
            // console.log(j_str)
            // // JSON.parse(j_str, (key, value) => {
            // //     if (key === "data") {
            // //         console.log(value)
            // //         // return value
            // //     }
            // //     else {
            // //         console.log(key)
            // //     }
            // // })
        })
    }

    // componentDidMount() {
    //     fetch(api)
    //     .then(res => res.json())
    //     .then((data) => {
    //         this.setState({ contacts: data })
    //     })
    //     .catch(console.log)
    // }


    render() {
        return (
            <MyContext.Provider
                value={{
                    market_data: this.state.market_data,
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

export default MyProvider;
