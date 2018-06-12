var choo = require('choo')
var html = require('choo/html')
var main = require('./templates/main.js')
var app = choo()

app.use(function(state, emitter){

	// call a channel
	//http://api.are.na/v2/channels/document-as-project
	// "https://api.are.na/v2/channels/amphi"


	// emitter
	emitter.on('pushChannel', function(theChannel){
		
		var arenaRequest = "https://api.are.na/v2/channels/" + theChannel
		$.get( arenaRequest, function( data ) {
  		state.channel = data
			emitter.emit('render')
		});
	})
})

// routes
app.route('/', main)
app.route('/:subchannels', main)

// start app
//var content = app.start("div")
document.body.appendChild(app.start("div"))
