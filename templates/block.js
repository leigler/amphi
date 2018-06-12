var html = require('choo/html')

//export module
module.exports = function(state, emit){
	console.log(state)

	if(state.class == "Channel"){

		var subChannel = ["https://api.are.na/v2/channels/" + state.slug];

		return html`

		<div>
			<h1><a href='/${state.slug}'>${state.title}</a></h1>
		</div>

		`

	}else if(state.class == "Link"){
		return html`

			<div class="link">
				<a href="${state.source.url}">${state.title}</a>
			</div>

		`

	}else if(state.class == "Attachment"){
		return html`

			<div class="link">
				<a href="${state.attachment.url}">${state.title}</a>
			</div>

		`

	}else if(state.class == "Text"){
		return html`

			<div>
				<h1>${state.title}</h1>
				${state.content}

			</div>

		`

	}else{
		return html`

			<div>
				<h1>${state.title}</h1>

			</div>

		`
	}
}