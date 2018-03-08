import React from 'react';
import Header from './components/header';
import Main from './components/main';
import Stock from './components/stock';
import Optional from './components/optional';
import Infopage from './components/infopage';
import Stockdetails from './components/stockdetails';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
class App extends React.Component{
	constructor(props) {
	    super(props);
	}
	render(){
	    return (			
	     <div>
	     	<Header />
	     	{this.props.children}
	     	<div style={{height:0.34+'rem'}}></div>
	     </div>
	    );
	}
};

class Home extends React.Component{
	constructor(props) {
	    super(props);
	}
	render(){
	    return (			
	     <div>
	     	<Main />
	     </div>
	    );
	}
};

export default class root extends React.Component{
	constructor(props) {
	    super(props);
	}
	render(){
		return(
	   		<HashRouter>
			    <App>
			        <Route exact path='/' component={Home} />
			        <Route path="/stock" component={Stock} />
			        <Route path="/optional" component={Optional} />
			        <Route path="/infopage" component={Infopage} />
			        <Route path="/stockdetails" component={Stockdetails} />
			    </App>
		  </HashRouter>
	    )
	}
};
