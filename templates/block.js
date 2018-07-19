var html = require('choo/html')
var rawhtml = require('choo/html/raw')
var subsection = require('./subsection.js')
var marked = require('marked')

//export module
module.exports = function(state, emit){
	//console.log(state)

	var titleInfo = ""

	if(state.title){
		titleInfo = state.title.substring(
		    state.title.lastIndexOf("[") + 1, 
		    state.title.lastIndexOf("]")
		);

		if(titleInfo.length > 0){
			titleInfo = titleInfo.split(" ")
		}
	}

	if(state.class == "Channel"){
		// if its a subsection, it should output the subchannel's info as well...
		if(titleInfo.length > 0){
			if(titleInfo.includes("subsection")){

				// if its  a subsection
				// use slug for api search

				var channeltitle = state.title.replace('[subsection]','');

				return html`
					<div>
						<h1>${channeltitle}</h1>
						${state.contents.map(module.exports)}
					</div>
				`
			}
		}
	}else if(state.class == "Link"){
		// links can be inline or new line
		return html`

			<div class="link">
				<a href="${state.source.url}">${state.title}</a>
			</div>

		`

	}else if(state.class == "Attachment"){
		// links can be inline or new line
		return html`

			<div class="link">
				<a href="${state.attachment.url}">${state.title}</a>
			</div>

		`

	}else if(state.class == "Text"){
		// each paragraph, title included is optional
		
		var textContent = marked(state.content, {sanitize : true})

		return html`
			<div>
			${rawhtml(textContent)}
			</div>
			`
		

	}else if(state.class = "Image"){
		return html`
				<img class="image" src="${state.image.original.url}">
		`
	}
}