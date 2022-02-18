class Game{
  constructor(){}

//Función para obtener el gameState
getState(){
  var gameStateRef = database.ref('gameState');
  gameStateRef.on("value",function(data){gameState = data.val(); });
}
//Función para actualizar el gameState
updateState(state){
  database.ref('/').update({gameState: state});
}

async start(){
  if(gameState == 0){
  player = new Player();
  var playerCountRef = await database.ref('playerCount').once("value");
  
  if(playerCountRef.exists()){
   playerCount = playerCountRef.val();
   player.getCount();
  }
  
  form = new Form();
  form.display();
  }
  //Los sprites de los jugadores
  pj1 = createSprite(200,100,50,50);
  pj1.addImage(pj1Img);
  pj1.setCollider("rectangle",-30,5,200,100)
  pj1.debug=true;
  pj1.scale = 0.5;
  
  pj2 = createSprite(1200,100,5,50);
  pj2.addImage(pj1Img);
  pj2.setCollider("rectangle",-30,10,200,100)
  pj2.debug=true;
  pj2.scale = 0.5;
  
  pjs = [pj1, pj2];
  
  }

  play(){
    form.hide();
    
    Player.playerInfo();
    
    spawnObstacles();

    if(bgInfinito.y>400){
      bgInfinito.y = 100;
     }

    if(allPlayers !== undefined){      
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      //var x = 175 ;
      //var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        this.move = 100;
        //use data form the database to display the cars in y direction
        var x = displayHeight/2-allPlayers[plr].move;
        
        pjs[index-1].x = x;
        //pjs[index-1].y = y;

        if (index === player.index){

          /*fill("red");
          stroke(10);
          ellipse(x,0,90,90);*/
          //pjs[index - 1].shapeColor = "red";
         // camera.position.x = displayWidth/2;
         // camera.position.y = cars[index-1].y;

         if(keyIsDown(LEFT_ARROW) && player.index !== null){
          player.move +=3
          player.updateName();
        }
//Este "if" es para mover a el jugador con la flecha de la derecha
        if(keyIsDown(RIGHT_ARROW) && player.index !== null){
          player.move -=3
          player.updateName();
        } 
        if(obstaclesGroup.isTouching( pjs[index - 1])){
          game.updateState(2);
        }

        }
      }
      
    }
    
  }

  end(){
    obstaclesGroup.setVelocityYEach(0);
    bgInfinito.velocityY = 0;
    fill("blue")
    textSize(30)
    text("GAME OVER", displayWidth/2, displayHeight/2);
  }
}
