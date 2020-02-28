export default class Projectile extends Phaser.Physics.Arcade.Sprite
{
    private speed: number = 1000;
    private objectShredderZone: number = 10;

    constructor(projectileName: string, x: number, y: number, scene: Phaser.Scene)
    {
        super(scene, x, y, projectileName);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.velocity.y -= this.speed;
    }

    update()
    {
        if(this.y < this.objectShredderZone)
            this.destroy();
    }
}