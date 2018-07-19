var html = require('choo/html')
var rawhtml = require('choo/html/raw')
var subblock = require('./subblock.js')
var marked = require('marked')


//export module
module.exports = function(state, emit){

	if(state.isArray){
		var contents = state
	}else{
		var contents = [state]
	}

	// might need to just make a block mirror for this
//${contents.map(block)}
	return html`
		<div>
			${contents.map(subblock)}
		</div>

	`
}