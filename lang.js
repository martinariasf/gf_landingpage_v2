/* Site-wide language switching: EN / DE / ES.
 *
 * This replaces the eight near-identical copies that used to live in
 * script.js, startup-script.js, script-vr.js and inline in index.html,
 * pilot.html, webinar.html, webinar-video.html, martin-arias.html and
 * omar-garcia.html. They had drifted apart (different storage keys,
 * different defaults, textContent vs innerHTML), so a visitor's choice
 * did not survive navigation. One implementation, one storage key.
 *
 * Markup contract:
 *   - Translatable node: data-en / data-de / data-es on the element.
 *     Missing data-es falls back to data-en rather than leaving the
 *     previous language on screen.
 *   - By default the value replaces the element's HTML (a handful of
 *     strings carry <strong>). Values are authored in these files, never
 *     user input, so this is not an injection surface.
 *   - data-i18n-attr="placeholder" writes to that attribute instead.
 *     <input>/<textarea> without the hint default to placeholder.
 *   - Switch control: any element with data-set-lang="en|de|es". Clicks are
 *     handled by delegation, so pages need no wiring of their own.
 *
 * Pages with extra language-dependent strings in JS (pilot.html's wizard,
 * the webinar forms) listen for the 'gf:langchange' event on document.
 */
(function () {
    'use strict';

    var LANGS = ['en', 'de', 'es'];
    var STORAGE_KEY = 'site-lang';
    var FALLBACK = 'de'; // German SMEs are the primary audience
    var current = FALLBACK;

    function read(key) {
        try { return localStorage.getItem(key); } catch (e) { return null; } // private mode
    }

    function write(key, value) {
        try { localStorage.setItem(key, value); } catch (e) { /* private mode */ }
    }

    function isLang(value) {
        return LANGS.indexOf(value) !== -1;
    }

    // Returns [lang, persist]. ?lang= wins over a stored choice, so a campaign
    // link can force a language for someone who once clicked a different one,
    // and it persists, or the choice would be lost on the first internal link.
    function detect() {
        var fromUrl = '';
        try {
            fromUrl = (new URLSearchParams(window.location.search).get('lang') || '').toLowerCase();
        } catch (e) { /* very old browser */ }
        if (isLang(fromUrl)) return [fromUrl, true];

        var stored = read(STORAGE_KEY);
        if (isLang(stored)) return [stored, false];

        var prefs = navigator.languages || [navigator.language || ''];
        for (var i = 0; i < prefs.length; i++) {
            var p = (prefs[i] || '').toLowerCase();
            for (var j = 0; j < LANGS.length; j++) {
                if (p.indexOf(LANGS[j]) === 0) return [LANGS[j], false];
            }
        }
        return [FALLBACK, false];
    }

    function translate(root, lang) {
        var nodes = (root || document).querySelectorAll('[data-en]');
        for (var i = 0; i < nodes.length; i++) {
            var el = nodes[i];
            var value = el.getAttribute('data-' + lang);
            if (value === null) value = el.getAttribute('data-en'); // untranslated yet
            if (value === null) continue;

            var attr = el.getAttribute('data-i18n-attr');
            if (!attr && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) attr = 'placeholder';

            if (attr) el.setAttribute(attr, value);
            else el.innerHTML = value;
        }
    }

    function paintSwitches(lang) {
        var opts = document.querySelectorAll('[data-set-lang]');
        for (var i = 0; i < opts.length; i++) {
            var el = opts[i];
            var active = el.getAttribute('data-set-lang') === lang;
            el.classList.toggle('active', active);
            // Kept for the older stylesheets that still target this name.
            el.classList.toggle('active-lang', active);
            // aria-current, not aria-pressed: these are one-of-three, not
            // three independent toggles.
            if (active) el.setAttribute('aria-current', 'true');
            else el.removeAttribute('aria-current');
        }
    }

    // Keep ?lang= in the address bar in step with the choice, so the URL a
    // visitor copies is the language they are actually looking at.
    function syncUrl(lang) {
        if (!window.history || !history.replaceState) return;
        try {
            var url = new URL(window.location.href);
            url.searchParams.set('lang', lang);
            history.replaceState(null, '', url);
        } catch (e) { /* older browser: the stored choice still carries */ }
    }

    function apply(lang, persist) {
        if (!isLang(lang)) lang = FALLBACK;
        current = lang;
        document.documentElement.setAttribute('lang', lang);
        translate(document, lang);
        paintSwitches(lang);
        if (persist) write(STORAGE_KEY, lang);
        document.dispatchEvent(new CustomEvent('gf:langchange', { detail: { lang: lang } }));
    }

    document.addEventListener('click', function (event) {
        // Let modified clicks through: the options are real links, so
        // ctrl/cmd-click and middle-click should open the language in a tab.
        if (event.defaultPrevented || event.button !== 0
            || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        var target = event.target.closest ? event.target.closest('[data-set-lang]') : null;
        if (!target) return;
        event.preventDefault();
        var lang = target.getAttribute('data-set-lang');
        apply(lang, true);
        syncUrl(lang);
    });

    window.GFLang = {
        LANGS: LANGS.slice(),
        get: function () { return current; },
        set: function (lang) { apply(lang, true); },
        // Re-translate markup added after load (the growth modal, wizard steps).
        refresh: function (root) { translate(root, current); }
    };

    // This file loads from <head>, so the first apply() runs before the body
    // exists and only sets the language; the DOMContentLoaded pass is the one
    // that swaps the copy.
    var initial = detect();
    apply(initial[0], initial[1]);
    document.addEventListener('DOMContentLoaded', function () { apply(current, false); });
})();
