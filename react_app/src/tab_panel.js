import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MyContext from './my_context.js'




function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return(
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>			
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
}

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	}
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
}))

export default function ScrollableTabsButtonAuto(props) {
	const classes = useStyles()
	const [value, setValue] = React.useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}
	//<Tab label='lol' {...a11yProps(0)} />
	return (
		<div className={classes.root}>
			
				<AppBar position="static" color="default">
					<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					aria-label="scrollable auto tabs example"
					>
						
						<MyContext.Consumer>
							{
								context_value => {
									let dict = context_value.data_structure
									
									var key_list = []
									
									for(var key in dict) {
										key_list.push(key)
									}

									var count = 0
									key_list.map(item => 
										<Tab label={item} {...a11yProps(count)} />
									)
								}
							}
						</MyContext.Consumer>
					</Tabs>
				</AppBar>
				<MyContext.Consumer>
					{
						context_value => {
							return (
								<TabPanel value={value} index={0}>
									Item One
								</TabPanel>
							)
						}
					}
				</MyContext.Consumer>
		</div>
	)
	
}
