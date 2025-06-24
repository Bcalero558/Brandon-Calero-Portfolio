/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetButton");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "black";
const snakeColor = "#66E940";
const snakeBorder = "black";
const foodColor = "blue";
const unitSize = 25;
let running = false
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
  {x:unitSize * 4, y:0},
  {x:unitSize * 3, y:0},
  {x:unitSize * 2, y:0},
  {x:unitSize, y:0},
  {x:0, y:0}
 ];
 window.addEventListener("keydown", changeDirection);
 resetBtn.addEventListener("click", resetGame);

 gameStart();


  function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};

function nextTick()
{
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else
    {
        displayGameOver();
    }
};

function clearBoard()
{
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0,0,gameWidth,gameHeight)

};

function createFood()
{
		function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max-min)+min) / unitSize) * unitSize
          return randNum;
        }
 		foodX = randomFood(0, gameWidth - unitSize);
        foodY = randomFood(0, gameWidth - unitSize);

        console.log(foodX)
};

function drawFood()
{
    ctx.fillStyle= foodColor;
    ctx.fillRect(foodX,foodY,unitSize,unitSize);

};

function moveSnake()
{
    const head = {x:snake[0].x + xVelocity,
                  y:snake[0].y + yVelocity,
    };

    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }

};

function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize);
        ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize);

    })
};

function changeDirection(event)
{
    const keypressed = event.keyCode;
    const LEFT = 65;
    const UP = 87;
    const RIGHT = 68;
    const DOWN = 83;

    const goingUp = (yVelocity == -unitSize)
    const goingDown = (yVelocity == unitSize)
    const goingLeft = (xVelocity == -unitSize)
    const goingRight = (xVelocity == unitSize)
    switch(true)
    {
        case(keypressed == LEFT && !goingRight):
        xVelocity = -unitSize;
        yVelocity = 0;
        break;

        case(keypressed == RIGHT && !goingLeft):
        xVelocity = unitSize;
        yVelocity = 0;
        break;

        case(keypressed == UP && !goingDown):
        xVelocity = 0;
        yVelocity = -unitSize;
        break;

        case(keypressed == DOWN && !goingUp):
        xVelocity = 0;
        yVelocity = unitSize;
        break;



    }
};

function checkGameOver(){
    switch(true)
    {
        case (snake[0].x < 0):
            running = false;
            break;
        
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        
        case (snake[0].y < 0):
            running = false;
            break;
        
        case (snake[0].y >= gameHeight):
            running = false;
            break;
        
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y ){
            running = false;
        }
    }
};

function displayGameOver(){
    ctx.font = "50px Raleway"
    ctx.fillStyle ="white";
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth/2 , gameHeight/2);
    ctx.strokeText("GAME OVER!", gameWidth/2 , gameHeight/2);

    running = false;
};

function resetGame(){
    score = 0;
    xVelocity = unitSize
    yVelocity = 0
    snake = [
  {x:unitSize * 4, y:0},
  {x:unitSize * 3, y:0},
  {x:unitSize * 2, y:0},
  {x:unitSize, y:0},
  {x:0, y:0}
 ];
 gameStart();
};

(function($) {
	

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});

})(jQuery);
