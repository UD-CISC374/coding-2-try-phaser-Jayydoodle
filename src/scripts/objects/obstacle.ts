import Projectile from "./projectile";

export default class Obstacle extends Phaser.GameObjects.Sprite
{
    private obstacleName: string;
    private maxSpeed: number = 12;
    private minSpeed: number = 2;
    private speed: number;
    private obstacleScale: number = 0.1;

    private explosionAnimationFrameRate = 2;
    private objectShredderZone: number = 1200;

    constructor(obstacleName: string, x: number, y: number, scene: Phaser.Scene)
    {
        super(scene, x, y - 100, obstacleName);
        
        this.setScale(this.obstacleScale);
        this.setSize(50,5); // needed to resize collider

        this.obstacleName = obstacleName;

        this.x = Phaser.Math.Between(0, x);
        this.speed = Phaser.Math.Between(this.minSpeed, this.maxSpeed);
        scene.add.existing(this);
        scene.physics.add.existing(this);

    }

    static destroyObject(obstacle: Obstacle, projectile: Projectile)
    {
        obstacle.destroy();
        projectile.destroy();
    }

    update()
    {
        this.y += this.speed;

        if(this.y > this.objectShredderZone)
            this.destroy();

        if(this.state == "destroyed")
        {
            this.PlayExplosionAnimation();
            this.destroy();
        }
    }

    PlayExplosionAnimation()
    {
        let explosion:Phaser.GameObjects.Sprite = new Phaser.GameObjects.Sprite(this.scene, this.x, this.y, "explosion");
        this.scene.add.existing(explosion);
        explosion.setDisplaySize(100, 100);
        explosion.anims.animationManager.create(
            {
                key: "obstacle_anim",
                frames: explosion.anims.animationManager.generateFrameNumbers("explosion", { start: 0, end: 4 }),
                frameRate: 10,
                repeat: 0
            });
    
        explosion.play('obstacle_anim', true).once("animationcomplete-obstacle_anim", () =>
        {
            explosion.destroy();
        });
    }
}