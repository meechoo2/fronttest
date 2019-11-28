/**
 * @fileOverview init.js
 */

(function (global, $, undefined) {
  'use strict';

  /**
   * @typedef {Function} loading
   * @desc __ハンバーガーメニューの設定__
   *
   */
  function gHeaderNav() {
    $('[data-js-hamburger-trigger]').on('click', function () {
      $('html').toggleClass('js-header-fixed');
      $(this).closest('.g-siteHeader').find('.g-siteHeader_menu');
      // $('.g-siteHeader_menu').css('display', 'block');
      if (!$(this).hasClass('js-header-fixed')) {
        // $('.g-siteHeader_menu').css('display', 'block');
      }
      $('.g-siteHeader_menu').slideToggle();
    });
  }

  /**
   * @typedef {Function} loading
   * @desc __要素ごとのフェードイン__
   *
   */
  function elementFadeIn() {
    $(window).on('load scroll', function() {
      var windowScroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      // var fadeInTarget = $('.js-fade-in');
      $('.js-fade-in').each(function () {
        var targetPosition = $(this).offset().top;
        if (windowScroll > targetPosition - windowHeight + 50) {
          $(this).addClass('js-fade-in-active');
        }
      });
    })
  }

  /**
   * @typedef {Function} loading
   * @desc __スムーズスクロール__
   *
   */

  function smoothScroll() {
    $('a[href^="#"]').click(function () {
      var speed = 500;
      var href = $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $("html, body").animate({ scrollTop: position }, speed, "swing");
      return false;
    });
  }

    /**
   * @typedef {Function} loading
   * @desc __タグ絞り込み__
   *
   */

  function contentFilter() {
    var filterShowItem = $('.js-filter-show-item');
    var filterTargetItem = filterShowItem.attr('data-js-filter');
    filterShowItem.addClass('js-filter-active');

    $('.js-filter-target').on('click', function() {
      filterShowItem.removeClass('js-filter-active');
      var filterTarget = $(this).attr('id');
      if(filterTarget === "") {
        filterShowItem.addClass('js-filter-active');
      } else {
        // var filterTarget = $(this).attr('id');
        // $('[data-js-filter]').data(filterTarget).addClass('js-filter-active');
      }
    })
  }

  /**
   * @typedef {Function} loading
   * @desc __ローディングの設定__
   *
   */

  function hideLoading() {
    var $hideloading = $('#loading');
    $hideloading.fadeOut(800, 'swing');
  }

  function bgIEFixed() {
    if (navigator.userAgent.match(/MSIE 10/i) ||
      navigator.userAgent.match(/Trident\/7\./) ||
      navigator.userAgent.match(/Edge\/12\./)) {
      $('.indexPage').on("mousewheel", function (e) {
        var wd = event.wheelDelta;
        var csp = window.pageYOffset;
        window.scrollTo(0, csp - wd);
        e.preventDefault();
        // return false;
      });
    }
  }

  $(window).on('load', function () {
    //ローディング設定
    hideLoading();
  })

  //===================================== document ready
  $(function () {
    //ハンバーガーメニューの設定
    gHeaderNav();
    //フェードイン
    elementFadeIn();
    //スムーズスクロール
    smoothScroll();
    //タグ絞り込み
    // contentFilter();
    //IEで背景画像ガタつき解消
    bgIEFixed();
  });
})(typeof window !== 'undefined' ? window : this, jQuery);
