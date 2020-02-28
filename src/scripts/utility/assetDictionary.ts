export default class AssetDictionary{

    assets: Map<string, Asset>;

    constructor(){

        this.assets = new Map<string, Asset>();

        let backGroundImage = new Asset("background", "assets/Background/space.png", [640, 640], AssetType.Image, false);
        let scoreFont = new Asset("font", "assets/font/font.png", [16,16], AssetType.BitmapFont, false);

        let playerShip = new Asset("player_ship", "assets/Blue/Small_ship_blue/playerShip.png", [640, 640], AssetType.Sprite, false);
        let playerProjectile = new Asset("player_projectile", "assets/Blue/bullet.png", [128, 128], AssetType.Sprite, false);

        let asteroid = new Asset("asteroid", "assets/Aestroids/aestroid_brown.png", [512,512], AssetType.Sprite, false);
        let explosionAnimation = new Asset("explosion", "assets/Effects/explosion.png", [16,16], AssetType.Sprite, false);

        this.add(backGroundImage);
        this.add(scoreFont);
        this.add(playerShip);
        this.add(playerProjectile);
        this.add(asteroid);
        this.add(explosionAnimation);
    }

    add(asset: Asset)
    {
        this.assets.set(asset.key, asset);
    }

    findAssetByKey(key: string)
    {
        let asset: Asset | undefined = this.assets.get(key.toLowerCase());

        if(asset != undefined)
            return asset.key;
        else
            return "";
    }
}

export class Asset{

    public key: string;
    public image: string;
    public width: number;
    public height: number;
    public type: AssetType;
    public excludeFromLoad: boolean;

    constructor(imageKey: string, image: string, imageDimensions: [number, number], assetType: AssetType, excludeFromLoad: boolean)
    {
        this.key = imageKey;
        this.image = image;
        this.width = imageDimensions[0];
        this.height = imageDimensions[1];
        this.type = assetType;
        this.excludeFromLoad = excludeFromLoad;
    }

    getFontData()
    {
       // if(this.type == AssetType.BitmapFont)
        {
            return "assets/font/font.xml";
        }
    }
}

export enum AssetType{

    Image,
    Sprite,
    BitmapFont,

}