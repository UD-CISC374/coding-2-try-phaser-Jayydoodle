export class Background extends Phaser.GameObjects.TileSprite{

    public static backgroundScrollSpeed: number = 2;
    
    constructor(assetKey: string, scene: Phaser.Scene, width: number, height: number)
    {
        super(scene, width / 2, height / 2, width, height, assetKey, undefined);
        scene.add.existing(this);

    }
}