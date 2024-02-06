/*:ja
 * @plugindesc オリジナルの戦闘・メニューシステムプラグインです。
 * @author 村人A
 *
 * @help
 *
 * ＊このプラグインはアップルソフト様専用に作られたプラグインです。
 * ＊その他の方の無断の使用を禁止します。
 *
 * _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
 *
 * バージョン情報
 *
 * 2023/10/28 ver 1.73リリース
 * 2023/08/28 ver 1.721リリース
 * 2023/08/21 ver 1.72リリース
 * 2023/07/14 ver 1.71リリース
 * 2023/03/03 ver 1.7リリース
 * 2023/02/22 ver 1.69リリース
 * 2023/02/09 ver 1.68リリース  コンソール削除
 * 2023/02/03 ver 1.67リリース
 * 2023/01/19 ver 1.65リリース
 * 2023/01/03 ver 1.61リリース
 * 2022/11/13 ver 1.6リリース
 *
 * _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
 *
 * =============================
 * 22/22/13 追記
 *
 *
 * ・拘束中のアニメーションについて
 * 拘束中にアニメーションをつける箇所については拘束スキルが発生した際に「アニメーション開始時コモンイベントID」にて指定したコモンイベントが実行されます。
 * そのコモンイベント中で現在拘束している敵IDと拘束種類の番号で条件分岐に敵毎、拘束種類ごとのアニメーションを設定してください。
 * 敵IDはパラメータ「ピストンアニメーション敵ID」にて指定した変数に代入され、拘束種類はパラメータ「ピストンアニメーション拘束種類番号ID」にて指定した変数に代入されます。
 *
 *
 * ・新ステート「ダウン」
 * プラグインパラメータ「ダウンステートID 」を追加しました。
 * ダウン中はこのパラメータで指定したステートが付与され、ダウン中と判定されます。
 *
 * ダウン中の立ち絵は
 *
 * standPicture/キャラクター/nomal/
 *
 * フォルダの
 *
 * fullArmor_down_base.png
 * breakArmor_down_base.png
 * noArmor_down_base.png
 * downOnState.png
 *
 * という名前の画像が使用されます。
 * それぞれキャラクターごとに必要な分をご用意ください。
 * サンプルプロジェクトにご用意いただいた画像にてサンプルをご用意しておりますのでご参照ください。
 *
 *
 * ・「そのままスキルID」「立ち上がるスキルID」について
 * ダウン中にはアクターコマンドは「そのまま」か「立ち上がる」コマンドのみとなりますが、このコマンドを実行した際にプラグインパラメータで指定したスキルが実行されます。
 * そのままはパラメータ「そのままスキルID」、立ち上がるは「立ち上がるスキルID」にて指定します。
 * そのままの際のHP・MP回復等はそれぞれのスキルの効果にて設定してください。
 *
 *
 * ・拘束進行スキルについて
 * 機能追加に際して拘束進行スキルメモ欄にも
 *
 * <矢印数:4>
 * <制限時間:300>
 *
 * のメモを設定するようにしました。
 *
 *
 * ・アニメーション開始時コモンイベントについて
 * ピストン攻撃を受けた際にピストンのアニメーション開始コモンイベントを実装するようにしました。
 * このコモンイベントのIDは新たに追加したプラグインパラメータ「アニメーション開始時コモンイベントID」にて指定されます。
 * アニメーション終了時に元の立ち絵を表示するために射精イベントの最終段階の条件分岐の最初にピクチャアニメーションを終了するコマンドを実行してください。サンプルプロジェクトではコモンイベント５５が当該します。
 *
 *
 * ・アニメーション終了コモンについて
 * アニメ－ションを実行した後にさらに拘束が進んだ際にコモンイベントとして「射精イベント」が実行されますが、そのコモンイベント中に「アニメーション終了コモン」を実行してください。
 * そのままだとピクチャアニメーションが消去されないためです。
 * サンプルプロジェクトではコモンイベント５５が該当します。
 *
 *
 *
 *
 *
 * @param --以下大きさ・位置の指定--
 * @desc
 *
 * @param 立ち絵のサイズ
 * @desc 立ち絵に使用している画像のサイズを指定します。幅,高さ で指定してください。
 * @default 500,700
 *
 * @param キャラクター１の立ち絵位置
 * @desc パーティーメンバー１番目のアクターの立ち絵の位置をカンマを挟んでx座標,y座標で指定します。数値は半角で記述するようにしてください。
 * @default -200,50
 *
 * @param キャラクター２の立ち絵位置
 * @desc パーティーメンバー２番目のアクターの立ち絵の位置をカンマを挟んでx座標,y座標で指定します。数値は半角で記述するようにしてください。
 * @default 0,50
 *
 * @param キャラクターが一人の時の戦闘立ち絵位置
 * @desc パーティーメンバーが一人の時のアクターの戦闘時の立ち絵の位置をカンマを挟んでx座標,y座標で指定します。数値は半角で記述するようにしてください。
 * @default 0,0
 *
 * @param キャラクターが一人の時のメニュー立ち絵位置
 * @desc パーティーメンバーが一人の時のアクターのメニューの立ち絵の位置をカンマを挟んでx座標,y座標で指定します。数値は半角で記述するようにしてください。
 * @default 0,0
 *
 * @param キャラクターが一人の時のメニューのステータスx座標
 * @desc パーティーメンバーが一人の時のアクターのメニューステータスのx座標を指定します。数値は半角で記述するようにしてください。
 * @default 0
 * @type Number
 *
 * @param 拘束回避タッチパッドの位置
 * @desc 拘束回避に使用するタッチパッドの座標を指定します。x座標,y座標,と指定してください。
 * @default 1000,200
 *
 * @param 拘束回避矢印背景の位置
 * @desc 拘束スキル発生時に表示する矢印の背景座標を指定します。x座標,y座標,と指定してください。
 * @default 400,250
 *
 * @param 拘束回避矢印の１つ目の位置と間隔
 * @desc 拘束スキル発生時に表示する矢印の１つめの座標と隣との間隔を指定します。x座標,y座標,間隔と指定してください。
 * @default 500,300,100
 *
 * @param 拘束回避ゲージ背景の位置
 * @desc 拘束スキル発生時に表示するゲージの背景座標を指定します。x座標,y座標と指定してください。
 * @default 400,395
 *
 * @param 拘束回避時に表示するゲージの位置・大きさの設定
 * @desc 拘束回避時に表示するゲージのx座標,y座標,幅,高さを指定してください。
 * @default 420,400,515,12
 *
 * @param アクターステータスウィンドウ調節位置
 * @desc アクターコマンドウィンドウの位置を調節するのに使います。カンマ,を挟んでx座標,y座標の順に記述します。
 * @default 0,0
 *
 * @param パーティーウィンドウの大きさと位置
 * @desc パーティーウィンドウのx座標と幅の大きさを指定します。カンマを挟み　x座標,幅　で指定してください。
 * @default 0,192
 * @type Number
 *
 * @param アクターウィンドウの大きさと位置
 * @desc アクターウィンドウのx座標と幅の大きさを指定します。カンマを挟み　x座標,幅　で指定してください。
 * @default 0,192
 * @type Number
 *
 * @param キャラクター１のアニメーションを表示する位置の調節
 * @desc キャラクター1の立ち絵の前面に表示するアニメーションの位置の調節をx,y方向で記述してください。
 * @default 0,0
 *
 * @param キャラクター２のアニメーションを表示する位置の調節
 * @desc キャラクター２の立ち絵の前面に表示するアニメーションの位置の調節をx,y方向で記述してください。
 * @default 0,0
 *
 * @param メニューのステータスアイコンの左端からの位置
 * @desc 毒などのステータスアイコンの名前左端からの位置を指定します。
 * @default 120
 * @type Number
 *
 * @param メニューキャラクター１立ち絵位置
 * @desc メニュー画面においてキャラクター１の立ち絵を表示する位置をカンマを挟みx座標,y座標で指定します。数値は半角で記述するようにしてください。
 * @default 0,0
 *
 * @param メニューキャラクター２立ち絵位置
 * @desc メニュー画面においてキャラクター２の立ち絵を表示する位置をカンマを挟みx座標,y座標で指定します。数値は半角で記述するようにしてください。
 * @default 500,0
 *
 * @param ---以下スキルIDの指定---
 * @desc
 *
 * @param 様子を見るスキルのID
 * @desc 何もしない「様子を見る」スキルのＩＤを記述します。拘束スキル不発時などに使用されます。
 * @default 7
 * @type skill
 *
 * @param 拘束進行スキルID
 * @desc 敵が使用する拘束進行スキルのIDを指定します。
 * @default 12
 * @type skill
 *
 * @param もがくスキルID
 * @desc もがくに使用するスキルのIDを指定します。
 * @default 14
 * @type skill
 *
 * @param 拘束2段階時特定スキルID
 * @desc 拘束が2段階になった際に敵が使ってくるスキル（ピストン）のスキルIDを指定します。
 * @default 16
 * @type skill
 *
 * @param そのままスキルID
 * @desc もがくに使用するスキルのIDを指定します。
 * @default 382
 * @type skill
 *
 * @param 立ち上がるスキルID
 * @desc もがくに使用するスキルのIDを指定します。
 * @default 383
 * @type skill
 *
 * @param ---以下ステートIDの指定---
 * @desc
 *
 * @param もがくステートID
 * @desc 拘束への抵抗が失敗した場合にメッセージを表示するためにもがくに当てたステートのＩＤをこちらに記述してください。
 * @default 21
 * @type state
 *
 * @param 特定ステートID
 * @desc 立ち絵を変化させる特定ステートのidを記述します。
 * @default 12
 * @type state
 *
 * @param 拘束ステートID
 * @desc 拘束に使用するステートのidを１段階目から左から順にカンマを挟んで指定します。
 * @default 13,14,15,16
 *
 * @param 処女ステートID
 * @desc 処女状態に使用するステートのIDを指定します。
 * @default 22
 * @type state
 *
 * @param 敵拘束中ステートID
 * @desc 拘束攻撃中の敵に表示するステートのIDを指定します。
 * @default 24
 * @type state
 *
 * @param ダウンステートID
 * @desc ダウン中を表すステートのIDを指定します。
 * @default 20
 * @type state
 *
 * @param ---以下スイッチIDの指定---
 * @desc
 *
 * @param 敗北イベントをＯＮにするスイッチＩＤ
 * @desc 戦闘敗北時レイプをＯＮにするスイッチＩＤを指定します。
 * @default 20
 * @type switch
 *
 * @param 戦闘終了スイッチＩＤ
 * @desc 戦闘を終了するか敗北演出をするかを判断するスイッチのＩＤを指定します。貨
 * @default 19
 * @type switch
 *
 * @param ---以下変数IDの指定---
 * @desc
 *
 * @param キャラクターに適用する特定変数ID
 * @desc キャラクターの立ち絵の表情変更に関与する変数のidをパーティーメンバー１,パーティメンバー２…というように順に指定してください。
 * @default 10,11
 * @type variable
 *
 * @param キャラクターの特定回数に適用する特定変数ID
 * @desc キャラクターステータス一番下部に表示する変数のidをパーティーメンバー１,パーティメンバー２…というように順に指定してください。
 * @default 15,16
 * @type variable
 *
 * @param ToDo変数ＩＤ
 * @desc ToDoウィンドウの表示内容を決める変数のＩＤを指定します。
 * @default 5
 * @type variable
 *
 * @param ピストンアニメーション敵ID
 * @desc ピストンアニメーションする敵のIDを代入する変数のID指定します。コモンイベントの条件分岐にご使用ください。
 * @default 56
 * @type variable
 *
 * @param ピストンアニメーション拘束種類番号ID
 * @desc ピストンアニメーションの拘束種類番号を代入する変数のID指定します。コモンイベントの条件分岐にご使用ください。
 * @default 57
 * @type variable
 *
 * @param ---以下コモンイベントIDの指定---
 * @desc
 *
 * @param アニメーション開始時コモンイベントID
 * @desc 拘束時に特定攻撃を受けた際にピクチャをアニメーションさせるコマンドを実行するコモンイベントのIDを指定します。
 * @default 54
 * @type common_event
 *
 * @param アニメーション終了時コモンイベントID
 * @desc 拘束時のアニメーションを終了させるコマンドを実行するコモンイベントのIDを指定します。
 * @default 55
 * @type common_event
 *
 * @param キャラクター1の拘束2段階目に実行するコモンイベントID
 * @desc キャラクター1が拘束2段階目になった際に実行するコモンイベントのIDを指定します。
 * @default 20
 * @type common_event
 *
 * @param キャラクター2の拘束2段階目に実行するコモンイベントID
 * @desc キャラクター2が拘束2段階目になった際に実行するコモンイベントのIDを指定します。
 * @default 21
 * @type common_event
 *
 * @param 射精前コモンイベントID
 * @desc 射精前に実行するコモンイベントのIDを指定します。
 * @default 1
 * @type common_event
 *
 * @param キャラクターの鎧破壊時コモンイベントID
 * @desc キャラクターの鎧が破壊された時に実行するコモンイベントのＩＤをパーティーメンバー１,パーティメンバー２…というように順に指定してください。
 * @default 3,4
 * @type common_event
 *
 * @param キャラクターの処女喪失時コモンイベントID
 * @desc キャラクターの処女が失われた際に実行するコモンイベントのIDを指定してください。
 * @default 5
 * @type common_event
 *
 * @param 敗北イベント開始時のコモンイベントID
 * @desc 敗北後最初にイベントを実行するかどうかを決めるコモンイベントのIDを指定します。
 * @default 17
 * @type common_event
 *
 * @param 敗北ループイベントのコモンイベントID
 * @desc 敗北後に繰り返し実行するコモンイベントのIDを指定します。
 * @default 18
 * @type common_event
 *
 * @param 敗北ループイベント終了のコモンイベントID
 * @desc 敗北後に繰り返し実行するコモンイベントのIDを指定します。
 * @default 21
 * @type common_event
 *
 * @param ---以下SEの指定---
 * @desc
 *
 * @param 拘束回避時の矢印入力SE
 * @desc 拘束回避時の矢印を入力したい際に鳴らすSEを指定します。名前,音量,ピッチ,位相で指定します。
 * @default Blow3,100,100,0
 *
 * @param 拘束回避時の矢印入力成功時SE
 * @desc 拘束回避時の矢印入力が成功した際のSEを指定します。名前,音量,ピッチ,位相で指定します。
 * @default Item3,100,100,0
 *
 * @param 拘束回避時の矢印入力失敗時SE
 * @desc 拘束回避時の矢印入力が失敗した際のSEを指定します。名前,音量,ピッチ,位相で指定します。
 * @default Buzzer2,100,100,0
 *
 * @param ---以下表記の指定---
 * @desc
 *
 * @param 処女喪失時メッセージ
 * @desc 処女喪失時にアクターの名前の後に表示するメッセージを記述します。
 * @default は処女を失った！
 *
 * @param 抵抗失敗時メッセージ
 * @desc 抵抗に失敗した場合に表示するメッセージを記述します。
 * @default は抵抗に失敗した！
 *
 * @param 抵抗表記
 * @desc 抵抗に使用するスキルタイプの名前を記述します。
 * @default もがく
 *
 * @param AP表記
 * @desc ゲージの横に表示するAPの表記を指定します。
 * @default AP
 *
 * @param 特定変数表記１
 * @desc キャラクターに適用する特定変数をステータスで表示する際の項目名を記述します。
 * @default 特変１
 *
 * @param 特定変数表記２
 * @desc キャラクターの特定回数に適用する特定変数をステータスで表示する際の項目名を記述します。
 * @default 特変２
 *
 * @param 身体の装備を外せない際のメッセージ
 * @desc 特定変数が一定値以上でない場合に身体装備を外そうとした際に表示するメッセージの内容を記述します。
 * @default 現在の変数（80未満）では装備を外せません。
 *
 * @param 敗北後拘束１のバトルログメッセージ
 * @desc 敗北後イベントの拘束状態の際にアクターの名前の後に続くメッセージ。
 * @default \Aは\Eに挿入体勢に固定された
 *
 * @param 敗北後拘束２のバトルログメッセージ
 * @desc 敗北後イベントの拘束状態の際にアクターの名前の後に続くメッセージ。
 * @default \Aは\Eに膣へ一気に挿入されてしまった
 *
 * @param 敗北後拘束３のバトルログメッセージ
 * @desc 敗北後イベントの拘束状態の際にアクターの名前の後に続くメッセージ。
 * @default \Eは\Aを貪るように激しいピストンで犯されている
 *
 * @param 敗北後拘束４のバトルログメッセージ
 * @desc 敗北後イベントの拘束状態の際にアクターの名前の後に続くメッセージ。
 * @default \Eは\Aの子宮へ大量の精液を注ぎ込んだ
 *
 * @param ---以下拘束に関するその他の指定---
 * @desc
 *
 * @param 鎧破壊時と裸時の拘束攻撃のレーティング
 * @desc 鎧破壊時と裸の際に拘束攻撃のレーティングを指定します。鎧破壊時,裸時で指定してください。
 * @default 8,10
 *
 * @param 拘束１段階時の次の段階に進むターン数
 * @desc 拘束１段階時に次の段階に進むターン数をカンマ,を挟んで下限、上限を指定します。
 * @default 2,4
 *
 * @param 拘束２段階時の次の段階に進むターン数
 * @desc 拘束２段階時に次の段階に進むターン数をカンマ,を挟んで下限、上限を指定します。
 * @default 3,5
 *
 * @param 拘束１段階時の次の段階に進む確率
 * @desc 拘束１段階時に上限ターン数でない時に次の段階に進む確率を指定します。
 * @default 50
 * @type Number
 *
 * @param 拘束２段階時の次の段階に進む確率
 * @desc 拘束２段階時に上限ターン数でない時に次の段階に進む確率を指定します。
 * @default 50
 * @type Number
 *
 * @param 拘束２段階時の特定スキルが発生する確率
 * @desc 拘束２段階時に特定スキル（ピストン）が発生する確率を指定します。次の段階に進むかどうかを決めた後で計算されます。
 * @default 80
 * @type Number
 *
 * @param 拘束回避矢印の最大数
 * @desc 拘束スキル発生時に表示する矢印のゲーム中で最大の数を設定します。
 * @default 4
 * @type Number
 *
 * @param 拘束回避時に表示するゲージの色の設定
 * @desc 拘束回避時に表示するゲージの色をhtmlの色指定フォーマットで指定してください。
 * @default ffffff
 *
 * @param 拘束回避入力時間短縮割合
 * @desc アクターの特定変数が一定値よりも大きい場合、拘束回避時の矢印入力の時間が短縮される割合を百分率で指定します。
 * @default 50
 * @type Number
 *
 * @param ---以下立ち絵に関するその他の指定---
 * @desc
 *
 * @param 立ち絵変更特定変数割合
 * @desc 立ち絵を特定の変数によって変更する場合の割合を高い順から記述します。
 * @default 100-70,69-50,49-0
 *
 * @param 立ち絵変更特定変数最大値
 * @desc 立ち絵を変更する特定の変数の最大値を指定します。
 * @default 100
 * @type Number
 *
 * @param 立ち絵変更ＨＰ割合
 * @desc 立ち絵をＨＰによって変更する場合の割合を高い順から記述します。
 * @default 100-60,59-30,29-0
 *
 * @param ---以下その他の指定---
 * @desc
 *
 * @param 鎧に該当する装備タイプＩＤ
 * @desc 体につけるタイプの装備の装備タイプＩＤを指定します。デフォルトで４となります。
 * @default 3
 * @type Number
 *
 * @param APゲージの色
 * @desc APに使用するゲージの色を16進数記法指定します。カンマを挟んで１番目が左側の濃い色、２番目が右側の薄い色となります。
 * @default #ea7da9,#f97ea0
 *
 */

