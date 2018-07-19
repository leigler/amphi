var html = require('choo/html')
var rawhtml = require('choo/html/raw')
var subblock = require('./subblock.js')
var marked = require('marked')


//export module
module.exports = function(state, emit){

	var contents = [state]
	//console.log("CONTENTS", contents)

	
	// might need to just make a block mirror for this
//${contents.map(block)}
	return html`
		<div>
			${contents.map(subblock)}
		</div>

	`
}