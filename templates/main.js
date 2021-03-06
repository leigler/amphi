var html = require('choo/html')
var block = require('./block.js')
var menu = require('./menu.js')

//export module
module.exports = function(state, emit){
	console.log("main js")

	var channelSlug = "amphi" // default
	var mainChannel = state.channel
	// below checks to see 1) if params exist (i.e. this is a subpage) or if the mainchannel and rendered channel are out of sync
	if(state.params.subchannels && state.params.subchannels.length > 0){ // if state.params exist
		mainChannel = false
		channelSlug = state.params.subchannels
	
		if(state.channel && state.channel.slug == state.params.subchannels){
			mainChannel = state.channel
		}
	}else if(state.channel && state.channel.slug != channelSlug){
		mainChannel = false // a second crosscheck of slug and existing mainchannel, just in case to update emitter 
	}

	if(mainChannel){
		mainChannel.contents.reverse()

		console.log("mainChannel: ", mainChannel.contents)

		return html`
			<div>
				<nav class="header">
					<h1 class="title">${mainChannel.title}</h1>
					<div class="menu">
						${mainChannel.contents.map(menu)}
					</div>
				</div>
				<div>
					${mainChannel.contents.map(block)}
				</div>
			</div>
		`
	}else{
		emit("pushChannel", channelSlug) // if it hasnt already rendered
		
		return html`
				<div>Loading...</div>
		`
	}
}