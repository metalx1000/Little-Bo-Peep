var gameTitle = function(game){}

gameTitle.prototype = {
  	create: function(){
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
		var gameTitle = this.game.add.sprite(this.game.world.width * 0.5,this.game.world.height * .1,"game_title");
		gameTitle.anchor.setTo(0.5,0.5);

		var playButton1 = this.game.add.button(this.game.world.width * 0.5,this.game.world.height * .3,"main_game_btn",this.playTheGame,this);
		playButton1.anchor.setTo(0.5,0.5);

		var playButton2 = this.game.add.button(this.game.world.width * 0.5,this.game.world.height * .4,"pile_btn",this.sheepPile,this);
		playButton2.anchor.setTo(0.5,0.5);

                this.create_simon();
                //this.main_title();
                this.load_sheep("sheep", this.game.world.width * 0.2, -100, "right");

                //go full screen on click
                //this.game.input.onDown.add(this.fullscreen, this);
	},
        update: function(){
                this.game.physics.arcade.collide(sheep, simon);
            
                if(sheep.position.x > this.game.world.width){
                    this.load_sheep("sheep", this.game.world.width * 0.8, -100, "left");
                }else if(sheep.position.x < 0){
                    this.load_sheep("sheep", this.game.world.width * 0.2, -100, "right");
                }
        },
        simonWeb: function(){
            window.open("http://incompetech.com", "_blank");
        },
	sheepPile: function(){
                click.play();
                this.fullscreen();
		this.game.state.start("sheepPile");
	},
	playTheGame: function(){
                click.play();
                this.fullscreen();
		this.game.state.start("TheGame");
	},
        fullscreen: function(){
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.startFullScreen();
        },

        load_sheep: function(pl, posx, posy, direction){
            var x = Math.floor(Math.random() * lamb_snd.length);
            lamb_snd[x].play(); 
            //animations
            sheep = this.game.add.sprite(posx,posy, pl);
            sheep.animations.add('left', [0, 1, 2, 3], 10, true);
            sheep.animations.add('right', [4, 5, 6, 7], 10, true);
            this.game.physics.arcade.enable(sheep);
            sheep.body.gravity.y = 500;
            sheep.body.bounce.y = 0.2;
            if(direction == "right"){
                sheep.body.velocity.x = 150;
                sheep.animations.play('right');
            }else{
                sheep.animations.play('left');
                sheep.body.velocity.x = -150;
            }

        },
        create_simon: function(){
		simon = this.game.add.sprite(this.game.world.width * 0.5,this.game.world.height * .9,"simon");
                simon.inputEnabled = true;
                simon.events.onInputDown.add(this.simonWeb,this);
                simon.anchor.setTo(0.5,0.5);
                this.game.physics.arcade.enable(simon);
                simon.body.immovable = true;
        },
        main_title: function(){
                title = this.game.add.sprite(this.game.world.width * 0.5,this.game.world.height * .5,"main_title");
                title.inputEnabled = true;
                title.events.onInputDown.add(this.krisWeb,this);
                title.anchor.setTo(0.5,0.5);
        },
        krisWeb: function(){
            window.open("http://filmsbykris.com", "_blank");
        },


}   
