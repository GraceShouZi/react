import React from 'react';
import Focus from '../others/focus';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
var img1 = 'https://qnmob3.doubanio.com/lpic/s29610560.jpg?imageView2/0/q/80/w/9999/h/400/format/jpg';
var winWidth = document.body.clientWidth > 768 ? 768 : document.body.clientWidth;
export default class main extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	talkArr : [
	    		{'title':'今天有吐槽的吗？','imgSrc':require('../images/talk_img01.png')},
	    		{'title':'今天有吐槽的吗？','imgSrc':require('../images/talk_img02.png')}
	    	],
			zxData:{
				title: '投资资讯投资资讯投资资讯投资资讯投资讯',
	            ltitle :'投资资讯投资资讯投资资讯投资资讯投资资讯',
	            listsArr : [
	            	{'content':'【投资】资讯投资资讯投资资讯投资投资资讯投资资讯投资资讯投资'},
	            	{'content':'【投资】资讯投资资讯投资资讯投资投资资讯投资资讯投资资讯投资'},
	            	{'content':'【投资】资讯投资资讯投资资讯投资投资资讯投资资讯投资资讯投资'}
	            ]
			},
			talkArr2 : [
				{'title':'今天有吐槽的吗？','imgSrc':require('../images/talk_img01.png')},
	    		{'title':'今天有吐槽的吗？','imgSrc':require('../images/talk_img02.png')},
	    		{'title':'今天有吐槽的吗？','imgSrc':require('../images/talk_img01.png')}
			],
			sjData:[{
				'title':'市场指数',
				'content':'市场指数市场指数',
				'imgSrc':require('../images/talk_img01.png')
			},{
				'title':'市场指数',
				'content':'市场指数市场指数',
				'imgSrc':require('../images/talk_img01.png')
			},{
				'title':'市场指数',
				'content':'市场指数市场指数',
				'imgSrc':require('../images/talk_img01.png')
			},{
				'title':'市场指数',
				'content':'市场指数市场指数',
				'imgSrc':require('../images/talk_img01.png')
			}],
			Rw:winWidth
	    }
	}
	componentDidMount(){
		var _this = this;
		window.onresize = function(){
			var winWidth = document.body.clientWidth > 768 ? 768 : document.body.clientWidth;
			setTimeout(function(){
		    	_this.setState({
			    	Rw:winWidth
			    });	
		    },10)		
		};
	}
	render(){
	    return (			
	     <div>
	        <Focus Rw={this.state.Rw}/>
	     	<ul className="talk_list">
		     	{
			   		this.state.talkArr.map((item,i) =>{return <li key={i}>
			   			<i className="talk_list_A"><img src={item.imgSrc} alt="" /></i>{item.title}
			   		</li>;})
				}
	     	</ul>
	     	<p className="ad_img"><img  src={img1} /></p>
	     	<div className="zixun">
				<h3><span>投资资讯</span><i className="gray">更多</i></h3>
				<dl>
					<dt><b>{this.state.zxData.title}</b><span>{this.state.zxData.ltitle}</span></dt>
					<dd>
						{
					   		this.state.zxData.listsArr.map((item,i) =>{return <p key={i}>
					   			{item.content}
					   		</p>;})
						}
					</dd>
				</dl>
	     	</div>
	     	<ul className="talk_list">
		     	{
			   		this.state.talkArr2.map((item,i) =>{return <li key={i}>
			   			<i className="talk_list_A"><img src={item.imgSrc} alt="" /></i>{item.title}
			   		</li>;})
				}
	     	</ul>
			<div className="shuju">
				<h3><span>数据中心</span><i className="gray">更多</i></h3>
				<ul>
					{
				   		this.state.sjData.map((item,i) =>{return <li key={i} className={'shuju'+i}>
				   			<img src={item.imgSrc} />
				   			<h4>{item.title}</h4>
				   			<p>{item.content}</p>
				   		</li>;})
					}
				</ul>
	     	</div>
	     </div>
	    );
	}
};