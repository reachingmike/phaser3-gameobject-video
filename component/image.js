/* constructor. */                                                                                                               
image_t=function(scene, id, x, y, texture) {
	Phaser.GameObjects.Image.call(this, scene, x, y, texture);

	/* gameobject data. */
	this.id=id;
	this.x=x;
	this.y=y;

	/* dragging. */
	this.setInteractive({draggable:true});
	this.on('dragstart', function (gameobject) {
		this.setTint(0xff0000);
	});
	this.on('drag', function (gameobject, drag_x, drag_y) {
		this.x=drag_x;
		this.y=drag_y;
	});
	this.on('dragend', function (gameobject) {
		this.clearTint();
	});

	scene.add.existing(this);
	
	return this;
}
image_t.prototype.constructor=image_t;
image_t.prototype=Object.create(Phaser.GameObjects.Image.prototype);
