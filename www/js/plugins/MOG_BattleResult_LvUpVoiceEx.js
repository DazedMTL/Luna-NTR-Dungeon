//=============================================================================
// MOG_BattleResult_LvUpVoiceEx.js
// ----------------------------------------------------------------------------
// by ecf5DTTzl6h6lJj02
// 2019/11/03
// ----------------------------------------------------------------------------
// (C)2019 ecf5DTTzl6h6lJj02
//	This software is released under the MIT lisence.
//	http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc MOG_BattleResult拡張用(レベルアップ時音声再生)。詳しくはヘルプをどうぞ。
 * @author ecf5DTTzl6h6lJj02
 *
 * @param DefaultVoice
 * @type string
 * @desc アクターに個別設定されていない場合に再生するファイル名
 * 初期値: なし
 * @default
 *
 * @help
 * Moghunter様のプラグイン "MOG_BattleResult" で、レベルアップ時に、
 * トリアコンタン様のプラグイン "SimpleVoice" を使用して、
 * 音声を再生するためのプラグインです。
 * このプラグインは、"SimpleVoice", "MOG_BattleResult"
 * よりも下に配置してください。
 * "SimpleVoice"よりも下に、"MOG_BattleResult"、
 * "MOG_BattleResult"の直下にこのプラグインがあるのが理想です。
 * 音声ファイルは、"SimpleVoice" プラグインで設定したフォルダの中から探されます。
 *
 * プラグインコマンドはありません。
 *
 * ■プラグインパラメータ 『DefaultVoice』 について
 * アクターに個別で再生音声が設定されていない時の、
 * 標準の再生ファイルを設定します。
 * 複数設定することができます。
 * カンマ区切りにて、ファイル名(拡張子不要)を記入してください。
 * 複数設定時は、記載されたファイルの中からランダムで再生されます。
 * この設定が不要の場合は、空欄に設定してください。
 *
 * 記載例)
 * aaa,bbb,ccc,ddd
 * SimpleVoice で設定したフォルダの中にある aaa, bbb, ccc, ddd の中から
 * いずれかを選び再生します。
 *
 * ■アクター個別に再生音声を設定する方法
 * アクターのメモ欄に
 * <レベルアップ音声:FileName1[,FileName2,FileName3,...]>
 * もしくは、
 * <LevelUpVoice:FileName1[,FileName2,FileName3,...]>
 * と記入することで、アクターに個別に再生する音声を設定できます。
 * FileNameは再生する音声ファイル名(拡張子不要)です、複数設定できます。
 * [ ]で囲われた部分は省略可能であることを表しています。
 * 複数設定時は、記載されたファイルの中から、ランダムで再生されます。
 * もし、このアクターは音声を再生しないという場合は、
 * <レベルアップ音声:> もしくは <LevelUpVoice:>
 * と入力してください。
 *
 * 記載例)
 * <レベルアップ音声:aaa,bbb,ccc>
 * メモ欄に上記タグを記入したアクターは、
 * SimpleVoiceで設定したフォルダの中にある、aaa, bbb, ccc の中から
 * いずれかを選び再生します。
 *
 * ■ 利用規約
 * 作者に無断での改変、再配布可能。 商用、１８禁への利用OKです。
 * 但し素材単体の販売は禁止とさせて頂きます。
 * また、このプラグインを使用して不利益等が生じた場合の保証はいたしかねますので、
 * ご了承ください。
 */

(function () {
  //プラグインパラメータから、アクターに個別設定されていない時の再生ファイル名を取得
  var defaultVoice = PluginManager.parameters("MOG_BattleResult_LvUpVoiceEx")[
    "DefaultVoice"
  ];
  var isSimpleVoiceExsist = $plugins.some(function (value, index, array) {
    return value.name === "SimpleVoice" && value.status === true;
  });

  //==============================
  // * Play Voice
  //==============================
  //==============================
  // * 音声再生【再定義】
  //
  //==============================
  BattleResult.prototype.playVoice = function () {
    if (!isSimpleVoiceExsist) return;
    var actorData = this._actor.actor();
    var metaData =
      actorData.meta["LevelUpVoice"] ||
      actorData.meta["レベルアップ音声"] ||
      defaultVoice ||
      null;
    if (metaData === null) return;
    var voices = metaData.split(",");
    voices.forEach(function (value, index, array) {
      array[index] = value.trim();
    });
    var voice = {};
    var length = voices.length;
    index = Math.floor(Math.random() * length);
    voice.name = voices[index];
    voice.volume = 90;
    voice.pitch = 100;
    voice.pan = 0;
    AudioManager.playVoice(voice, false, undefined);
  };
})();
