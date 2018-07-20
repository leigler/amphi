var html = require('choo/html')

//export module
module.exports = function(state, emit){

	if(state.class == "Channel"){

		var stateTitle = state.title,
				pageDirection = "/" + state.slug

		if(stateTitle.includes("subsection")){
				stateTitle = state.title.replace('[subsection]','');
				pageDirection = "#" + state.slug
		}


		return html`
				<h1><a href='${pageDirection}'>${stateTitle}</a></h1>
		`
	}
}