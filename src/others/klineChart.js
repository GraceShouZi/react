import React from 'react';
var charts = require('../js/chart.js');
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
	draw(kdata,height,canvas,width){
		var context = canvas.getContext("2d");
		context.clearRect(0, 0, width, height);
		var data = charts.getKLData(kdata);
		var dHigh =[];
		var dLow = [];
		var volumeData = [];
		var MAsData = [];
		var max;
		var min;
		var vHigh;
		var vLow;
		var currentX = 0;
		var MAs = [{ color: 'rgb(255,70,251)', daysCount: 5 },{ color: 'rgb(227,150,34)', daysCount: 10 },{ color: 'rgb(0,153,255)', daysCount: 20 },{ color: 'rgb(53,71,107)', daysCount: 30 }];
		var spaceWidth = 2;
		var barWidth = 5;
		var dataCount = Math.ceil(width / (spaceWidth + barWidth))-1;
		var maxDataLength = data.ks.length;
		var xAxisLen = 5;
		var topHeight = height*0.75;
		var footerHeight = height*0.25;
		var filteredData = [];
		var startIndex;
		if(maxDataLength-dataCount<0){
			startIndex = 0;
		}else{
			startIndex = maxDataLength - dataCount;
		}
	    for (var i = startIndex; i < data.ks.length; i++) {
	         filteredData.push(data.ks[i]);
	    }
		for(var i=0;i<filteredData.length;i++){
			if (i == 0 && (maxDataLength - dataCount==0)) { 
				max = data.high;
				min = data.low; 
			}else { 
				dHigh.push(filteredData[i].high);
				dLow.push(filteredData[i].low);
				volumeData.push(filteredData[i].volume)
			}
		}
		max = Math.max.apply(null,dHigh);
		min = Math.min.apply(null,dLow); 
		vHigh = Math.max.apply(null,volumeData);
		vLow = Math.min.apply(null,volumeData);
		for(var i=0; i<MAs.length; i++){
			var MA = charts.calcMAPrices(data.ks, startIndex, filteredData.length, MAs[i].daysCount);
			for(var k=0; k<MA.length; k++){
				if(MA[k] != false){
					MAsData.push(MA[k])
				}
			}
			context.stroke();
		}
		max = max > Math.max.apply(null,MAsData) ? max :Math.max.apply(null,MAsData);
		min = min < Math.min.apply(null,MAsData) ? min :Math.min.apply(null,MAsData);
		for(var i=0; i<MAs.length; i++){
			var MA = charts.calcMAPrices(data.ks, startIndex, filteredData.length, MAs[i].daysCount);
			context.strokeStyle = MAs[i].color;
			context.beginPath();
			var currentX = 0;
			for(var k=0; k<MA.length; k++){
				var x = k * (spaceWidth + barWidth) + ( spaceWidth + barWidth) * .5;
				if(MA[k] != false){
					var y = charts.getY(max,min,topHeight,MA[k]); 
					if (y && i==0) {
							context.lineTo(x, y);
					} else {
							context.lineTo(x, y);
					}
				}
			}
			context.stroke();
		}	
		for(var i =1;i<xAxisLen;i++){
			var xDistance = (topHeight)/(xAxisLen-1);
			context.beginPath();
			context.moveTo(0,i*xDistance);
			context.lineTo(width,i*xDistance);
			context.lineWidth = 1;
			context.strokeStyle = "#ccc";
			context.stroke();
		}
		context.beginPath();
		context.font = "12px Microsoft yahei";
		context.textAlign="left";
		context.fillStyle = "gray";
		context.fillText(max.toFixed(2), 0, 12);
		context.fillText(min.toFixed(2), 0, topHeight-3);
		context.stroke();
		for(var i=0;i<filteredData.length;i++){
			var isRise = filteredData[i].close > filteredData[i].open;
			var color = isRise ? 'red' : 'green';
			var lineX = charts.getCandleLineX(spaceWidth,barWidth,i);
			if (currentX == 0) currentX = lineX;
			else {
				if (lineX - currentX < 1) return;
			}
			currentX = lineX;
			var topY = charts.getY(max,min,topHeight,filteredData[i].high);
			var bottomY = charts.getY(max,min,topHeight,filteredData[i].low);
			context.fillStyle = color;
			context.strokeStyle = color;
			var candleY, candleHeight,candleVolY,candleVolHeight;
			if (isRise) {
				candleY = charts.getY(max,min,topHeight,filteredData[i].close)
				candleHeight = charts.getY(max,min,topHeight,filteredData[i].open) - candleY;
			} else {
				candleY = charts.getY(max,min,topHeight,filteredData[i].open);
				candleHeight = charts.getY(max,min,topHeight,filteredData[i].close) - candleY;
			}
			candleVolY = charts.getVolumeY(footerHeight, vHigh, filteredData[i].volume ,topHeight);
			candleVolHeight = footerHeight/vHigh*filteredData[i].volume;
			//画线
			context.beginPath();
			context.moveTo(lineX, topY);
			context.lineTo(lineX, bottomY);
			context.stroke();
			var candleX = lineX - barWidth / 2;
			context.beginPath();
			context.fillRect(candleX, candleY, barWidth, candleHeight);
			context.fillRect(candleX, candleVolY, barWidth, candleVolHeight);	
			context.stroke();
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