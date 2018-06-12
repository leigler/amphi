var html = require('choo/html')
var block = require('./block.js')

//export module
module.exports = function(state, emit){
	console.log("main js")

	var pageChannelSlug = "amphi" // default 
	var mainChannel = state.channel
	// below checks to see 1) if params exist (i.e. this is a subpage) or if the mainchannel and rendered channel are out of sync
	if(state.params.subchannels && state.params.subchannels.length > 0){ // if state.params exist
		mainChannel = false
		pageChannelSlug = state.params.subchannels

		if(state.channel && state.channel.slug == state.params.subchannels){
			mainChannel = state.channel
		}
	}else if(state.channel && state.channel.slug != pageChannelSlug){
		mainChannel = false // a second crosscheck of slug and existing mainchannel, just in case to update emitter 
	}

	if(mainChannel){

		return html`
				<div>
					<div>${mainChannel.title}</div>
					${mainChannel.contents.map(block)}
				</div>
			`

	}else{
		emit("pushChannel", pageChannelSlug) // if it hasnt already rendered

		return html`
				<div>Loading...</div>
		`
	}
}