(function () {
  "use strict";

  String.prototype.toConvertNumberArray = function () {
    return this.split(",").map(function (str) {
      return Number(str);
    });
  };

  String.prototype.toConvertAudio = function () {
    const obj = {};
    const arr = ["name", "volume", "pitch", "pan"];
    this.split(",").forEach(function (str, ind) {
      obj[arr[ind]] = ind == 0 ? str : Number(str);
    });
    return obj;
  };

  //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
  //
  //  プラグインパラメータ設定
  //
  //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

  let parameters = PluginManager.parameters("OriginalBattleSystemAndMenu");
  const _OBS_APNotation = parameters["AP表記"];
  const _OBS_APGaugeColors = parameters["APゲージの色"];
  const _OBS_Chara1BattleStandPictureSize =
    parameters["立ち絵のサイズ"].toConvertNumberArray();
  const _OBS_Chara1BattleStandPicturePosition =
    parameters["キャラクター１の立ち絵位置"].toConvertNumberArray();
  const _OBS_Chara2BattleStandPicturePosition =
    parameters["キャラクター２の立ち絵位置"].toConvertNumberArray();
  const _OBS_BattleStandPicturePositionOnlyone =
    parameters["キャラクターが一人の時の戦闘立ち絵位置"].toConvertNumberArray();
  const _OBS_MenuStandPicturePositionOnlyone =
    parameters[
      "キャラクターが一人の時のメニュー立ち絵位置"
    ].toConvertNumberArray();
  const _OBS_AdjustChara1AnimationPosition =
    parameters[
      "キャラクター１のアニメーションを表示する位置の調節"
    ].toConvertNumberArray();
  const _OBS_AdjustChara2AnimationPosition =
    parameters[
      "キャラクター２のアニメーションを表示する位置の調節"
    ].toConvertNumberArray();
  const _OBS_LostVirginMessage = parameters["処女喪失時メッセージ"];
  const _OBS_ProsNextStageTurnNum1 =
    parameters["拘束１段階時の次の段階に進むターン数"].toConvertNumberArray();
  const _OBS_ProsNextStageTurnNum2 =
    parameters["拘束２段階時の次の段階に進むターン数"].toConvertNumberArray();
  const _OBS_BindArrowTouchPadPos =
    parameters["拘束回避タッチパッドの位置"].toConvertNumberArray();
  const _OBS_BindArrowBackPos =
    parameters["拘束回避矢印背景の位置"].toConvertNumberArray();
  const _OBS_BindArrowPosAndSpace =
    parameters["拘束回避矢印の１つ目の位置と間隔"].toConvertNumberArray();
  const _OBS_BindArrowtimeGaugeBackPos =
    parameters["拘束回避ゲージ背景の位置"].toConvertNumberArray();
  const _OBS_BindArrowtimeGaugePosAndSize =
    parameters[
      "拘束回避時に表示するゲージの位置・大きさの設定"
    ].toConvertNumberArray();
  const _OBS_BindArrowtimeGaugeColor =
    parameters["拘束回避時に表示するゲージの色の設定"];
  const _OBS_ArrowInputSE =
    parameters["拘束回避時の矢印入力SE"].toConvertAudio();
  const _OBS_ArrowInputSuccessSE =
    parameters["拘束回避時の矢印入力成功時SE"].toConvertAudio();
  const _OBS_ArrowInputfailureSE =
    parameters["拘束回避時の矢印入力失敗時SE"].toConvertAudio();
  const _OBS_ActorStatusWindowAdjPos =
    parameters["アクターステータスウィンドウ調節位置"].toConvertNumberArray();
  const _OBS_ActorWindowXPosWidth =
    parameters["アクターウィンドウの大きさと位置"].toConvertNumberArray();
  const _OBS_PartyWindowXPosWidth =
    parameters["パーティーウィンドウの大きさと位置"].toConvertNumberArray();
  const _OBS_BrokenOrNakedBindAttackRate =
    parameters["鎧破壊時と裸時の拘束攻撃のレーティング"].toConvertNumberArray();
  const _OBS_ResistSkillTypeName = parameters["抵抗表記"];
  const _OBS_FailurResistSkillMessage = parameters["抵抗失敗時メッセージ"];
  const _OBS_LewdValTitle = parameters["特定変数表記１"];
  const _OBS_SpExpNum = parameters["特定変数表記２"];
  const _OBS_BindStateArr = parameters["拘束ステートID"].toConvertNumberArray();
  const _OBS_BreakArmorCommondIdArr =
    parameters["キャラクターの鎧破壊時コモンイベントID"].toConvertNumberArray();
  const _OBS_ChangeBattleStandPictureVariableIdArr =
    parameters["キャラクターに適用する特定変数ID"].toConvertNumberArray();
  const _OBS_SpExpNumVariableIdArr =
    parameters[
      "キャラクターの特定回数に適用する特定変数ID"
    ].toConvertNumberArray();
  const _OBS_ChangeHpRate = parameters["立ち絵変更ＨＰ割合"]
    .split(",")
    .map(function (str1) {
      return str1.split("-").map(function (str2) {
        return Number(str2);
      });
    });
  const _OBS_ChangeValRate = parameters["立ち絵変更特定変数割合"]
    .split(",")
    .map(function (str1) {
      return str1.split("-").map(function (str2) {
        return Number(str2);
      });
    });
  const _OBS_CannotDiscardEquipMessage =
    parameters["身体の装備を外せない際のメッセージ"];
  let _OBS_DefeatEventBattleLogMessage = [];
  _OBS_DefeatEventBattleLogMessage.push(
    parameters["敗北後拘束１のバトルログメッセージ"]
  );
  _OBS_DefeatEventBattleLogMessage.push(
    parameters["敗北後拘束２のバトルログメッセージ"]
  );
  _OBS_DefeatEventBattleLogMessage.push(
    parameters["敗北後拘束３のバトルログメッセージ"]
  );
  _OBS_DefeatEventBattleLogMessage.push(
    parameters["敗北後拘束４のバトルログメッセージ"]
  );
  const _OBS_Chara1MenuStandPicturePosition =
    parameters["メニューキャラクター１立ち絵位置"].toConvertNumberArray();
  const _OBS_Chara2MenuStandPicturePosition =
    parameters["メニューキャラクター２立ち絵位置"].toConvertNumberArray();
  const _OBS_ResistSkillID = Number(parameters["もがくスキルID"]);
  const _OBS_LeaveSkillID = Number(parameters["そのままスキルID"]);
  const _OBS_StandUpSkillID = Number(parameters["立ち上がるスキルID"]);
  const _OBS_MenuStandStatusPositionOnlyone = Number(
    parameters["キャラクターが一人の時のメニューのステータスx座標"]
  );
  const _OBS_ProsNextStageProp1 = Number(
    parameters["拘束１段階時の次の段階に進む確率"]
  );
  const _OBS_ProsNextStageProp2 = Number(
    parameters["拘束２段階時の次の段階に進む確率"]
  );
  const _OBS_pistonSkillProp = Number(
    parameters["拘束２段階時の特定スキルが発生する確率"]
  );
  const _OBS_BindProsSkillID = Number(parameters["拘束進行スキルID"]);
  const _OBS_PistonSkillID = Number(parameters["拘束2段階時特定スキルID"]);
  const _OBS_ChangeBattleStandPictureStateId = Number(
    parameters["特定ステートID"]
  );
  const _OBS_MaxBindArrowNum = Number(parameters["拘束回避矢印の最大数"]);
  const _OBS_LewdStateBindTimeShortRate = Number(
    parameters["拘束回避入力時間短縮割合"]
  );
  const _OBS_VirginStateId = Number(parameters["処女ステートID"]);
  const _OBS_BindAttckStateId = Number(parameters["敵拘束中ステートID"]);
  const _OBS_DownStateId = Number(parameters["ダウンステートID"]);
  const _OBS_PistonAnimationStartCommonID = Number(
    parameters["アニメーション開始時コモンイベントID"]
  );
  const _OBS_PistonAnimationFinishCommonID = Number(
    parameters["アニメーション終了時コモンイベントID"]
  );
  const _OBS_BindActor1CommonId = Number(
    parameters["キャラクター1の拘束2段階目に実行するコモンイベントID"]
  );
  const _OBS_BindActor2CommonId = Number(
    parameters["キャラクター2の拘束2段階目に実行するコモンイベントID"]
  );
  const _OBS_CumEventCommonId = Number(parameters["射精前コモンイベントID"]);
  const _OBS_StartDefeatEventCommonId = Number(
    parameters["敗北イベント開始時のコモンイベントID"]
  );
  const _OBS_DefeatLoopEventCommonId = Number(
    parameters["敗北ループイベントのコモンイベントID"]
  );
  const _OBS_DefeatLoopEventEndCommonId = Number(
    parameters["敗北ループイベント終了のコモンイベントID"]
  );
  const _OBS_LostVirginCommonId = Number(
    parameters["キャラクターの処女喪失時コモンイベントID"]
  );
  const _OBS_ArmorTypeId =
    Number(parameters["鎧に該当する装備タイプＩＤ"]) || 4;
  const _OBS_ChangeBattleStandPictureVariableMax = Number(
    parameters["立ち絵変更特定変数最大値"]
  );
  const _OBS_MenuStatusIconPos = Number(
    parameters["メニューのステータスアイコンの左端からの位置"]
  );
  const _OBS_WaitSkillId = Number(parameters["様子を見るスキルのID"]);
  const _OBS_ToDoTextValId = Number(parameters["ToDo変数ＩＤ"]);
  const _OBS_PistonAnimtionEnemyValId = Number(
    parameters["ピストンアニメーション敵ID"]
  );
  const _OBS_PistonAnimtionBindKindValId = Number(
    parameters["ピストンアニメーション拘束種類番号ID"]
  );
  const _OBS_ResistStateId = Number(parameters["もがくステートID"]);
  const _OBS_BattleEndRipeSwitch = Number(
    parameters["敗北イベントをＯＮにするスイッチＩＤ"]
  );
  const _OBS_JudgeBattleEndSwitch = Number(parameters["戦闘終了スイッチＩＤ"]);

  //const _OBS_DamageFaceFlame                       = Number(parameters['被ダメージ時表情持続フレーム数']);

  //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
  //
  //  APゲージ関連
  //
  //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

  ImageManager.loadMenuStandPicture = function (index, filename, hue) {
    const path = "img/standPicture/chara_" + index + "/menu/";
    return this.loadBitmap(path, filename, hue, true);
  };

  ImageManager.loadNomalStandPicture = function (index, filename, hue) {
    const path = "img/standPicture/chara_" + index + "/nomal/";
    return this.loadBitmap(path, filename, hue, true);
  };

  ImageManager.loadBindStandPicture = function (
    filename,
    index,
    enemyName,
    number,
    hue
  ) {
    const path =
      "img/standPicture/chara_" + index + "/" + enemyName + "/" + number + "/";
    return this.loadBitmap(path, filename, hue, true);
  };

  Object.defineProperties(Game_Actor.prototype, {
    ap: {
      get: function () {
        return this._ap;
      },
      configurable: true,
    },
    mAp: {
      get: function () {
        return this._mAp;
      },
      configurable: true,
    },
  });

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  const _alias_vbsp_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _alias_vbsp_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === "拘束最大コモンイベント後ステート解除コマンド") {
      $gameSystem.removeBindStateActor.removeState(
        _OBS_BindStateArr[_OBS_BindStateArr.length - 1]
      );
      $gameSystem.removeBindStateActor.releaseFrombindProc();
      //22/11/04 追加
      $gameSystem.removeBindStateActor.addState(_OBS_DownStateId);
    }

    if (command === "最大ＡＰの増減") {
      if (args.length == 0) {
        throw new Error("コマンドの後にアクターの名前を記述してください。");
      }
      const actor = this.getActorByName(args[0]);
      const num = Number(args[1]);
      if (!Number.isInteger(num)) {
        throw new Error("増減する数値を半角数字の整数で記述してください。");
      }
      actor.gainMAp(num);
    }

    if (command === "ＡＰ全回復") {
      if (args.length == 0) {
        throw new Error("コマンドの後にアクターの名前を記述してください。");
      }
      const actor = this.getActorByName(args[0]);
      actor.recoverMaxAp();
    }

    if (command === "ＡＰの増減") {
      if (args.length == 0) {
        throw new Error("コマンドの後にアクターの名前を記述してください。");
      }
      const actor = this.getActorByName(args[0]);
      const num = Number(args[1]);
      if (!Number.isInteger(num)) {
        throw new Error("増減する数値を半角数字の整数で記述してください。");
      }
      actor.gainAp(num);
    }

    if (command === "ＡＰの増減（使用者）") {
      const actor = $gameSystem.apItemActor[0];
      if (!actor) {
        throw new Error(
          "使用したアクターに問題があります。村人Ａに問い合わせてください。"
        );
      }
      const num = Number(args[0]);
      if (!Number.isInteger(num)) {
        throw new Error("増減する数値を半角数字の整数で記述してください。");
      }
      actor.gainAp(num);
    }

    if (command === "戦闘立ち絵位置変更") {
      if (args.length < 2) {
        throw new Error(
          "戦闘立ち絵位置変更のプラグインのパラメータが不正です。"
        );
      }
      const posArray = args.map(function (str) {
        return Number(str);
      });
      posArray.forEach(function (num) {
        if (!Number.isInteger(num)) {
          throw new Error("位置変更の座標は半角数字の整数で指定してください。");
        }
      });
      $gameParty.changeStandPicturePosArray(posArray);
    }

    if (command === "処女喪失メッセージ") {
      const text = $gameSystem.lostVirginGirlName + _OBS_LostVirginMessage;
      SceneManager._scene._centermessageWindow.startMessage(text);
    }

    if (command === "拘束立ち絵更新") {
      if (!$gameParty.inBattle()) {
        return;
      }
      $gameParty.members().forEach(function (actor) {
        actor.stopRefreshBindStandPicture = false;
      });
      BattleManager._spriteset.refreshStandPictureForAll();
    }

    if (command === "敗北イベント時拘束立ち絵更新") {
      if (!$gameParty.inBattle()) {
        return;
      }
      const actor = $gameParty.battleMembers()[this.actorIndex];
      actor.removeState(_OBS_BindStateArr[_OBS_BindStateArr.length - 1]);
      actor.releaseFrombindProc();
      BattleManager._spriteset.refreshStandPictureForOne(actor);
    }

    if (command === "拘束進行") {
      if (typeof this.actorIndex === "undefined") {
        return;
      }
      const actor = $gameParty.battleMembers()[this.actorIndex];
      actor.addState(_OBS_BindStateArr[0]);
      BattleManager._spriteset.refreshStandPictureForOne(actor);
      BattleManager.addDefeatLog(
        actor.name(),
        actor.bindStateStandNameArray[0],
        actor.bindStateStandNameArray[1]
      );
    }
    if (command === "新規拘束進行") {
      if (typeof this.actorIndex === "undefined") {
        return;
      }
      const actor = $gameParty.battleMembers()[this.actorIndex];
      BattleManager.defeatEventInitSetting(actor);
      BattleManager.addDefeatLog(
        actor.name(),
        actor.bindStateStandNameArray[0],
        actor.bindStateStandNameArray[1]
      );
    }
    //23/01/26 追加
    if (command === "拘束アニメーション解除時復帰処理") {
      if (SceneManager._scene.constructor == Scene_Battle) {
        SceneManager._scene._spriteset.showAndSaveStandPicture();
      }
    }
    if (command === "戦闘中アニメーション拘束進行") {
      BattleManager._spriteset.hideAndSaveStandPicture(
        $gameTemp.pistonAnimationActorIndex
      );
    }
  };

  Game_Interpreter.prototype.getActorByName = function (aname) {
    const arr = $gameParty.members().filter(function (actor) {
      return actor.name() == aname;
    });
    if (arr.length == 0) {
      throw new Error(aname + "という名前のアクターが見つかりません。");
    }
    return arr[0];
  };

  //-----------------------------------------------------------------------------
  // Scene_ItemBase
  //

  const _alias_vbsp_Scene_ItemBase_applyItem =
    Scene_ItemBase.prototype.applyItem;
  Scene_ItemBase.prototype.applyItem = function () {
    $gameSystem.apItemActor = this.itemTargetActors();
    _alias_vbsp_Scene_ItemBase_applyItem.call(this);
  };

  //-----------------------------------------------------------------------------
  // Game_Party
  //

  const _alias_vbsp_Game_Party_initialize = Game_Party.prototype.initialize;
  Game_Party.prototype.initialize = function () {
    _alias_vbsp_Game_Party_initialize.call(this);
    this.standPicturePosArray = [
      _OBS_Chara1BattleStandPicturePosition,
      _OBS_Chara2BattleStandPicturePosition,
    ];
  };

  //23/02/22 修正
  Game_Party.prototype.allBindableMembers = function () {
    return this.battleMembers().filter((actor) => !actor.actor().meta.noBind);
  };

  Game_Party.prototype.changeStandPicturePosArray = function (pos) {
    if (pos.length == 2) {
      pos.push(
        this.standPicturePosArray[1][0],
        this.standPicturePosArray[1][1]
      );
    }
    this.standPicturePosArray = [
      [pos[0], pos[1]],
      [pos[2], pos[3]],
    ];
  };
  Game_Party.prototype.getStandPicturePosArray = function (index) {
    let pos;
    if (this.members().length == 1) {
      pos = _OBS_BattleStandPicturePositionOnlyone;
    } else {
      pos = this.standPicturePosArray[index - 1];
    }
    return pos;
  };

  //-----------------------------------------------------------------------------
  // Scene_Options
  //

  const _alias_vbsp_Scene_Options_terminate = Scene_Options.prototype.terminate;
  Scene_Options.prototype.terminate = function () {
    _alias_vbsp_Scene_Options_terminate.call(this);
    for (let i = 1; i < 3; i++) {
      $gameActors.actor(i).setupVoiceSe(i);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Battler
  //

  Game_Battler.prototype.requestMotion = function (motionType) {
    //23/02/17 修正
    if (
      !this.noSkillVoice &&
      (motionType == "skill" || motionType == "spell")
    ) {
      const skillVoice = this.randomAttackVoice("スキルボイス");
      if (skillVoice) {
        AudioManager.playVoice(skillVoice, false, undefined);
      }
    }
    this._motionType = motionType;
  };

  const _alias_vbsp_Game_Battler_removeState =
    Game_Battler.prototype.removeState;
  Game_Battler.prototype.removeState = function (stateId) {
    const affected = this.isStateAffected(stateId);
    _alias_vbsp_Game_Battler_removeState.call(this, stateId);
    if (
      affected &&
      _OBS_BindStateArr.indexOf(stateId) >= 0 &&
      $gameParty.inBattle()
    ) {
      this.releaseFrombindProc();
      const enemy = $gameTroop._setupMembers[this.bindedEnemyIndex - 1];
      enemy.removeState(_OBS_BindAttckStateId);
      enemy.setBindedActorId(-1);
      this.bindedEnemyIndex = -1;
      $gameSystem.bindedActorId = this._actorId;
    }
  };

  Game_Battler.prototype.releaseFrombindProc = function () {
    this.releaseFrombind = true;
    //23/01/19 修正
    $gameTemp.reserveCommonEvent(_OBS_PistonAnimationFinishCommonID);
    $gameTroop._interpreter.setupReservedCommonEvent();
  };

  const _alias_vbsp_Game_Battler_addState = Game_Battler.prototype.addState;
  Game_Battler.prototype.addState = function (stateId) {
    if ($gameParty.inBattle() && _OBS_BindStateArr[0] == stateId) {
      const bindEnemy =
        BattleManager._phase == "defeatLoopEvent"
          ? this._bindMonster
          : BattleManager._actedSubject;
      let bindStateId = -1;
      bindEnemy.addState(_OBS_BindAttckStateId);
      for (let i = 0, n = _OBS_BindStateArr.length; i < n; i++) {
        const id = _OBS_BindStateArr[i];
        if (this.isStateAffected(id)) {
          bindStateId = i;
          break;
        }
      }
      if (bindStateId >= 0) {
        if (bindStateId == 1 && BattleManager._phase != "defeatLoopEvent") {
          bindStateId++;
        }
        if (this.isVirgin()) {
          $gameSystem.lostVirginGirlName = this.name();
          this.eraseState(_OBS_VirginStateId);
        }
        if (bindStateId == 2 && BattleManager._phase != "defeatLoopEvent") {
          this.eraseState(_OBS_BindStateArr[bindStateId - 1]);
        } else {
          this.eraseState(_OBS_BindStateArr[bindStateId]);
        }
        this.refresh();
        stateId = _OBS_BindStateArr[bindStateId + 1];
        if (bindStateId + 1 >= _OBS_BindStateArr.length - 1) {
          //$gameSystem.bindedActorId = this._actorId;
          bindEnemy.setBindedActorId(-1);
          bindEnemy.removeState(_OBS_BindAttckStateId);
          if (!this.isStateAffected(_OBS_ChangeBattleStandPictureStateId)) {
            this.addNewState(_OBS_ChangeBattleStandPictureStateId);
          }
          this._result.clear();
          $gameSystem.removeBindStateActor = this;
        }
      }
      $gameSystem.bindedActorId = this._actorId;
      $gameSystem.bindStateStage = bindStateId;
      if (bindStateId < 0) {
        this.bindStandnumber = Math.ceil(
          Math.random() * bindEnemy.enemy().meta.拘束種類数
        );
      }
      let bindIndex = Math.min.apply(null, [
        bindStateId + 2,
        _OBS_BindStateArr.length - 1,
      ]);
      if (bindStateId == 1 && BattleManager._phase == "defeatLoopEvent") {
        bindIndex = "2ex";
      }
      this.bindStateStandNameArray = [bindEnemy.originalName(), bindIndex];
    }
    if (
      $gameParty.inBattle() &&
      stateId == this.deathStateId() &&
      this.isActor()
    ) {
      if (this.bindedEnemyIndex >= 0) {
        //23/02/17 修正
        const affectedId = _OBS_BindStateArr.filter((id) =>
          this.isStateAffected(id)
        );
        if (affectedId.length > 0) {
          this.removeState(affectedId[0]);
        }
      }
    }
    _alias_vbsp_Game_Battler_addState.call(this, stateId);
  };

  //-----------------------------------------------------------------------------
  // Game_Variables
  //

  const _alias_Game_Variables_setValue = Game_Variables.prototype.setValue;
  Game_Variables.prototype.setValue = function (variableId, value) {
    if (_OBS_ChangeBattleStandPictureVariableIdArr.indexOf(variableId) >= 0) {
      value = Math.max(
        0,
        Math.min(value, _OBS_ChangeBattleStandPictureVariableMax)
      );
    }
    _alias_Game_Variables_setValue.call(this, variableId, value);
  };

  //-----------------------------------------------------------------------------
  // Game_BattlerBase
  //

  const _alias_vbsp_Game_BattlerBase_paySkillCost =
    Game_BattlerBase.prototype.paySkillCost;
  Game_BattlerBase.prototype.paySkillCost = function (skill) {
    _alias_vbsp_Game_BattlerBase_paySkillCost.call(this, skill);
    this.refresh();
  };

  //-----------------------------------------------------------------------------
  // Game_Actor
  //

  const _alias_vbsp_Game_Actor_initMembers = Game_Actor.prototype.initMembers;
  Game_Actor.prototype.initMembers = function () {
    _alias_vbsp_Game_Actor_initMembers.call(this);
    this.preBindStandBaseName = "";
  };

  const _alias_Game_Actor_onBattleStart = Game_Actor.prototype.onBattleStart;
  Game_Actor.prototype.onBattleStart = function () {
    _alias_Game_Actor_onBattleStart.call(this);
    this.isPistonAttacked = false;
  };

  const _alias_vbsp_Game_Actor_setup = Game_Actor.prototype.setup;
  Game_Actor.prototype.setup = function (actorId) {
    _alias_vbsp_Game_Actor_setup.call(this, actorId);
    this.setupVoiceSe(actorId);
  };

  Game_Actor.prototype.setupCharaIndex = function () {
    let clothName = "";
    if (!this.isNaked()) {
      let wearSpecialArmor = false;
      for (let i = 0, n = this.armors().length; i < n; i++) {
        const armor = this.armors()[i];
        if (armor.meta.装備種類) {
          clothName = armor.meta.装備種類;
          wearSpecialArmor = true;
        }
      }
      if (!wearSpecialArmor) {
        clothName = "アーマー";
      }
    } else {
      clothName = "装備なし";
    }
    if (clothName == "") {
      return;
    }
    const actorData = $dataActors[this._actorId];
    if (!actorData.meta[clothName]) {
      clothName = "アーマー";
    }
    if (!actorData.meta[clothName]) {
      return;
    }
    const info = actorData.meta[clothName].split(",");
    this.setCharacterImage(info[0], Number(info[1]));
  };

  const _alias_vbsp_Game_Actor_refresh = Game_Actor.prototype.refresh;
  Game_Actor.prototype.refresh = function () {
    _alias_vbsp_Game_Actor_refresh.call(this);
    this.setupCharaIndex();
  };

  Game_Actor.prototype.setupVoiceSe = function (actorId) {
    this.voiceFileName = {};
    const voiceMetaNameArray = [
      "攻撃ボイス",
      "ダメージボイス",
      "拘束ボイス1",
      "拘束ボイス2",
      "拘束ボイス2ex",
      "拘束ボイス3",
      "スキルボイス",
      "死亡ボイス",
    ];
    const actorData = $dataActors[actorId];
    const volumeRate = AudioManager.voiceVolume / 100;
    for (let i = 0, n = voiceMetaNameArray.length; i < n; i++) {
      const name = voiceMetaNameArray[i];
      if (!actorData.meta[name]) {
        continue;
      }
      const seInfoArray = actorData.meta[name].split(" | ");
      seInfoArray.forEach(function (str) {
        const seInfo = str.split(",");
        if (seInfo) {
          if (!this.voiceFileName[name]) {
            this.voiceFileName[name] = [];
          }
          const param = {
            name: seInfo[0],
            volume: Number(seInfo[1]) * volumeRate,
            pitch: Number(seInfo[2]),
            pan: Number(seInfo[3]),
          };
          this.voiceFileName[name].push(param);
        }
      }, this);
    }
  };

  Game_Actor.prototype.removeVirgin = function (bindStateId) {
    if (bindStateId == 0 && this.isVirgin()) {
      const virgin = this.states().filter(function (state) {
        return state.meta.処女;
      });
      this.removeState(virgin[0].id);
    }
  };

  Game_Actor.prototype.isVirgin = function (bindStateId) {
    const virgin = this.states().filter(function (state) {
      return state.meta.処女;
    });
    return virgin.length != 0;
  };

  Game_Actor.prototype.canDiscardArmor = function () {
    const partyInd = $gameParty.members().indexOf(this);
    const lewdId = _OBS_ChangeBattleStandPictureVariableIdArr[partyInd];
    const lewdVal = $gameVariables.value(lewdId);
    for (let i = 0, n = 2; i < n; i++) {
      const range = _OBS_ChangeValRate[i];
      if (range[1] <= lewdVal && lewdVal <= range[0]) {
        return true;
      }
    }
    return false;
  };

  Game_Actor.prototype.isLewdness = function () {
    const partyInd = $gameParty.members().indexOf(this);
    const lewdId = _OBS_ChangeBattleStandPictureVariableIdArr[partyInd];
    const lewdVal = $gameVariables.value(lewdId);
    for (let i = 0, n = _OBS_ChangeValRate.length; i < n; i++) {
      const range = _OBS_ChangeValRate[i];
      if (range[1] <= lewdVal && lewdVal <= range[0] && i == 0) {
        return true;
      }
    }
    return false;
  };

  Game_Actor.prototype.onDamage = function (value) {
    Game_Battler.prototype.onDamage.call(this, value);
    const damageVoice = this.randomAttackVoice("ダメージボイス");
    if (damageVoice) {
      AudioManager.playVoice(damageVoice, false, undefined);
    }
  };

  Game_Actor.prototype.randomAttackVoice = function (name) {
    //23/01/19 修正
    if (!this.voiceFileName[name]) {
      return console.log(name + "のボイスファイルが見つかりません。");
    }
    const randNum = Math.floor(Math.random() * this.voiceFileName[name].length);
    return this.voiceFileName[name][randNum];
  };

  const _alias_vbsp_Game_Actor_performAttack =
    Game_Actor.prototype.performAttack;
  Game_Actor.prototype.performAttack = function () {
    const attackVoice = this.randomAttackVoice("攻撃ボイス");
    if (attackVoice) {
      AudioManager.playVoice(attackVoice, false, undefined);
    }
    _alias_vbsp_Game_Actor_performAttack.call(this);
  };

  Game_Actor.prototype.performCollapse = function () {
    if ($gameParty.inBattle()) {
      const deadVoice = this.randomAttackVoice("死亡ボイス");
      if (deadVoice) {
        AudioManager.playVoice(deadVoice, false, undefined);
      }
    }
  };

  Game_Actor.prototype.performBind = function () {
    let bindStateId = 0;
    //22/11/04 追加
    if (this.isStateAffected(_OBS_DownStateId)) {
      this.removeState(_OBS_DownStateId);
    }
    for (let i = 0, n = _OBS_BindStateArr.length; i < n; i++) {
      const id = _OBS_BindStateArr[i];
      if (this.isStateAffected(id)) {
        bindStateId = i + 1;
        break;
      }
    }
    if (bindStateId > 0) {
      if (bindStateId == 3) {
        bindStateId = "2ex";
      }
      if (bindStateId == 4) {
        bindStateId = "3";
      }
      const bindVoiceName = "拘束ボイス" + bindStateId;
      const bindVoice = this.randomAttackVoice(bindVoiceName);
      if (bindVoice) {
        AudioManager.playVoice(bindVoice, false, undefined);
      }
    }
  };

  Game_Actor.prototype.apRate = function () {
    return this.ap / this.mAp;
  };

  const _alias_Game_Actor_initMembers = Game_Actor.prototype.initMembers;
  Game_Actor.prototype.initMembers = function () {
    _alias_Game_Actor_initMembers.call(this);
    this._mAp = 10;
    this._ap = this._preAp = 10;
    this.preStandPicInfo = [];
  };

  Game_Actor.prototype.setAp = function (ap) {
    this._ap = ap;
    this.refresh();
  };

  Game_Actor.prototype.recoverMaxAp = function () {
    this._ap = this.mAp;
  };

  Game_Actor.prototype.gainMAp = function (value) {
    this._mAp += value;
  };

  Game_Actor.prototype.gainAp = function (value) {
    //23/01/03 対象アクターの立ち絵のみ
    if (this._actorId != 1) {
      return;
    }
    this._result.apDamage = -value;
    if (this.isNaked()) {
      return;
    }
    this.setAp(Math.min(Math.max(this._ap + value, 0), this.mAp));
  };

  Game_Actor.prototype.isNaked = function (value) {
    const typeArr = this.armors().map(function (armor) {
      return armor.etypeId;
    });
    return !~typeArr.indexOf(_OBS_ArmorTypeId);
  };

  Game_Actor.prototype.getActorStandPictureName = function () {
    let spriteName = "";

    let isArmored = false;
    if (!this.isNaked()) {
      let wearSpecialArmor = false;
      const actorData = $dataActors[this._actorId];
      for (let i = 0, n = this.armors().length; i < n; i++) {
        const armor = this.armors()[i];
        const kind = armor.meta.装備種類;
        if (kind && actorData.meta[kind]) {
          spriteName += kind;
          wearSpecialArmor = true;
        }
      }
      if (!wearSpecialArmor) {
        if (this._ap > 0) {
          isArmored = true;
          spriteName += "fullArmor";
        } else {
          spriteName += "breakArmor";
        }
      }
    } else {
      spriteName += "noArmor";
    }
    //22/11/04 追加
    spriteName += this.isDead()
      ? "_dead_base"
      : this.isStateAffected(_OBS_DownStateId)
      ? "_down_base"
      : "_base";
    return [spriteName, isArmored];
  };

  Game_Actor.prototype.removeAllBindState = function () {
    for (let i = 0, n = _OBS_BindStateArr.length; i < n; i++) {
      this.removeState(_OBS_BindStateArr[i]);
    }
  };

  Game_Actor.prototype.isAffectedBindState = function () {
    let isAffected = false;
    for (let i = 0, n = _OBS_BindStateArr.length; i < n; i++) {
      if (this.isStateAffected(_OBS_BindStateArr[i])) {
        isAffected = true;
        break;
      }
    }
    return isAffected;
  };

  Game_Actor.prototype.isAffectedStrongBindState = function () {
    let isAffected = false;
    for (let i = 1, n = _OBS_BindStateArr.length; i < n; i++) {
      if (this.isStateAffected(_OBS_BindStateArr[i])) {
        isAffected = true;
        break;
      }
    }
    return isAffected;
  };

  Game_Actor.prototype.isSpriteVisible = function () {
    return true;
  };

  Game_Actor.prototype.performDamage = function () {
    Game_Battler.prototype.performDamage.call(this);
    $gameScreen.startShake(5, 5, 10);
    SoundManager.playActorDamage();
  };

  //-----------------------------------------------------------------------------
  // Game_Enemy
  //

  const _alias_vbsp_Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
  Game_Enemy.prototype.initMembers = function () {
    _alias_vbsp_Game_Enemy_initMembers.call(this);
    this.bindedActorId = -1;
  };

  Game_Enemy.prototype.setBindedActorId = function (id) {
    this.bindedActorId = id;
  };

  const _alias_vbsp_Game_Enemy_performCollapse =
    Game_Enemy.prototype.performCollapse;
  Game_Enemy.prototype.performCollapse = function () {
    _alias_vbsp_Game_Enemy_performCollapse.call(this);
    $gameParty.members().forEach(function (actor) {
      if (actor.bindedEnemyIndex == this.troopIndex) {
        actor.removeAllBindState();
        actor.refreshReleaseBind = true;
        BattleManager._spriteset.refreshStandPictureForOne(actor);
      }
    }, this);
  };

  const _alias_vbsp_Game_Enemy_selectAction = Game_Enemy.prototype.selectAction;
  Game_Enemy.prototype.selectAction = function (actionList, ratingZero) {
    if (this.bindedActorId > 0) {
      this.bindTurn++;
      const act = { skillId: 0 };
      let turnNum, prop;
      const isStrong = $gameActors
        .actor(this.bindedActorId)
        .isAffectedStrongBindState();
      if (isStrong) {
        turnNum = _OBS_ProsNextStageTurnNum2;
        prop = _OBS_ProsNextStageProp2;
      } else {
        turnNum = _OBS_ProsNextStageTurnNum1;
        prop = _OBS_ProsNextStageProp1;
      }
      if (turnNum[1] <= this.bindTurn) {
        act.skillId = _OBS_BindProsSkillID;
        this.bindTurn = 0;
      } else if (turnNum[0] <= this.bindTurn) {
        const rand = 100 * Math.random();
        if (rand <= prop) {
          act.skillId = _OBS_BindProsSkillID;
          this.bindTurn = 0;
        } else {
          act.skillId = this.nomalBindAction(isStrong);
        }
      } else {
        act.skillId = this.nomalBindAction(isStrong);
      }
      return act;
    } else {
      //23/03/03 修正
      actionList = JSON.parse(JSON.stringify(actionList));
      actionList.forEach(function (action) {
        if ($dataSkills[action.skillId].meta.拘束スキル) {
          if ($gameParty.hasNakedMember()) {
            action.rating = _OBS_BrokenOrNakedBindAttackRate[1];
          } else if ($gameParty.hasBrokenArmorMember()) {
            action.rating = _OBS_BrokenOrNakedBindAttackRate[0];
          }
          //23/02/03 追加
          if (
            $gameParty
              .bindfreeAffectedMemberId()
              .filter((id) => !$dataActors[id].meta.noBind).length == 0
          ) {
            action.rating = 0;
          }
        }
      });
      return _alias_vbsp_Game_Enemy_selectAction.call(
        this,
        actionList,
        ratingZero
      );
    }
  };

  Game_Enemy.prototype.nomalBindAction = function (isStrong) {
    if (isStrong) {
      const pistonRand = 100 * Math.random();
      if (pistonRand <= _OBS_pistonSkillProp) {
        return _OBS_PistonSkillID;
      } else {
        return _OBS_WaitSkillId;
      }
    } else {
      return _OBS_WaitSkillId;
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Troop
  //

  const _alias_vbsp_Game_Troop_setup = Game_Troop.prototype.setup;
  Game_Troop.prototype.setup = function (troopId) {
    _alias_vbsp_Game_Troop_setup.call(this, troopId);
    this.members().forEach(function (enemy, index) {
      enemy.troopIndex = index + 1;
    });
  };

  //-----------------------------------------------------------------------------
  // Game_Action
  //

  const _alias_vbsp_Game_Action_executeHpDamage =
    Game_Action.prototype.executeHpDamage;
  Game_Action.prototype.executeHpDamage = function (target, value) {
    _alias_vbsp_Game_Action_executeHpDamage.call(this, target, value);
    if (target.isActor()) {
      if (value > 0 && this._item._itemId != _OBS_PistonSkillID) {
        target.gainAp(-1);
      }
      if (this._item._itemId == _OBS_PistonSkillID) {
        target.isPistonAttacked = true;
        BattleManager._spriteset.refreshStandPictureForAll();
      }
    }
  };

  Game_Action.prototype.setResist = function () {
    this.setSkill(_OBS_ResistSkillID);
  };

  //22/11/04 追加
  Game_Action.prototype.setLeave = function () {
    this.setSkill(_OBS_LeaveSkillID);
  };

  //22/11/04 追加
  Game_Action.prototype.setStandUp = function () {
    this.setSkill(_OBS_StandUpSkillID);
  };

  //-----------------------------------------------------------------------------
  // Window_Base
  //

  Window_Base.prototype.drawActorAp = function (actor, x, y, width) {
    width = width || 186;
    const colorArr = _OBS_APGaugeColors.split(",");
    const color1 = colorArr[0];
    const color2 = colorArr[1];
    this.drawGauge(x, y, width, actor.apRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(_OBS_APNotation, x, y, 44);
    this.drawCurrentAndMax(
      actor.ap,
      actor.mAp,
      x,
      y,
      width,
      this.apColor(actor),
      this.normalColor()
    );
  };

  Window_Base.prototype.apColor = function (actor) {
    return this.normalColor();
  };

  //-----------------------------------------------------------------------------
  // Window_BattleStatus
  //

  const _alias_vbsp_Window_BattleStatus_initialize =
    Window_BattleStatus.prototype.initialize;
  Window_BattleStatus.prototype.initialize = function () {
    _alias_vbsp_Window_BattleStatus_initialize.call(this);
    this.x += _OBS_ActorStatusWindowAdjPos[0];
    this.y += _OBS_ActorStatusWindowAdjPos[1];
  };

  Window_BattleStatus.prototype.windowWidth = function () {
    return 450;
  };

  Window_BattleStatus.prototype.windowHeight = function () {
    return 180;
  };

  Window_BattleStatus.prototype.drawBasicArea = function (rect, actor) {
    this.drawActorName(actor, rect.x + 0, rect.y, 200);
    this.drawActorIcons(actor, rect.x + 0, rect.y + this.lineHeight(), 200);
  };

  Window_BattleStatus.prototype.itemHeight = function () {
    return this.lineHeight() * 2;
  };

  Window_BattleStatus.prototype.gaugeAreaWidth = function () {
    return 215;
  };

  Window_BattleStatus.prototype.drawGaugeArea = function (rect, actor) {
    this.drawActorHp(actor, rect.x + 0, rect.y, 108);
    this.drawActorMp(actor, rect.x + 123, rect.y, 96);
    this.drawActorAp(actor, rect.x + 0, rect.y + this.lineHeight(), 108);
    this.drawActorTp(actor, rect.x + 123, rect.y + this.lineHeight(), 96);
  };

  //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
  //
  //　　戦闘時立ち絵関連
  //
  //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

  //-----------------------------------------------------------------------------
  // Game_Party
  //

  Game_Party.prototype.bindfreeAffectedMemberId = function () {
    return this.aliveMembers()
      .filter(function (actor) {
        return !actor.isAffectedBindState();
      })
      .map(function (member) {
        return member._actorId;
      });
  };

  Game_Party.prototype.hasBindAffectedMember = function () {
    return this.bindfreeAffectedMemberId().length != this.aliveMembers().length;
  };

  Game_Party.prototype.isAllMemberAffectedBind = function () {
    return this.bindfreeAffectedMemberId().length == 0;
  };

  Game_Party.prototype.hasBrokenArmorMember = function () {
    return (
      this.aliveMembers().filter(function (actor) {
        return actor.ap == 0;
      }).length > 0
    );
  };

  Game_Party.prototype.hasNakedMember = function () {
    return (
      this.aliveMembers().filter(function (actor) {
        return actor.isNaked();
      }).length > 0
    );
  };

  //-----------------------------------------------------------------------------
  // Game_Action
  //

  const _alias_vbsp_Game_Action_makeTargets = Game_Action.prototype.makeTargets;
  Game_Action.prototype.makeTargets = function () {
    //23/01/19 スキルかどうか判定
    if (
      DataManager.isSkill(this.item()) &&
      (this.item().id == _OBS_BindProsSkillID ||
        this.item().id == _OBS_PistonSkillID)
    ) {
      const targets = [$gameActors.actor(this.subject().bindedActorId)];
      return this.repeatTargets(targets);
    }
    //23/10/26 敵が逃げるを使用した際に味方が逃げてしまう不具合の修正
    const isSingleOppnent =
      (this.isForRandom() || this.isForOne()) &&
      !this.isForFriend() &&
      !this.isForDeadFriend();
    if (
      $gameParty.hasBindAffectedMember() &&
      isSingleOppnent &&
      this.subject().isEnemy()
    ) {
      const freeActorArr = $gameParty.bindfreeAffectedMemberId();
      if (freeActorArr.lenth == 0) {
        return [];
      }
      let targets = [];
      if (this.isForOne()) {
        const ind = Math.floor(Math.random() * freeActorArr.length);
        targets.push($gameActors.actor(freeActorArr[ind]));
      } else if (this.isForRandom()) {
        for (var i = 0; i < this.numTargets(); i++) {
          const ind = Math.floor(Math.random() * freeActorArr.length);
          targets.push($gameActors.actor(freeActorArr[ind]));
        }
      }
      return this.repeatTargets(targets);
    }
    return _alias_vbsp_Game_Action_makeTargets.call(this);
  };

  //-----------------------------------------------------------------------------
  // Scene_Boot
  //

  const _alias_vbsp_Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
  Scene_Boot.loadSystemImages = function () {
    _alias_vbsp_Scene_Boot_loadSystemImages.call(this);
    const loadImgNameArray = [
      "fullArmor_base",
      "breakArmor_base",
      "noArmor_base",
      "fullArmor_dead_base",
      "breakArmor_dead_base",
      "noArmor_dead_base",
      "fullArmor_down_base",
      "breakArmor_down_base",
      "noArmor_down_base",
      "high_hpFace",
      "middle_hpFace",
      "low_hpFace",
      "onState1",
      "onState2",
      "deadOnState",
      "downOnState",
    ];
    //"damageFace"];
    for (let i = 0, n = loadImgNameArray.length; i < n; i++) {
      const name = loadImgNameArray[i];
      ImageManager.loadNomalStandPicture(1, name);
      ImageManager.loadNomalStandPicture(2, name);
    }
  };

  //-----------------------------------------------------------------------------
  // BattleManager
  //

  BattleManager.invokeNormalAction = function (subject, target) {
    $gameSystem.apItemActor = [target];
    BattleManager._actedSubject = subject;
    //23/01/19 スキルかどうか判定
    const isSkill = DataManager.isSkill(this._action.item());
    if (isSkill && this._action.item().id == _OBS_WaitSkillId) {
      const realTarget = this.applySubstitute(target);
      this._action.apply(realTarget);
    } else {
      var realTarget = this.applySubstitute(target);
      this._action.apply(realTarget);
      //23/02/03 スキルかどうか判定
      const isBindSkill =
        $dataSkills[this._action.item().id].meta.拘束進行スキル ||
        $dataSkills[this._action.item().id].meta.拘束スキル;
      if (isSkill && isBindSkill) {
        target.performBind();
        this.notRefresh = true;
        this.postdisplayActionResultsArgs = [subject, realTarget];
      } else {
        this._logWindow.displayActionResults(subject, realTarget);
      }
      if (
        DataManager.isSkill(this._action.item()) &&
        this._action.item().id == _OBS_ResistSkillID
      ) {
        $gameSystem.resistedActor = target;
      }
    }
  };

  BattleManager.addDefeatLog = function (actorName, enemyName, index) {
    if (this._logWindow._lines.length > 3) {
      this._logWindow.clear();
    }
    const ar = _OBS_DefeatEventBattleLogMessage.concat();
    const signArr = [1, 2, "2ex", 3];
    const ind = signArr.indexOf(index);
    if (ind < 0) {
      throw new Error(
        "戦闘敗北イベント時バトルログインデックスにてエラーが発生しました。"
      );
      return;
    }
    const text = this.convertActorEnemyName(ar[ind], actorName, enemyName);
    this._logWindow.push("addText", text);
  };

  BattleManager.convertActorEnemyName = function (text, actorName, enemyName) {
    text = text.replace(/\\/g, "\x1b");
    text = text.replace(/\x1b\x1b/g, "\\");
    text = text.replace(
      /\x1bA/gi,
      function () {
        return actorName;
      }.bind(this)
    );
    text = text.replace(
      /\x1bE/gi,
      function () {
        return enemyName;
      }.bind(this)
    );
    return text;
  };

  const _alias_vbsp_BattleManager_processDefeat = BattleManager.processDefeat;
  BattleManager.processDefeat = function () {
    if ($gameSwitches.value(_OBS_BattleEndRipeSwitch)) {
      this.battleEndLoopAnimeSetting();
      SceneManager._scene._statusWindow.visible = false;
    } else {
      _alias_vbsp_BattleManager_processDefeat.call(this);
    }
  };

  const _alias_vbsp_BattleManager_updateBattleEnd =
    BattleManager.updateBattleEnd;
  BattleManager.updateBattleEnd = function () {
    if (
      !this._escaped &&
      $gameParty.isAllDead() &&
      this._canLose &&
      $gameSwitches.value(_OBS_BattleEndRipeSwitch)
    ) {
      this.battleEndLoopAnimeSetting();
      return;
    }
    _alias_vbsp_BattleManager_updateBattleEnd.call(this);
  };

  BattleManager.battleEndLoopAnimeSetting = function () {
    this._phase = "battleEndEvent";
    $gameTemp.reserveCommonEvent(_OBS_StartDefeatEventCommonId);
    $gameTroop._interpreter.setupReservedCommonEvent();
  };

  const _alias_vbsp_BattleManager_refreshStatus = BattleManager.refreshStatus;
  BattleManager.refreshStatus = function () {
    if (this.notRefresh) {
      this._phase = "preBindCommonEvent";
      //22/11/04 追加
      if ($gameSystem.bindStateStage == 2) {
        this._spriteset.showAndSaveStandPicture();
      }
      $gameTemp.reserveCommonEvent(_OBS_CumEventCommonId);
      $gameTroop._interpreter.setupReservedCommonEvent();
      this.notRefresh = false;
      return;
    }
    _alias_vbsp_BattleManager_refreshStatus.call(this);
    this.armorBrakeCheck();
  };

  BattleManager.armorBrakeCheck = function () {
    let isToBreakArmor = false;
    for (let i = 0, n = $gameParty.members().length; i < n; i++) {
      const actor = $gameParty.members()[i];
      if (actor._preAp > 0 && actor.ap <= 0) {
        const commonId = _OBS_BreakArmorCommondIdArr[i];
        $gameTemp.reserveCommonEvent(commonId);
        isToBreakArmor = true;
      }
      actor._preAp = actor.ap;
    }
    if (isToBreakArmor) {
      this._phase = "postActionCommonEvent";
    } else {
      this._spriteset.refreshStandPictureForAll();
    }
  };

  const _alias_vbsp_BattleManager_processTurn = BattleManager.processTurn;
  BattleManager.processTurn = function () {
    $gameParty.battleMembers().forEach(function (actor) {
      if (actor.releaseFrombind) {
        actor.refreshReleaseBind = true;
      }
    });
    BattleManager.needZIndexChange = false;
    _alias_vbsp_BattleManager_processTurn.call(this);
  };

  const _alias_vbsp_BattleManager_updateTurnEnd = BattleManager.updateTurnEnd;
  BattleManager.updateTurnEnd = function () {
    _alias_vbsp_BattleManager_updateTurnEnd.call(this);
    this._spriteset.refreshStandPictureForAll();
  };

  BattleManager.refreshStandPictureForAll = function () {
    this._spriteset.refreshStandPictureForAll();
  };

  const _alias_vbsp_BattleManager_startAction = BattleManager.startAction;
  BattleManager.startAction = function () {
    let subject = this._subject;
    const action = subject.currentAction();
    let targets = action.makeTargets();
    //23/01/19 なぜか拘束進行スキルも条件に含まれていたものを修正
    if (action.isSkill() && $dataSkills[action._item._itemId].meta.拘束スキル) {
      targets = targets.filter((actor) => {
        return !actor.actor().meta.noBind;
      });
      if (targets.length == 0) {
        BattleManager.startWaitAction(subject);
        return;
      }
      if (targets[0].isAffectedBindState()) {
        if (subject.troopIndex != targets[0].bindedEnemyIndex) {
          BattleManager.startWaitAction(subject);
          return;
        }
      }
      this.preDecidedTargerts = targets;
      this._logWindow.displayAction(subject, action.item());
      this.startBindArrowInputAction(action, targets);
      this._preSettingSkillAction = action;
      return;
    }
    const isAppTarget = action.isForRandom() || action.isForOne();
    const isNotSpecialAttack =
      !$dataSkills[action._item._itemId].meta.拘束進行スキル &&
      !$dataSkills[action._item._itemId].meta.ピストン;
    if (
      $gameParty.isAllMemberAffectedBind() &&
      isNotSpecialAttack &&
      this._subject.isEnemy()
    ) {
      BattleManager.startWaitAction(subject);
      return;
    }
    if (
      action.isSkill() &&
      $dataSkills[action._item._itemId].meta.特定状態スキル
    ) {
      BattleManager.needZIndexChange = true;
      if ($dataSkills[action._item._itemId].meta["SRD TAS"]) {
        _alias_vbsp_BattleManager_startAction.call(this);
        this.SRD_TAC_PreActionInfo = [subject, action];
        return;
      }
      this.stupPreActionCommonEvent(subject, action);
      return;
    }
    _alias_vbsp_BattleManager_startAction.call(this);
  };

  BattleManager.stupPreActionCommonEvent = function (subject, action) {
    const ind = $gameParty.members().indexOf(subject);
    const commonId =
      $dataSkills[
        action._item._itemId
      ].meta.発生コモンイベントＩＤ.toConvertNumberArray()[ind];
    if (!Number.isInteger(commonId)) {
      throw new Error(
        "発生コモンイベントＩＤの記述が間違っています。半角数字で指定してください。"
      );
    }
    this._logWindow.displayAction(subject, action.item());
    $gameTemp.reserveCommonEvent(commonId);
    $gameTroop.setupBattleEvent();
    this._preSettingSkillAction = action;
    this._phase = "preActionCommonEvent";
  };

  BattleManager.startWaitAction = function (subject) {
    var action = new Game_Action(subject);
    action.setSkill(_OBS_WaitSkillId);
    this._phase = "action";
    this._action = action;
    this._targets = [subject];
    subject.useItem(action.item());
    this._action.applyGlobal();
    this.refreshStatus();
    this._logWindow.startAction(subject, action, [subject]);
  };

  BattleManager.startBindAction = function () {
    var subject = this._subject;
    var action = this._preSettingSkillAction;
    var targets = this.preDecidedTargerts;
    subject.setBindedActorId(targets[0]._actorId);
    subject.bindTurn = 0;
    this._phase = "action";
    this._action = action;
    this._targets = targets;
    this._targets[0].bindedEnemyIndex = subject.troopIndex;
    subject.useItem(action.item());
    this._action.applyGlobal();
    this.refreshStatus();
    this._logWindow.startActionWithoutDisplay(subject, action, targets);
  };

  BattleManager.startBindArrowInputAction = function (action, actor) {
    this._phase = "BindArrowInput";
    const arrowNum = Number($dataSkills[action._item._itemId].meta.矢印数);
    let limitTime = Number($dataSkills[action._item._itemId].meta.制限時間);
    if (!Number.isInteger(arrowNum)) {
      throw new Error(
        "矢印数の指定が間違っています。半角数字を記述してください。"
      );
    }
    if (actor[0].isLewdness()) {
      limitTime = limitTime * (1 - _OBS_LewdStateBindTimeShortRate / 100);
    }
    this._spriteset.displayBindArrows(arrowNum, limitTime);
  };

  const _alias_vbsp_BattleManager_canEscape = BattleManager.canEscape;
  BattleManager.canEscape = function () {
    let isBinded = false;
    $gameParty.members().forEach(function (actor) {
      if (isBinded) {
        return;
      }
      isBinded = actor.isAffectedBindState();
    });
    if (isBinded) {
      return false;
    } else {
      return _alias_vbsp_BattleManager_canEscape.call(this);
    }
  };

  const _alias_vbsp_BattleManager_startInput = BattleManager.startInput;
  BattleManager.startInput = function () {
    _alias_vbsp_BattleManager_startInput.call(this);
    this.setVirginSkills();
  };

  //200121追加機能
  BattleManager.setVirginSkills = function () {
    $gameParty.battleMembers().forEach(function (actor) {
      const str = $dataActors[actor._actorId].meta.処女スキル;
      if (!str) {
        return;
      }
      const arr = str.toConvertNumberArray();
      if (actor.isVirgin()) {
        actor.learnSkill(arr[0]);
        actor.forgetSkill(arr[1]);
      } else {
        actor.learnSkill(arr[1]);
        actor.forgetSkill(arr[0]);
      }
    });
  };

  BattleManager.defeatRapeEndPros = function () {
    this.replayBgmAndBgs();
    this.endBattle(2);
    $gameParty.reviveBattleMembers();
    SceneManager.pop();
  };

  const _alias_vbsp_BattleManager_update = BattleManager.update;
  BattleManager.update = function () {
    if (!this.isBusy() && !this.updateEvent()) {
      switch (this._phase) {
        case "confirmDefeatEventEnd":
          //23/03/03 修正
          const interpreter =
            $gameParty.allBindableMembers()[0].defeatEventInterpreters;
          interpreter.update();
          if (!interpreter._childInterpreter) {
            if ($gameSwitches.value(_OBS_JudgeBattleEndSwitch)) {
              this.defeatRapeEndPros();
            } else {
              this._phase = "defeatLoopEvent";
            }
          }
          return;
        case "defeatLoopEvent":
          if (Input.isTriggered("cancel") || TouchInput.isCancelled()) {
            //23/02/22 修正
            const interpreter =
              $gameParty.allBindableMembers()[0].defeatEventInterpreters;
            interpreter.setupChild(
              $dataCommonEvents[_OBS_DefeatLoopEventEndCommonId].list,
              0
            );
            this._phase = "confirmDefeatEventEnd";
            Input.update();
            return;
          }
          if (SceneManager._scene._logWindow.isFastForward()) {
            //23/02/22 修正
            $gameParty.allBindableMembers().forEach(function (actor) {
              actor.defeatEventInterpreters.update();
              actor.defeatEventInterpreters.update();
              actor.defeatEventInterpreters.update();
            });
          } else {
            //23/02/22 修正
            $gameParty.allBindableMembers().forEach(function (actor) {
              actor.defeatEventInterpreters.update();
            });
          }
          return;
        case "battleEndEvent":
          $gameTroop.updateInterpreter();
          if ($gameTroop._interpreter.isRunning()) {
            return;
          }
          if ($gameSwitches.value(_OBS_JudgeBattleEndSwitch)) {
            this.defeatRapeEndPros();
          } else {
            this._phase = "defeatLoopEvent";
            $gameParty.reviveBattleMembers();
            //23/02/22 修正
            $gameParty.allBindableMembers().forEach(
              function (actor, index) {
                this.defeatEventInitSetting(actor);
                actor.defeatEventInterpreters = new Game_Interpreter();
                //23/08/21 一人目が男だった場合の敗北後レイプの修正
                actor.defeatEventInterpreters.actorIndex = $gameParty
                  .members()
                  .indexOf(actor);
                actor.defeatEventInterpreters["アクターのID"] = index + 1;
                BattleManager.addDefeatLog(
                  actor.name(),
                  actor.bindStateStandNameArray[0],
                  actor.bindStateStandNameArray[1]
                );
                $gameTemp.reserveCommonEvent(_OBS_DefeatLoopEventCommonId);
                actor.defeatEventInterpreters.setupReservedCommonEvent();
              }.bind(this)
            );
          }
          return;
        case "BindArrowInput":
          return;
        case "preActionCommonEvent":
          $gameTroop.updateInterpreter();
          if (!$gameTroop._interpreter.isRunning()) {
            this.villaSpecialSkill = true;
            BattleManager.startPreAction();
          }
          return;
        case "postActionCommonEvent":
          $gameTroop.updateInterpreter();
          if (!$gameTroop._interpreter.isRunning()) {
            this._logWindow.endAction(this._subject);
            this._phase = "turn";
          }
          return;
        case "preBindCommonEvent":
          $gameTroop.updateInterpreter();
          if (!$gameTroop._interpreter.isRunning()) {
            this.villaSpecialSkill = true;
            this.refreshStatus();
            this._logWindow.displayActionResults(
              this.postdisplayActionResultsArgs[0],
              this.postdisplayActionResultsArgs[1]
            );
            this._phase = "turn";
          }
          return;
      }
    }
    _alias_vbsp_BattleManager_update.call(this);
  };

  BattleManager.defeatEventInitSetting = function (actor) {
    let bindEnemyIndexArray = [];
    $gameTroop.members().forEach(function (member, index) {
      if (member.enemy().meta.拘束種類数) {
        bindEnemyIndexArray.push(index);
      }
    });
    const randInd = Math.floor(Math.random() * bindEnemyIndexArray.length);
    const enemyIndex = bindEnemyIndexArray[randInd];
    actor._bindMonster = $gameTroop.members()[enemyIndex];
    actor.bindedEnemyIndex = actor._bindMonster.troopIndex;
    actor.addState(_OBS_BindStateArr[0]);
    this._spriteset.refreshStandPictureForOne(actor);
  };
  /*
	const _alias_BattleManager_checkBattleEnd = BattleManager.checkBattleEnd;
	BattleManager.checkBattleEnd = function() {
		if (this._phase) {
			if ($gameTroop.isAllDead()) {
				$gameParty.battleMembers().forEach(actor => {
						console.log(actor.bindedEnemyIndex)
					if(actor.isAffectedBindState()){
						actor.removeAllBindState()
						actor.releaseFrombindProc();
						actor.refreshReleaseBind = true
						//22/11/04 追加
						actor.addState(_OBS_DownStateId)
						BattleManager._spriteset.refreshStandPictureForOne(actor);
					}
				})
				$gameTroop._interpreter.setupReservedCommonEvent();
			}
		}
		return _alias_BattleManager_checkBattleEnd.call(this);
	};
*/

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  const _alias_vbsp_Scene_Map_createDisplayObjects =
    Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function () {
    $gamePlayer.refresh();
    $gamePlayer.followers().forEach(function (actor) {
      actor.refresh();
    });
    _alias_vbsp_Scene_Map_createDisplayObjects.call(this);
  };

  //-----------------------------------------------------------------------------
  // Scene_Battle
  //zz

  const _alias_vbsp_Scene_Battle_create = Scene_Battle.prototype.create;
  Scene_Battle.prototype.create = function () {
    $gameParty.members().forEach(function (actor) {
      actor.preStandPicInfo = [];
      actor._preAp = actor.ap;
      actor.releaseFrombind = false;
    });
    _alias_vbsp_Scene_Battle_create.call(this);
  };

  const _alias_vbsp_Scene_Battle_createActorCommandWindow =
    Scene_Battle.prototype.createActorCommandWindow;
  Scene_Battle.prototype.createActorCommandWindow = function () {
    _alias_vbsp_Scene_Battle_createActorCommandWindow.call(this);
    this._actorCommandWindow.setHandler(
      "resist",
      this.commandResist.bind(this)
    );
    this._actorCommandWindow.setHandler("leave", this.commandLeave.bind(this));
    this._actorCommandWindow.setHandler(
      "standUp",
      this.commandStandUp.bind(this)
    );
  };

  Scene_Battle.prototype.commandResist = function () {
    BattleManager.inputtingAction().setResist();
    this.selectNextCommand();
  };

  //22/11/04 追加
  Scene_Battle.prototype.commandLeave = function () {
    BattleManager.inputtingAction().setLeave();
    this.selectNextCommand();
  };

  //22/11/04 追加
  Scene_Battle.prototype.commandStandUp = function () {
    BattleManager.inputtingAction().setStandUp();
    this.selectNextCommand();
  };

  Scene_Battle.prototype.updateWindowPositions = function () {
    var statusX = 0;
    if (BattleManager.isInputting()) {
      statusX =
        this._partyCommandWindow.width + _OBS_ActorStatusWindowAdjPos[0];
    } else {
      statusX =
        this._partyCommandWindow.width / 2 + _OBS_ActorStatusWindowAdjPos[0];
    }
    if (this._statusWindow.x < statusX) {
      this._statusWindow.x += 16;
      if (this._statusWindow.x > statusX) {
        this._statusWindow.x = statusX;
      }
    }
    if (this._statusWindow.x > statusX) {
      this._statusWindow.x -= 16;
      if (this._statusWindow.x < statusX) {
        this._statusWindow.x = statusX;
      }
    }
  };

  const _alias_vbsp_Scene_Battle_terminate = Scene_Battle.prototype.terminate;
  Scene_Battle.prototype.terminate = function () {
    _alias_vbsp_Scene_Battle_terminate.call(this);
    $gameParty.members().forEach(function (actor) {
      actor.preBindStandBaseName = "";
      actor.effectedByBind = false;
      actor.bindedEnemyIndex = -1;
    });
    $gameSystem.lostVirginGirlName = "";
  };

  //-----------------------------------------------------------------------------
  // Window_PartyCommand
  //

  const _alias_vbsp_Window_PartyCommand_initialize =
    Window_PartyCommand.prototype.initialize;
  Window_PartyCommand.prototype.initialize = function () {
    _alias_vbsp_Window_PartyCommand_initialize.call(this);
    this.x = _OBS_PartyWindowXPosWidth[0];
    this.width = _OBS_PartyWindowXPosWidth[1];
  };

  //-----------------------------------------------------------------------------
  // Window_ActorCommand
  //

  const _alias_vbsp_Window_ActorCommand_initialize =
    Window_ActorCommand.prototype.initialize;
  Window_ActorCommand.prototype.initialize = function () {
    _alias_vbsp_Window_ActorCommand_initialize.call(this);
    this.x = _OBS_ActorWindowXPosWidth[0];
    this.width = _OBS_ActorWindowXPosWidth[1];
  };

  const _alias_vbsp_Window_ActorCommand_makeCommandList =
    Window_ActorCommand.prototype.makeCommandList;
  Window_ActorCommand.prototype.makeCommandList = function () {
    if (this._actor) {
      if (this._actor.isAffectedStrongBindState()) {
        this.addResistCommand();
        this.addGuardCommand();
        this.addItemCommand();
      } else if (this._actor.isAffectedBindState()) {
        this.addAttackCommand();
        this.addSkillCommands();
        this.addResistCommand();
        this.addGuardCommand();
        this.addItemCommand();
      } else if (this._actor.isStateAffected(_OBS_DownStateId)) {
        //22/11/06 村人A追加
        this.addLeaveCommand();
        this.addStandUpCommand();
      } else {
        _alias_vbsp_Window_ActorCommand_makeCommandList.call(this);
      }
    }
  };

  Window_ActorCommand.prototype.addLeaveCommand = function () {
    this.addCommand("Wait", "leave", true);
  };

  Window_ActorCommand.prototype.addStandUpCommand = function () {
    this.addCommand("Stand Up", "standUp", true);
  };

  Window_ActorCommand.prototype.addAttackCommand = function () {
    this.addCommand(
      TextManager.attack,
      "attack",
      this._actor.canAttack() && !this._actor.isAffectedStrongBindState()
    );
  };

  Window_ActorCommand.prototype.addSkillCommands = function () {
    var skillTypes = this._actor.addedSkillTypes();
    skillTypes.sort(function (a, b) {
      return a - b;
    });
    skillTypes.forEach(function (stypeId) {
      var name = $dataSystem.skillTypes[stypeId];
      if (name == _OBS_ResistSkillTypeName) {
        this.addCommand(
          name,
          "skill",
          this._actor.isAffectedBindState(),
          stypeId
        );
      } else {
        this.addCommand(
          name,
          "skill",
          !this._actor.isAffectedStrongBindState(),
          stypeId
        );
      }
    }, this);
  };

  Window_ActorCommand.prototype.addGuardCommand = function () {
    this.addCommand(TextManager.guard, "guard", this._actor.canGuard());
  };

  Window_ActorCommand.prototype.addResistCommand = function () {
    this.addCommand(_OBS_ResistSkillTypeName, "resist", true);
  };

  //-----------------------------------------------------------------------------
  // Sprite_Base
  //

  const _alias_vbsp_Spriteset_Battle_startAnimation =
    Sprite_Base.prototype.startAnimation;
  Sprite_Base.prototype.startAnimation = function (animation, mirror, delay) {
    if (BattleManager.needZIndexChange) {
      var sprite = new Sprite_Animation();
      sprite.setup(this._effectTarget, animation, mirror, delay);
      SceneManager._scene._spriteset.specialAnimationLayer.addChild(sprite);
      this._animationSprites.push(sprite);
    } else {
      _alias_vbsp_Spriteset_Battle_startAnimation.call(
        this,
        animation,
        mirror,
        delay
      );
    }
  };

  const _alias_vbsp_Sprite_Animation_isPlaying =
    Sprite_Animation.prototype.isPlaying;
  Sprite_Animation.prototype.isPlaying = function () {
    if (BattleManager.needZIndexChange) {
      if (this._animation.position == 3) {
        SceneManager._scene._spriteset.specialAnimationLayer.x =
          Graphics.width / 2;
        SceneManager._scene._spriteset.specialAnimationLayer.y = 100;
      } else {
        SceneManager._scene._spriteset.specialAnimationLayer.x = 0;
        SceneManager._scene._spriteset.specialAnimationLayer.y = 0;
      }
    }
    return _alias_vbsp_Sprite_Animation_isPlaying.call(this);
  };

  //-----------------------------------------------------------------------------
  // Sprite_Actor
  //

  Sprite_Actor.prototype.setActorHome = function (index) {
    let pos, adj;

    if ($gameParty.members().length == 1) {
      pos = _OBS_BattleStandPicturePositionOnlyone;
      adj = _OBS_AdjustChara1AnimationPosition;
    } else {
      pos = [
        _OBS_Chara1BattleStandPicturePosition,
        _OBS_Chara2BattleStandPicturePosition,
      ][index] || [0, 0];
      adj = [
        _OBS_AdjustChara1AnimationPosition,
        _OBS_AdjustChara2AnimationPosition,
      ][index] || [0, 0];
    }
    const size = _OBS_Chara1BattleStandPictureSize;
    this.setHome(pos[0] + size[0] / 2 + adj[0], pos[1] + size[1] / 2 + adj[1]);
  };

  //-----------------------------------------------------------------------------
  // Spriteset_Battle
  //

  Spriteset_Battle.prototype.displayBindArrows = function (
    arrowNum,
    limitTime
  ) {
    this.bindArrowDirArray = [];
    this.nowArrowIndex = 0;
    const dirArray = [2, 4, 8, 6];
    for (let i = 0; i < arrowNum; i++) {
      const dirIndex = Math.floor(Math.random() * arrowNum);
      const dir = dirArray[dirIndex];
      const sprite = this.bindArrowSpriteArray[i * 2];
      const doneSprite = this.bindArrowSpriteArray[i * 2 + 1];
      sprite.rotation = (dirIndex * Math.PI) / 2;
      doneSprite.rotation = (dirIndex * Math.PI) / 2;
      sprite.visible = true;
      this.bindArrowDirArray.push(dir);
    }
    const color = "#" + _OBS_BindArrowtimeGaugeColor;
    this.bindArrowTimeGauge.bitmap.fillAll(color);
    this.bindArrowSpritesArray.forEach(function (sprite) {
      sprite.visible = true;
    });
    this.limitTime = this.maxLimitTime = limitTime;
  };

  Spriteset_Battle.prototype.hideBindArrowsSprites = function () {
    for (let i = 0, n = this.bindArrowSpriteArray.length; i < n; i++) {
      const sprite = this.bindArrowSpriteArray[i];
      sprite.visible = false;
    }
    this.bindArrowSpritesArray.forEach(function (sprite) {
      sprite.visible = false;
    });
  };

  const _alias_vbsp_Spriteset_Battle_createTimer =
    Spriteset_Battle.prototype.createTimer;
  Spriteset_Battle.prototype.createTimer = function () {
    this.createBindArrowSprites();
    _alias_vbsp_Spriteset_Battle_createTimer.call(this);
  };

  const _alias_vbsp_Spriteset_Battle_createActors =
    Spriteset_Battle.prototype.createActors;
  Spriteset_Battle.prototype.createActors = function () {
    this.createSpecialAnimationLayer();
    this.createStandPicture();
    this.refreshStandPictureForAll();
    _alias_vbsp_Spriteset_Battle_createActors.call(this);
    this._actorSprites.forEach(function (sprite) {
      sprite.opacity = 0;
    });
  };

  Spriteset_Battle.prototype.createSpecialAnimationLayer = function () {
    this.specialAnimationLayer = new Sprite();
    this.specialAnimationLayer.z = 6;
    this._battleField.addChild(this.specialAnimationLayer);
  };

  Spriteset_Battle.prototype.createBindArrowSprites = function () {
    this.bindArrowSpritesArray = [];
    this.savedVisiblStandSpriteKeys = [];

    this.bindArrowBack = new Sprite();
    this.bindArrowBack.bitmap = ImageManager.loadSystem("arrowFrame");
    this.bindArrowBack.x = _OBS_BindArrowBackPos[0];
    this.bindArrowBack.y = _OBS_BindArrowBackPos[1];
    this.bindArrowBack.visible = false;
    this.bindArrowSpritesArray.push(this.bindArrowBack);
    this.addChild(this.bindArrowBack);

    const iniX = _OBS_BindArrowPosAndSpace[0];
    const iniY = _OBS_BindArrowPosAndSpace[1];
    this.bindArrowSpriteArray = [];
    const space = _OBS_BindArrowPosAndSpace[2];
    const arrowName = ["BindArrow", "DoneBindArrow"];
    for (let i = 0, n = _OBS_MaxBindArrowNum; i < n; i++) {
      for (let j = 0; j < 2; j++) {
        const sprite = new Sprite();
        sprite.bitmap = ImageManager.loadSystem(arrowName[j]);
        sprite.x = iniX + i * space;
        sprite.y = iniY;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.visible = false;
        this.addChild(sprite);
        this.bindArrowSpriteArray.push(sprite);
      }
    }

    const gaugeX = _OBS_BindArrowtimeGaugePosAndSize[0];
    const gaugeY = _OBS_BindArrowtimeGaugePosAndSize[1];
    const gaugeWidth = _OBS_BindArrowtimeGaugePosAndSize[2];
    const gaugeHeight = _OBS_BindArrowtimeGaugePosAndSize[3];

    this.bindArrowGaugeBack = new Sprite();
    this.bindArrowGaugeBack.bitmap = ImageManager.loadSystem("gaugeFrame");
    this.bindArrowGaugeBack.x = _OBS_BindArrowtimeGaugeBackPos[0];
    this.bindArrowGaugeBack.y = _OBS_BindArrowtimeGaugeBackPos[1];
    this.bindArrowGaugeBack.visible = false;
    this.bindArrowSpritesArray.push(this.bindArrowGaugeBack);
    this.addChild(this.bindArrowGaugeBack);

    this.bindArrowTimeGauge = new Sprite();
    this.bindArrowTimeGauge.bitmap = new Bitmap(gaugeWidth, gaugeHeight);
    const color = "#" + _OBS_BindArrowtimeGaugeColor;
    this.bindArrowTimeGauge.bitmap.fillAll(color);
    this.bindArrowTimeGauge.x = gaugeX;
    this.bindArrowTimeGauge.y = gaugeY;
    this.bindArrowTimeGauge.visible = false;
    this.bindArrowSpritesArray.push(this.bindArrowTimeGauge);
    this.addChild(this.bindArrowTimeGauge);
    this.bindArrowTouchControllerSprite = new Sprite();
    this.bindArrowTouchControllerSprite.bitmap =
      ImageManager.loadSystem("ArrowTouchInputImg");
    this.bindArrowTouchControllerSprite.x = _OBS_BindArrowTouchPadPos[0];
    this.bindArrowTouchControllerSprite.y = _OBS_BindArrowTouchPadPos[1];
    this.bindArrowTouchControllerSprite.visible = false;
    this.bindArrowSpritesArray.push(this.bindArrowTouchControllerSprite);
    this.addChild(this.bindArrowTouchControllerSprite);
  };

  Spriteset_Battle.prototype.createStandPicture = function () {
    this.createCharaContainer();
    this.createBaseStandPictureSprites();
    this.createBindStandPictureSprites();
  };

  Spriteset_Battle.prototype.createCharaContainer = function () {
    const width = Graphics.boxWidth;
    const height = Graphics.boxHeight;
    const x = (Graphics.width - width) / 2;
    const y = (Graphics.height - height) / 2;
    this._standpictureContainer = new Sprite();
    this._standpictureContainer.z = 7;
    this._standpictureContainer.setFrame(x, y, width, height);
    this._battleField.addChild(this._standpictureContainer);

    this._chara1Container = new Sprite();
    this._chara1Container.setFrame(x, y, width, height);
    this._chara2Container = new Sprite();
    this._chara2Container.setFrame(x, y, width, height);
    this._standpictureContainer.addChild(this._chara2Container);
    this._standpictureContainer.addChild(this._chara1Container);

    this.charaContainerArray = [this._chara1Container, this._chara2Container];

    for (let i = 0, n = this.charaContainerArray.length; i < n; i++) {
      const container = this.charaContainerArray[i];

      container._lowerStandpictureLayer = new Sprite();
      container._lowerStandpictureLayer.setFrame(x, y, width, height);
      container.addChild(container._lowerStandpictureLayer);

      container._baseStandpictureLayer = new Sprite();
      container._baseStandpictureLayer.setFrame(x, y, width, height);
      container.addChild(container._baseStandpictureLayer);

      container._upperStandpictureLayer = new Sprite();
      container._upperStandpictureLayer.setFrame(x, y, width, height);
      container.addChild(container._upperStandpictureLayer);
    }
  };

  Spriteset_Battle.prototype.createBaseStandPictureSprites = function () {
    const ImgNameArr = [
      "fullArmor_base",
      "breakArmor_base",
      "noArmor_base",
      "fullArmor_dead_base",
      "breakArmor_dead_base",
      "noArmor_dead_base",
      "fullArmor_down_base",
      "breakArmor_down_base",
      "noArmor_down_base",
      "high_hpFace",
      "middle_hpFace",
      "low_hpFace",
      "onState1",
      "onState2",
      "deadOnState",
      "downOnState",
    ];
    //"damageFace"];
    this.standPictureSprites = [];
    for (let a = 1, p = $gameParty.battleMembers().length; a <= p; a++) {
      const actor = $gameParty.battleMembers()[a - 1];
      let nameObj = {};
      if (!actor.actor().meta.noBind) {
        const container = this.charaContainerArray[a - 1];
        const pos = $gameParty.getStandPicturePosArray(a);
        for (let i = 0, n = ImgNameArr.length; i < n; i++) {
          //23/07/14 chara_1固定
          //const bitmap = ImageManager.loadNomalStandPicture(a, ImgNameArr[i]);
          const bitmap = ImageManager.loadNomalStandPicture(1, ImgNameArr[i]);
          const sprite = new Sprite(bitmap);
          sprite.x = pos[0];
          sprite.y = pos[1];
          sprite.visible = false;
          if (i <= 5) {
            container._baseStandpictureLayer.addChild(sprite);
          } else {
            container._upperStandpictureLayer.addChild(sprite);
          }
          nameObj[ImgNameArr[i]] = sprite;
        }
      }
      this.standPictureSprites.push(nameObj);
    }
  };

  Spriteset_Battle.prototype.createBindStandPictureSprites = function () {
    let enemyKindArr = [];
    const loadBindImgNameArray = [
      "breakArmor_base",
      "fullArmor_base",
      "noArmor_base",
      "onState",
      "lewd_face",
      "nomal_face",
      "lose_face",
    ];
    $gameTroop._setupMembers = [];
    for (
      let tMenberIndex = 0, memberNum = $gameTroop.members().length;
      tMenberIndex < memberNum;
      tMenberIndex++
    ) {
      const enemyMember = $gameTroop.members()[tMenberIndex];
      enemyMember.isNeedUpperLayer = false;
      if (enemyMember.enemy().meta.上レイヤー) {
        loadBindImgNameArray.push("enemy_upper");
        enemyMember.isNeedUpperLayer = true;
      }
      enemyMember.isNeedLowerLayer = false;
      if (enemyMember.enemy().meta.下レイヤー) {
        loadBindImgNameArray.push("enemy_lower");
        enemyMember.isNeedLowerLayer = true;
      }
      $gameTroop._setupMembers.push(enemyMember);
      if (!~enemyKindArr.indexOf(enemyMember.originalName())) {
        enemyKindArr.push(enemyMember.originalName());
        if (!enemyMember.enemy().meta.拘束種類数) {
          continue;
        }
        const bindNum = Number(enemyMember.enemy().meta.拘束種類数);
        if (!Number.isInteger(bindNum)) {
          throw new Error(
            "拘束種類数の指定が間違っています。半角数字を記述してください。"
          );
        }
        //23/07/14 len1を１から戦闘メンバー分に変更
        const len = $gameParty.battleMembers().length;
        for (let actorIndex = 1; actorIndex <= len; actorIndex++) {
          const actor = $gameParty.battleMembers()[actorIndex - 1];
          if (actor.actor().meta.noBind) {
            continue;
          }
          const pos = $gameParty.getStandPicturePosArray(actorIndex);
          const container = this.charaContainerArray[actorIndex - 1];
          for (let i = 1; i < bindNum + 1; i++) {
            for (let j = 0, m = loadBindImgNameArray.length; j < m; j++) {
              let partName = loadBindImgNameArray[j];
              if (j > 3) {
                const bindProsNum = _OBS_BindStateArr.length - 1;
                for (let h = 1; h <= bindProsNum; h++) {
                  if (h == 2 && j > 5) {
                    const indPartName = partName + "_" + h + "ex";
                    this.createActiveBindSprite(
                      container,
                      indPartName,
                      pos,
                      actorIndex,
                      enemyMember,
                      i
                    );
                  }
                  const indPartName = partName + "_" + h;
                  this.createActiveBindSprite(
                    container,
                    indPartName,
                    pos,
                    actorIndex,
                    enemyMember,
                    i
                  );
                }
              } else {
                this.createStaticBindSprite(
                  container,
                  partName,
                  pos,
                  actorIndex,
                  enemyMember,
                  i
                );
              }
            }
          }
        }
      }
    }
  };

  Spriteset_Battle.prototype.createStaticBindSprite = function (
    container,
    partName,
    pos,
    actorIndex,
    enemyMember,
    i
  ) {
    //23/07/14 chara_1固定
    //const bitmap = ImageManager.loadBindStandPicture(partName, actorIndex, enemyMember.originalName(), i);
    const bitmap = ImageManager.loadBindStandPicture(
      partName,
      1,
      enemyMember.originalName(),
      i
    );
    const sprite = new Sprite(bitmap);
    sprite.x = pos[0];
    sprite.y = pos[1];
    sprite.visible = false;
    container._baseStandpictureLayer.addChild(sprite);
    const spriteName = enemyMember.originalName() + "_" + i + "_" + partName;
    this.standPictureSprites[actorIndex - 1][spriteName] = sprite;
  };

  Spriteset_Battle.prototype.createActiveBindSprite = function (
    container,
    indPartName,
    pos,
    actorIndex,
    enemyMember,
    i
  ) {
    //23/07/14 chara_1固定
    //const bitmap = ImageManager.loadBindStandPicture(indPartName, actorIndex, enemyMember.originalName(), i);
    const bitmap = ImageManager.loadBindStandPicture(
      indPartName,
      1,
      enemyMember.originalName(),
      i
    );
    const sprite = new Sprite(bitmap);
    sprite.x = pos[0];
    sprite.y = pos[1];
    sprite.visible = false;
    if (~indPartName.indexOf("enemy_lower")) {
      container._lowerStandpictureLayer.addChild(sprite);
    } else {
      container._upperStandpictureLayer.addChild(sprite);
    }
    const spriteName = enemyMember.originalName() + "_" + i + "_" + indPartName;
    this.standPictureSprites[actorIndex - 1][spriteName] = sprite;
  };

  Spriteset_Battle.prototype.toInvisiblePreStandPicture = function (
    actor,
    index
  ) {
    const preInfo = actor.preStandPicInfo.concat();
    preInfo.forEach(function (info) {
      if (info != "") this.standPictureSprites[index][info].visible = false;
    }, this);
    if (actor.isStateAffected(_OBS_ChangeBattleStandPictureStateId)) {
      this.standPictureSprites[index]["deadOnState"].visible = false;
      this.standPictureSprites[index]["downOnState"].visible = false;
    }
  };

  Spriteset_Battle.prototype.refreshStandPictureForAll = function () {
    $gameParty.allMembers().forEach(function (actor, index) {
      this.refreshStandPictureForOne(actor, index);
    }, this);
  };

  Spriteset_Battle.prototype.refreshStandPictureForOne = function (
    actor,
    index
  ) {
    //23/01/03 対象アクターの立ち絵のみ表示
    if (actor.actor().meta.noBind) {
      return;
    }
    index = index || $gameParty.allMembers().indexOf(actor);

    if (actor.isDead()) {
      this.refreshDeadStandPicture(actor, index);
    } else {
      if (BattleManager._phase == "defeatLoopEvent") {
        //23/01/18 追加
        const bindPros = actor.bindStateStandNameArray
          ? actor.bindStateStandNameArray[1]
          : null;
        this.checkNeedAnimationPicture(bindPros == "2ex", actor, index);
        this.toInvisiblePreStandPicture(actor, index);
        actor.releaseFrombind = false;
        actor.effectedByBind = false;
        if (!this.checkIsBindAffect(actor, index)) {
          this.refreshNomalStandPicture(actor, index);
        }
        return;
      }
      if (actor.releaseFrombind && !actor.refreshReleaseBind) {
        return;
      }
      if (actor.refreshReleaseBind) {
        this.toInvisiblePreStandPicture(actor, index);
        this.refreshNomalStandPicture(actor, index);
        actor.releaseFrombind = false;
        actor.effectedByBind = false;
        actor.refreshReleaseBind = false;
      } else if (!this.checkIsBindAffect(actor, index)) {
        this.refreshNomalStandPicture(actor, index);
      }
    }
  };

  Spriteset_Battle.prototype.refreshDeadStandPicture = function (actor, index) {
    this.toInvisiblePreStandPicture(actor, index);
    const baseName = actor.getActorStandPictureName()[0];
    this.standPictureSprites[index][baseName].visible = true;
    const hpName = ["high", "middle", "low"];
    for (let i = 0, n = hpName.length; i < n; i++) {
      const name = hpName[i] + "_hpFace";
      const sprite = this.standPictureSprites[index][name];
      sprite.visible = false;
    }
    if (actor.isStateAffected(_OBS_ChangeBattleStandPictureStateId)) {
      this.standPictureSprites[index]["deadOnState"].visible = true;
    }
    actor.preStandPicInfo[0] = baseName;
    actor.preStandPicInfo[1] =
      actor.preStandPicInfo[2] =
      actor.preStandPicInfo[3] =
      actor.preStandPicInfo[4] =
        "";
  };

  Spriteset_Battle.prototype.checkIsBindAffect = function (actor, index) {
    if (actor.isAffectedBindState() && actor.bindedEnemyIndex >= 0) {
      if (!actor.effectedByBind) {
        this.toInvisiblePreStandPicture(actor, index);
      }
      this.refreshBindStandPicture(actor, index);
      actor.effectedByBind = true;
      return true;
    } else {
      return false;
    }
  };

  //22/11/04 追加
  Spriteset_Battle.prototype.hideAndSaveStandPicture = function (index) {
    const obj = this.standPictureSprites[index];
    const visibledSpritesKeys = Object.keys(obj).filter(
      (key) => obj[key].visible
    );
    this.savedVisiblStandSpriteKeys[index] = visibledSpritesKeys.concat();
    visibledSpritesKeys.forEach((key) => (obj[key].visible = false));
    if ($gameTroop.isEventRunning()) {
      $gameTroop._interpreter.setupChild(
        $dataCommonEvents[_OBS_PistonAnimationStartCommonID].list,
        0
      );
    } else {
      $gameTemp.reserveCommonEvent(_OBS_PistonAnimationStartCommonID);
      $gameTroop._interpreter.setupReservedCommonEvent();
    }
    //$gameTroop._interpreter.executeCommand();
  };

  //22/11/04 追加
  Spriteset_Battle.prototype.showAndSaveStandPicture = function () {
    const index = $gameParty
      .battleMembers()
      .map((a) => a._actorId)
      .indexOf($gameSystem.bindedActorId);
    const actor = $gameParty.battleMembers()[index];
    actor.isPistonAttacked = false;
    if (
      !this.savedVisiblStandSpriteKeys[index] ||
      this.savedVisiblStandSpriteKeys[index].length == 0
    ) {
      return;
    }
    if (!actor.isDeathStateAffected()) {
      const obj = this.standPictureSprites[index];
      this.savedVisiblStandSpriteKeys[index].forEach(
        (key) => (obj[key].visible = true)
      );
    }
    this.savedVisiblStandSpriteKeys[index] = [];
  };

  //23/01/18 追加
  Spriteset_Battle.prototype.checkNeedAnimationPicture = function (
    isBindPros,
    actor,
    index
  ) {
    //actor.isPistonAttacked
    if (
      isBindPros &&
      (!this.savedVisiblStandSpriteKeys[index] ||
        this.savedVisiblStandSpriteKeys[index].length == 0)
    ) {
      $gameVariables.setValue(
        _OBS_PistonAnimtionEnemyValId,
        $gameTroop._setupMembers[actor.bindedEnemyIndex - 1]._enemyId
      );
      $gameVariables.setValue(
        _OBS_PistonAnimtionBindKindValId,
        actor.bindStandnumber
      );
      //23/02/22 修正
      if (BattleManager._phase == "defeatLoopEvent") {
        this.hideAndSaveStandPicture(index);
      }
      $gameTemp.pistonAnimationActorIndex = index;
      return;
    }
  };

  Spriteset_Battle.prototype.refreshBindStandPicture = function (actor, index) {
    const baseName = actor.getActorStandPictureName()[0];
    const isArmored = actor.getActorStandPictureName()[1];
    const enemyName = actor.bindStateStandNameArray[0];
    const bindPros = actor.bindStateStandNameArray[1];
    const preInfo = actor.preStandPicInfo.concat();
    const baseSpriteName = [enemyName, actor.bindStandnumber, baseName].join(
      "_"
    );
    const standPictureSprite = this.standPictureSprites[index];
    if (baseSpriteName != preInfo[0]) {
      if (preInfo[0]) {
        actor.preStandPicInfo[0] = baseSpriteName;
      }
    }
    if (
      actor.preBindStandBaseName != "" &&
      baseSpriteName != actor.preBindStandBaseName
    ) {
      standPictureSprite[actor.preBindStandBaseName].visible = false;
    }

    //23/01/18 追加
    this.checkNeedAnimationPicture(bindPros == 2, actor, index);
    if (
      this.savedVisiblStandSpriteKeys[index] &&
      this.savedVisiblStandSpriteKeys[index].length > 0
    ) {
      return;
    }

    actor.preBindStandBaseName = baseSpriteName;
    if (!actor.bindStandnumber) {
      throw new Error(
        "拘束番号が不正です。敵のデータベースの拘束種類数の記述があるか、間違っていないかご確認ください。"
      );
    }
    if (!standPictureSprite[baseSpriteName]) {
      throw new Error(
        "不正な立ち絵画像が選択されました。敵：" +
          enemyName +
          " 拘束番号:" +
          actor.bindStandnumber +
          " 基本名：" +
          baseName
      );
    }
    standPictureSprite[baseSpriteName].visible = true;
    if ($gameTroop._setupMembers[actor.bindedEnemyIndex - 1].isNeedUpperLayer) {
      const enemyUpperShadowName = "enemy_upper_" + bindPros;
      const enemyUpperSpriteName = [
        enemyName,
        actor.bindStandnumber,
        enemyUpperShadowName,
      ].join("_");
      if (enemyUpperSpriteName != preInfo[1]) {
        if (preInfo[1]) {
          standPictureSprite[preInfo[1]].visible = false;
        }
        standPictureSprite[enemyUpperSpriteName].visible = true;
        actor.preStandPicInfo[1] = enemyUpperSpriteName;
      }
    }

    if ($gameTroop._setupMembers[actor.bindedEnemyIndex - 1].isNeedLowerLayer) {
      const enemyLowerShadowName = "enemy_lower_" + bindPros;
      const enemyLowerSpriteName = [
        enemyName,
        actor.bindStandnumber,
        enemyLowerShadowName,
      ].join("_");
      if (enemyLowerSpriteName != preInfo[2]) {
        if (preInfo[2]) {
          standPictureSprite[preInfo[2]].visible = false;
        }
        standPictureSprite[enemyLowerSpriteName].visible = true;
        actor.preStandPicInfo[2] = enemyLowerSpriteName;
      }
    }

    if (BattleManager._phase == "defeatLoopEvent") {
      const faceName = "lose_face_" + bindPros;
      const faceSpriteName = [enemyName, actor.bindStandnumber, faceName].join(
        "_"
      );
      if (faceSpriteName != preInfo[3]) {
        if (preInfo[3]) {
          standPictureSprite[preInfo[3]].visible = false;
        }
        standPictureSprite[faceSpriteName].visible = true;
        actor.preStandPicInfo[3] = faceSpriteName;
      }
    } else {
      const lewdId = _OBS_ChangeBattleStandPictureVariableIdArr[index];
      const lewdVal = $gameVariables.value(lewdId);
      for (let i = 0, n = _OBS_ChangeValRate.length; i < n; i++) {
        const range = _OBS_ChangeValRate[i];
        if (range[1] <= lewdVal && lewdVal <= range[0]) {
          const faceInd = i >= 1 ? 1 : 0;
          const faceName =
            ["lewd_face", "nomal_face"][faceInd] + "_" + bindPros;
          const faceSpriteName = [
            enemyName,
            actor.bindStandnumber,
            faceName,
          ].join("_");
          if (faceSpriteName != preInfo[3]) {
            if (preInfo[3]) {
              standPictureSprite[preInfo[3]].visible = false;
            }
            standPictureSprite[faceSpriteName].visible = true;
            actor.preStandPicInfo[3] = faceSpriteName;
          }
        }
      }
    }

    const bindSpriteName = [enemyName, actor.bindStandnumber, "onState"].join(
      "_"
    );
    if (actor.isStateAffected(_OBS_ChangeBattleStandPictureStateId)) {
      standPictureSprite[bindSpriteName].visible = true;
      actor.preStandPicInfo[4] = bindSpriteName;
    } else {
      if (preInfo[4] == bindSpriteName) {
        standPictureSprite[bindSpriteName].visible = false;
      }
      actor.preStandPicInfo[4] = "";
    }
  };

  Spriteset_Battle.prototype.refreshNomalStandPicture = function (
    actor,
    index
  ) {
    const preInfo = actor.preStandPicInfo.concat();
    const baseName = actor.getActorStandPictureName()[0];
    const isArmored = actor.getActorStandPictureName()[1];
    if (baseName != preInfo[0]) {
      if (preInfo.length != 0) {
        this.standPictureSprites[index][preInfo[0]].visible = false;
        if (preInfo[0].indexOf("dead") >= 0 && baseName.indexOf("dead") < 0) {
          this.standPictureSprites[index]["deadOnState"].visible = false;
        }
        if (preInfo[0].indexOf("down") >= 0 && baseName.indexOf("down") < 0) {
          this.standPictureSprites[index]["downOnState"].visible = false;
        }
      }
      this.standPictureSprites[index][baseName].visible = true;
      actor.preStandPicInfo[0] = baseName;
    }
    const hpName = ["high", "middle", "low"];
    for (let i = 0, n = _OBS_ChangeHpRate.length; i < n; i++) {
      //22/11/04 追加
      if (actor.isDead() || actor.isStateAffected(_OBS_DownStateId)) {
        continue;
      }
      let arr = _OBS_ChangeHpRate[i];
      const hp = Math.round(actor.hpRate() * 100);
      if (arr[1] <= hp && hp <= arr[0]) {
        const name = hpName[i] + "_hpFace";
        if (name != preInfo[1] || actor.releaseFrombind) {
          actor.preStandPicInfo[1] = name;
          if (preInfo[1]) {
            this.standPictureSprites[index][preInfo[1]].visible = false;
          }
          this.standPictureSprites[index][name].visible = true;
        }
        break;
      }
    }
    if (actor.isStateAffected(_OBS_ChangeBattleStandPictureStateId)) {
      //22/11/04 追加
      const isDown = actor.isStateAffected(_OBS_DownStateId);
      const stateName = isDown
        ? "downOnState"
        : isArmored
        ? "onState1"
        : "onState2";
      if (stateName != preInfo[2]) {
        const preSprite = this.standPictureSprites[index][preInfo[2]];
        if (preSprite) {
          preSprite.visible = false;
        }
        this.standPictureSprites[index][stateName].visible = true;
        actor.preStandPicInfo[2] = stateName;
      }
    } else {
      if (preInfo[2]) {
        this.standPictureSprites[index][
          actor.preStandPicInfo[2]
        ].visible = false;
      }
      actor.preStandPicInfo[2] = "";
    }
    actor.preStandPicInfo[3] = actor.preStandPicInfo[4] = "";
  };

  const _alias_vbsp_Spriteset_Battle_update = Spriteset_Battle.prototype.update;
  Spriteset_Battle.prototype.update = function (actor, index) {
    _alias_vbsp_Spriteset_Battle_update.call(this);
    this.updateBindArrowTime();
    //this.updateDamageFace();
  };
  /*
	Spriteset_Battle.prototype.updateDamageFace = function() {
		$gameParty.allMembers().forEach(function(actor, index){
			if(!actor.requestDamageFace){return}
			if(!actor.preStandPicInfo[1]){return}
			if(actor.damageFaceCount == 0){
				this.standPictureSprites[index][actor.preStandPicInfo[1]].visible = false;
				this.standPictureSprites[index]["damageFace"].visible = true;
			}
			if(actor.damageFaceCount > _OBS_DamageFaceFlame){
				this.standPictureSprites[index][actor.preStandPicInfo[1]].visible = true;
				this.standPictureSprites[index]["damageFace"].visible = false;
				actor.requestDamageFace = false;
			}
			actor.damageFaceCount++
		}.bind(this))
	}
	*/
  Spriteset_Battle.prototype.updateBindArrowTime = function () {
    if (this.limitTime > 0) {
      const x =
        (_OBS_BindArrowtimeGaugePosAndSize[2] * this.limitTime) /
        this.maxLimitTime;
      const width =
        _OBS_BindArrowtimeGaugePosAndSize[2] *
          (1 - this.limitTime / this.maxLimitTime) +
        10;
      this.bindArrowTimeGauge.bitmap.clearRect(
        x,
        0,
        width,
        _OBS_BindArrowtimeGaugePosAndSize[3]
      );
      this.limitTime--;
      if (this.limitTime <= 0) {
        this.endBindArrowPros(2);
      }
      this.updateBindArrowInput();
    }
  };

  Spriteset_Battle.prototype.updateBindArrowInput = function () {
    const dirNum = this.bindArrowDirArray[this.nowArrowIndex];
    const isInput = ["up", "right", "down", "left"].filter(function (dir) {
      return Input.isTriggered(dir);
    });
    if (isInput.length != 0) {
      this.checkInputCorrect(Input.dir4);
    }
    this.updateTouchInputArrowDirection();
  };

  Spriteset_Battle.prototype.checkInputCorrect = function (inputDir) {
    if (inputDir == this.bindArrowDirArray[this.nowArrowIndex]) {
      this.bindArrowSpriteArray[this.nowArrowIndex * 2].visible = false;
      this.bindArrowSpriteArray[this.nowArrowIndex * 2 + 1].visible = true;
      this.nowArrowIndex++;
      if (this.bindArrowSpriteArray.length / 2 == this.nowArrowIndex) {
        this.endBindArrowPros(1);
      } else {
        AudioManager.playSe(_OBS_ArrowInputSE);
      }
    } else {
      this.endBindArrowPros(2);
    }
    Input.update();
  };

  Spriteset_Battle.prototype.updateTouchInputArrowDirection = function () {
    if (!TouchInput.isTriggered()) {
      return;
    }
    const tx = _OBS_BindArrowTouchPadPos[0];
    const ty = _OBS_BindArrowTouchPadPos[1];
    const tw = this.bindArrowTouchControllerSprite.bitmap.width;
    const th = this.bindArrowTouchControllerSprite.bitmap.height;
    const imgPos = [tx, ty];
    const cellSize = [tw / 3, th / 3];
    const dlruPos = [
      [imgPos[0] + cellSize[0], imgPos[1] + cellSize[1] * 2],
      [imgPos[0], imgPos[1] + cellSize[1]],
      [imgPos[0] + cellSize[0] * 2, imgPos[1] + cellSize[1]],
      [imgPos[0] + cellSize[0], imgPos[1]],
    ];
    for (let i = 0, n = dlruPos.length; i < n; i++) {
      const pos = dlruPos[i];
      if (
        pos[0] < TouchInput.x &&
        TouchInput.x < pos[0] + cellSize[0] &&
        pos[1] < TouchInput.y &&
        TouchInput.y < pos[1] + cellSize[1]
      ) {
        const dir = (i + 1) * 2;
        this.checkInputCorrect(dir);
      }
    }
  };

  Spriteset_Battle.prototype.endBindArrowPros = function (success) {
    BattleManager._phase = "turn";
    this.limitTime = 0;
    this.hideBindArrowsSprites();
    if (success == 2) {
      BattleManager.startBindAction();
      AudioManager.playSe(_OBS_ArrowInputfailureSE);
    } else {
      AudioManager.playSe(_OBS_ArrowInputSuccessSE);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_BattleLog
  //

  Window_BattleLog.prototype.startActionWithoutDisplay = function (
    subject,
    action,
    targets
  ) {
    var item = action.item();
    this.push("performActionStart", subject, action);
    this.push("waitForMovement");
    this.push("performAction", subject, action);
    this.push("showAnimation", subject, targets.clone(), item.animationId);
    this.push("wait");
  };

  const _alias_vbsp_Window_BattleLog_displayAddedStates =
    Window_BattleLog.prototype.displayAddedStates;
  Window_BattleLog.prototype.displayAddedStates = function (target) {
    let isResist = false;
    target
      .result()
      .addedStateObjects()
      .forEach(function (state) {
        if (state.id == _OBS_ResistStateId && target.isAffectedBindState()) {
          this.push("popBaseLine");
          this.push("pushBaseLine");
          this.push("addText", target.name() + _OBS_FailurResistSkillMessage);
          isResist = true;
          return;
        }
      }, this);
    if (!isResist) {
      _alias_vbsp_Window_BattleLog_displayAddedStates.call(this, target);
    }
  };

  //23/02/17 修正
  const _alias_Window_BattleLog_startAction =
    Window_BattleLog.prototype.startAction;
  Window_BattleLog.prototype.startAction = function (subject, action, targets) {
    _alias_Window_BattleLog_startAction.call(this, subject, action, targets);
    if (action._item._dataClass == "skill" && action._item._itemId) {
      subject.noSkillVoice =
        $dataSkills[action._item._itemId].meta.noSkillVoice;
    }
  };

  /*
	//191017ダメージ時表情変化
	const _alias_vbsp_Window_BattleLog_displayActionResults = Window_BattleLog.prototype.displayActionResults;
	Window_BattleLog.prototype.displayActionResults = function(subject, target) {
		_alias_vbsp_Window_BattleLog_displayActionResults.call(this, subject, target)
		if (!target.result().used) {return}
		if(!target.isActor()){return}
		if(target.result().hpDamage > 0 || target.result().mpDamage){
			target.requestDamageFace = true
		}
	}
	*/

  /*
   * _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
   *
   *
   * 以下オリジナルメニュー
   *
   *
   * _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
   */

  const _alias_vbsp_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    _alias_vbsp_Game_System_initialize.call(this);
    this._vbsp_todoList = [];
  };

  const _alias_vbsp_Game_Interpreter_command108 =
    Game_Interpreter.prototype.command108;
  Game_Interpreter.prototype.command108 = function () {
    _alias_vbsp_Game_Interpreter_command108.call(this);
    this.checkIsToDo();
    return true;
  };

  Game_Interpreter.prototype.checkIsToDo = function () {
    const todoNum = this._comments[0].match(/<ToDo:(.+)>/);
    if (todoNum) {
      const num = Number(todoNum[1]);
      this._comments.shift();
      let textArray = [];
      for (let i = 0, n = this._comments.length; i < n; i++) {
        const arr = this._comments[i].split("\\n");
        textArray = textArray.concat(arr);
      }
      const todoText = textArray.join("\n");
      $gameSystem._vbsp_todoList[num] = todoText;
    }
  };

  Game_Actor.prototype.clearEquipments = function () {
    var maxSlots = this.equipSlots().length;
    for (var i = 0; i < maxSlots; i++) {
      if (this.isEquipChangeOk(i)) {
        if (!this.canDiscardArmor() && i + 1 == _OBS_ArmorTypeId) {
          continue;
        }
        this.changeEquip(i, null);
      }
    }
  };

  Game_Actor.prototype.optimizeEquipments = function () {
    var maxSlots = this.equipSlots().length;
    this.clearEquipments();
    for (var i = 0; i < maxSlots; i++) {
      if (!this.canDiscardArmor() && i + 1 == _OBS_ArmorTypeId) {
        continue;
      }
      if (this.isEquipChangeOk(i)) {
        this.changeEquip(i, this.bestEquipItem(i));
      }
    }
  };

  const _alias_vbsp_Game_Actor_clearStates = Game_Actor.prototype.clearStates;
  Game_Actor.prototype.clearStates = function () {
    if (this._states) {
      var isSpState = this.isStateAffected(
        _OBS_ChangeBattleStandPictureStateId
      );
      var isVirginState = this.isStateAffected(_OBS_VirginStateId);
    }
    _alias_vbsp_Game_Actor_clearStates.call(this);
    if (this._states) {
      if (isSpState) {
        this.addNewState(_OBS_ChangeBattleStandPictureStateId);
      }
      if (isVirginState) {
        this.addNewState(_OBS_VirginStateId);
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Window_AlertMessage
  //

  function Window_AlertMessage() {
    this.initialize.apply(this, arguments);
  }

  Window_AlertMessage.prototype = Object.create(Window_Selectable.prototype);
  Window_AlertMessage.prototype.constructor = Window_AlertMessage;

  Window_AlertMessage.prototype.initialize = function (y, height) {
    Window_Selectable.prototype.initialize.call(
      this,
      0,
      y,
      Graphics.width,
      height
    );
    const textW = this.textWidth(_OBS_CannotDiscardEquipMessage);
    const width = textW + this.standardPadding() * 2;
    this.width = width;
    this.x = (Graphics.width - width) / 2;
    this.openness = 0;
    this.drawTextEx(_OBS_CannotDiscardEquipMessage, 0, 0);
    this.select(-1);
  };

  Window_AlertMessage.prototype.processChecked = function () {
    this.playOkSound();
    this.deactivate();
    this.close();
    this.callOkHandler();
  };

  Window_AlertMessage.prototype.update = function () {
    Window_Selectable.prototype.update.call(this);
    if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
      this.processOk();
      TouchInput.update();
    }
  };

  Window_AlertMessage.prototype.processOk = function () {
    this.processChecked();
  };

  Window_AlertMessage.prototype.processCancel = function () {
    this.processChecked();
  };

  //-----------------------------------------------------------------------------
  // Scene_Equip
  //

  const _alias_Scene_Equip_create = Scene_Equip.prototype.create;
  Scene_Equip.prototype.create = function () {
    _alias_Scene_Equip_create.call(this);
    this.createCannotDiscardEquipMessageWindow();
  };

  Scene_Equip.prototype.createCannotDiscardEquipMessageWindow = function () {
    const h = 70;
    const y = (Graphics.height - h) / 2;
    this.cannotDiscardEquipMessageWindow = new Window_AlertMessage(y, h);
    this.cannotDiscardEquipMessageWindow.setHandler(
      "ok",
      this.onDiscardAlertOk.bind(this)
    );
    this.cannotDiscardEquipMessageWindow.setHandler(
      "cancel",
      this.onDiscardAlertOk.bind(this)
    );
    this.addChild(this.cannotDiscardEquipMessageWindow);
  };

  Scene_Equip.prototype.onDiscardAlertOk = function () {
    this._itemWindow.activate();
  };

  const _alias_Scene_Equip_onItemOk = Scene_Equip.prototype.onItemOk;
  Scene_Equip.prototype.onItemOk = function () {
    if (
      this._itemWindow.equipTypeId() == _OBS_ArmorTypeId &&
      this._itemWindow.item() == null &&
      !this.actor().canDiscardArmor()
    ) {
      this.cannotDiscardEquipMessageWindow.open();
      this.cannotDiscardEquipMessageWindow.activate();
      this._itemWindow.deactivate();
      SoundManager.playBuzzer();
      return;
    }
    _alias_Scene_Equip_onItemOk.call(this);
  };

  //-----------------------------------------------------------------------------
  // Scene_Menu
  //

  const _alias_vbsp_Scene_Menu_create = Scene_Menu.prototype.create;
  Scene_Menu.prototype.create = function () {
    _alias_vbsp_Scene_Menu_create.call(this);
    this.createToDoWindow();
  };

  Scene_Menu.prototype.start = function () {
    Scene_MenuBase.prototype.start.call(this);
    this._statusPictureWindow.refresh();
    this._statusTextWindow.refresh();
  };

  Scene_Menu.prototype.createStatusWindow = function () {
    this._statusPictureWindow = new Window_OriginalMainMenuStatus_StandPicture(
      this._commandWindow.width,
      0
    );
    this.addChild(this._statusPictureWindow);
    this.createSmartPhone();
    this._statusTextWindow = new Window_OriginalMainMenuStatus_Text(
      this._commandWindow.width,
      0
    );
    this.addChild(this._statusTextWindow);
  };

  Scene_Menu.prototype.createToDoWindow = function () {
    const y = this._commandWindow.y + this._commandWindow.height;
    const width = this._commandWindow.width;
    const height =
      Graphics.boxHeight - this._commandWindow.height - this._goldWindow.height;
    this.todoWindow = new Window_Base(0, y, width, height);
    this.addWindow(this.todoWindow);
    const todoText =
      $gameSystem._vbsp_todoList[
        $gameVariables.value(Number(_OBS_ToDoTextValId))
      ];
    this.todoWindow.drawTextEx(todoText, 0, 0);
  };

  Scene_Menu.prototype.commandPersonal = function () {
    this._statusPictureWindow.selectLast();
    this._statusPictureWindow.activate();
    this._statusPictureWindow.setHandler("ok", this.onPersonalOk.bind(this));
    this._statusPictureWindow.setHandler(
      "cancel",
      this.onPersonalCancel.bind(this)
    );
  };

  Scene_Menu.prototype.onPersonalCancel = function () {
    this._statusPictureWindow.deselect();
    this._commandWindow.activate();
  };

  //-----------------------------------------------------------------------------
  // Window_MenuCommand
  //

  //23/01/11 Scene_MenuのcreateCommandWindow上書きによって他プラグインによるメニューコマンド追加が上手くいかない場合の修正
  const _alias_Window_MenuCommand_setHandler =
    Window_MenuCommand.prototype.setHandler;
  Window_MenuCommand.prototype.setHandler = function (symbol, method) {
    if (symbol == "formation") {
      return;
    }
    _alias_Window_MenuCommand_setHandler.call(this, symbol, method);
  };

  //-----------------------------------------------------------------------------
  // Window_EquipItem
  //

  Window_EquipItem.prototype.equipTypeId = function () {
    return this._actor.equipSlots()[this._slotId];
  };

  //-----------------------------------------------------------------------------
  // Window_OriginalMainMenuStatus_StandPicture
  //

  function Window_OriginalMainMenuStatus_StandPicture() {
    this.initialize.apply(this, arguments);
  }

  Window_OriginalMainMenuStatus_StandPicture.prototype = Object.create(
    Window_Selectable.prototype
  );
  Window_OriginalMainMenuStatus_StandPicture.prototype.constructor =
    Window_OriginalMainMenuStatus_StandPicture;

  Window_OriginalMainMenuStatus_StandPicture.prototype.initialize = function (
    x,
    y
  ) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.loadImages();
    this.refresh();
  };

  Window_OriginalMainMenuStatus_StandPicture.prototype.create = function () {};

  Window_OriginalMainMenuStatus_StandPicture.prototype.loadImages =
    function () {};

  Window_OriginalMainMenuStatus_StandPicture.prototype.windowWidth =
    function () {
      return Graphics.boxWidth - 240;
    };

  Window_OriginalMainMenuStatus_StandPicture.prototype.windowHeight =
    function () {
      return Graphics.boxHeight;
    };

  Window_OriginalMainMenuStatus_StandPicture.prototype.maxItems = function () {
    return $gameParty.size();
  };

  Window_OriginalMainMenuStatus_StandPicture.prototype.numVisibleRows =
    function () {
      return 1;
    };

  Window_OriginalMainMenuStatus_StandPicture.prototype.maxCols = function () {
    return 2;
  };

  Window_OriginalMainMenuStatus_StandPicture.prototype.maxPageItems =
    function () {
      return $gameParty.size();
    };

  Window_OriginalMainMenuStatus_StandPicture.prototype.itemWidth = function () {
    return this.contentsWidth() / this.maxItems();
  };

  Window_OriginalMainMenuStatus_StandPicture.prototype.itemHeight =
    function () {
      return this.contentsHeight();
    };

  Window_OriginalMainMenuStatus_StandPicture.prototype.processOk = function () {
    Window_Selectable.prototype.processOk.call(this);
    $gameParty.setMenuActor($gameParty.members()[this.index()]);
  };

  Window_OriginalMainMenuStatus_StandPicture.prototype.itemRect = function (
    index
  ) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight();
    rect.x = index * rect.width;
    rect.y = 0;
    return rect;
  };

  Window_OriginalMainMenuStatus_StandPicture.prototype.selectLast =
    function () {
      this.select($gameParty.menuActor().index() || 0);
    };

  Window_OriginalMainMenuStatus_StandPicture.prototype.drawItem = function (
    index
  ) {
    this._actor = $gameParty.members()[index];
    this.drawStandPicture(index + 1);
  };

  Window_OriginalMainMenuStatus_StandPicture.prototype.drawStandPicture =
    function (index) {
      const standInfo = this._actor.getActorStandPictureName();
      const baseName = standInfo[0];
      const isArmored = standInfo[1];
      let pos =
        index == 1
          ? _OBS_Chara1MenuStandPicturePosition
          : _OBS_Chara2MenuStandPicturePosition;
      if ($gameParty.members().length == 1) {
        pos = _OBS_MenuStandPicturePositionOnlyone;
      }
      this.actorSpriteContainer = new Sprite();
      this.actorSpriteContainer.x = 20 + pos[0];
      this.actorSpriteContainer.y = 20 + pos[1];
      this.addChild(this.actorSpriteContainer);
      const baseSrite = new Sprite();
      baseSrite.bitmap = ImageManager.loadMenuStandPicture(index, baseName);
      this.actorSpriteContainer.addChild(baseSrite);
      const faceSprite = new Sprite();
      const actor = $gameParty.members()[index - 1];
      const faceName = actor.isLewdness() ? "lewdFace" : "nomalFace";
      faceSprite.bitmap = ImageManager.loadMenuStandPicture(index, faceName);
      this.actorSpriteContainer.addChild(faceSprite);
      if (this._actor.isStateAffected(_OBS_ChangeBattleStandPictureStateId)) {
        const stateName = isArmored ? "onState1" : "onState2";
        const stateSprite = new Sprite();
        stateSprite.bitmap = ImageManager.loadMenuStandPicture(
          index,
          stateName
        );
        this.actorSpriteContainer.addChild(stateSprite);
      }
    };

  //-----------------------------------------------------------------------------
  // Window_OriginalMainMenuStatus_Text
  //

  function Window_OriginalMainMenuStatus_Text() {
    this.initialize.apply(this, arguments);
  }

  Window_OriginalMainMenuStatus_Text.prototype = Object.create(
    Window_Selectable.prototype
  );
  Window_OriginalMainMenuStatus_Text.prototype.constructor =
    Window_OriginalMainMenuStatus_Text;

  Window_OriginalMainMenuStatus_Text.prototype.initialize = function (x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.opacity = 0;
    this.loadImages();
    this.refresh();
  };

  Window_OriginalMainMenuStatus_Text.prototype.loadImages = function () {};

  Window_OriginalMainMenuStatus_Text.prototype.windowWidth = function () {
    return Graphics.boxWidth - 240;
  };

  Window_OriginalMainMenuStatus_Text.prototype.windowHeight = function () {
    return Graphics.boxHeight;
  };

  Window_OriginalMainMenuStatus_Text.prototype.maxItems = function () {
    return $gameParty.size();
  };

  Window_OriginalMainMenuStatus_Text.prototype.numVisibleRows = function () {
    return 4;
  };
  /*
	Window_OriginalMainMenuStatus_Text.prototype.refresh = function() {
	};
*/
  Window_OriginalMainMenuStatus_Text.prototype.drawItem = function (index) {
    this._actor = $gameParty.members()[index];
    this.drawItemStatus(index);
  };

  Window_OriginalMainMenuStatus_Text.prototype.maxPageItems = function () {
    return $gameParty.size();
  };

  Window_OriginalMainMenuStatus_Text.prototype.drawAllItems = function () {
    const topIndex = this.topIndex();
    for (let i = 0; i < this.maxPageItems(); i++) {
      const index = topIndex + i;
      if (index < this.maxItems()) {
        this.drawItem(index);
      }
    }
  };

  Window_OriginalMainMenuStatus_Text.prototype.drawItemStatus = function (
    index
  ) {
    const rect = this.itemRect(index);
    let x = rect.x + rect.width * index;
    if ($gameParty.members().length == 1) {
      x = _OBS_MenuStandStatusPositionOnlyone;
    }
    const y = 0;
    const width = rect.width - this.textPadding();
    this.drawOriginalActorStatus(x, y, width, index);
  };

  Window_OriginalMainMenuStatus_Text.prototype.itemWidth = function () {
    return this.windowWidth() / this.maxItems();
  };

  Window_OriginalMainMenuStatus_Text.prototype.updateArrows = function () {};

  Window_OriginalMainMenuStatus_Text.prototype.itemHeight = function () {
    return this.windowHeight();
  };

  Window_OriginalMainMenuStatus_Text.prototype.drawOriginalActorStatus =
    function (x, y, width, index) {
      const lineHeight = this.lineHeight();
      const x2 = x + 180;
      const width2 = Math.min(200, width - 180 - this.textPadding());
      this.drawActorName(this._actor, x, y);
      this.drawActorIcons(this._actor, x + _OBS_MenuStatusIconPos, y);
      this.drawActorLevel(this._actor, x, y + lineHeight * 1);
      const virginText = this._actor.isVirgin() ? "Virgin" : "Experienced";
      this.drawTextEx(virginText, x + 140, y + lineHeight * 1);
      this.drawActorHp(this._actor, x, y + lineHeight * 2, width2);
      this.drawActorMp(this._actor, x, y + lineHeight * 3, width2);
      this.drawActorAp(this._actor, x, y + lineHeight * 4, width2);
      this.drawParameters(x, y + lineHeight * 5);
      this.drawExpInfo(x, y + lineHeight * 11);
      this.drawSpInfo(x, y + lineHeight * 15, index);
    };

  Window_OriginalMainMenuStatus_Text.prototype.drawParameters = function (
    x,
    y
  ) {
    y += 20;
    const lineHeight = this.lineHeight();
    for (let i = 0; i < 6; i++) {
      const paramId = i + 2;
      const y2 = y + lineHeight * i;
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.param(paramId), x, y2, 160);
      this.resetTextColor();
      this.drawText(this._actor.param(paramId), x + 140, y2, 60, "right");
    }
  };

  Window_OriginalMainMenuStatus_Text.prototype.drawExpInfo = function (x, y) {
    y += 40;
    const lineHeight = this.lineHeight();
    const expTotal = TextManager.expTotal.format(TextManager.exp);
    const expNext = TextManager.expNext.format(TextManager.level);
    let value1 = this._actor.currentExp();
    let value2 = this._actor.nextRequiredExp();
    if (this._actor.isMaxLevel()) {
      value1 = "-------";
      value2 = "-------";
    }
    this.changeTextColor(this.systemColor());
    this.drawText(expTotal, x, y + lineHeight * 0, 200);
    this.drawText(expNext, x, y + lineHeight * 2, 200);
    this.resetTextColor();
    this.drawText(value1, x, y + lineHeight * 1, 200, "right");
    this.drawText(value2, x, y + lineHeight * 3, 200, "right");
  };

  Window_OriginalMainMenuStatus_Text.prototype.drawSpInfo = function (
    x,
    y,
    index
  ) {
    y += 60;
    const lineHeight = this.lineHeight();
    const lewdVal = $gameVariables.value(
      _OBS_ChangeBattleStandPictureVariableIdArr[index]
    );
    const value1 = lewdVal + "/" + _OBS_ChangeBattleStandPictureVariableMax;
    const value2 = $gameVariables.value(_OBS_SpExpNumVariableIdArr[index]);
    this.changeTextColor(this.systemColor());
    this.drawText(_OBS_LewdValTitle, x, y + lineHeight * 0, 200);
    //this.drawText(_OBS_SpExpNum, x, y + lineHeight * 1, 200);
    this.resetTextColor();
    this.drawText(value1, x, y + lineHeight * 0, 200, "right");
    //this.drawText(value2, x, y + lineHeight * 1, 200, 'right');
  };
})();
