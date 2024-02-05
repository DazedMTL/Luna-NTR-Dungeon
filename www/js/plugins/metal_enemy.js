/*:
* @plugindesc メタル系の敵を設定
* @author SQUARE PHOENIX

* @param metal_enemy_id
* @text メタル系の敵のID
* @type enemy[]
* @desc 与えられるダメージを１にしたい敵のIDを設定します。

* @param metal_critical
* @text クリティカル時の動作
* @type boolean
* @desc クリティカル時もダメージを１にする。(初期値: NO)
* @on YES
* @off NO
* @default false


* @help
* パラメーターで設定したIDの敵は、メタル系の敵になります。
* メタル系の敵に与えられるダメージは最大１になりますが、クリティカルは例外で
* 大きなダメージを与えられます。
* 
* ※プラグインパラメータでクリティカルでもダメージを１にできるようにしました。
* by ecf5DTTzl6h6lJj02 01/05/22

* パラメーターの「テキストのリスト」タブで、複数の敵のIDを設定できます。
* １行に一つのIDを設定します。
*「テキスト」タブを利用する場合は、["2","3"]のように設定していきます。

* RPGツクールMVで使用する場合は、ご自由にお使いいただけます。
* 自己責任でお使いください。
* [SQUARE PHOENIX] : http://enix.web.fc2.com/
 */

(function () {
  "use strict";

  /**
   * Create plugin parameter. param[paramName] ex. param.commandPrefix
   * @param pluginName plugin name(EncounterSwitchConditions)
   * @returns {Object} Created parameter
   */
  var createPluginParameter = function (pluginName) {
    var paramReplacer = function (key, value) {
      if (value === "null") {
        return value;
      }
      if (value[0] === '"' && value[value.length - 1] === '"') {
        return value;
      }
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    };
    var parameter = JSON.parse(
      JSON.stringify(PluginManager.parameters(pluginName), paramReplacer)
    );
    PluginManager.setParameters(pluginName, parameter);
    return parameter;
  };
  var param = createPluginParameter("metal_enemy");

  //=============================================================================
  // メタル系の敵のダメージを１にする。　クリティカル時は大ダメージ。
  //=============================================================================
  Game_Action.prototype.makeDamageValue = function (target, critical) {
    var item = this.item();
    var baseValue = this.evalDamageFormula(target);
    var value = baseValue * this.calcElementRate(target);
    if (this.isPhysical()) {
      value *= target.pdr;
    }
    if (this.isMagical()) {
      value *= target.mdr;
    }
    if (baseValue < 0) {
      value *= target.rec;
    }
    if (critical) {
      value = this.applyCritical(value);
    }
    value = this.applyVariance(value, item.damage.variance);
    value = this.applyGuard(value, target);
    value = Math.round(value);

    if (param.metal_enemy_id.indexOf(target._enemyId) != -1) {
      if (value > 1) {
        if (param.metal_critical || critical == false) {
          value = 1;
        }
      }
    }
    return value;
  };
})();
