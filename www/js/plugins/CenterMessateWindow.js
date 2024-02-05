//============================================
// CenterMessateWindow.js
//============================================

/*:ja
 * @plugindesc マップと戦闘時の任意のタイミングで中央にメッセージの入ったウィンドウを表示するプラグインです。
 * @author 村人A
 *
 * @help
 * _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
 *
 * バージョン情報
 *
 * 2019/1/4 1.00リリース
 *
 * _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
 *
 */
(function () {
  "use strict";

  const _alias_cmw_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _alias_cmw_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === "中央ウィンドウ表示") {
      SceneManager._scene._centermessageWindow.startMessage(args[0]);
    }
  };

  const _alias_cmw_Game_Interpreter_updateWaitMode =
    Game_Interpreter.prototype.updateWaitMode;
  Game_Interpreter.prototype.updateWaitMode = function () {
    let waiting = _alias_cmw_Game_Interpreter_updateWaitMode.call(this);
    if (!waiting) {
      waiting = $gameSystem.isRunningCenterMessage;
    }
    return waiting;
  };

  Scene_Base.prototype.createCenterMessageWindow = function () {
    this._centermessageWindow = new Window_CenterMessage();
    this.addChild(this._centermessageWindow);
  };

  const _alias_cmw_Scene_Map_createAllWindows =
    Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function () {
    _alias_cmw_Scene_Map_createAllWindows.call(this);
    this.createCenterMessageWindow();
  };

  const _alias_cmw_Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    _alias_cmw_Scene_Map_update.call(this);
    this._centermessageWindow.update();
  };

  const _alias_cmw_Scene_Battle_createAllWindows =
    Scene_Battle.prototype.createAllWindows;
  Scene_Battle.prototype.createAllWindows = function () {
    _alias_cmw_Scene_Battle_createAllWindows.call(this);
    this.createCenterMessageWindow();
  };

  const _alias_cmw_Scene_Battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function () {
    _alias_cmw_Scene_Battle_update.call(this);
    this._centermessageWindow.update();
  };

  //-----------------------------------------------------------------------------
  // Window_CenterMessage
  //

  function Window_CenterMessage() {
    this.initialize.apply(this, arguments);
  }

  Window_CenterMessage.prototype = Object.create(Window_Base.prototype);
  Window_CenterMessage.prototype.constructor = Window_CenterMessage;

  Window_CenterMessage.prototype.initialize = function () {
    Window_Base.prototype.initialize.call(
      this,
      0,
      0,
      Graphics.width,
      Graphics.height
    );
    this.openness = 0;
  };

  Window_CenterMessage.prototype.isTriggered = function () {
    return (
      Input.isRepeated("ok") ||
      Input.isRepeated("cancel") ||
      TouchInput.isRepeated()
    );
  };

  Window_CenterMessage.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if (this.isOpen() && this.isTriggered()) {
      this.close();
    }
  };

  Window_CenterMessage.prototype.updateClose = function () {
    if (this._closing) {
      this.openness -= 32;
      if (this.isClosed()) {
        this._closing = false;
        $gameSystem.isRunningCenterMessage = false;
      }
    }
  };

  Window_CenterMessage.prototype.startMessage = function (text) {
    this._text = text;
    const w = this.textWidth(text);
    this.width = w + this.standardPadding() * 2;
    this.height = this.lineHeight() + this.standardPadding() * 2;
    this.x = (Graphics.width - this.width) / 2;
    this.y = (Graphics.height - this.height) / 2;
    this.contents.clear();
    this.drawTextEx(text, 0, 0);
    this.open();
    $gameSystem.isRunningCenterMessage = true;
  };

  const _alias_cmw_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    _alias_cmw_Game_System_initialize.call(this);
    this.isRunningCenterMessage = false;
  };

  const _alias_cmw_Game_Map_isEventRunning = Game_Map.prototype.isEventRunning;
  Game_Map.prototype.isEventRunning = function () {
    return (
      _alias_cmw_Game_Map_isEventRunning.call(this) ||
      $gameSystem.isRunningCenterMessage
    );
  };
})();
