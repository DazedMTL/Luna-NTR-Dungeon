//=============================================================================
// Pon_VictoryMessage.js
//=============================================================================
/*:
 * @plugindesc 戦闘勝利時のMEとメッセージを省略します。
 * @author ぽんぽこねるそん
 
 * @help  <使い方>
 *
 *下記のプラグインコマンドで省略するかどうかを変更してください。
 *
 *
 *<プラグインコマンド>
 *VictoryMessageON
 *戦闘勝利時のメッセージを表示するようにします。
 *VictoryMessageOFF
 *戦闘勝利時のメッセージを表示しないようにします。
 *
 * @param Default Value
 * @type boolean
 * @on ON
 * @off OFF
 * @desc 戦闘勝利時のMEとメッセージの初期設定。 
 * ON - 省略しない     OFF - 省略する
 * @default true
 *
 * Var 1.00 19/05/02		作成
 */

var Pon_VictoryMessageDefaultValue = JSON.parse(
  PluginManager.parameters("Pon_VictoryMessage")["Default Value"]
);

(function () {
  //=============================================================================
  // プラグインコマンドの追加
  //=============================================================================
  var _Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === "VictoryMessageON") {
      $gameSystem._ShowVictoryMessage = true;
    }
    if (command === "VictoryMessageOFF") {
      $gameSystem._ShowVictoryMessage = false;
    }
  };
  //=============================================================================
  // 戦闘勝利メッセージ表示フラグの追加
  //=============================================================================
  var _pon_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    _pon_Game_System_initialize.call(this);
    this._ShowVictoryMessage = Pon_VictoryMessageDefaultValue;
  };
  //=============================================================================
  // 戦闘に勝利した時の処理
  //=============================================================================
  var _pon_BattleManager_processVictory = BattleManager.processVictory;
  BattleManager.processVictory = function () {
    if ($gameSystem._ShowVictoryMessage) {
      _pon_BattleManager_processVictory.call(this);
    } else {
      $gameParty.removeBattleStates();
      this.replayBgmAndBgs();
      this.makeRewards();
      this.gainRewards();
      this.endBattle(0);
    }
  };
  //=============================================================================
  // レベルアップメッセージを表示するか
  //=============================================================================
  var _pon_Game_Actor_shouldDisplayLevelUp =
    Game_Actor.prototype.shouldDisplayLevelUp;
  Game_Actor.prototype.shouldDisplayLevelUp = function () {
    return $gameParty.inBattle()
      ? $gameSystem._ShowVictoryMessage
      : _pon_Game_Actor_shouldDisplayLevelUp.call(this);
  };
})();
