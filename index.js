var choo = require('choo')
var html = require('choo/html')
var main = require('./templates/main.js')
var marked = require('marked')
var app = choo()

app.use(function(state, emitter){

	// "https://api.are.na/v2/channels/amphi"

	// emitter
	emitter.on('pushChannel', function(theChannel){
		var arenaRequest = "https://api.are.na/v2/channels/" + theChannel
		$.get( arenaRequest, function( data ) {
  		state.channel = data

  		// for each channel, get subchannel contents and update .contents

  		var subchannelSearch = function(subChannelArenaRequest, number){
  			$.get( subChannelArenaRequest, function( data ) {

  					state.channel.contents[number].contents = data.contents
  					//console.log(state.channel)
  					emitter.emit('render') //once the target channel has been returned, re-render this page

  				})
  		}

  		for (var i = 0; i < state.channel.contents.length; i++) {
  			if(state.channel.contents[i].class == "Channel"){
  				// if this contents is a channel, fill its contents with an ajax request
  				var subChannelArenaRequest = "https://api.are.na/v2/channels/" + state.channel.contents[i].slug
  				
  				subchannelSearch(subChannelArenaRequest, i)
  			}

  			if(i+1 == state.channel.contents.length){
  				console.log("ended")
  			}

  		}


			
		});
	})

	emitter.on('pushSubsection', function(theChannel){
		var arenaRequest = "https://api.are.na/v2/channels/" + theChannel
		$.get( arenaRequest, function( data ) {
  		state.subsection = data
			emitter.emit('render') //once the target channel has been returned, re-render this page
		});
	})


})

// routes
app.route('/', main)
app.route('/:subchannels', main)
//app.route('/:subchannels/:subsubchannels', main)
// need to add error

// start app
//var content = app.start("div")
document.body.appendChild(app.start("div"))


/*

THINGS TO DO

- support
- get subpages/subsubpages to work
- get recursive blocks to work

*/
