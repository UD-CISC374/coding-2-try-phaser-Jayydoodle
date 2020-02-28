import { GameObjects } from 'phaser';
import { PlayerShip } from '../objects/ship';
import AssetDictionary from '../utility/assetDictionary';
import { Background } from '../objects/world_space/background';
import Obstacle from '../objects/obstacle';
import Projectile from '../objects/projectile';

export default class MainScene extends Phaser.Scene {
  
  public assetDictionary: AssetDictionary;

  private background: Background;
  private gameWidth: number;
  private gameHeight: number;
  private keyboardControls: Phaser.Types.Input.Keyboard.CursorKeys;
  private scoreLabel: GameObjects.BitmapText;
  private score: number = 0;

  private frameCount: number = 0;
  private obstacleFrameOffest: number = 50;
  private obstacleSpawnRate: number = 3;

  private playerShip: PlayerShip;

  private obstacles: GameObjects.Group;
  private projectiles: GameObjects.Group;


  constructor() {
    super({ key: 'MainScene' });
    this.assetDictionary = new AssetDictionary();
  }

  create() 
  {
    this.gameWidth = this.game.config.width as number;
    this.gameHeight = this.game.config.height as number;
    this.keyboardControls = this.input.keyboard.createCursorKeys();

    this.background = new Background(this.findAsset("background"), this, this.gameWidth, this.gameHeight);
    this.scoreLabel = this.add.bitmapText(100, 50, "font", "SCORE ", 50);
    this.score = 0;
    
    this.playerShip = new PlayerShip(this.findAsset("player_ship"), 
                                     this.findAsset("player_projectile"), 
                                     this.gameWidth / 2, this.gameHeight - PlayerShip.Offset, this);

    this.projectiles = this.add.group();
    this.obstacles = this.add.group();

    this.physics.add.collider(this.obstacles, this.projectiles, undefined, this.onObjectHit, this);
    this.physics.add.collider(this.playerShip, this.obstacles, undefined, this.onPlayerHit, this)
  }

  update() {

    this.background.tilePositionY -= Background.backgroundScrollSpeed;
    this.playerMovementManager();
    this.obstacleManager();
    this.frameCount++;
  }

  playerMovementManager()
  {
      this.playerShip.setVelocity(0);

      if(this.keyboardControls.left?.isDown)
      {
        this.playerShip.moveLeft();
      }
      else if(this.keyboardControls.right?.isDown)
      {
        this.playerShip.moveRight();
      }

      if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)))
      {
        var projectile = this.playerShip.shoot();
        this.projectiles.add(projectile);
      }

      this.projectiles.getChildren().forEach(x => {

          x.update();
      });
  }

  onObjectHit(obstacle, projectile)
  {
    this.score += 20;
    this.scoreLabel.text = "SCORE " + " " + this.score;
    projectile.destroy();
    obstacle.setState("destroyed");
  }

  onPlayerHit(player, obstacle)
  {
    obstacle.setState("destroyed");
    player.PlayExplosionAnimation();

    this.scene.restart();
  }

  obstacleManager()
  {
    if(this.frameCount % this.obstacleFrameOffest == 0)
    {
      for(var i = 0; i < this.obstacleSpawnRate; i++)
      {
        let asteroid: Obstacle = new Obstacle("asteroid", this.gameWidth, 0, this);
        this.obstacles.add(asteroid);
      }
    }

    this.obstacles.getChildren().forEach(x => {
        x.update();
    });
  }

  findAsset(key: string)
  {
    return this.assetDictionary.findAssetByKey(key);
  }
}
