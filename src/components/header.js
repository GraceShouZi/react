import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import history from '../history';
export default class Header extends React.Component{
	constructor(props,context){
		super(props,context);
		this.navClick = this.navClick.bind(this);
	    var lastIndex = 0;
	    if(localStorage.lastIndex == undefined){
	    	lastIndex = 0;
	    	history.push('#/')
	    }else{
	    	lastIndex = localStorage.lastIndex;
	    	history.push(localStorage.lastUrl )
	    }
		this.state = {
			index:lastIndex,
			data:[
		        {"num":0, "text":"首页" , "name":"nav_icon01" , "path":"/"},
				{"num":1, "text":"市场" , "name":"nav_icon02" , "path":"/stock" },
				{"num":2, "text":"自选" , "name":"nav_icon03" , "path":"/optional"},
				{"num":3, "text":"资讯" , "name":"nav_icon05" , "path":"/infopage"}
		    ]
	    }
	}
	navClick(item) {
	    this.setState({
	    	index:item.num
	    })
	    localStorage.lastIndex = item.num;
	    localStorage.lastUrl = location.hash;
	}
	render(){
		return(
				<div>
					<div className="nav">
					    <ul className="nav_list">
						   {
						   		this.state.data.map((item) =>{return <li key={item.num} onClick={this.navClick.bind(this, item)} 
						   			className={item.path == location.hash.slice(1) ? 'nav_A':''}>
						   			<Link to={item.path}> <span className={item.name}>{item.text}</span> </Link>
						   		</li>;})
						   }
					   </ul>
				    </div>
			    </div>
			)
	}
};