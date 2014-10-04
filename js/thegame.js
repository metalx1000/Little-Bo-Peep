var theGame = function(game){}

theGame.prototype = {
  	create: function(){
                poem = this.game.add.audio("poem"); 
                poem.play();
                delay = 0;
        
                var world_width = 5120;
                this.game.world.setBounds(0, 0, world_width, this.game.world.height);
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
		var gameTitle = this.game.add.sprite(width * 0.5,this.game.world.height * .1,"game_title");
		gameTitle.anchor.setTo(0.5,0.5);
		var exit_btn = this.game.add.button(width * 0.1,this.game.world.height * .1,"exit",this.exit,this);
		exit_btn.anchor.setTo(0.5,0.5);
                exit_btn.fixedToCamera = true;

                ground = this.game.add.group();
                ground.enableBody = true;
                sheeps = this.game.add.group();
                sheeps.enableBody = true;

                this.load_ground();
                for(var i = 0;i<10;i++){
                    var x = Math.floor(Math.random() * world_width * 0.2);
                    this.load_sheep("sheep", x, this.game.world.height - 256, "right");
                }

                this.load_player();

                this.load_fps();
                //go full screen on click
                this.game.input.onDown.add(this.fullscreen, this);
                this.game.input.onDown.add(this.move, this);
	},
        update: function(){
                fpsText.text = "fps: " + this.game.time.fps;

                if(player.body.velocity.x > 0){
                    player.body.velocity.x -= 1;
                }else if(player.body.velocity.x < 0){
                    player.body.velocity.x += 1;
                }else if(player.body.velocity.x == 0){
                    player.animations.stop();   
                }

                this.game.camera.x = player.position.x - width * 0.5;
                this.game.physics.arcade.collide(sheeps, ground);
                this.game.physics.arcade.collide(player, ground);
                if(delay<0){
                    this.game.physics.arcade.overlap(player, sheeps, this.sheep_jump, null, this);
                    delay = 20;
                }
                delay-=1;

                for(var i = 0;i < sheeps.children.length;i++){ 
                    var sheep = sheeps.children[i];
                    var v = Math.floor(Math.random() * 150) + 50
                    if(sheep.position.x > this.game.world.width){
                        //this.load_sheep("sheep", this.game.world.width, 0, "left");
                        sheep.body.velocity.x = -v;
                        sheep.animations.play('left');                    
                    }else if(sheep.position.x < 0){
                        //this.load_sheep("sheep", 0, 0, "right");
                        sheep.animations.play('right');
                        sheep.body.velocity.x = v;
                    }

                    if(sheep.body.velocity.x > 0){
                        sheep.animations.play('right');
                    }else{
                        //this.load_sheep("sheep", 0, 0, "right");
                        sheep.animations.play('left');
                    }
                }

        },
	exit: function(){
                click.play();
		this.game.state.start("GameOver");
	},
        fullscreen: function(){
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.startFullScreen();
        },

        load_sheep: function(pl, posx, posy, direction){
                //animations
                var sheep = sheeps.create(posx, posy, pl);
                sheep.animations.add('left', [0, 1, 2, 3], 10, true);
                sheep.animations.add('right', [4, 5, 6, 7], 10, true);
                sheep.body.gravity.y = 1000;
                sheep.body.bounce.y = 0.2;
                sheep.inputEnabled = true;
                sheep.events.onInputOver.add(this.sheep_jump,this);

                //console.log("Loading Sheep at " + sheep.position.x);
                if(direction == "right"){
                    sheep.body.velocity.x = 150;
                    sheep.animations.play('right');
                }else{
                    sheep.animations.play('left');
                    sheep.body.velocity.x = -150;
                }
        },

        sheep_jump: function(player, sheep){
            var x = Math.floor(Math.random() * lamb_snd.length);
            lamb_snd[x].play();
            var X = Math.floor(Math.random() * 1000) - 500;
            sheep.body.velocity.x = X;
            sheep.body.velocity.y = -500;
        },
        load_ground: function(){
            //grass
            for(var i=0;i< this.game.world.width;i+=64){
                var grass = ground.create(i, this.game.world.height - 128, 'grass');
                grass.body.immovable = true;                
            }
            //dirt
            for(var i=0;i< this.game.world.width;i+=64){
                var dirt = ground.create(i, this.game.world.height - 64, 'dirt');
                dirt.body.immovable = true;                
            }
        },

        load_player: function(){
            player = this.game.add.sprite(width * 0.5, this.game.world.height * 0.5, 'bopeep');
            player.anchor.setTo(0.5,0.5);
            this.game.physics.arcade.enable(player);
            player.body.bounce.y = 0.2;
            player.body.gravity.y = 300;
            player.body.collideWorldBounds = true;   

            player.animations.add('left', [0, 1, 2, 3,5,6,7], 10, true);
            player.animations.add('right', [8,9,10,11,12,13,14,15], 10, true);
        },
        move: function(){
            mouseX = this.game.input.mousePointer.position.x;
            playerX = width * 0.5;
            if(mouseX > playerX){
                player.body.velocity.x = 800;
                player.animations.play('right');
                //console.log(mouseX + ":" + playerX);
            }else if(mouseX < playerX){
                player.body.velocity.x = -800;
                player.animations.play('left');
                //console.log(mouseX + ":" + playerX);
            }
        },

        load_fps: function(){
            //FPS Text
            this.game.time.advancedTiming = true;//advanced timeing needs to be true to get fps
            fpsText = this.game.add.text(16, height - 48, 'fps: 0', { fontSize: '32px', fill: '#000' });
            fpsText.fixedToCamera = true;//follow camera
        }
}   
