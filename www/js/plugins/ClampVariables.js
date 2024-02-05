//===============================================
// ClampVariables.js
//===============================================

/*:ja
 * @plugindesc ゲーム内変数に上下限を設定するプラグインです。
 * @author 村人A
 * @target MV
 *
 * @help
 * ＊このプラグインはアップルソフト様専用に作られたプラグインです。
 * ＊その他の方の無断の使用を禁止します。
 *
 * _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
 *
 * バージョン情報
 *
 * 2022/11/13 ver 1.0リリース
 *
 * _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
 *
 * ===================================
 * ヘルプ
 * ===================================
 *
 * プラグインパラメータにて設定した変数が操作された際に設定した上下限を超えないよ
 * うにします。
 * 各パラメータに半角カンマを挟んで
 *
 * 変数のID,上限,下限
 *
 * と設定してください。
 * 変数のIDを-1とするとそのパラメータは無効となります。
 *
 *
 *
 * @param na1
 * @text 変数の上下限１
 * @desc 変数の上下限を設定します。変数ID,上限,下限で設定します。
 * @default -1,100,0
 *
 * @param na2
 * @text 変数の上下限２
 * @desc 変数の上下限を設定します。変数ID,上限,下限で設定します。
 * @default -1,100,0
 *
 * @param na3
 * @text 変数の上下限３
 * @desc 変数の上下限を設定します。変数ID,上限,下限で設定します。
 * @default -1,100,0
 *
 * @param na4
 * @text 変数の上下限４
 * @desc 変数の上下限を設定します。変数ID,上限,下限で設定します。
 * @default -1,100,0
 *
 * @param na5
 * @text 変数の上下限５
 * @desc 変数の上下限を設定します。変数ID,上限,下限で設定します。
 * @default -1,100,0
 *
 * @param na6
 * @text 変数の上下限６
 * @desc 変数の上下限を設定します。変数ID,上限,下限で設定します。
 * @default -1,100,0
 *
 * @param na7
 * @text 変数の上下限７
 * @desc 変数の上下限を設定します。変数ID,上限,下限で設定します。
 * @default -1,100,0
 *
 * @param na8
 * @text 変数の上下限８
 * @desc 変数の上下限を設定します。変数ID,上限,下限で設定します。
 * @default -1,100,0
 *
 * @param na9
 * @text 変数の上下限９
 * @desc 変数の上下限を設定します。変数ID,上限,下限で設定します。
 * @default -1,100,0
 *
 * @param na10
 * @text 変数の上下限１０
 * @desc 変数の上下限を設定します。変数ID,上限,下限で設定します。
 * @default -1,100,0
 *
 *
 *
 *
 *
 */
{
  ("use strict");

  String.prototype.toNumArray = function () {
    if (this == "") {
      return [];
    }
    return this.split(",").map((str) => Number(str));
  };

  const pluginName = "ClampVariables";
  const param = PluginManager.parameters(pluginName);
  const paramNum = 10;

  const convertObjectParam = (ob) => {
    Object.keys(ob).forEach((key) => {
      if (key[0] == "n" && key[1] == "a" && key[2] == "a") {
        ob[key] = JSON.parse(ob[key]).map((str) => str.toNumArray());
      } else if (key[0] == "o" && key[1] == "n" && key[2] == "a") {
        ob[key] = JSON.parse(ob[key]).map((str) => Number(str));
      } else if (key[0] == "n" && key[1] == "a") {
        ob[key] = ob[key].toNumArray();
      } else if (key[0] == "n") {
        ob[key] = Number(ob[key]);
      } else if (key[0] == "s" && key[1] == "a" && key[2] == "a") {
        ob[key] = JSON.parse(ob[key]).map((str) => str.split(","));
      } else if (key[0] == "s" && key[1] == "a") {
        ob[key] = JSON.parse(ob[key]);
      } else if (key[0] == "s") {
        ob[key] = ob[key];
      } else if (key[0] == "b") {
        ob[key] = JSON.parse(ob[key]);
      } else if (key[0] == "o" && key[1] == "b" && key[2] == "a") {
        ob[key] = convertObjectArrayParam(ob[key]);
      } else if (key[0] == "o" && key[1] == "b") {
        ob[key] = convertObjectParam(JSON.parse(ob[key]));
      }
    });
    return ob;
  };

  const convertObjectArrayParam = (object) => {
    let json = JSON.parse(object).map((str) => JSON.parse(str));
    json.map((ob) => convertObjectParam(ob));
    return json;
  };

  const _ = convertObjectParam(param);

  //-----------------------------------------------------------------------------
  // Game_Variables
  //

  const _alias_Game_Variables_setValue = Game_Variables.prototype.setValue;
  Game_Variables.prototype.setValue = function (variableId, value) {
    for (let i = 1; i <= paramNum; i++) {
      const arr = _["na" + i];
      if (arr[0] == variableId) {
        value = value.clamp(arr[2], arr[1]);
      }
    }
    _alias_Game_Variables_setValue.call(this, variableId, value);
  };
}
