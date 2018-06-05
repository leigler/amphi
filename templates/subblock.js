var html = require('choo/html')
var subblock = require('./block.js')

//export module
module.exports = function(state, emit){

	console.log(state)

	if(state.class == "Channel"){

		return html`

		<div>
			<h1>${state.title}</h1>

			${state.contents.map(subblock)}

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