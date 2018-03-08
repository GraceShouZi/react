import React from 'react';
import Bar from '../others/barChart';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
var charts = require('../js/chart.js');
var winWidth = document.body.clientWidth > 768 ? 768 : document.body.clientWidth;
var winHeight = 120;
var PIXEL_RATIO = charts.PIXEL_RATIO;
var lzData = [{"name":"上证指数", "code":"BK1315", "zf":"0.20%", "fivezf":"3.20%", "lzgName":"某某燃气","zd":6.72},
    	{"name":"上证指数", "code":"BK2062", "zf":"0.20%", "fivezf":"4.20%", "lzgName":"某某燃气", "zd":6.72},
    	{"name":"上证指数", "code":"000001", "zf":"0.20%", "fivezf":"3.20%", "lzgName":"某某燃气", "zd":6.72},
    	{"name":"上证指数", "code":"000001", "zf":"0.20%", "fivezf":"1.20%", "lzgName":"某某燃气", "zd":6.72}];
var hyData = [{"name":"昨日涨停", "code":"BK1315", "zf":"0.20%", "fivezf":"3.20%", "lzgName":"某某燃气","zd":6.72},
    	{"name":"上证指数", "code":"BK2062", "zf":"0.20%", "fivezf":"4.20%", "lzgName":"某某燃气", "zd":6.72},
    	{"name":"上证指数", "code":"000001", "zf":"0.20%", "fivezf":"3.20%", "lzgName":"某某燃气", "zd":6.72},
    	{"name":"上证指数", "code":"000001", "zf":"0.20%", "fivezf":"1.20%", "lzgName":"某某燃气", "zd":6.72}];	
var gnData = [{"name":"昨日涨停", "code":"BK1315", "zf":"0.20%", "fivezf":"3.20%", "lzgName":"某某燃气","zd":6.72},
    	{"name":"上证指数", "code":"BK2062", "zf":"0.20%", "fivezf":"4.20%", "lzgName":"某某燃气", "zd":6.72},
    	{"name":"上证指数", "code":"000001", "zf":"0.20%", "fivezf":"3.20%", "lzgName":"某某燃气", "zd":6.72},
    	{"name":"昨日涨停", "code":"000001", "zf":"0.20%", "fivezf":"1.20%", "lzgName":"某某燃气", "zd":6.72}];
var dqData = [{"name":"昨日涨停", "code":"BK1315", "zf":"0.20%", "fivezf":"3.20%", "lzgName":"某某燃气","zd":6.72},
    	{"name":"昨日涨停", "code":"BK2062", "zf":"0.20%", "fivezf":"4.20%", "lzgName":"某某燃气", "zd":6.72},
    	{"name":"上证指数", "code":"000001", "zf":"0.20%", "fivezf":"3.20%", "lzgName":"某某燃气", "zd":6.72},
    	{"name":"上证指数", "code":"000001", "zf":"0.20%", "fivezf":"1.20%", "lzgName":"某某燃气", "zd":6.72}]; 
var barData = [{"name":'上证',"vol":100},
			{"name":'深证',"vol":-90},
			{"name":'沪深300',"vol":-60},
			{"name":'中小板',"vol":-5},
			{"name":'创业板',"vol":-100}];
var zhuliData = [{"name":'银行',"vol":100},
			{"name":'钢铁',"vol":-90},
			{"name":'有色矿采',"vol":60},
			{"name":'复合材料',"vol":30},
			{"name":'软件服务',"vol":100},
			{"name":'房地产',"vol":20}];	
