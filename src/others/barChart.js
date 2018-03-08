import React from 'react';
var charts = require('../js/chart.js');
/*
var winWidth = document.body.clientWidth > 768 ? 768 : document.body.clientWidth;
var winHeight = 120;
var PIXEL_RATIO = charts.PIXEL_RATIO;
*/
var PIXEL_RATIO, winHeight ,winWidth;
export default class bar extends React.Component{
	constructor(props){
		super(props);
		PIXEL_RATIO = this.props.Rp;
		winHeight = this.props.Rh;
		winWidth = this.props.Rw;
	}
	createHiDPICanvas(w, h,name,ratio){
		if (!ratio) { ratio = PIXEL_RATIO; }
	    var can = document.createElement("canvas");
	    can.id = name;
	    can.width = w * ratio;
	    can.height = h * ratio;
	    can.style.width = w + "px";
	    can.style.height = h + "px";
	    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
	    return can;
	}	
	draw(barData,height,canvas,width){
    	var context = canvas.getContext("2d");
		context.clearRect(0, 0, width, height);
		var num = barData.length;	
		var data = [];
		var dataTxt=[];
		for(var i=0;i<barData.length;i++){
			data.push(Math.abs(barData[i].vol));
			dataTxt.push(barData[i].name);
		};
		var barwidth = 30;
		var padding = 30;
		var spacewidth = (width-(barwidth*num))/(num+1);
        var max = Math.max.apply(null,data);
		var min = Math.min.apply(null,data);
		if(data != ""){
			for(var i=0; i<data.length;i++){
				var h = height - (padding*2);
				var candleY = charts.getVolumeY(h, max, data[i] ,padding);
				var candleH = h/max*data[i];
				var candleX = (spacewidth+barwidth)*i+spacewidth
				context.beginPath();
				if(barData[i].vol>0){
					context.fillStyle = 'red';
				}else{
					context.fillStyle = 'green';
				}
	          	context.fillRect(candleX,candleY,barwidth,candleH);
	          	context.stroke();
			}
			for(var i=0; i<data.length;i++){
				var candleX = (spacewidth+barwidth)*i+spacewidth;
				var candleY = charts.getVolumeY(h, max, data[i] ,padding);
				context.beginPath();
            	context.fillStyle="black";
            	context.textAlign="center";
            	context.font="16px";
            	context.fillText(barData[i].vol+"亿",candleX+(barwidth/2),candleY-8);
				context.fillText(dataTxt[i],candleX+(barwidth/2),height-14);
			}
		}
    }
	componentDidMount(props){
		var _this = this;
	    var myCanvas = _this.createHiDPICanvas(winWidth,winHeight,_this.props.id2);
        document.getElementById(_this.props.Id).appendChild(myCanvas);
        var barCanvas = document.getElementById(_this.props.id2);
		_this.draw(_this.props.items,winHeight,barCanvas,winWidth);
	}
	componentWillReceiveProps(props){
		var _this = this;
		setTimeout(function(){
			var barCanvas = document.getElementById(_this.props.id2);
			barCanvas.setAttribute("width",_this.props.Rw*_this.props.Rp)
			barCanvas.style.width = _this.props.Rw+'px';
			var ctx = barCanvas.getContext("2d");
			ctx.setTransform(_this.props.Rp, 0, 0, _this.props.Rp, 0, 0);
			_this.draw(_this.props.items,winHeight,barCanvas,_this.props.Rw);
		},10)
	}
	render(){
		return(
				<div>
					<div className="canvasBox" id={this.props.Id}></div>
			    </div>
		)
	}
};