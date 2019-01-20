/*
 * a simple test scene demonstrating video gameobjects in phaser3.
 */

/* test scene. */
var scene_test_t={
	video_1:null,
	video_2:null,
	video_3:null,
 	preload:function() {
		app_resize();
		this.load.image('phaser', 'media/phaser3.png');
	},
	create:function() {
		/* instruction text. */
		let text_instruction=new text_t(this, 'text-instruction', 0, 0, 'This example demonstrates html5 video elements integrated with phaser images, and their performance in relation to canvas resizing, drawing over/under other objects and multiple data sources. Click/Tap on objects to drag them around. Note that videos are subclassed from the phaser image game object, and therefore have all the properties and abilities of phaser gameobjects.', {fontFamily:'Verdana',fontSize:16,color:'#ffffff',align:'left',wordWrap:{width:400}});
		text_instruction.setStroke('#00cc00', 1);
		text_instruction.setOrigin(0.5, 0.0);
		text_instruction.x=config.game.width/2;
		text_instruction.y=20;

		/* top left phaser image. */
		let image_1=new image_t(this, 'image-1', 0, 0, 'phaser');
		image_1.setScale(0.2, 0.2);
		image_1.x=image_1.width*image_1.scaleX/2;
		image_1.y=image_1.height*image_1.scaleY/2;

		/* video gameobjects. */
		this.video_1=new video_t(this, 'video-1', 400, 100, 'video-1', 'media/spongebob-walk.mp4', 640, 400, true);
		this.video_1.setScale(0.3, 0.3);
		this.video_1.x=this.video_1.width*this.video_1.scaleX/2;
		this.video_1.y=this.video_1.height*this.video_1.scaleY/2+200;

		this.video_2=new video_t(this, 'video-2', 400, 200, 'video-2', 'media/spongebob-walk.mp4', 640, 400, true);
		this.video_2.setOrigin(0.5, 0.5);
		this.video_2.x=config.game.width/2;
		this.video_2.y=config.game.height/2+100;
		this.video_2.setScale(0.5, 0.5);

		this.video_3=new video_t(this, 'video-3', 400, 300, 'video-3', 'media/spongebob-walk.mp4', 640, 400, true);
		this.video_3.setScale(0.3, 0.3);
		this.video_3.x=config.game.width-this.video_3.width*this.video_3.scaleX/2;
		this.video_3.y=this.video_3.height*this.video_3.scaleY/2+200;

		/* top right phaser image. */
		let image_2=new image_t(this, 'image-2', 70, 60, 'phaser');
		image_2.setScale(0.2, 0.2);
		image_2.x=config.game.width-image_2.width*image_2.scaleX/2;
		image_2.y=image_2.height*image_2.scaleY/2;
	},
	update:function() {
		if (this.video_1)
			this.video_1.update();
		if (this.video_2)
			this.video_2.update();
		if (this.video_3)
			this.video_3.update();
	}
}

/* app and phaser configuration. */
var config={
	engine:null, /* phaset reference. */
	container:{width:0, height:0, aspect:0.0},
	game:{width:960, height:540, aspect:0.0, scale:0.0},
	phaser:{
		type:Phaser.WEBGL,
		backgroundColor:'#222222',
		width:960,
		height:540,
		parent:'container',
		scene:scene_test_t
	}
};

/* canvas resizing. */
function app_resize() {
  config.container.width=window.innerWidth;
  config.container.height=window.innerHeight;
  config.container.aspect=config.container.width/config.container.height;
  config.game.aspect=config.game.width/config.game.height;
  /* landscape. */
  if (config.container.aspect>=config.game.aspect)
    config.game.scale=config.container.height/config.game.height;
  /* portrait */
  else
    config.game.scale=config.container.width/config.game.width;

  if (!config.engine)
    return;

  var margin_top=(config.container.height-(config.game.height*config.game.scale))/2
  var margin_left=(config.container.width-(config.game.width*config.game.scale))/2;

  /* resize game. */
  config.engine.resize(config.game.width, config.game.height);

  /* resize cameras. */
  for (var scene of config.engine.scene.scenes) {
    if (!scene)
      continue;
    if (!scene.cameras.main)
      continue;
    scene.cameras.main.setViewport(0, 0, config.phaser.width, config.phaser.height)
  }

  /* resize renderer. */
  if (config.engine.config.renderType===Phaser.WEBGL)
    config.engine.renderer.resize(config.phaser.width, config.phaser.height);

  /* scale html canvas object. */
  config.engine.canvas.style.width=config.game.width+'px';
  config.engine.canvas.style.height=config.game.height+'px';
  config.engine.canvas.style.marginTop=margin_top+'px';
  config.engine.canvas.style.marginLeft=margin_left+'px';
  config.engine.canvas.style.transformOrigin='0 0';
  config.engine.canvas.style.transform='scale('+config.game.scale+')';
}
window.onresize=app_resize;

/* start phaser engine. */
config.engine=new Phaser.Game(config.phaser);
