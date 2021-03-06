var preload = function(game){}

preload.prototype = {
	preload: function(){ 
            load_text = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 256, 'Loading', { fill: '#ffffff' });
            load_text.anchor.setTo(.5,.5);

            this.game.load.onLoadStart.add(this.loadStart, this);
            this.game.load.onFileComplete.add(this.fileComplete, this);
            this.game.load.onLoadComplete.add(this.loadComplete, this);
            
            var load_icon = this.game.add.sprite(this.game.world.width * 0.5, this.game.world.height * 0.5, 'load_ani');
            load_icon.scale.setTo(2,2);
            load_icon.anchor.setTo(.5,.5);
            load_icon.animations.add('load');
            load_icon.animations.play('load', 10, true);
            this.load.setPreloadSprite(load_icon);
            
            //load other preload stuff here
            //sounds
            this.game.load.audio('poem', ['res/sounds/poem.mp3','res/sounds/poem.ogg']);
            this.game.load.audio('poem2', ['res/sounds/poem2.mp3','res/sounds/poem2.ogg']);
            this.game.load.audio('click', ['res/sounds/click.mp3','res/sounds/click.ogg']);
            for(var i = 2;i <= 4 ;i++){
                this.game.load.audio('lamb' + i, ['res/sounds/baalamb'+i+'.mp3','res/sounds/baalamb'+i+'.ogg']);
            }
            //music: https://www.youtube.com/watch?v=qFQP_A4Vacc
            this.game.load.audio('music', ['res/music/music.mp3','res/music/music.ogg']);

	    this.game.load.spritesheet("bopeep","res/sprites/bopeep_walk.png",128,256);
	    this.game.load.spritesheet("sheep","res/sprites/sheep.png",128,96);
	    this.game.load.spritesheet("playerf","res/sprites/playerf.png",128,96);
	    this.game.load.spritesheet("playerf2","res/sprites/playerf2.png",128,96);

	    this.game.load.image("play_btn","res/play_btn2.png");
	    this.game.load.image("pile_btn","res/pile.png");
	    this.game.load.image("main_game_btn","res/main_game_btn.png");
	    this.game.load.image("game_title","res/game_title.png");
	    this.game.load.image("click_me","res/click_me.png");
	    this.game.load.image("game_over","res/game_over.png");
	    this.game.load.image("start_over","res/start_over.png");
	    this.game.load.image("main_title","res/main_title.png");
	    this.game.load.image("simon","res/simon.png");
	    this.game.load.image("brick","res/brick.png");
	    this.game.load.image("grass","res/grass.png");
	    this.game.load.image("dirt","res/dirt.png");
	    this.game.load.image("exit","res/exit.png");

	},
  	create: function(){
                this.game.stage.backgroundColor = 0x00ccff;
                click = this.game.add.audio("click");
                lamb_snd=[];
                for(var i = 2;i <= 4 ;i++){
                    lamb_snd.push(this.game.add.audio("lamb"+i));
                }
                music = this.game.add.audio("music");
                music.play('',0,0.3,true);
	},

        loadComplete: function(){
		this.game.state.start("GameTitle");
        },

        loadStart: function(){
            //console.log("Loading...");
            load_text.setText("Loading ...");

        },

        //  This callback is sent the following parameters:
        fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
            //console.log("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
            load_text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
        }

}
