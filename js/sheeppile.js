var sheepPile = function(game){}

sheepPile.prototype = {
  	create: function(){
                poem = this.game.add.audio("poem2"); 
                poem.play();
                delay = 0;
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
		var gameTitle = this.game.add.sprite(this.game.world.width * 0.5,this.game.world.height * .1,"game_title");
		gameTitle.anchor.setTo(0.5,0.5);
		var exit_btn = this.game.add.button(this.game.world.width * 0.5,this.game.world.height * .2,"exit",this.exit,this);
		exit_btn.anchor.setTo(0.5,0.5);

                ground = this.game.add.group();
                ground.enableBody = true;
                sheeps = this.game.add.group();
                sheeps.enableBody = true;

                this.load_ground();
                this.load_sheep("sheep", 0, 0, "right");
                this.load_fps();
                //go full screen on click
                this.game.input.onDown.add(this.fullscreen, this);
	},
        update: function(){
                fpsText.text = "fps: " + this.game.time.fps;
                this.game.physics.arcade.collide(sheeps, ground);
                delay-=1;
                for(var i = 0;i < sheeps.children.length;i++){ 
                    var sheep = sheeps.children[i];
                    var v = Math.floor(Math.random() * 150) + 50
                    if(sheep.position.x > this.game.world.width){
                        this.load_sheep("sheep", this.game.world.width, 0, "left");
                        sheep.body.velocity.x = -v;
                        sheep.animations.play('left');                    
                    }else if(sheep.position.x < 0){
                        this.load_sheep("sheep", 0, 0, "right");
                        sheep.animations.play('right');
                        sheep.body.velocity.x = v;
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
            if(delay<1){
                delay = 200;
                //animations
                var sheep = sheeps.create(posx, posy, pl);
                sheep.animations.add('left', [0, 1, 2, 3], 10, true);
                sheep.animations.add('right', [4, 5, 6, 7], 10, true);
                sheep.body.gravity.y = 500;
                sheep.body.bounce.y = 0.2;
                sheep.inputEnabled = true;
                sheep.events.onInputOver.add(this.sheep_jump,this);

                if(direction == "right"){
                    sheep.body.velocity.x = 150;
                    sheep.animations.play('right');
                }else{
                    sheep.animations.play('left');
                    sheep.body.velocity.x = -150;
                }
            }
        },

        sheep_jump: function(sheep){
            var x = Math.floor(Math.random() * lamb_snd.length);
            lamb_snd[x].play();
            sheep.body.velocity.y = -500;
        },
        load_ground: function(){
            //grass
            for(var i=0;i< this.game.world.width;i+=1280){
                var grass = ground.create(i, this.game.world.height - 128, 'grass');
                grass.body.immovable = true;
            }
            //dirt
            for(var i=0;i< this.game.world.width;i+=64){
                var dirt = this.game.add.sprite(i,this.game.world.height - 64,"dirt");
//                var dirt = ground.create(i, this.game.world.height - 64, 'dirt');
            }
        },
        load_fps: function(){
            //FPS Text
            this.game.time.advancedTiming = true;//advanced timeing needs to be true to get fps
            fpsText = this.game.add.text(16, height - 48, 'fps: 0', { fontSize: '32px', fill: '#000' });
            fpsText.fixedToCamera = true;//follow camera
        }


}   
