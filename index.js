var choo = require('choo')
var html = require('choo/html')
var main = require('./templates/main.js')
var app = choo()

app.use(function(state, emitter){

// call a channel

//http://api.are.na/v2/channels/document-as-project

	var theUrl = "http://api.are.na/v2/channels/amphi"
	// other determinations
		// menu object (of subchannels)

	emitter.on('pushChannel', function(data){
		state.channel = data
		emitter.emit('render')

	})


	var getArenaInfo = function(theUrl){
	    var xmlHttp = new XMLHttpRequest();

	    xmlHttp.onreadystatechange = function() { 
	      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
	        var channelData = JSON.parse(xmlHttp.responseText)
          if (channelData){

          	emitter.emit('pushChannel', channelData)


          	/*

						- define state
							- to send to main.js
						- we need to cycle through
							- if block type is:
								- text
									- support markdown?
								- link
									- if youtube/vimeo
									- if image
									- pdf or website
								- file (also a link)
									- img show
									- pdf, link
								- channel
									- check if naming structure exists
          	*/


          }
	    }
	    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
	    xmlHttp.send(null);
	}

	getArenaInfo(theUrl)


})

// create a route
app.route('/', main)
// start app
app.mount('.body')
