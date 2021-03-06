import AssetDictionary, { Asset, AssetType } from "../utility/assetDictionary";

export default class PreloadScene extends Phaser.Scene {

  assetDictionary: AssetDictionary;

  constructor() {
    super({ key: 'PreloadScene' });
    this.assetDictionary = new AssetDictionary();
  }

  preload() 
  {
      this.assetDictionary.assets.forEach(x => {

        this.loadAsset(x);

      });
  }

  create() 
  {
    this.scene.start('MainScene');
  }

  loadAsset(asset: Asset)
  {
      if(asset.excludeFromLoad)
        return;

      if(asset.type == AssetType.Image)
      {
        this.load.image(asset.key, asset.image);
      }
      else if(asset.type == AssetType.Sprite)
      {
        this.load.spritesheet(asset.key, asset.image, { 
    
        frameWidth: asset.width,
        frameHeight: asset.height
        });
      }
      else if(asset.type == AssetType.BitmapFont)
      {
        this.load.bitmapFont(asset.key, asset.image, asset.getFontData());
      }
  }
}
