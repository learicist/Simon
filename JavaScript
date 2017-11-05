$(document).ready(function () {
	var simonArr = [],
		currSimArr = [],
		userArr = [],
		steps = 1,
		strictFlag = true,
		i = 0,
		j,
		x,
		red = $("#red"),
		green = $("#green"),
		yellow = $("#yellow"),
		blue = $("#blue"),
		redAlarm = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
		greenAlarm = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
		yellowAlarm = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
		blueAlarm = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
	
	$("#controls").animate({bottom: "440px"}, 3000);
	
	function simTurn () {
		x = setInterval(function () {
			if (simonArr[i] == 1) {
				red.css("opacity", "1");
				redAlarm.play();
				currSimArr.push(1);
				setTimeout(function () {
					red.css("opacity", "0.7");
				}, 500);
			} else if (simonArr[i] == 2) {
				green.css("opacity", "1");
				greenAlarm.play();
				currSimArr.push(2);
				setTimeout(function () {
					green.css("opacity", "0.7");
				}, 500);
				
			} else if (simonArr[i] == 3) {
				yellow.css("opacity", "1");
				yellowAlarm.play();
				currSimArr.push(3);
				setTimeout(function () {
					yellow.css("opacity", "0.7");
				}, 500);
				
			} else if (simonArr[i] == 4) {
				blue.css("opacity", "1");
				blueAlarm.play();
				currSimArr.push(4);
				setTimeout(function () {
					blue.css("opacity", "0.7");
				}, 500);
			}
			
			i++;
			
			if (i >= steps) {
				clearInterval(x);
			}
			
		}, 800);
		
	}
	
	function winCheck () {
		if (userArr.length == currSimArr.length) {
			if (userArr.join() == currSimArr.join()) {
				if (steps == 20) {
					setTimeout(function () {
						alert("You have defeated me! Great work.");
						location.reload();
					}, 500);
				} else {
					setTimeout(function() {
						steps++;
						$("#display").val(steps);
						userArr = [];
						currSimArr = [];
						i = 0;
						simTurn();
					}, 500);
				}
			} else {
				if (!strictFlag) {
					alert("You missed on Strict Mode, and have been brought back to the beginning.");
					setTimeout(function () {
						location.reload();
					}, 500);
				} else {
					setTimeout(function () {
						alert("Careful! Try again...");
						userArr = [];
						currSimArr = [];
						i = 0;
						simTurn();
					}, 500);
				}
			}
		}
	}
	
	$("#onBtn").click(function () {
		
		$(this).css({
			"background-color": "#4B0082",
			"border": "2px dashed white"
		});
		
		for (j =0; j < 20; j++) {
			simonArr[j] = Math.ceil(Math.random() * 4);
		}

		$("#strictBtn").click(function () {
			if (strictFlag) {
				$(this).css({
					"background-color": "white", 
					"border": "2px dashed DarkOrange"
				});
				$(this).html("ON");
				strictFlag = false;
			} else if (!strictFlag) {
				$(this).css({
					"background-color": "DarkOrange", 
					"border": "2px dashed white"
				});
				$(this).html("");
				strictFlag = true;
			}
		});
		
		$("#startBtn").click(function () {
			simTurn();
			$("#display").val(steps);
		});
		
		
		$(".mainBtns").click(function () {
			var currBtn = this.id;
			$(this).css("opacity", "1");
			
			if ($(this).css("opacity", "1")) {
				$(this).delay(400).animate({opacity: "0.7"});
			}
			
			if (currBtn === "red") {
				userArr.push(1);
				redAlarm.play();
				winCheck();
			} else if (currBtn === "green") {
				userArr.push(2);
				greenAlarm.play();
				winCheck();
			} else if (currBtn === "yellow") {
				userArr.push(3);
				yellowAlarm.play();
				winCheck();
			} else if (currBtn === "blue") {
				userArr.push(4);
				blueAlarm.play();
				winCheck();
			}		
		});
	});	
	
	$("#offBtn").click(function () {
		location.reload();
	});
	
});
