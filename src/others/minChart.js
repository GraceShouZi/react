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
	draw(minData,height,canvas,width){
		var context = canvas.getContext("2d");
		context.clearRect(0, 0, width, height);
		var data = [];
		var dataVol = [];
		var zsClose = minData.quote.preClose;
		var open = minData.quote.open;
		var max = minData.quote.highest;
		var min = minData.quote.lowest;
		var zVol = minData.quote.volume;
		for(var i=0;i<minData.mins.length;i++){
		data.push(minData.mins[i].price)
		dataVol.push(minData.mins[i].volume)
		}		
		var xAxisLen = 3;
		var topHeight = height * 0.75;
		var footerHeight = height *0.25;
		var xDistance = topHeight/4;
		var xLen = 0;
		var yDistance = width/241;
		var dataMax = Math.max.apply(null,data);
		var dataMin = Math.min.apply(null,data);	
		if(dataMax>max){max = dataMax}
		if(dataMin < min){min = dataMin}
		var maxdiff = max-zsClose;
		var mindiff = Math.abs(min-zsClose);
		if( maxdiff > mindiff ){
		min = zsClose - maxdiff;
		}else{
		max = zsClose + mindiff;
		}
		for(var i =0;i<=xAxisLen;i++){
		context.beginPath();
		context.moveTo(0,i*xDistance+xDistance);
		context.lineTo(width,i*xDistance+xDistance);
		context.lineWidth = 1;
		context.strokeStyle = "#ccc";
		context.stroke();
		}
		for (var i = 2; i >= 0; i--) {
		var val = max - i * maxdiff;
		var valPct = ((val - zsClose) * 100 / zsClose).toFixed(2)+'%';
		var diffH = (topHeight-16) / 2;
		context.fillStyle = valPct == '0.00%' ? 'gray' : (valPct.charAt(0)>'-' ? 'green' : 'red');	
		context.font = "12px Microsoft yahei";
		if(!isNaN(val)){
			context.textAlign="left";
			context.fillText(val.toFixed(2), 0,i*diffH+12);
		}
		if(val){
			context.textAlign="right";
			context.fillText(valPct, width,i*diffH+12);
		}
		}
		context.beginPath();
		context.lineWidth = 1;  
		context.strokeStyle = "#06f";  
		for(var i =0;i<data.length;i++){
		var yValue = data[i];
		xLen += yDistance;  
		var yPont = topHeight/(max-min)*(max-data[i]);
		if (i == 0) {  
			context.moveTo(0,yPont); 
			context.lineTo(xLen,yPont);   
		}else{  
			context.lineTo(xLen,yPont);
		}
		}
		context.stroke(); 
		var volMax = Math.max.apply(null,dataVol);
		var volMin = Math.min.apply(null,dataVol);
		if(dataVol != ""){
		for(var i=0; i<dataVol.length;i++){
			var candleVolY = charts.getVolumeY(footerHeight, volMax, dataVol[i] ,topHeight);
			var candleVolHeight = footerHeight/volMax*dataVol[i];
			var yPont = footerHeight/(volMax-volMin)*(volMax-dataVol[i])
			var yPont = isFinite(yPont) ? footerHeight/(volMax-volMin)*(volMax-dataVol[i]): 0;
			if(yPont == footerHeight){
				yPont = footerHeight;
			}
			context.beginPath();
			if(i==0){		
				if(data[0]>zVol){
					context.fillStyle ='red'           
				}else{
					context.fillStyle ='green'              
				}
			}else{
				if(data[i]>data[i-1]){
					context.fillStyle ='red' 
				}else{
					context.fillStyle ='green'  
				}
			}
			context.fillRect(i*yDistance, candleVolY, 1, candleVolHeight);
			context.stroke();
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