var html = require('choo/html')

//export module
module.exports = function(state, emit){

	if(state.class == "Channel"){

		var stateTitle = state.title

		if(stateTitle.includes("subsection")){
				stateTitle = state.title.replace('[subsection]','');
		}


		return html`
				<h1><a href='/${state.slug}'>${stateTitle}</a></h1>
		`
	}
}