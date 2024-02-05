//=============================================================================
// Trb_RestoreBattle.js
//=============================================================================
/*:
 * @plugindesc 戦闘状態の保存/復元プラグイン
 * @author Trb
 *
 * version 1.0 2017/1/14 公開
 *
 *
 * @help 戦闘の状態を保存し、保存した状態から戦闘を再開できるようにするプラグインです。
 * 保存と復元はプラグインコマンドで実行します。
 *
 * <プラグインコマンド>
 * SaveBattle ･･･ 直前の戦闘状態を保存します。
 * 基本的には、戦闘から逃げた時の分岐で実行して下さい。
 * また、複数の状態を保存したい場合は『SaveBattle 1』や『SaveBattle 2』のように数字を付けて下さい。
 *
 *
 * RestoreBattle ･･･ 戦闘イベントの直前にこのプラグインコマンドを挿入することで、
 * 上のコマンドで保存した戦闘状態を復元できます。
 * 複数保存してある場合は上と同様に『RestoreBattle 1』『RestoreBattle 2』のように復元するデータを指定して下さい。
 *
 *
 * なお、このプラグインのプラグインコマンドには大文字、小文字の区別はありません。
 * SAVEBATTLE や savebattle でも実行できます。
 * また、試作バージョンとして公開していたものから一部仕様を変更したため、
 * 試作バージョンで保存された戦闘状態との互換性がありません。
 * もし試作バージョンを使ってセーブしたセーブデータを使いたい場合
 * スクリプトで『 $gameSystem._battleSaveData = [] 』と実行することで
 * 保存された戦闘状態を初期化できます。
 *
 */
(function () {
  "use strict";

  //プラグインコマンドの定義
  var _Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.apply(this, arguments);
    var c = command.toUpperCase(); //toUpperCase()を使うと小文字を大文字に変換できる
    switch (c) {
      case "SAVEBATTLE":
        saveBattle(args[0]);
        break;
      case "RESTOREBATTLE":
        restoreBattle(args[0]);
        break;
      default:
    }
  };

  //戦闘状態の保存
  var saveBattle = function (index) {
    if (!$gameSystem._battleSaveData) {
      //$gameSystemに保存用の配列を用意する
      $gameSystem._battleSaveData = [];
    }
    var enemies = $gameTroop._enemies.clone(); //clone()を使うとオブジェクトをコピーできる
    $gameSystem._battleSaveData[index || 1] = enemies;
  };

  var _restoreBattleIndex = 0;
  //保存された戦闘状態の呼び出し準備
  var restoreBattle = function (index) {
    _restoreBattleIndex = index || 1;
  };

  var _Game_Troop_setup = Game_Troop.prototype.setup;
  Game_Troop.prototype.setup = function (troopId) {
    if (_restoreBattleIndex && $gameSystem._battleSaveData) {
      var enemies = $gameSystem._battleSaveData[_restoreBattleIndex];
      _restoreBattleIndex = 0;
      if (enemies) {
        this.clear();
        this._troopId = troopId;
        this._enemies = enemies; //通常はここで敵グループに設定されたエネミーが設定されるが、SaveBattleで保存したエネミーに置き換える
        this.makeUniqueNames();
        return;
      }
    }
    _Game_Troop_setup.apply(this, arguments);
  };
})();
