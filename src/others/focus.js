import React from 'react';
var data =[[
        {"text":"自选股" , "name":"focus_icon01" , "path":"/movie" , "Url":require('../images/icon01.jpg'),"tips":""},
		{"text":"大盘指数" , "name":"focus_icon02" , "path":"/book" , "Url":require('../images/icon02.jpg'),"tips":""},
		{"text":"涨跌排名" , "name":"focus_icon03" , "path":"/broadCast" , "Url":require('../images/icon03.jpg'),"tips":""},
		{"text":"热门板块" , "name":"focus_icon04" , "path":"/group" , "Url":require('../images/icon04.jpg'),"tips":""},
		{"text":"委托交易" , "name":"focus_icon05" , "path":"/group" , "Url":require('../images/icon05.jpg'),"tips":""},
		{"text":"我的资产" , "name":"focus_icon06" , "path":"/broadCast" , "Url":require('../images/icon06.jpg'),"tips":""},
		{"text":"决策" , "name":"focus_icon07" , "path":"/group" , "Url":require('../images/icon07.jpg'),"tips":""},
		{"text":"基金理财" , "name":"focus_icon08" , "path":"/group" , "Url":require('../images/icon01.jpg'),"tips":"短期"}
],[
        {"text":"自选股" , "name":"focus_icon01" , "path":"/movie" , "Url":require('../images/icon01.jpg'),"tips":""},
		{"text":"大盘指数" , "name":"focus_icon02" , "path":"/book" , "Url":require('../images/icon02.jpg'),"tips":""},
		{"text":"涨跌排名" , "name":"focus_icon03" , "path":"/broadCast" , "Url":require('../images/icon03.jpg'),"tips":""},
		{"text":"热门板块" , "name":"focus_icon04" , "path":"/group" , "Url":require('../images/icon04.jpg'),"tips":""},
		{"text":"委托交易" , "name":"focus_icon05" , "path":"/group" , "Url":require('../images/icon05.jpg'),"tips":""},
		{"text":"我的资产" , "name":"focus_icon06" , "path":"/broadCast" , "Url":require('../images/icon06.jpg'),"tips":""},
		{"text":"决策" , "name":"focus_icon07" , "path":"/group" , "Url":require('../images/icon07.jpg'),"tips":""},
		{"text":"基金理财" , "name":"focus_icon08" , "path":"/group" , "Url":require('../images/icon01.jpg'),"tips":"短期"}
],[
        {"text":"自选股" , "name":"focus_icon01" , "path":"/movie" , "Url":require('../images/icon01.jpg'),"tips":""},
		{"text":"大盘指数" , "name":"focus_icon02" , "path":"/book" , "Url":require('../images/icon02.jpg'),"tips":""},
		{"text":"涨跌排名" , "name":"focus_icon03" , "path":"/broadCast" , "Url":require('../images/icon03.jpg'),"tips":""},
		{"text":"热门板块" , "name":"focus_icon04" , "path":"/group" , "Url":require('../images/icon04.jpg'),"tips":""},
		{"text":"委托交易" , "name":"focus_icon05" , "path":"/group" , "Url":require('../images/icon05.jpg'),"tips":""},
		{"text":"我的资产" , "name":"focus_icon06" , "path":"/broadCast" , "Url":require('../images/icon06.jpg'),"tips":""},
		{"text":"决策" , "name":"focus_icon07" , "path":"/group" , "Url":require('../images/icon07.jpg'),"tips":""},
		{"text":"基金理财" , "name":"focus_icon08" , "path":"/group" , "Url":require('../images/icon01.jpg'),"tips":"短期"}
]];

var width = document.body.clientWidth < 768 ? document.body.clientWidth : 768 ;
export default class about extends React.Component{
	constructor(props){
		super(props);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.state = {
			num:data.length,
			width:width,
			lWidth:-width,
			startX:0,
			moveX:0,
			index:0,
			left:0,
			times:'0.3s'
	    }
	}
	handleTouchStart(e){
		this.setState({ 
    		startX:e.changedTouches[0].pageX,
    	});
	}
	handleTouchMove(e){
		var startX = this.state.startX;
		var moveX = e.changedTouches[0].pageX;	
		var index = this.state.index;
		this.setState({ 
    		left: (index*this.state.lWidth) + moveX - startX,
    		time:'0s'
    	});
	}
	handleTouchEnd(e){
    	var startX = this.state.startX;
		var endX = e.changedTouches[0].pageX;
		var index = this.state.index;
		if(endX - startX > 30){
			if(index==0){
				index = 0
			}else{
				index--;
			}
		}
		if(endX - startX < -30){
			if(index==2){
				index = 2
			}else{
				index++;
			}
		}
		this.setState({ 
			index:index,
	    	left: index*this.state.lWidth,
	    	time:'0.3s'
	    });	   
	}
	componentWillReceiveProps(props){
		var _this = this;
		setTimeout(function(){
		    _this.setState({ 
	    		width:_this.props.Rw,
	    		lWidth:-(_this.props.Rw),
	    		left:-(_this.props.Rw*_this.state.index)
	    	});
		},10)
	}
	render(){
	    return (		
	      <div className="focus" id="focus" onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
	      	<div style={{width:this.state.num*this.state.width+'px',left:this.state.left+'px',transition:this.state.times}}>
	      		{
	      			data.map((items,i)=>{return <ul key={i} style={{width:this.state.width+'px'}}>
	      				{
	      					items.map((item,j)=>{return <li key={j}>
	      							<i className={item.name}><img src={item.Url} alt="" /></i>
					   				<span>{item.text}</span>
					   			</li>
	      					})
	      				}
	      			</ul>})
	      		}
	      	</div>
	      	<ol>
      			 {
			   		data.map((data,i) =>{return <li key={i} className={this.state.index==i ? 'focus_li_A':''}></li>;
			   		})
				 }
      		</ol>	
		  </div>
	    );
	}
};
