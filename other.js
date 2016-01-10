//get current date
function zerofill(n) {
	return (n < 10 ? '0' : '') + n;
}
var today = function(){
	var	d = new Date();
	var dd = zerofill(d.getDate());
	var mm = zerofill(d.getMonth()+1); //January is 0!
	var yyyy = d.getFullYear();
	var min = zerofill(d.getMinutes());
	var hr = zerofill(d.getHours());
	var sec = zerofill(d.getSeconds());
	return dd+'/'+mm+'/'+yyyy + ' ' + hr + ':' + min + ':' + sec;
}

module.exports = today;