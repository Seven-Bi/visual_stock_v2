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





function change(tab_data, row) {
	let l_price = 'none (click start)'
	if(tab_data.length > 0) {
		let res = JSON.parse(tab_data)
		console.log(res.data)
		for (var i = res.data.length - 1; i >= 0; i--) {
			if(res.data[i].s === row.s) {
				l_price = res.data[i].c
				return l_price
			}
		}
	}
	return l_price
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
							<TableCell align="right">Parent Market</TableCell>
							<TableCell align="right">Category of PM</TableCell>
							<TableCell align="right">Open Price</TableCell>
							<TableCell align="right">Latest Price </TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
					{props.data_list.map((row) => (
						<TableRow key={row.b}>
							<TableCell component="th" scope="row">
								{row.s}
							</TableCell>
							<TableCell align="right">{row.pm}</TableCell>
							<TableCell align="right">{row.pn}</TableCell>
							<TableCell align="right">{row.o}</TableCell>
							<TableCell align="right">{change(props.tab_data, row)}</TableCell>
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
			<TabPanel key={key} tab_data={props.tab_data} data_list={props.tab_base[key].slice(0,4)} value={value} index={index_num}>
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

		</div>
	);
}
