﻿//=============================================================================
// EasingPicture.js
// PUBLIC DOMAIN
//=============================================================================

/*:
 * @plugindesc ピクチャーの移動パターンを増やします。
 * @author くらむぼん
 *
 * @help
 * 「ピクチャの移動」の際の、位置・拡大率・不透明度の
 * 変化の仕方のパターンを変更できます。
 *
 * 使い方：
 * ◆プラグインコマンド：easing 動き方
 * ◆ピクチャの移動：（普通に設定する）
 * →指定した「動き方」でピクチャが移動します。
 *
 *
 * 以下にいくつかおすすめの「動き方」を載せておきます。
 *
 * linear
 * 　同じ速度でツーっと移動します。プラグイン無しの時の動きと同じ。
 * easeInQuad
 * 　じわ～っと動き出して、だんだん加速していきます。
 * easeOutQuad
 * 　出だしはシュッと素早く、最後の方はゆったり減速します。
 * easeInOutQuad
 * 　前半はだんだん加速していき、後半はゆったり減速します。
 * easeOutBack
 * 　ひゅっと移動した後、少し行き過ぎてから目的の値にバックしてきます。
 * easeOutElastic
 * 　びよよ～んと目的の値を前後してから最終的に目的の値で止まります。
 * easeOutBounce
 * 　目的の値でぼよ～んと何回か跳ね返ってから目的の値で止まります。
 *
 * その他の「動き方」が知りたい方は以下のサイトを参照してください。
 * http://easings.net/ja
 * このサイトには本プラグインで使用できるすべての「動き方」の
 * 名前と図が載っています。（図の見方：横軸が時間、縦軸が変化量）
 *
 *
 * 応用編：
 * ◆プラグインコマンド：easing 動き方 x
 * と指定することで、「横方向への位置の動き方」のみ個別に変更できます。
 * 同様に「y」で縦方向、「sx」で幅、「sy」で高さ、
 * 「op」で透明度の動き方を個別に指定できます。
 *
 * ライセンス：
 * このプラグインの利用法に制限はありません。お好きなようにどうぞ。
 */

(function (jQueryEasing) {
  "use strict";
  var _Game_Picture_move = Game_Picture.prototype.move;
  Game_Picture.prototype.move = function () {
    _Game_Picture_move.apply(this, arguments);
    this._time = 0;
    this._easingX = {
      f: $gameTemp._easingX,
      b: this._x,
      c: this._targetX - this._x,
    };
    this._easingY = {
      f: $gameTemp._easingY,
      b: this._y,
      c: this._targetY - this._y,
    };
    this._easingSx = {
      f: $gameTemp._easingSx,
      b: this._scaleX,
      c: this._targetScaleX - this._scaleX,
    };
    this._easingSy = {
      f: $gameTemp._easingSy,
      b: this._scaleY,
      c: this._targetScaleY - this._scaleY,
    };
    this._easingOp = {
      f: $gameTemp._easingOp,
      b: this._opacity,
      c: this._targetOpacity - this._opacity,
    };
  };

  Game_Picture.prototype.updateMove = function () {
    if (this._time < this._duration) {
      this._time++;
      this._x = this.updateEasing(this._easingX);
      this._y = this.updateEasing(this._easingY);
      this._scaleX = this.updateEasing(this._easingSx);
      this._scaleY = this.updateEasing(this._easingSy);
      this._opacity = this.updateEasing(this._easingOp);
    }
  };

  Game_Picture.prototype.updateEasing = function (easing) {
    if (jQueryEasing[easing.f]) {
      return jQueryEasing[easing.f](
        this._time,
        easing.b,
        easing.c,
        this._duration
      );
    } else {
      return jQueryEasing.linear(
        this._time,
        easing.b,
        easing.c,
        this._duration
      );
    }
  };

  var _Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.apply(this, arguments);
    if (command.toLowerCase() === "easing") {
      if (!args[1]) {
        $gameTemp._easingX = args[0];
        $gameTemp._easingY = args[0];
        $gameTemp._easingSx = args[0];
        $gameTemp._easingSy = args[0];
        $gameTemp._easingOp = args[0];
        return;
      }
      switch (args[1].toLowerCase()) {
        case "x":
          $gameTemp._easingX = args[0];
          break;
        case "y":
          $gameTemp._easingY = args[0];
          break;
        case "sx":
          $gameTemp._easingSx = args[0];
          break;
        case "sy":
          $gameTemp._easingSy = args[0];
          break;
        case "op":
          $gameTemp._easingOp = args[0];
          break;
        default:
          break;
      }
    }
  };
})(
  /* ============================================================
   * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
   *
   * Open source under the BSD License.
   *
   * Copyright © 2008 George McGinley Smith
   * All rights reserved.
   * https://raw.github.com/danro/jquery-easing/master/LICENSE
   * ======================================================== */

  {
    // t: current time, b: begInnIng value, c: change In value, d: duration
    linear: function (t, b, c, d) {
      return c * (t / d) + b;
    },
    easeInQuad: function (t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOutQuad: function (t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
      return (-c / 2) * (--t * (t - 2) - 1) + b;
    },
    easeInCubic: function (t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
      return (c / 2) * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function (t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
      return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
      return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function (t, b, c, d) {
      return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (t, b, c, d) {
      return c * Math.sin((t / d) * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (t, b, c, d) {
      return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
    },
    easeInExpo: function (t, b, c, d) {
      return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (t, b, c, d) {
      return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
    },
    easeInOutExpo: function (t, b, c, d) {
      if (t == 0) return b;
      if (t == d) return b + c;
      if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
      return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function (t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
      return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function (t, b, c, d) {
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (c == 0 || t == 0) return b;
      if ((t /= d) == 1) return b + c;
      if (!p) p = d * 0.3;
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
      return (
        -(
          a *
          Math.pow(2, 10 * (t -= 1)) *
          Math.sin(((t * d - s) * (2 * Math.PI)) / p)
        ) + b
      );
    },
    easeOutElastic: function (t, b, c, d) {
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (c == 0 || t == 0) return b;
      if ((t /= d) == 1) return b + c;
      if (!p) p = d * 0.3;
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
      return (
        a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
        c +
        b
      );
    },
    easeInOutElastic: function (t, b, c, d) {
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (c == 0 || t == 0) return b;
      if ((t /= d / 2) == 2) return b + c;
      if (!p) p = d * (0.3 * 1.5);
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
      if (t < 1)
        return (
          -0.5 *
            (a *
              Math.pow(2, 10 * (t -= 1)) *
              Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
          b
        );
      return (
        a *
          Math.pow(2, -10 * (t -= 1)) *
          Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
          0.5 +
        c +
        b
      );
    },
    easeInBack: function (t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function (t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function (t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      if ((t /= d / 2) < 1)
        return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
      return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function (t, b, c, d) {
      return c - this.easeOutBounce(d - t, 0, c, d) + b;
    },
    easeOutBounce: function (t, b, c, d) {
      if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
      } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
      } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
      } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
      }
    },
    easeInOutBounce: function (t, b, c, d) {
      if (t < d / 2) return this.easeInBounce(t * 2, 0, c, d) * 0.5 + b;
      return this.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    },
  }
);

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
