//===============================================
// DebtRepaymentAndSNSScreen.js
//===============================================

/*:ja
 * @plugindesc 借金返済システムとSNSシステムを実装するプラグインです。
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
 * 2023/08/11 ver 1.24
 * 2023/06/14 ver 1.23リリース
 * 2023/06/10 ver 1.22リリース
 * 2023/05/31 ver 1.21リリース
 * 2023/05/13 ver 1.2リリース
 * 2023/04/14 ver 1.16リリース
 * 2022/12/27 ver 1.12リリース
 * 2022/12/25 ver 1.1リリース
 * 2022/11/13 ver 1.0リリース
 *
 * _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
 *
 * ===================================
 * ヘルプ
 * ===================================
 *
 * 23/04/14追記
 *
 * SNSの表示順について修正しました。
 *
 * プラグインパラメータ「SNSの内容を公開する際に使用する変数」について修正しました。
 * スイッチIDの羅列または変数IDを指定します。
 *
 * スイッチIDの羅列で指定した場合はスイッチがONになった順で表示されます。
 * 例えばID3,1,2の順でスイッチがONになった場合は
 *
 * ID2に対応した画像
 * ID1に対応した画像
 * ID3に対応した画像
 *
 * という順で表示されます。
 * 変数IDで指定した場合はこれまでと同様の表示順となります。
 *
 *
 * =====================================
 *
 * ●画像の指定
 *
 * 借金額を表示するための数字の画像は
 * img/system/debtNumber.png
 *
 * 何も映っていないスマホ画面の画像は
 * img/system/Menu_Home.png
 *
 * 借金返済のスマホ画面の画像は
 * img/system/Loan_Screen.png
 *
 * スマホの枠の画像は
 * img/system/Smartphone_Frame.png
 *
 * から取得されます。
 *
 *
 * ●借金額に使用する変数
 *
 * 借金の額はプラグインパラメータにて設定した変数の値となります。
 * まずはプラグインパラメータ「借金用変数ID」にて借金額として使用する変数を設定し
 * てください。
 *
 *
 * ●SNSホーム画面のボタン配置について
 *
 * ホーム画面で表示されるボタン画像は
 *
 * SNS_Button_順番.png
 *
 * で指定され、この順番でホーム画面で上から表示されます。
 * また、表示するボタン数（キャラクター数）はこの「SNSに表示する枚数」の半角カン
 * マで区切られた数に対応します。
 * 例えばホーム画面で
 *
 * キャラクターA
 * キャラクターB
 * キャラクターC
 * キャラクターD
 * キャラクターE
 *
 * とボタン表示したい場合、キャラクターAのボタン画像をSNS_Button_1.png、キャラク
 * ターBのボタン画像をSNS_Button_2.png…とします。
 *
 *
 * ●SNSのページについて
 *
 * 「SNSに表示する枚数」では表示するページ数をSNSのキャラクターの人数分指定します。
 * 例えばそのキャラクターに3ページある場合3と記述します。
 * 順番はホーム画面の上からの順に対応します。
 *
 *
 * ●SNSのページ画像について
 *
 * SNSのページとして表示する画像の名前は
 *
 * SNS_Content_キャラクターの順_ページ数
 *
 * として名前を付けます。
 * 例えばホーム画面の上から2番目のキャラクターの3ページ目の画像は
 *
 * SNS_Content_2_3
 *
 * となります。
 *
 *
 * ●SNSのページの公開状況について
 *
 * そのキャラクターの現在のSNSページの公開枚数はプラグインパラメータ「SNSの内容を
 * 公開する際に使用する変数」にて指定された変数のIDの値に対応します。
 * 順番はホーム画面の上からの順に対応します。
 * 例えば
 *
 * 1,2,3,4,5
 *
 * と記述されていた場合、ホーム画面上から2番目のキャラクターの公開ページ数は変数
 * ２の値となります。
 *
 *
 * ●SNSのページの画像決定時の動作について
 *
 * SNSページにて画像が決定されたかどうかを判定するのはプラグインパラメータ「SNSの
 * 画像の位置と高さ」にて指定したそのページにある画像のｙ座標と高さによって決定
 * されます。
 * キャラクターの数、ページ枚数分指定する必要があり、ホーム画面の上からの順で、
 * 内容ではページ枚数分指定します。
 * もしそのページに画像がない場合は空欄としてください。
 * 例えば
 *
 * ["123_100","456_100","789_100"]
 * ["123_200","456_200","789_200"]
 * ["123_300","456_300","789_300"]
 * ["123_400","456_400","789_400"]
 * ["123_500","456_500","789_500"]
 *
 * と記述されていた場合、ホーム画面上から2番目のキャラクターの１ページ目の画像の
 * 位置はy座標123で200pxの高さがあるということになります。
 *
 *
 * ●画像押下時のイベントについて
 *
 * SNSページの画像押下時のイベントはコモンイベントにて行われます。
 * コモンイベントのIDは「SNS画像・動画用コモンイベントID」にて指定してください。
 * その際にホーム画面の上から何番目のキャラクターなのかを「SNSの上から何番目の
 * キャラクターかを代入する変数ID」にて指定した変数に代入されます。
 * また、画像の上からの順番は「SNSの上から何番目の画像かを代入する変数ID」に代入
 * されます。
 * 画面では全ての表示されるページ画像は結合されますので、最初のページの上からの
 * 画像順になります。
 *
 * 例えば上記の「SNSの画像の位置と高さ」の例で上から3番目、3ページの画像の
 * "789_300"は上から3番目になるため、変数には3が代入されます。
 *
 *
 *
 *
 * @param sa1
 * @text 借金返済時のSE
 * @desc 借金返済時のSEを指定します。
 * @default Coin,80,100,0
 *
 * @param n1
 * @text 借金用変数ID
 * @desc 借金用に使用する変数のIDを指定します。
 * @type variable
 * @default 141
 *
 * @param n2
 * @text SNSボタンの高さスペース
 * @desc 上ボタンから下のボタンまでの高さを指定します。
 * @type number
 * @default 70
 *
 * @param n3
 * @text SNSの一番上のボタンのｙ座標
 * @desc SNSの一番上のボタンのスマートフォン画像の上からｙ座標を指定します。
 * @type number
 * @default 190
 *
 * @param n4
 * @text SNSの上から何番目のキャラクターかを代入する変数ID
 * @desc SNSの上から何番目のキャラクターかを代入する変数IDを指定します。
 * @type variable
 * @default 48
 *
 * @param n5
 * @text SNSの上から何番目の画像かを代入する変数ID
 * @desc SNSの上から何番目の画像かを代入する変数IDを指定します。
 * @type variable
 * @default 49
 *
 * @param n6
 * @text SNS画像・動画用コモンイベントID
 * @desc SNSの画像拡大・動画再生用のコモンイベントのIDを指定します。
 * @type common_event
 * @default 29
 *
 * @param n7
 * @text 終了用コモンイベントID
 * @desc SNSの画像拡大・動画再生にてキャンセルを押下された際の処理を記述します。
 * @type common_event
 * @default 35
 *
 * @param n8
 * @text 借金０時のコモンイベントID
 * @desc 借金の変数が０になった際に実行するコモンイベントのIDを指定します。
 * @type common_event
 * @default 57
 *
 * @param n9
 * @text 常にメニュー画面に表示させておくアクターID
 * @desc メニュー画面のステータスウィンドウに表示させるアクターのIDを指定します。
 * @type actor
 * @default 1
 *
 * @param na1
 * @text スマートフォンの画像位置
 * @desc スマートフォンを表示する位置を半角カンマを挟んで表示します。
 * @default 900,10
 *
 * @param na2
 * @text スマートフォンの画面サイズ
 * @desc スマートフォンの画面サイズを半角カンマを挟んで幅、高さで指定します。画面サイズとは液晶の部分です。
 * @default 304,566
 *
 * @param na5
 * @text 画面コンテンツの表示位置
 * @desc 携帯フレーム背面に表示する画面コンテンツの調節位置を指定します。
 * @default 0,0
 *
 * @param na3
 * @text SNSに表示する枚数
 * @desc SNSに表示する画像の枚数を指定します。半角カンマを挟んで表示する人数分指定します。
 * @default 3,3,3,3,3
 *
 * @param na4
 * @text 借金画面のウィンドウサイズ
 * @desc 借金画面の送金ボタン上のウィンドウサイズを幅,高さで指定します。当てるカーソルのサイズ調整にお使いください。
 * @default 342,300
 *
 * @param osa1
 * @text SNSの内容を公開する際に使用する変数
 * @desc SNSの内容を公開する際に使用する変数またはスイッチIDの羅列を指定します。
 * @default ["181,182,183,184,185","51","52","53","54"]
 * @type string[]
 *
 * @param osaa1
 * @text SNSの画像の位置と高さ
 * @desc SNSに表示するページの画像のあるｙ座標とその画像の高さを指定します。ページに複数画像がある場合カンマを挟んで指定してください。
 * @type string[][]
 * @default ["[\"190_370\",\"108_370\",\"120_370\"]","[\"190_370\",\"108_370\",\"120_370\"]","[\"190_370\",\"108_370\",\"120_370\"]","[\"190_370\",\"108_370\",\"120_370\"]","[\"190_370\",\"108_370\",\"120_370\"]"]
 *
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

  const pluginName = "DebtRepaymentAndSNSScreen";
  const param = PluginManager.parameters(pluginName);

  const convertObjectParam = (ob) => {
    Object.keys(ob).forEach((key) => {
      if (key[0] == "n" && key[1] == "a" && key[2] == "a") {
        ob[key] = JSON.parse(ob[key]).map((str) => str.toNumArray());
      } else if (key[0] == "o" && key[1] == "n" && key[2] == "a") {
        ob[key] = JSON.parse(ob[key]).map((str) => Number(str));
      } else if (key[0] == "o" && key[1] == "n" && key[2] == "a") {
        ob[key] = JSON.parse(ob[key]).map((str) => Number(str));
      } else if (key[0] == "n" && key[1] == "a") {
        ob[key] = ob[key].toNumArray();
      } else if (key[0] == "n") {
        ob[key] = Number(ob[key]);
      } else if (
        key[0] == "o" &&
        key[1] == "s" &&
        key[2] == "a" &&
        key[3] == "a"
      ) {
        ob[key] = JSON.parse(ob[key]).map((str) => JSON.parse(str));
      } else if (key[0] == "o" && key[1] == "s" && key[2] == "a") {
        ob[key] = JSON.parse(ob[key]);
      } else if (key[0] == "s" && key[1] == "a" && key[2] == "a") {
        ob[key] = JSON.parse(ob[key]).map((str) => str.split(","));
      } else if (key[0] == "s" && key[1] == "a") {
        ob[key] = ob[key].split(",");
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

  _.osa1 = _.osa1.map((str) =>
    ~str.indexOf(",") ? str.toNumArray() : Number(str)
  );

  //23/04/03 追記
  const getIsEqualSavedSNSOpen = (i) => {
    if (isNaN(_.osa1[i])) {
      return (
        $gameSystem.savedSNSOpenSwitchCountArray[i] ==
        _.osa1[i].filter(
          (id) => ~$gameSystem.savedSNSOpenVariables[i].indexOf(id)
        ).length
      );
    } else {
      return (
        $gameSystem.savedSNSOpenVariables[i] == $gameVariables.value(_.osa1[i])
      );
    }
  };

  //-----------------------------------------------------------------------------
  // ImageManager
  //

  ImageManager.loadSNSAndDebt = function (filename, hue) {
    return this.loadBitmap("img/system/snsAndDebt/", filename, hue, false);
  };

  //-----------------------------------------------------------------------------
  // Game_System
  //

  const _alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    _alias_Game_System_initialize.call(this);
    this.savedSNSOpenVariables = [];
    for (let i = 0; i < _.osa1.length; i++) {
      if (isNaN(_.osa1[i])) {
        this.savedSNSOpenVariables.push([]);
      } else {
        this.savedSNSOpenVariables.push(0);
      }
    }
    this.savedSNSOpenSwitchCountArray = Array.from(
      { length: _.osa1.length },
      () => 0
    );
  };

  //-----------------------------------------------------------------------------
  // Game_Variables
  //

  //22/12/24 追記
  const _alias_Game_Variables_setValue = Game_Variables.prototype.setValue;
  Game_Variables.prototype.setValue = function (variableId, value) {
    _alias_Game_Variables_setValue.call(this, variableId, value);
    if (variableId == _.n1 && this._data[variableId] <= 0) {
      $gameTemp.reserveCommonEvent(_.n8);
    }
  };

  //23/04/03 追記
  //-----------------------------------------------------------------------------
  // Game_Switches
  //

  const _alias_Game_Switches_setValue = Game_Switches.prototype.setValue;
  Game_Switches.prototype.setValue = function (switchId, value) {
    _alias_Game_Switches_setValue.call(this, switchId, value);
    if (switchId > 0) {
      $gameSystem.savedSNSOpenVariables.forEach((arr, ind) => {
        if (
          isNaN(_.osa1[ind]) &&
          ~_.osa1[ind].indexOf(switchId) &&
          arr.indexOf(switchId) < 0
        ) {
          arr.push(switchId);
        }
      });
    }
  };
  //-----------------------------------------------------------------------------
  // Game_Party
  //

  //22/12/24 追記
  const _alias_Game_Party_members = Game_Party.prototype.members;
  Game_Party.prototype.members = function () {
    if ($gameTemp.menuActorRefecenceFromStatusWindow) {
      return [$gameActors.actor(_.n9)];
    } else {
      return _alias_Game_Party_members.call(this);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Menu
  //

  const _alias_Scene_Menu_initialize = Scene_Menu.prototype.initialize;
  Scene_Menu.prototype.initialize = function () {
    _alias_Scene_Menu_initialize.call(this);
    ImageManager.loadSNSAndDebt("Loan_Screen");
    this._interpreter = new Game_Interpreter();
    this._snsMoveScreenMode = false;
    this._snsYScrollAmout = 0;
  };

  const _alias_vbsp_Scene_Menu_create = Scene_Menu.prototype.create;
  Scene_Menu.prototype.create = function () {
    _alias_vbsp_Scene_Menu_create.call(this);
    this.createSmartPhone();
    this.createDebtAmountSprites();
    this.createSNSSprites();
    this.createSNSMenuInputWindow();
    //22/12/24 追記
    this.createPartyMemberChoiceWindow();
    this.createSpriteset();
  };

  Scene_Menu.prototype.createSmartPhone = function () {
    this.phoneContentsLayer = new Sprite();
    [this.phoneContentsLayer.x, this.phoneContentsLayer.y] = _.na5;
    this.addChild(this.phoneContentsLayer);
    this.phoneFrame = new Sprite();
    this.phoneFrame.bitmap = ImageManager.loadSNSAndDebt("Smartphone_Frame");
    [this.phoneFrame.x, this.phoneFrame.y] = _.na1;
    this.addChild(this.phoneFrame);
    this.phoneScreen = new Sprite();
    this.phoneScreen.bitmap = ImageManager.loadSNSAndDebt("Menu_Home");
    [this.phoneScreen.x, this.phoneScreen.y] = _.na1;
    this.phoneContentsLayer.addChild(this.phoneScreen);
  };

  Scene_Menu.prototype.createDebtAmountSprites = function () {
    this.debtAmount = new Sprite();
    this.debtAmount.x = _.na1[0] + 26;
    this.debtAmount.y = _.na1[1] + 310;
    this.debtAmount.bitmap = new Bitmap(250, 40);
    this.debtAmount.numBitmap = ImageManager.loadSNSAndDebt("debtNumber");
    this.debtAmount.visible = false;
    this.phoneContentsLayer.addChild(this.debtAmount);
    this.createDebtButtonWindow();
    this.createDebtRepaymentInputWindow();
  };

  Scene_Menu.prototype.createSNSSprites = function () {
    const xPadding = 24;
    const yPadding = _.n3;
    const bHeight = _.n2;

    this.snsContentsSpriteLayer = new Sprite();
    this.phoneContentsLayer.addChild(this.snsContentsSpriteLayer);
    this.snsHomeSpriteLayer = new Sprite();
    this.snsHomeSpriteLayer.visible = false;
    this.snsHomeSpriteLayer.x = _.na1[0];
    this.snsHomeSpriteLayer.y = _.na1[1];
    this.phoneContentsLayer.addChild(this.snsHomeSpriteLayer);

    for (let i = 0; i < _.na3.length; i++) {
      const buttonSprite = new Sprite();
      buttonSprite.bitmap = ImageManager.loadSNSAndDebt(
        "SNS_Button_" + (i + 1)
      );
      buttonSprite.x = xPadding;
      buttonSprite.y = bHeight * i + yPadding;
      this.snsHomeSpriteLayer.addChild(buttonSprite);
      const checkSprite = new Sprite();
      checkSprite.bitmap = ImageManager.loadSNSAndDebt("SNS_Button_Check");
      checkSprite.x = xPadding + 270;
      checkSprite.y = bHeight * i + yPadding;
      checkSprite.visible = !getIsEqualSavedSNSOpen(i);
      this.snsHomeSpriteLayer.addChild(checkSprite);
      snsContentsPageLayer = new Sprite();
      snsContentsPageLayer.x = _.na1[0] + 24;
      snsContentsPageLayer.y = _.na1[1] + 68;
      this.snsContentsSpriteLayer.addChild(snsContentsPageLayer);
      snsContentsPageLayer.contentBitmaps = [];
      for (let j = 0; j < _.na3[i]; j++) {
        snsContentsPageLayer.contentBitmaps.push(
          ImageManager.loadSNSAndDebt("SNS_Content_" + (i + 1) + "_" + (j + 1))
        );
      }
    }
  };

  Scene_Menu.prototype.createSpriteset = function () {
    //23/08/11 修正
    this._spriteset = new Spriteset_Menu();
    this.addChild(this._spriteset);
    this._spriteset._blackScreen.visible = false;
  };

  const _alias_Scene_Menu_createCommandWindow =
    Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function () {
    _alias_Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("debt", this.commandDebt.bind(this));
    this._commandWindow.setHandler("SNS", this.commandSNS.bind(this));
  };

  Scene_Menu.prototype.commandDebt = function () {
    this._debtButtonWindow.activate();
    this._debtButtonWindow.select(0);
    this._commandWindow.deactivate();
  };

  Scene_Menu.prototype.commandSNS = function () {
    this._commandWindow.deactivate();
    this._SNSMenuInputWindow.activate();
    this._SNSMenuInputWindow.select(0);
  };

  Scene_Menu.prototype.createDebtButtonWindow = function () {
    this._debtButtonWindow = new Window_DebtButton();
    this._debtButtonWindow.setHandler("ok", this.commandDebtOk.bind(this));
    this._debtButtonWindow.setHandler(
      "cancel",
      this.commandDebtCancel.bind(this)
    );
    this.addChild(this._debtButtonWindow);
  };

  Scene_Menu.prototype.commandDebtOk = function () {
    this._debtButtonWindow.select(-1);
    this._debtButtonWindow.deactivate();
    this._inputRepaymentWindow.show();
    this._inputRepaymentWindow.start();
  };

  Scene_Menu.prototype.commandDebtCancel = function () {
    this._debtButtonWindow.select(-1);
    this._debtButtonWindow.deactivate();
    this._commandWindow.activate();
  };

  Scene_Menu.prototype.createDebtRepaymentInputWindow = function () {
    this._inputRepaymentWindow = new Window_InputRepayment();
    this._inputRepaymentWindow.setHandler(
      "ok",
      this.commandInputRepaymentOk.bind(this)
    );
    this._inputRepaymentWindow.setHandler(
      "cancel",
      this.commandInputRepaymentCancel.bind(this)
    );
    this.addChild(this._inputRepaymentWindow);
  };

  Scene_Menu.prototype.commandInputRepaymentOk = function () {
    this._inputRepaymentWindow.select(-1);
    this._inputRepaymentWindow.deactivate();
    this._commandWindow.activate();
    const num = this._inputRepaymentWindow._number;
    $gameVariables.setValue(_.n1, $gameVariables.value(_.n1) - num);
    $gameParty.gainGold(-num);
    this.showDebtScreen();
    this._goldWindow.refresh();
  };

  Scene_Menu.prototype.commandInputRepaymentCancel = function () {
    this._inputRepaymentWindow.select(-1);
    this._inputRepaymentWindow.deactivate();
    this._inputRepaymentWindow.close();
    this._commandWindow.activate();
  };

  Scene_Menu.prototype.showDebtScreen = function () {
    this.debtAmount.visible = true;
    this.phoneScreen.bitmap = ImageManager.loadSNSAndDebt("Loan_Screen");
    this.debtAmount.bitmap.clear();
    const arr = $gameVariables.value(_.n1).toString().split("").reverse();
    const bw = this.debtAmount.numBitmap.width / 10;
    arr.forEach((str, i) => {
      this.debtAmount.bitmap.blt(
        this.debtAmount.numBitmap,
        Number(str) * bw,
        0,
        bw,
        40,
        250 - (i + 1) * bw,
        0
      );
    });
  };

  Scene_Menu.prototype.hideDebtScreen = function () {
    this.debtAmount.visible = false;
  };

  Scene_Menu.prototype.showSNSScreen = function () {
    this.phoneScreen.bitmap = ImageManager.loadSNSAndDebt("SNS_Home");
    this.snsHomeSpriteLayer.visible = true;
  };

  Scene_Menu.prototype.hideSNSScreen = function () {
    this.snsHomeSpriteLayer.visible = false;
  };

  Scene_Menu.prototype.createSNSMenuInputWindow = function () {
    this._SNSMenuInputWindow = new Window_SNSMenuInput();
    this._SNSMenuInputWindow.setHandler(
      "ok",
      this.commandInputSNSOk.bind(this)
    );
    this._SNSMenuInputWindow.setHandler(
      "cancel",
      this.commandInputSNSCancel.bind(this)
    );
    this.addChild(this._SNSMenuInputWindow);
  };

  //22/12/24 追記
  Scene_Menu.prototype.commandPersonal = function () {
    this._partyMemberChoiceWindow.setFormationMode(false);
    this._partyMemberChoiceWindow.selectLast();
    this._partyMemberChoiceWindow.activate();
    this._partyMemberChoiceWindow.select(0);
    //this._partyMemberChoiceWindow.setHandler('ok',     this.onPersonalOk.bind(this));
    //this._partyMemberChoiceWindow.setHandler('cancel', this.onPersonalCancel.bind(this));
  };

  //22/12/24 追記
  Scene_Menu.prototype.createPartyMemberChoiceWindow = function () {
    $gameTemp.menuActorRefecenceFromStatusWindow = false;
    this._partyMemberChoiceWindow = new Window_PartyMemberChoice(
      this._goldWindow.height,
      this._commandWindow.width,
      this._commandWindow.y + this._commandWindow.height
    );
    this._partyMemberChoiceWindow.setHandler(
      "ok",
      this.commandPartyMemberChoiceOk.bind(this)
    );
    this._partyMemberChoiceWindow.setHandler(
      "cancel",
      this.commandPartyMemberChoiceCancel.bind(this)
    );
    this.addChild(this._partyMemberChoiceWindow);
    $gameTemp.menuActorRefecenceFromStatusWindow = true;
  };

  //22/12/24 追記
  Scene_Menu.prototype.commandPartyMemberChoiceOk = function () {
    this.onPersonalOk();
  };

  //22/12/24 追記
  Scene_Menu.prototype.commandPartyMemberChoiceCancel = function () {
    this._partyMemberChoiceWindow.select(-1);
    this._partyMemberChoiceWindow.deactivate();
    this._commandWindow.activate();
  };

  Scene_Menu.prototype.commandInputSNSOk = function () {
    //23/03/28 スクロール位置初期化
    this._snsYScrollAmout = 0;
    const inputIndex = this._SNSMenuInputWindow.index();
    if (!getIsEqualSavedSNSOpen(inputIndex)) {
      if (isNaN(_.osa1[inputIndex])) {
        $gameSystem.savedSNSOpenSwitchCountArray[inputIndex] =
          $gameSystem.savedSNSOpenVariables[inputIndex].length;
      } else {
        $gameSystem.savedSNSOpenVariables[inputIndex] = $gameVariables.value(
          _.osa1[inputIndex]
        );
      }
      this.snsHomeSpriteLayer.getChildAt(inputIndex * 2 + 1).visible = false;
    }
    this.snsHomeSpriteLayer.visible = false;
    this.snsShowingContentPageLayer =
      this.snsContentsSpriteLayer.getChildAt(inputIndex);
    this.snsShowingContentPageLayer.visible = true;
    let targetBitmap = this.snsShowingContentPageLayer.contentBitmaps.concat();
    //23/04/03 スイッチがONになった順にも対応するよう修正
    const isNotLiner = isNaN(_.osa1[inputIndex]);
    //23/06/09 不具合修正
    let switchOder = [];
    if (isNotLiner) {
      let tempArr = [];
      $gameSystem.savedSNSOpenVariables[inputIndex].forEach((id) => {
        const ind = _.osa1[inputIndex].indexOf(id);
        tempArr.push(targetBitmap[ind]);
        //23/06/09 不具合修正
        switchOder.push(ind);
      });
      targetBitmap = tempArr;
    } else {
      targetBitmap.length = $gameVariables.value(_.osa1[inputIndex]);
    }
    //23/03/28 逆順に変更
    targetBitmap = targetBitmap.reverse();
    //23/06/09 不具合修正
    const r_switchOder = switchOder.reverse();
    if (targetBitmap.contains(void 0)) {
      throw new Error(
        "SNSに表示する枚数の設定に不備があります。プラグインパラメータ「SNSに表示する枚数」の設定等を確認してください。"
      );
    }
    let bitmapHeight = targetBitmap.reduce((a, c) => a + c.height, 0);
    const strArr = _.osaa1[inputIndex];
    this.snsShowingContentPageLayer.bitmap = new Bitmap(_.na2[0], bitmapHeight);
    this.snsScreenImagePosition = [];
    this.snsScreenImageValNumberArray = [];
    let tempArray = [];
    let count = 0;
    //23/06/14 修正
    for (let str of strArr) {
      const len = str.split(",").length;
      let tempArr = [];
      for (let i = 0; i < len; i++) {
        tempArr.push(count);
        count++;
      }
      tempArray.push(tempArr);
    }
    targetBitmap.forEach((bitmap, index, self) => {
      let y = 0;
      for (let i = 0; i < index; i++) {
        y += self[i].height;
      }
      this.snsShowingContentPageLayer.bitmap.blt(
        bitmap,
        0,
        0,
        _.na2[0],
        bitmap.height,
        0,
        y
      );
      //23/03/28 strArrの[]の中身を逆順にした際の変更
      //23/04/03 スイッチがONになった順にも対応するよう修正
      //23/06/09 不具合修正
      const bitmapIndex = isNotLiner
        ? r_switchOder[index]
        : self.length - 1 - index;
      let arr = strArr[bitmapIndex].split(",").map((str) =>
        str.split("_").map((num, ind) => {
          return ind == 0 ? Number(num) + y : Number(num);
        })
      );
      this.snsScreenImagePosition = this.snsScreenImagePosition.concat(arr);
      //23/05/13 修正
      if (!isNotLiner) {
        this.snsScreenImageValNumberArray =
          this.snsScreenImageValNumberArray.map((num) => num + arr.length);
        for (let i = 0; i < arr.length; i++) {
          this.snsScreenImageValNumberArray.push(i);
        }
      }
    });
    if (isNotLiner) {
      for (let ind of switchOder) {
        this.snsScreenImageValNumberArray.push(tempArray[ind]);
      }
      this.snsScreenImageValNumberArray = [].concat(
        ...this.snsScreenImageValNumberArray
      );
    }
    this._SNSMenuInputWindow.select(-1);
    this._SNSMenuInputWindow.deactivate();
    this._snsMoveScreenMode = true;
  };

  Scene_Menu.prototype.commandInputSNSCancel = function () {
    this._commandWindow.activate();
    this._SNSMenuInputWindow.select(-1);
    this._SNSMenuInputWindow.deactivate();
  };

  const _alias_Scene_Menu_update = Scene_Menu.prototype.update;
  Scene_Menu.prototype.update = function () {
    _alias_Scene_Menu_update.call(this);
    $gameScreen.update();
    this.updateInterpreter();
    this.updateSNSScreenMove();
  };

  Scene_Menu.prototype.updateSNSScreenMove = function () {
    if (!this._snsMoveScreenMode) {
      return;
    }
    let rate = 5;
    const threshold = 20;
    if (
      this._snsYScrollAmout * rate + _.na2[1] <
        this.snsShowingContentPageLayer.bitmap.height &&
      (Input.isPressed("down") || TouchInput.wheelY >= threshold)
    ) {
      if (TouchInput.wheelY >= threshold) {
        this._snsYScrollAmout += 4;
      } else {
        this._snsYScrollAmout++;
      }
    } else if (
      this._snsYScrollAmout != 0 &&
      (Input.isPressed("up") || TouchInput.wheelY <= -threshold)
    ) {
      if (TouchInput.wheelY <= -threshold) {
        this._snsYScrollAmout -= 4;
      } else {
        this._snsYScrollAmout--;
      }
    } else if (Input.isTriggered("ok") || TouchInput.isTriggered()) {
      const center = this._snsYScrollAmout * rate + _.na2[1] / 2;
      let imagePos = -1;
      this.snsScreenImagePosition.forEach((arr, ind) => {
        if (arr[0] < center && center < arr[0] + arr[1]) {
          imagePos = ind;
        }
      });
      const imagaVal =
        typeof this.snsScreenImageValNumberArray[imagePos] !== "undefined"
          ? this.snsScreenImageValNumberArray[imagePos]
          : -1;
      console.log(this.snsScreenImageValNumberArray);
      console.log(imagaVal, imagePos);
      $gameVariables.setValue(_.n4, this._SNSMenuInputWindow.selectedIndex + 1);
      $gameVariables.setValue(_.n5, imagaVal + 1);
      $gameTemp.reserveCommonEvent(_.n6);
      this.snsImageEventActive = true;
    } else if (Input.isTriggered("cancel") || TouchInput.isCancelled()) {
      if (this.snsImageEventActive) {
        SoundManager.playCancel();
        $gameTemp.reserveCommonEvent(_.n7);
        this.snsImageEventActive = false;
      } else {
        SoundManager.playCancel();
        this._snsMoveScreenMode = false;
        this.snsShowingContentPageLayer.visible = false;
        this.snsHomeSpriteLayer.visible = true;
        this._SNSMenuInputWindow.select(0);
        this._SNSMenuInputWindow.activate();
      }
    }
    //23/06/09 修正
    const y = Math.min(
      Math.max(this._snsYScrollAmout * rate, 0),
      this.snsShowingContentPageLayer.bitmap.height - _.na2[1]
    );
    this.snsShowingContentPageLayer.setFrame(0, y, ..._.na2);
  };

  Scene_Menu.prototype.updateInterpreter = function () {
    for (;;) {
      this._interpreter.update();
      if (this._interpreter.isRunning()) {
        return;
      }
      if (!this._interpreter.setupReservedCommonEvent()) {
        return;
      }
    }
  };

  //22/12/24 追記
  const _alias_Scene_Menu_create = Scene_Menu.prototype.create;
  Scene_Menu.prototype.create = function () {
    $gameTemp.menuActorRefecenceFromStatusWindow = true;
    _alias_Scene_Menu_create.call(this);
    $gameTemp.menuActorRefecenceFromStatusWindow = false;
  };

  //22/12/24 追記
  const _alias_Scene_Menu_start = Scene_Menu.prototype.start;
  Scene_Menu.prototype.start = function () {
    $gameTemp.menuActorRefecenceFromStatusWindow = true;
    _alias_Scene_Menu_start.call(this);
    $gameTemp.menuActorRefecenceFromStatusWindow = false;
  };

  //23/08/11 追加
  //-----------------------------------------------------------------------------
  // Spriteset_Menu
  //

  function Spriteset_Menu() {
    this.initialize(...arguments);
  }

  Spriteset_Menu.prototype = Object.create(Spriteset_Base.prototype);
  Spriteset_Menu.prototype.constructor = Spriteset_Menu;

  Spriteset_Menu.prototype.updateToneChanger = function () {};

  //-----------------------------------------------------------------------------
  // Window_MenuCommand
  //

  const _alias_Window_MenuCommand_addOriginalCommands =
    Window_MenuCommand.prototype.addOriginalCommands;
  Window_MenuCommand.prototype.addOriginalCommands = function () {
    _alias_Window_MenuCommand_addOriginalCommands.call(this);
    this.addCommand("ＳＮＳ", "SNS", true);
    this.addCommand("借金返済", "debt", true);
  };

  const _alias_Window_MenuCommand_select = Window_MenuCommand.prototype.select;
  Window_MenuCommand.prototype.select = function (index) {
    _alias_Window_MenuCommand_select.call(this, index);
    if (!this._list[this.index()] || !SceneManager._scene.phoneScreen) {
      return;
    }
    if (this._list[this.index()].symbol == "debt") {
      SceneManager._scene.showDebtScreen();
    } else {
      SceneManager._scene.hideDebtScreen();
    }
    if (this._list[this.index()].symbol == "SNS") {
      SceneManager._scene.showSNSScreen();
    } else {
      SceneManager._scene.hideSNSScreen();
    }
    if (
      this._list[this.index()].symbol != "debt" &&
      this._list[this.index()].symbol != "SNS"
    ) {
      SceneManager._scene.phoneScreen.bitmap =
        ImageManager.loadSNSAndDebt("Menu_Home");
    }
  };

  //-----------------------------------------------------------------------------
  // Window_SNSMenuInput
  //

  function Window_SNSMenuInput() {
    this.initialize.apply(this, arguments);
  }

  Window_SNSMenuInput.prototype = Object.create(Window_Selectable.prototype);
  Window_SNSMenuInput.prototype.constructor = Window_InputRepayment;

  Window_SNSMenuInput.prototype.initialize = function () {
    const height = _.na3.length * _.n2 + 242 - _.n3;
    Window_Selectable.prototype.initialize.call(
      this,
      _.na1[0] + 4,
      _.na1[1] + _.n3 - 18,
      343,
      height
    );
    this.opacity = 0;
  };

  Window_SNSMenuInput.prototype.itemHeight = function () {
    return 60;
  };

  Window_SNSMenuInput.prototype.select = function (index) {
    Window_Selectable.prototype.select.call(this, index);
    if (index >= 0) {
      this.selectedIndex = index;
    }
  };

  Window_SNSMenuInput.prototype.maxItems = function () {
    return _.na3.length;
  };

  Window_SNSMenuInput.prototype.itemRect = function (index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight();
    rect.x = (index % maxCols) * (rect.width + this.spacing()) - this._scrollX;
    rect.y = Math.floor(index / maxCols) * _.n2 - this._scrollY;
    return rect;
  };

  Window_SNSMenuInput.prototype.updateArrows = function () {
    this.downArrowVisible = false;
    this.upArrowVisible = false;
  };

  //-----------------------------------------------------------------------------
  // Window_InputRepayment
  //

  function Window_InputRepayment() {
    this.initialize.apply(this, arguments);
  }

  Window_InputRepayment.prototype = Object.create(Window_NumberInput.prototype);
  Window_InputRepayment.prototype.constructor = Window_InputRepayment;

  Window_InputRepayment.prototype.initialize = function () {
    Window_NumberInput.prototype.initialize.call(this, null);
  };

  Window_InputRepayment.prototype.start = function () {
    this._maxDigits = 8;
    this._number = 1;
    this._number = this._number.clamp(0, Math.pow(10, this._maxDigits) - 1);
    this.updatePlacement();
    this.placeButtons();
    this.updateButtonsVisiblity();
    this.createContents();
    this.refresh();
    this.open();
    this.activate();
    this.select(0);
  };

  Window_InputRepayment.prototype.isCurrentItemEnabled = function () {
    return (
      $gameParty.gold() >= this._number &&
      $gameVariables.value(_.n1) - this._number >= 0
    );
  };

  Window_InputRepayment.prototype.updatePlacement = function () {
    this.x = 930;
    this.y = 400;
    this.width = this.windowWidth();
    this.height = this.windowHeight();
  };

  Window_InputRepayment.prototype.buttonY = function () {
    var spacing = 8;
    return 0 - this._buttons[0].height - spacing;
  };

  Window_InputRepayment.prototype.isCancelEnabled = function () {
    return true;
  };

  Window_InputRepayment.prototype.processOk = function () {
    if (this.isCurrentItemEnabled()) {
      const p = _.sa1;
      AudioManager.playSe({
        name: p[0],
        volume: Number(p[1]),
        pitch: Number(p[2]),
        pan: Number[3],
      });
      this.updateInputData();
      this.deactivate();
      this.close();
      this.callOkHandler();
    } else {
      this.playBuzzerSound();
    }
  };

  //22/12/24 追記
  //-----------------------------------------------------------------------------
  // Window_PartyMemberChoice
  //

  function Window_PartyMemberChoice() {
    this.initialize.apply(this, arguments);
  }

  Window_PartyMemberChoice.prototype = Object.create(
    Window_MenuStatus.prototype
  );
  Window_PartyMemberChoice.prototype.constructor = Window_PartyMemberChoice;

  Window_PartyMemberChoice.prototype.initialize = function (
    goldWindowHeight,
    commandWindowWidth,
    commandWindowHeight
  ) {
    Window_Selectable.prototype.initialize.call(
      this,
      0,
      commandWindowHeight,
      commandWindowWidth,
      Graphics.height - commandWindowHeight - goldWindowHeight
    );
    this._formationMode = false;
    this._pendingIndex = -1;
    this.deactivate();
    this.refresh();
  };

  Window_PartyMemberChoice.prototype.windowWidth = function () {
    return this.initWindowWidth;
  };

  Window_PartyMemberChoice.prototype.windowHeight = function () {
    return this.initWindowHeight;
  };

  //22/12/27 追記
  Window_PartyMemberChoice.prototype.drawAllItems = function () {
    this.drawText("【パーティー】", 0, 0, this.contentsWidth());
    Window_MenuStatus.prototype.drawAllItems.call(this);
  };

  //22/12/27 追記
  Window_PartyMemberChoice.prototype.itemRect = function (index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight();
    rect.x = (index % maxCols) * (rect.width + this.spacing()) - this._scrollX;
    rect.y = (index + 1) * rect.height - this._scrollY;
    return rect;
  };

  Window_PartyMemberChoice.prototype.drawItem = function (index) {
    const rect = this.itemRect(index);
    this.drawActorName(
      $gameParty.members()[index],
      this.textPadding(),
      rect.y + this.textPadding()
    );
  };

  //-----------------------------------------------------------------------------
  // Window_DebtButton
  //

  function Window_DebtButton() {
    this.initialize.apply(this, arguments);
  }

  Window_DebtButton.prototype = Object.create(Window_Selectable.prototype);
  Window_DebtButton.prototype.constructor = Window_DebtButton;

  Window_DebtButton.prototype.initialize = function () {
    Window_Selectable.prototype.initialize.call(
      this,
      _.na1[0] + 4,
      _.na1[1] + 480,
      ..._.na4
    );
    this.opacity = 0;
  };

  Window_DebtButton.prototype.itemHeight = function () {
    return 70;
  };

  Window_DebtButton.prototype.maxItems = function () {
    return 1;
  };

  Window_DebtButton.prototype.updateArrows = function () {
    this.downArrowVisible = false;
    this.upArrowVisible = false;
  };
}
