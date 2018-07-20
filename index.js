var choo = require('choo')
var html = require('choo/html')
var main = require('./templates/main.js')
var notFound = require('./templates/notFound.js')
var marked = require('marked')
var app = choo()

app.use(loadChannel)


function loadChannel (state, emitter){

  // "https://api.are.na/v2/channels/amphi"
  // emitter
  emitter.on('pushChannel', function(theChannel){
    var arenaRequest = "https://api.are.na/v2/channels/" + theChannel
    $.get( arenaRequest, function( data ) {
      state.channel = data

      var channelLength = state.channel.contents.length,
          i = 0

      // for each channel, get subchannel contents and update .contents
      var subchannelSearch = function(subChannelArenaRequest, number, channelLength){
        $.get( subChannelArenaRequest, function( data ) {
          state.channel.contents[number].contents = data.contents
          if(number + 1 < channelLength){
            subChannelCycle()
          }else{
            emitter.emit('render') //if this is the last block, render
          }
        })
      }

      var subChannelCycle = function(){
        console.log(i)
        if(state.channel.contents[i].class == "Channel"){
          // if this contents is a channel, fill its contents with an ajax request
          var subChannelArenaRequest = "https://api.are.na/v2/channels/" + state.channel.contents[i].slug
          subchannelSearch(subChannelArenaRequest, i, channelLength)
          i++
        }else{
          i++
          if(i + 1 < channelLength){
            subChannelCycle()
          }else{
            emitter.emit('render')
          }
        }
      }
      subChannelCycle()
    });
  })
}

// routes
app.route('/', main)
app.route('/:subchannels', main)
//app.route('/:subchannels/:subsubchannels', main)
app.route('/404', notFound) 

// start app
//var content = app.start("div")
document.body.appendChild(app.start("div"))


/*

THINGS TO DO

Structural Edits
- get subpages/subsubpages to work
- get recursive blocks to work
- get error page to work
- support ([slideshow], [slideshow], etcs (check readme.md))
- //loading bug

Syntax Edits
- show link to actual arena page (along with edit color)
- give menu #target if clicks on subsection instead of individual page

*/
