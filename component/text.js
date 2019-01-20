/* text typedef. */                                                                                                               
text_t=function(scene, id, x, y, text, style) {
	Phaser.GameObjects.Text.call(this, scene, x, y, text, style);
	scene.add.existing(this);
	return this;
}
text_t.prototype.constructor=text_t;
text_t.prototype=Object.create(Phaser.GameObjects.Text.prototype);
