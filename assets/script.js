$(document).ready(function(){

	$(".climb").click(function(){
		if(!$(this).hasClass("faded")){

			var plantHeight = $(".garden").outerHeight(),
				windowHeight = $(window).outerHeight(),
				dif = plantHeight - windowHeight + 20

			if(dif > 0 ){
				TweenMax.to($(".garden"), 2, {transform: "scale(1) translateY(" + dif + "px)"})
			}
		}
	})

	var index = 0, 
			newRowLength = $(".leaf_row").length,
			startingPoint = 0; // how many rows are already visible
	var shouldscale = false;

	$(".scaling").click(function(){		

		TweenMax.set($(".garden"), {transform: "scale(1) translateY(0px)"})
		$(".garden").css({"transform": "scale(1) translateY(0px)"})

		if(shouldscale){
			shouldscale = false;
			$(this).removeClass("toggled")
			$(".climb").removeClass("faded")

		}else{
			shouldscale = true;		
			$(this).addClass("toggled")
			$(".climb").addClass("faded")
		}
	})

	var mocRender = function(index){

		if(index < newRowLength){
			var targetRow = newRowLength - index;

			for (var i = 0; i < startingPoint; i++) { // keep older leaves rendered.
				TweenMax.set($(".leaf_row").eq(i), {opacity: 1, display: "block"})
			}

			for (var i = (newRowLength-1); i > targetRow; i--) {
				// for all the rows that have already been rendered when a new leaf is added:
				// (so up until target row)
				TweenMax.set($(".leaf_row").eq(i), {opacity: 1, display: "block"})
			}

			// with each cycle, the margin top of the parent should be subtracted one unit (until 0)

			var leafMarginTop = $(".leaf_row").eq(targetRow).parents(".leaf").css("marginTop")

			if(parseInt(leafMarginTop) > 0){
				var newMargin = parseInt(leafMarginTop) - 15
			}

			TweenMax.to($(".leaf_row").eq(targetRow).parents(".leaf"), 0.05, {marginTop: newMargin + "px"})
			TweenMax.to($(".leaf_row").eq(targetRow), 0.05, {opacity: 1, display: "block", lineHeight: "15px", backgroundColor: "", onComplete: function(){
				mocRender(index + 1)
			}})
		}else{ // once it's rendered everything:

			// it should start from the bottom while still maintaining the top render (this is where the starting point comes in)
			// so it should pass the old starting point into a for loop to render
			newRowLength = $(".leaf_row").length
			startingPoint = index
			index = 0
			mocRender(index)
		}
		
		if(shouldscale){

			var windowHeight = $(window).outerHeight()
			var plantHeight = $(".garden").outerHeight()
			var scaler = windowHeight/plantHeight

			if(windowHeight < plantHeight){
				$(".garden").css({"transform" : "scale(" + scaler + ") translateY(0px)"})
				//TweenMax.set($(".garden"), {transform: "scale(" + scaler + ") translateY(0px)"})
			}
		}
	}

	mocRender(index)
	
})
