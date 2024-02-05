//=============================================================================
// MOG_TreasurePopup_Ex.js
//=============================================================================
/*:
 * @plugindesc MOG_TreasurePopUpの機能変更プラグイン。
 * @author ecf5DTTzl6h6lJj02
 * @help
 * MOG_TreasurePopupの機能を変更するプラグインです。
 * MOG_TreasurePopup	の直下に置くようにしてください。
 * このプラグインを有効にすると
 * 　1. ポップアップをプレイヤーの頭上に
 * 　2. お金を入手した場合、金額の後ろに通貨単位を表示
 * の変更が行われます。
 * このプラグインにはプラグインパラメータ・プラグインコマンドはありません。
 
 * MOG_TresurePopup の改変という扱いですので、
 * 利用規約等は、Moghunter 様の規約に従ってください。
*/

"use strict";

//==============================
// * command 128
//==============================
Game_Interpreter.prototype.checkTreasurePopup = function (type) {
  if ($gameSystem._trspupVisible) {
    if (type > 2) {
      var amount = this.operateValue(
        this._params[0],
        this._params[1],
        this._params[2]
      );
    } else {
      var amount = this.operateValue(
        this._params[1],
        this._params[2],
        this._params[3]
      );
    }
    if (amount > 0 && SceneManager._scene.constructor.name === "Scene_Map") {
      var x = $gamePlayer.screenX();
      var y = $gamePlayer.screenY();
      $gameSystem._trspupData.push([this.trPopupType(type), amount, x, y]);
    }
  }
};

//=============================================================================
// * Treasure Icons
//=============================================================================

//==============================
// * SetupNew
//==============================
TreasureIcons.prototype.setupNew = function (data) {
  this._item = data[0];
  this._amount = data[1];
  var name = this._item
    ? this._item.name + " x " + this._amount
    : this._amount + " " + TextManager.currencyUnit;
  var wd = this._name.bitmap.measureTextWidth(name);
  this._cx = 0;
  this._cy = 0;
  var iw = this._fx * this.waitD();
  var iw2 = this.waitD() + (this._fmax - iw);
  this._wait = [15, iw2];
  this.opacity = 0;
  if (String(Moghunter.trpopup_Random) === "true") {
    var d = Math.randomInt(2);
    var sx = Math.random() * this.sxi() + this.sxi();
    this._sx = d === 0 ? sx : -sx;
    this._sy = -(Math.random() + this.syi());
  } else {
    this._sx = this.sxi();
    this._sy = -this.syi();
  }
};

//==============================
// * refresh Name
//==============================
TreasureIcons.prototype.refreshName = function () {
  this._name.bitmap.clear();
  var name = this._item
    ? this._item.name + " x " + this._amount
    : this._amount + " " + TextManager.currencyUnit;
  this._name.bitmap.drawText(name, 0, 0, 145, 32);
};

//==============================
// * Update Position
//==============================
TreasureIcons.prototype.updatePosition = function () {
  var name = this._item
    ? this._item.name + " x " + this._amount
    : this._amount + " " + TextManager.currencyUnit;
  var wd = this._name.bitmap.measureTextWidth(name);
  this.x =
    -this.screenX() +
    $gamePlayer.screenX() -
    (Window_Base._iconWidth + 12 + wd) / 2 +
    Moghunter.trpopup_X +
    this.screenX() +
    this._cx;
  this.y =
    -this.screenY() +
    $gamePlayer.screenY() -
    Window_Base._iconHeight +
    Moghunter.trpopup_Y +
    this.screenY() +
    this._cy;
  this.y -= this._fx * Moghunter.trpopup_ItemSpace;
};
