/**
 * @fileOverview init.js
 */
!function(e,n,t){"use strict";function i(){n("[data-js-hamburger-trigger]").on("click",function(){n("html").toggleClass("js-header-fixed"),n(this).closest(".g-siteHeader").find(".g-siteHeader_menu"),!n(this).hasClass("js-header-fixed"),n(".g-siteHeader_menu").slideToggle()})}function o(){n(window).on("load scroll",function(){var e=n(window).scrollTop(),t=n(window).height();n(".js-fade-in").each(function(){var i=n(this).offset().top;e>i-t+50&&n(this).addClass("js-fade-in-active")})})}function a(){n('a[href^="#"]').click(function(){var e=500,t=n(this).attr("href"),i=n("#"==t||""==t?"html":t),o=i.offset().top;return n("html, body").animate({scrollTop:o},e,"swing"),!1})}function s(){var e=n("#loading");e.fadeOut(800,"swing")}function r(){(navigator.userAgent.match(/MSIE 10/i)||navigator.userAgent.match(/Trident\/7\./)||navigator.userAgent.match(/Edge\/12\./))&&n(".indexPage").on("mousewheel",function(e){var n=event.wheelDelta,t=window.pageYOffset;window.scrollTo(0,t-n),e.preventDefault()})}n(window).on("load",function(){s()}),n(function(){i(),o(),a(),r()})}("undefined"!=typeof window?window:this,jQuery);