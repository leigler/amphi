var html = require('choo/html')
var block = require('./block.js')

//export module
module.exports = function(state, emit){


	var mainChannel = state.channel

	console.log("channel: ", mainChannel)

	// get channel

	// if media type do: 

	// if subchannel do:
		// - check name to compare to naming structure

	if(mainChannel){

		return html`
				<div>
					<div>${mainChannel.title}</div>

					${mainChannel.contents.map(block)}


				</div>
			`

	}else{
		return html`
				<div>Loading Channel</div>
		`
	}

}