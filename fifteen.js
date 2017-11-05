//Author: Rahmeesh Bowla
//620088357
/* global $ */
//"multiple backgrounds"under the extra features section was implimented.

window.onload=function(){
   var puzzlearea = $("#puzzlearea");
    var tiles = document.querySelectorAll("#puzzlearea div");
    var shufflebutton =document.getElementById("shufflebutton");
    var btn = document.createElement("BUTTON");
    var x = document.createTextNode("Change Background");
    btn.appendChild(x);
    document.getElementById("controls").appendChild(btn);
    shufflebutton.addEventListener('click',shuffle);
    btn.addEventListener('click',background);
    var tile;
    var len = tiles.length;
    var puzzleTiles =[null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null
    ];
    var emptyTileNum = len;
    
    var ADJACENT_TILES = [
        
        [0, 5],
        [0, 2, 5],
        [1, 4],
        [1, 3, 6],
        [2, 7],
        [4, 9],
        [4, 1, 6, 9],
        [5, 2, 7, 10],
        [6, 3, 11],
        [8, 5, 10, 13],
        [9, 6, 11, 14],
        [10, 7, 15],
        [8, 13],
        [12, 9, 14],
        [13, 10, 15],
        [14, 11]
    ];
    
    
    for (var i = 0; i<tiles.length; i++){
       tiles[i].tileIndex = i;
       tiles[i].isMoveableTile = false;
       puzzleTiles[i] = tiles[i];
       tiles[i].className = 'puzzlepiece';
       tiles[i].addEventListener("click", moveTile);
        
        if(i<4){
            tiles[i].style.left+=i*100+'px';
            tiles[i].style.top=0+'px';
            tiles[i].style.backgroundPosition = -i*100+'px '+'0px';

        }
        else if(i<8){
            tiles[i].style.left+=(i-4)*100+'px';
            tiles[i].style.top=100+'px';
            tiles[i].style.backgroundPosition = -(i-4)*100+'px '+'-100px';
        }
         else if(i<12){
            tiles[i].style.left+=(i-8)*100+'px';
            tiles[i].style.top=200+'px';
            tiles[i].style.backgroundPosition = -(i-8)*100+'px '+'-200px';
        }
        else if(i<16){
            tiles[i].style.left+=(i-12)*100+'px';
            tiles[i].style.top=300+'px';
            tiles[i].style.backgroundPosition = -(i-12)*100+'px '+'-300px';
        }
    }
    tiles[11].isMoveableTile = true;
    tiles[11].className = 'puzzlepiece movablepiece';
    tiles[14].isMoveableTile = true;
    tiles[14].className = 'puzzlepiece movablepiece';
   
   

    
    
    var i,j, row;
    function updateAdjacentTiles(num, className, moveable){
        j = num - 4;
        if (j >= 0 && j <= 15) {
            if (puzzleTiles[j] !== null) {
                puzzleTiles[j].isMoveableTile = moveable;
                puzzleTiles[j].setAttribute("class", className);
            }
        }

        j = num + 4;
        if (j >= 0 && j <= 15) {
            if (puzzleTiles[j] !== null) {
                puzzleTiles[j].isMoveableTile = moveable;
                puzzleTiles[j].setAttribute("class", className);
            }
        }

        row = Math.floor(num / 4);

        j = num - 1;
        if (j >= 0 && j <= 15 && Math.floor(j / 4) === row) {
            if (puzzleTiles[j] !== null) {
                puzzleTiles[j].isMoveableTile = moveable;
                puzzleTiles[j].setAttribute("class", className);
            }
        }

        j = num + 1;
        if (j >= 0 && j <= 15 && Math.floor(j / 4) === row) {
            if (puzzleTiles[j] !== null) {
                puzzleTiles[j].isMoveableTile = moveable;
                puzzleTiles[j].setAttribute("class", className);
            }
        }
    }
        
    
    var style, temp;
    var SOLVED_PUZZLE_TILE_STYLES = [
        {"left":"0px", "top":"0px", "backgroundPosition":"0px 0px"},
        {"left":"100px", "top":"0px", "backgroundPosition":"-100px 0px"},
        {"left":"200px", "top":"0px", "backgroundPosition":"-200px 0px"},
        {"left":"300px", "top":"0px", "backgroundPosition":"-300px 0px"},
        {"left":"0px", "top":"100px", "backgroundPosition":"0px -100px"},
        {"left":"100px", "top":"100px", "backgroundPosition":"-100px -100px"},
        {"left":"200px", "top":"100px",  "backgroundPosition":"-200px -100px"},
        {"left":"300px", "top":"100px", "backgroundPosition":"-300px -100px"},
        {"left":"0px", "top":"200px", "backgroundPosition":"0px -200px"},
        {"left":"100px", "top":"200px", "backgroundPosition":"-100px -200px"},
        {"left":"200px", "top":"200px", "backgroundPosition":"-200px -200px"},
        {"left":"300px", "top":"200px", "backgroundPosition":"-300px -200px"},
        {"left":"0px", "top":"300px", "backgroundPosition":"0px -300px"},
        {"left":"100px", "top":"300px", "backgroundPosition":"-100px -300px"},
        {"left":"200px", "top":"300px", "backgroundPosition":"-200px -300px"},
        {"left":"300px", "top":"300px"}
    ];
    function moveTile(){
        if (this.isMoveableTile === true) {
            style = this.style;

            // update mapping
            puzzleTiles[emptyTileNum] = this;
            puzzleTiles[this.tileIndex] = null;

            // remove highlight on mouse hover for old moveable tiles
            updateAdjacentTiles(emptyTileNum, "puzzlepiece", false);

            // add highlight on mouse hover for new moveable tiles
            updateAdjacentTiles(this.tileIndex, "puzzlepiece movablepiece", true);

            // update appearance
            style.left = SOLVED_PUZZLE_TILE_STYLES[emptyTileNum].left;
            style.top = SOLVED_PUZZLE_TILE_STYLES[emptyTileNum].top;

            temp = this.tileIndex;
            this.tileIndex = emptyTileNum;
            emptyTileNum = temp;
        }
    }
    
 
    
    
    var randomNum, neighbourNum;
    function shuffle(){
        // remove highlight on mouse hover for current moveable tiles
        updateAdjacentTiles(emptyTileNum, "puzzlepiece",false);

        // shuffle
        for (i = 0; i < 601; i++) {
            // randomly choose a tile that neighbour's the blank tile

            randomNum =
                Math.floor(Math.random() * ADJACENT_TILES[emptyTileNum].length);

            neighbourNum =
                ADJACENT_TILES[emptyTileNum][randomNum];

            // update mapping

            temp = puzzleTiles[neighbourNum];

            // swap neighbour tile with blank tile
            puzzleTiles[neighbourNum] = null;
            puzzleTiles[emptyTileNum] = temp;

            puzzleTiles[emptyTileNum].tileIndex =
                emptyTileNum;

            emptyTileNum = neighbourNum;
        }
        // add highlight on mouse hover for new moveable tiles
        updateAdjacentTiles(emptyTileNum, "puzzlepiece movablepiece", true);

        // update tile's visual positions in puzzle
        for (i = 0; i < puzzleTiles.length; i++) {
            tile = puzzleTiles[i];

            if (tile !== null) {
                style = tile.style;

                style.top = SOLVED_PUZZLE_TILE_STYLES[i].top;
                style.left = SOLVED_PUZZLE_TILE_STYLES[i].left;
            }
        }
    }
    
    //Randomly selects an image when button is pressed.
    function background(){
        var option1 = "url('background2.jpg')";
        var option2 = "url('background3.jpg')";
        var option3 = "url('background.jpg')";
        var option4 = "url('background4.jpg')";
        var selected = "";
        var num = Math.floor(Math.random() * 4);
        if(num == 0){
            selected = option1;
        }
        else if(num == 1){
            selected = option2;
        }
        else if(num == 2){
            selected = option3;
        }
        else if(num == 3){
            selected = option4;
        }
        for (var i = 0; i<tiles.length; i++){
        tiles[i].style.backgroundImage = selected;    
        } 
    }
    
};
