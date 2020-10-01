import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';



let shade_tab_data = {}
let msg = ''
function change(tab_data, row) {
	if(tab_data.length > 0) {
		let res = JSON.parse(tab_data)
		for (var i = 0; i < res.data.length; i++) {
			if(res.data[i].s === row.s) {
				if(row.s in shade_tab_data) {
					msg = `${row.s}  <Latest Price>  updated from ${shade_tab_data[row.s]} to ${res.data[i].c}!`
				}
				else {
					msg = `${row.s}  <Latest Price>  updated to ${res.data[i].c}!`
				}
				
				shade_tab_data[row.s] = res.data[i].c
				return res.data[i].c
			}
			else{
				if(row.s in shade_tab_data) {
					return shade_tab_data[row.s]
				}
				return row.c
			}
		}
	}
}

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Table size="small" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<TableCell>Pair</TableCell>
							<TableCell align="left">Parent Market</TableCell>
							<TableCell align="left">Open Price</TableCell>
							<TableCell align="left">Latest Price </TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
					{props.data_list.map((row) => (
						<TableRow key={row.b}>
							<TableCell component="th" scope="row">
								{row.s}
							</TableCell>
							<TableCell align="left">{row.pm}</TableCell>
							<TableCell align="left">{row.o}</TableCell>
							<TableCell align="left">{change(props.tab_data, row)}</TableCell>
						</TableRow>
					))}
					</TableBody>
				</Table>		
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function ScrollableTabsButtonAuto(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const tab_menu = Object.keys(props.tab_base).map((key) => {
		return (
			<Tab key={key} label={key} {...a11yProps(key)} />
		)	
	})

	const tab_data = Object.keys(props.tab_base).map((key, index_num) => {
		return(
			<TabPanel key={key} tab_data={props.tab_data} data_list={props.tab_base[key].slice(0,10)} value={value} index={index_num}>
			</TabPanel>
		)
	})

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
					{tab_menu}
				</Tabs>
				{tab_data}
			</AppBar>
			<div style={{ marginTop: '20px'}}>
				<Chip 
					style={{ minWidth: '100px'}}
					label={ msg }
					color="secondary"	
				/>
			</div>
			<div style={{ marginTop: '20px'}}>
				<Card>
					<Typography style={{ textAlign: 'center'}} variant="h4" gutterBottom>
						Simulate Crypto Exchange UI Demo
					</Typography>
					<Typography style={{ textAlign: 'center'}} variant="h5" gutterBottom>
						A brief to functionalities:
					</Typography>
					<Typography style={{ textAlign: 'center'}} variant="button" gutterBottom>:
						<li>load open price and latest price</li>
						<li>see real-time data (latest price)</li>
						<li>start/pause real time function</li>
					</Typography>
					<Typography style={{ textAlign: 'center'}} variant="body1" gutterBottom>
						Update info will be updated in red chip as well, will take some time to
						waite sample data get update.
					</Typography>
				</Card>
			</div>			

		</div>
	);
}
