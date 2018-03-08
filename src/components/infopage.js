import React from 'react';
	
export default class Stock extends React.Component{
	constructor(props){
		super(props);
		this.handleScroll = this.handleScroll.bind(this);
		this.state = {
			scrollList:[
				{"title":"午间公告","content":"世纪浩劫说的话自己看喜欢看何况这些监控着经常吃","time":"12:16","imgUrl":require('../images/talk_img01.png')},
				{"title":"午间","content":"世纪浩劫说的话自己看喜欢看何况这些监控着经常吃","time":"12:16","imgUrl":require('../images/talk_img02.png')},
				{"title":"公告","content":"世纪浩劫说的话自己看喜欢看何况这些监控着经常吃","time":"12:16","imgUrl":require('../images/talk_img01.png')}
			],
			infoList:[
				{"title":"世纪浩劫说的话自己看喜欢看何况这些监控着经常吃","time":"12:16","imgUrl":require('../images/info_img.jpg')},
				{"title":"世纪浩劫说的话自己看喜欢看何况这些监控着经常吃","time":"12:16","imgUrl":require('../images/info_img.jpg')},
				{"title":"世纪浩劫说的话自己看喜欢看何况这些监控着经常吃","time":"12:16","imgUrl":require('../images/info_img.jpg')},
				{"title":"世纪浩劫说的话自己看喜欢看何况这些监控着经常吃","time":"12:16","imgUrl":require('../images/info_img.jpg')},
				{"title":"世纪浩劫说的话自己看喜欢看何况这些监控着经常吃","time":"12:16","imgUrl":require('../images/info_img.jpg')}
			],
			loadingFlag:false
	    }
	}
	componentWillMount() {
	    window.addEventListener('scroll', this.handleScroll);
	    window.onscroll=function(){}
	}
	componentWillUnmount() {
	    window.removeEventListener('scroll', this.handleScroll);
	}
	handleScroll(e){  
		var scrollTop = document.body.scrollTop;
    	var height = document.body.clientHeight; 
    	var scrollHeight = document.body.scrollHeight;
    	var _this = this;
    	var arr = {"title":"世纪浩劫说的话","time":"12:16","imgUrl":require('../images/info_img.jpg')};
        if(scrollTop+height>=scrollHeight){
        	if(_this.state.infoList.length<10){
	        	setTimeout(function(){
	        		_this.state.infoList.push(arr)
	        		_this.setState({ 
	        			loadingFlag: false
	        		});
	        	},100)
	        }else{
	        	setTimeout(function(){
	        		_this.setState({ 
	        			loadingFlag: true
	        		});
	        	},100)
	        }
        } 
	}	
	render(){
		var loadingTxt = this.state.loadingFlag ? '无更多数据' : '加载中...';
		return(
				<div className="info">
					<div className="infoTop">
						<ul>
							<li><img src={require('../images/top.png')} /><p>121112121212</p></li>
						</ul>
					</div>
					<ul className="scrollList">
						{
							this.state.scrollList.map((item,i)=>{return <li key={i}>
								<div>
									<h3><img src={item.imgUrl} /><span>{item.title}</span><i>{item.time}</i></h3>
									<p>{item.content}</p>
								</div>
							</li>})
						}
					</ul>
					<ul className="infoList">
						{
							this.state.infoList.map((item,i)=>{return <li key={i}>
								<p className="infoList_R">
									<img src={item.imgUrl} />
								</p>
								<div className="infoList_L">
									<h3>{item.title}</h3>
									<p>{item.time}</p>
								</div>
							</li>})
						}
					</ul>
					<div className="loading">{loadingTxt}</div>
				</div>
			)
	}
};