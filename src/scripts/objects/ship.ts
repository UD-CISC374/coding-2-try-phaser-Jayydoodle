import Projectile from "./projectile";

export default class Ship extends Phaser.Physics.Arcade.Sprite {

    public shipName: string;
    public projectileName: string;
    public defaultDepth: number = 1;

    constructor(shipName: string, projectileName: string, x: number, y: number, scene: Phaser.Scene) {
        super(scene, x, y, shipName);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.shipName = shipName;
        this.projectileName = projectileName;
        this.setDepth(this.defaultDepth);
    }
}

export class PlayerShip extends Ship
{
    private shipScale: number = 0.3;
    private flyingAnimationFrameRate = 10;
    private playerSpeed: number = 500;

    public static Offset = 80;

    constructor(shipName: string, projectileName: string, x: number, y: number, scene: Phaser.Scene) {
        super(shipName, projectileName, x, y, scene);
        this.SetScale();
        this.PlayFlyingAnimation();
        this.setCollideWorldBounds(true);
    }

    SetScale()
    {
      this.setScale(this.shipScale, this.shipScale);
    }

    PlayFlyingAnimation()
    {
        
        this.anims.animationManager.create(
            {
            key: "player_anim",
            frames: this.anims.animationManager.generateFrameNumbers(this.shipName, { start: 0, end: 4 }),
            frameRate: this.flyingAnimationFrameRate,
            repeat: -1
        
            });
        
        this.play('player_anim', true);
    }

    moveLeft()
    {
        this.setVelocityX(-this.playerSpeed);
    }

    moveRight()
    {
        this.setVelocityX(this.playerSpeed);
    }

    shoot()
    {
        let projectile: Projectile  = new Projectile(this.projectileName, this.x, this.y, this.scene);
        return projectile;
    }

    PlayExplosionAnimation()
    {
        let explosion:Phaser.GameObjects.Sprite = new Phaser.GameObjects.Sprite(this.scene, this.x, this.y, "explosion");
        this.scene.add.existing(explosion);
        explosion.setDisplaySize(100, 100);
        explosion.anims.animationManager.create(
            {
                key: "explosion_anim",
                frames: explosion.anims.animationManager.generateFrameNumbers("explosion", { start: 0, end: 4 }),
                frameRate: 10,
                repeat: 0
            });
    
        explosion.play('explosion_anim', true).once("animationcomplete-explosion_anim", () =>
        {
            explosion.destroy();
        });
    }
}