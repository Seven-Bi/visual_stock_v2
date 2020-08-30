import React from 'react'
import MyContext from './my_context.js'




class PriceTrending extends React.Component {

    render() {
        if (this.props.data_list) {
            return (
                <MyContext.Consumer>
                	{
						market_data => 
							(
								<div>
									{ 
										market_data.change(this.props.data_list, market_data.data) 
									}
								</div>
							)
					}
                </MyContext.Consumer>
            );
        }
        else {
            return (
                <MyContext.Consumer>
                	{
						market_data => 
							(
								<div>
									{ market_data.data.s } { market_data.data.o }
								</div>
							)
					}
                </MyContext.Consumer>
            );
        }
    }
}

export default PriceTrending;
