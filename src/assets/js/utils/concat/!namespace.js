/**
 * @fileOverview namespace.js
 */

(function(global) {
  'use strict';

  //--------------------------------------------------------------------------
  // Namespace
  //--------------------------------------------------------------------------
  /**
   * @typedef {object} global.cnt
   * @desc __名前空間(プロジェクト単位)__
   *
   * 'global'は通常windowオブジェクトを指す
   *
   * 'cnt'はプロジェクトごとに適宜調整
   */
  global.cnt = global.cnt || {};

  //--------------------------------------------------------------------------
  //  Class Definition
  //--------------------------------------------------------------------------
  /**
   * namespaceクラス：名前空間を設定する
   *
   * @constructor
   * @param {string} definition 設定したい名前空間文字列
   * @param {object} namespace 設定したい名前空間
   */
  var namespace = function(definition, namespace) {
    var ns = namespace || global;
    var def = definition.split('.');

    for (var i = 0, defLength = def.length; i < defLength; i++) {
      ns = _define(ns, def[i]);
    }
  };

  //--------------------------------------------------------------------------
  //  Private Methods
  //--------------------------------------------------------------------------
  /**
   * _define()：名前空間オブジェクトを生成
   * @param {object} obj 名前空間オブジェクト
   * @param {string} prop 設定したい名前空間文字列
   */
  function _define(obj, prop) {
    obj[prop] = obj[prop] || {};
    return obj[prop];
  }

  //--------------------------------------------------------------------------
  // Export
  //--------------------------------------------------------------------------
  global.cnt.namespace = namespace;
})(typeof window !== 'undefined' ? window : this);
