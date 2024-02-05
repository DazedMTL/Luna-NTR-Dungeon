//============================================
// MapStartCommon.js
//============================================

/*:ja
 * @plugindesc マップ開始時に指定したコモンイベントを実行するプラグインです。
 * @author 村人A
 *
 * @help
 * _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
 *
 * バージョン情報
 *
 * 19/5/31 バージョン1.0 リリース
 *
 *
 * _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
 *
 * ヘルプ
 *
 * このプラグインには設定が必要なプラグインパラメータはございません。
 * イベントコマンドで行うプラグインパラメータのみございます。
 *
 * マップ画面開始時に実行するコモンイベントのIDを追加するには
 *
 * マップ開始時コモンの追加 コモンイベントID
 *
 * と記述します。例えばコモンイベント１をマップ開始時に実行したい場合は
 *
 * マップ開始時コモンの追加 1
 *
 * と記述します。
 * IDは半角数字で記述して下さい。
 * また、実行するコモンイベントを削除したい場合は
 *
 * マップ開始時コモンの削除 コモンイベントID
 *
 * と記述して下さい。
 * 全てのマップ開始時コモンイベントを削除する場合は
 *
 * マップ開始時コモンの全削除
 *
 * とだけ記述して下さい。
 *
 */

(function () {
  "use strict";

  const _alias_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === "マップ開始時コモンの追加") {
      const id = Number(args[0]);
      if (id.isNaN) {
        throw new Error("コモンIDは半角数字で記述して下さい。");
      }
      $gameSystem.reservedMapStartCommonIdArray.push(id);
    }
    if (command === "マップ開始時コモンの削除") {
      const id = Number(args[0]);
      if (id.isNaN) {
        throw new Error("コモンIDは半角数字で記述して下さい。");
      }
      const index = $gameSystem.reservedMapStartCommonIdArray.indexOf(id);
      if (index < 0) {
        console.log("指定したIDのコモンイベントは実行一覧にありません。");
      }
      $gameSystem.reservedMapStartCommonIdArray.splice(index, 1);
    }
    if (command === "マップ開始時コモンの全削除") {
      $gameSystem.reservedMapStartCommonIdArray = [];
    }
  };

  const _alias_Game_Map_setupStartingEvent =
    Game_Map.prototype.setupStartingEvent;
  Game_Map.prototype.setupStartingEvent = function () {
    this.refreshIfNeeded();
    if (this._interpreter.setupReservedMapStartCommonEvent()) {
      return true;
    }
    return _alias_Game_Map_setupStartingEvent.call(this);
  };

  Game_Interpreter.prototype.setupReservedMapStartCommonEvent = function () {
    if ($gameSystem.mapStartCommonIdArray.length > 0) {
      let allList = [];
      for (
        let i = 0, n = $gameSystem.mapStartCommonIdArray.length;
        i < n;
        i++
      ) {
        const id = $gameSystem.mapStartCommonIdArray[i];
        let commonEventList = $dataCommonEvents[id].list.concat();
        if (i != n - 1) {
          commonEventList.pop();
        }
        allList = allList.concat(commonEventList);
      }
      this.setup(allList);
      $gameSystem.mapStartCommonIdArray = [];
      return true;
    } else {
      return false;
    }
  };

  const _alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    _alias_Game_System_initialize.call(this);
    this.mapStartCommonIdArray = [];
    this.reservedMapStartCommonIdArray = [];
  };

  const _alias_Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function () {
    _alias_Scene_Map_start.call(this);
    $gameSystem.mapStartCommonIdArray =
      $gameSystem.reservedMapStartCommonIdArray.concat();
  };
})();
