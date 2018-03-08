import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
export default class Optional extends React.Component{
	constructor(props){
		super(props);
		this.optionalShow = this.optionalShow.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.cancel = this.cancel.bind(this);
		this.addStock = this.addStock.bind(this);
		this.state = {
			topList:[
				{"name":"上证指数","zhishu":3257.01,"zdf":"0.11%","zde":100},
				{"name":"上证指数","zhishu":3257.01,"code":"000001","zdf":"0.11%","zde":-100},
			 	{"name":"上证指数","zhishu":3257.01,"code":"000001","zdf":"0.11%","zde":100}
			],
			dpData:[
		    	{"name":"上证指数", "code":"000001", "zhishu":3292.00, "zf":"0.20%", "zd":6.72, "hs":6.72},
		    	{"name":"上证指数", "code":"000001", "zhishu":3292.00, "zf":"0.20%", "zd":-6.72, "hs":6.72},
		    	{"name":"上证指数", "code":"000001", "zhishu":3292.00, "zf":"0.20%", "zd":6.72, "hs":6.72},
		    	{"name":"上证指数", "code":"000001", "zhishu":3292.00, "zf":"0.20%", "zd":6.72, "hs":6.72}
		    ],
		    opFlag:false,
		    searchList:[],
		    inputVal:'123'		 
	    };
	}
	optionalShow(){
		var _this = this;
		if(_this.state.opFlag==false){
			_this.setState({
				opFlag:true
			})
		}else{
			_this.setState({
				opFlag:false
			})
		}
		_this.setState({
			inputVal:'',
			searchList:[]
		})
	}
	cancel(){
		this.setState({
			opFlag:false
		})
	}
	changeHandler(event){
		var val = event.target.value;
		var _this = this;
		_this.setState({
			inputVal:val
		})
		if(val.length>3){
			_this.setState({
				searchList:[
			    	{"name":"上证指数", "code":"000001","isFlag":false},
			    	{"name":"上证指数", "code":"000001","isFlag":true},
			    	{"name":"上证指数", "code":"000001","isFlag":false},
			    	{"name":"上证指数", "code":"000001","isFlag":true}
			    ]		
			});
		}else{
			_this.setState({
				searchList:[]	
			})
		}
	}
	addStock(i){
		var _this = this;
		var code = _this.state.searchList[i].code;
		_this.state.searchList[i].isFlag = !_this.state.searchList[i].isFlag;
		_this.setState({
			searchList:_this.state.searchList	
		})
	}
	render(){
		var arr = [];
		for(var i=0;i<this.state.searchList.length;i++){
			arr.push(this.state.searchList[i].isFlag ? '已添加' : '未添加')
		}
		return(
				<div> 
					<ul className="optional_top">
						{
							this.state.topList.map((item,i)=>{return <li key={i}>
								<Link to="/stockdetails" className={item.zde>0 ? 'red' : 'green'}>
									<h3>{item.name}</h3>
									<p>{item.zhishu.toFixed(2)}</p>
									<span><i>{item.zdf}</i><i>{item.zde.toFixed(2)}</i></span>
								</Link>
							</li>})
						}
					</ul>
					<div className={this.state.dpData=="" ? "none":"show"}>
						<div className="optional_list">
							<div className="dp_ranking_left">
								<h3><span>名称</span></h3>
								<ul>
									{
								   		this.state.dpData.map((item,i) =>{return <li key={i}>
								   			<Link to="/stockdetails">
								   				<h4>{item.name}</h4>
												<p>{item.code}</p>
											</Link>
								   		</li>;})
									}
								</ul>
							</div>
							<div className="dp_ranking_right">
								<h3><span>最新</span><span>涨幅</span><span>涨跌</span><span>换手</span></h3>
								<ul>
									{
								   		this.state.dpData.map((item,i) =>{return <li key={i} style={{width:0.7*4+'rem'}}>
								   			<div className={item.zd>0 ? 'red':'green'}>{item.zhishu}</div>
								   			<div className={item.zd>0 ? 'red':'green'}>{item.zf}</div>
								   			<div className={item.zd>0 ? 'red':'green'}>{item.zd}</div>
								   			<div>{item.hs}</div>
								   		</li>;})
									}
								</ul>
							</div>
						</div>
						<p className="add_optional" onClick={this.optionalShow}><span><i>+</i>添加自选股</span></p>
					</div>
					<dl className={["addFirst",this.state.dpData=="" ? "show":"none"].join(' ')} onClick={this.optionalShow}>
						<dt>+</dt>
						<dd>添加自选股</dd>
					</dl>


					<div className={["search_optional",this.state.opFlag===false ? "none":"show"].join(' ')}>
						<div className="search_optional_top">
							<p><input type="text" value={this.state.inputVal} placeholder="请输入股票代码" onChange={this.changeHandler} /></p>
							<span onClick={this.cancel}>取消</span>
						</div>
						<ul className="search_optional_list">
							{
								this.state.searchList.map((item,i)=>{return <li key={i} onClick={this.addStock.bind(this, i)}>
									<span>{item.name}</span>
									<i>{item.code}</i>
									<em className={item.isFlag==true?'red':'green'}>{arr[i]}</em>
								</li>})
							}
						</ul>
					</div>	
			    </div>
			)
	}
};