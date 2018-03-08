exports.PIXEL_RATIO = (function () {
	    var ctx = document.createElement("canvas").getContext("2d"),
	        dpr = window.devicePixelRatio || 1,
	        bsr = ctx.webkitBackingStorePixelRatio ||
	              ctx.mozBackingStorePixelRatio ||
	              ctx.msBackingStorePixelRatio ||
	              ctx.oBackingStorePixelRatio ||
	              ctx.backingStorePixelRatio || 1;

	    return dpr/bsr;
})();
exports.getY = function(max,min,topH,price){return (max - price) * topH / (max - min);}
exports.getVolumeY = function(fH, vH, v ,tH){return fH - fH / vH * v + tH;};
exports.getCandleLineX = function(spW, brW, i){ var result = i * (spW + brW) + (spW + brW) * .5; if (result * 10 % 10 == 0) result += .5; return result; }
exports.calcMAPrices = function(filteredData, startIndex, count, daysCn) {
	var result = new Array();
	for (var i = startIndex; i < startIndex + count; i++) {
		var startCalcIndex = i - daysCn + 1;
		if (startCalcIndex < 0) {
			result.push(false);
			continue;
		}
		var sum = 0;
		for (var k = startCalcIndex; k <= i; k++) {
			sum += filteredData[k].close;
		}
		var val = sum / daysCn;
		result.push(val);
	}
	return result;
};
exports.getKLData = function(klineData) {
    var result = {};
    var ks = [];
    for (var i = 0; i < klineData.length; i++) {
        var rawData = klineData[i];
        var item = {
            quoteTime: rawData[0],
            preClose: rawData[1],
            open: rawData[2],
            high: rawData[3],
            low: rawData[4],
            close: rawData[5],
            volume: rawData[6],
            amount: rawData[7]
        };
        if (ks.length == 0) {
            result.low = item.low;
            result.high = item.high;
        } else {
            result.high = Math.max(result.high, item.high);
            result.low = Math.min(result.low, item.low);
        }
        ks.push(item);
    }
    result.ks = ks;
    return result;
};