export default class Stock extends React.Component{
	constructor(props){
		super(props)
		this.navClick = this.navClick.bind(this);
		this.state = {
			index:0,
			bkindex:0,
			otherindex:0,
			navData:[
		        {"num":0, "text":"大盘"},
				{"num":1, "text":"板块"},
				{"num":2, "text":"排名"},
				{"num":3, "text":"主力"},
				{"num":4, "text":"其他"}
		    ],
		    dpData:[
		    	{"name":"上证指数", "code":"000001", "zhishu":3292.00, "zf":"0.20%", "zd":6.72, "hs":6.72},
		    	{"name":"上证指数", "code":"000001", "zhishu":3292.00, "zf":"0.20%", "zd":-6.72, "hs":6.72},
		    	{"name":"上证指数", "code":"000001", "zhishu":3292.00, "zf":"0.20%", "zd":6.72, "hs":6.72},
		    	{"name":"上证指数", "code":"000001", "zhishu":3292.00, "zf":"0.20%", "zd":6.72, "hs":6.72}
		    ],
		    bkList:[
		        {"num":0,"d":11, "text":"领涨板块"},
				{"num":1,"d":66, "text":"行业板块"},
				{"num":2,"d":12, "text":"概念板块"},
				{"num":3,"d":41, "text":"地区板块"}
		    ],
		    bkData:[
		    	{"name":"上证指数", "code":"BK1315", "zf":"0.20%", "fivezf":"3.20%", "lzgName":"某某燃气","zd":6.72},
		    	{"name":"上证指数", "code":"BK2062", "zf":"0.20%", "fivezf":"4.20%", "lzgName":"某某燃气", "zd":6.72},
		    	{"name":"上证指数", "code":"000001", "zf":"0.20%", "fivezf":"3.20%", "lzgName":"某某燃气", "zd":6.72},
		    	{"name":"上证指数", "code":"000001", "zf":"0.20%", "fivezf":"1.20%", "lzgName":"某某燃气", "zd":6.72}
		    ],
		    Rw:winWidth,
		    Rp:PIXEL_RATIO,
		    Rh:winHeight
	    }
	}
	navClick(item) {
	    this.setState({
	    	index:item.num
	    })
	}
	bkClick(item){   	    	
		this.setState({
	    	bkindex:item.num
	    });
	    if(item.num==0){
		    this.setState({
		    	bkData:lzData
		    });	
	    }else if(item.num==1){
	    	this.setState({
		    	bkData:hyData
		    });	
	    }else if(item.num==2){
			this.setState({
		    	bkData:gnData
		    });	
	    }else{
	    	this.setState({
		    	bkData:dqData
		    });
	    }    	
	};
	componentDidMount(){
		var _this = this;
		window.onresize = function(){
			var winWidth = document.body.clientWidth > 768 ? 768 : document.body.clientWidth;
			var PIXEL_RATIO = charts.PIXEL_RATIO;		
		    setTimeout(function(){
		    	_this.setState({
			    	Rw:winWidth,
			    	Rp:PIXEL_RATIO
			    });	
		    },10)		
		}
	}
	render(){
		return(
				<div className="whiteBg">
					<ul className="stockNav">
						{
					   		this.state.navData.map((item) =>{return <li key={item.num} onClick={this.navClick.bind(this, item)} 
					   			className={this.state.index == item.num ? 'nav_A':''}>
					   			<span>{item.text}</span>
					   		</li>;})
						}
					</ul>
					<div className={this.state.index==0 ? "show":"none"}>
					    <dl className="cashFlow">
							<dt>当日流入流出资金</dt>
							<dd>
								<Bar items={barData} Id="dapan" id2="dapanBar" Rw={this.state.Rw} Rp={this.state.Rp} Rh={this.state.Rh} />
							</dd>
						</dl>
						<div className="dp_ranking">
							<div className="dp_ranking_left">
								<h3><span>名称</span></h3>
								<ul>
									{
								   		this.state.dpData.map((item,i) =>{return <li key={i}>
								   			<Link to='/stockdetails'>
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
					</div>
					<div className={this.state.index==1 ? "show":"none"}>
					    <ul className="bk_top">
					    	{
						   		this.state.bkList.map((item) =>{return <li key={item.num} onClick={this.bkClick.bind(this, item)} 
						   			className={this.state.bkindex == item.num ? 'bk_top_A':''}>
						   			<i className="red">{item.d}<img src={require('../images/arrow_img01.png')} alt="" /></i>
						   			<span>{item.text}</span>
						   		</li>;})
							}
					    </ul>
					    <div className="dp_ranking">
							<div className="dp_ranking_left">
								<h3><span>名称</span></h3>
								<ul>
									{
								   		this.state.bkData.map((item,i) =>{return <li key={i}>
								   			<Link to='/stockdetails'>
								   				<h4>{item.name}</h4>
												<p>{item.code}</p>
											</Link>
								   		</li>;})
									}
								</ul>
							</div>
							<div className="dp_ranking_right">
								<h3><span>涨幅</span><span>5日涨</span><span style={{width:'1rem'}}>领涨股</span><span>涨跌</span></h3>
								<ul>
									{
								   		this.state.bkData.map((item,i) =>{return <li key={i} style={{width:(0.7*3+1)+'rem'}}>
								   			<div className={item.zd>0 ? 'red':'green'}>{item.zf}</div>
								   			<div className={item.zd>0 ? 'red':'green'}>{item.fivezf}</div>
								   			<div className="stock_lzg">
								   				<span>
								   					{item.lzgName}
								   				 	<em><i>21.50</i><i>20.00%</i></em>
								   				</span>
								   		    </div>
								   			<div>{item.zd}</div>
								   		</li>;})
									}
								</ul>
							</div>
						</div>
					</div>
					<div className={this.state.index==2 ? "show":"none"}>
					    <ul className="bk_top">
					    	{
						   		this.state.bkList.map((item) =>{return <li key={item.num} onClick={this.bkClick.bind(this, item)} 
						   			className={this.state.bkindex == item.num ? 'bk_top_A':''}>
						   			<i className="red">{item.d}<img src={require('../images/arrow_img01.png')} alt="" /></i>
						   			<span>{item.text}</span>
						   		</li>;})
							}
					    </ul>
					    <div className="dp_ranking">
							<div className="dp_ranking_left">
								<h3><span>名称</span></h3>
								<ul>
									{
								   		this.state.bkData.map((item,i) =>{return <li key={i}>
								   			<Link to='/stockdetails'>
								   				<h4>{item.name}</h4>
												<p>{item.code}</p>
											</Link>
								   		</li>;})
									}
								</ul>
							</div>
							<div className="dp_ranking_right">
								<h3><span>涨幅</span><span>5日涨</span><span style={{width:'1rem'}}>领涨股</span><span>涨跌</span></h3>
								<ul>
									{
								   		this.state.bkData.map((item,i) =>{return <li key={i} style={{width:(0.7*3+1)+'rem'}}>
								   			<div className={item.zd>0 ? 'red':'green'}>{item.zf}</div>
								   			<div className={item.zd>0 ? 'red':'green'}>{item.fivezf}</div>
								   			<div className="stock_lzg">
								   				<span>
								   					{item.lzgName}
								   				 	<em><i>21.50</i><i>20.00%</i></em>
								   				</span>
								   		    </div>
								   			<div>{item.zd}</div>
								   		</li>;})
									}
								</ul>
							</div>
						</div>
					</div>
					<div className={this.state.index==3 ? "show":"none"}>
					    <dl className="cashFlow">
							<dt>当日流入流出资金</dt>
							<dd>
								<Bar items={zhuliData} Id="zhuli" id2="zhuliBar" Rw={this.state.Rw} Rp={this.state.Rp} Rh={this.state.Rh}/>
							</dd>
						</dl>
						<div className="dp_ranking">
							<div className="dp_ranking_left">
								<h3><span>名称</span></h3>
								<ul>
									{
								   		this.state.dpData.map((item,i) =>{return <li key={i}>
								   			<Link to='/stockdetails'>
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
					</div>
			    </div>
			)
	}
};