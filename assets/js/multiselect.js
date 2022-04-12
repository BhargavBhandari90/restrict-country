! function(t) {
    var e = {
            placeholder: "Select options",
            columns: 1,
            search: !1,
            searchOptions: {
                default: "Search",
                showOptGroups: !1,
                onSearch: function(t) {}
            },
            selectAll: !1,
            selectGroup: !1,
            minHeight: 200,
            maxHeight: null,
            showCheckbox: !0,
            jqActualOpts: {},
            onLoad: function(e) {
                t(e).hide()
            },
            onOptionClick: function(t, e) {},
            maxWidth: null,
            minSelect: !1,
            maxSelect: !1
        },
        i = 1;

    function o(i, o) {
        this.element = i, this.options = t.extend({}, e, o), this.load()
    }
    o.prototype = {
        load: function() {
            var e = this;
            if ("SELECT" != e.element.nodeName || t(e.element).hasClass("jqmsLoaded")) return !0;
            t(e.element).addClass("jqmsLoaded"), t(e.element).after('<div class="ms-options-wrap"><button>None Selected</button><div class="ms-options"><ul></ul></div></div>');
            var i = t(e.element).next(".ms-options-wrap").find("> button:first-child"),
                o = t(e.element).next(".ms-options-wrap").find("> .ms-options"),
                s = o.find("> ul"),
                n = !!t(e.element).find("optgroup").length,
                l = null;
            "number" == typeof e.options.width ? (o.parent().css("position", "relative"), l = e.options.width) : "string" == typeof e.options.width ? (t(e.options.width).css("position", "relative"), l = "100%") : o.parent().css("position", "relative");
            var a = t(window).height() - o.offset().top - 20;
            if (e.options.maxHeight && (a = (a = t(window).height() - o.offset().top - 20) < e.options.minHeight ? e.options.minHeight : maxheight), a = a < e.options.minHeight ? e.options.minHeight : a, o.css({
                    maxWidth: l,
                    minHeight: e.options.minHeight,
                    maxHeight: a,
                    overflow: "auto"
                }).hide(), o.bind("touchmove mousewheel DOMMouseScroll", function(e) {
                    if (t(this).outerHeight() < t(this)[0].scrollHeight) {
                        var i = e.originalEvent,
                            o = i.wheelDelta || -i.detail;
                        t(this).outerHeight() + t(this)[0].scrollTop > t(this)[0].scrollHeight && (e.preventDefault(), this.scrollTop += o < 0 ? 1 : -1)
                    }
                }), t(document).off("click.ms-hideopts").on("click.ms-hideopts", function(e) {
                    t(e.target).closest(".ms-options-wrap").length || t(".ms-options-wrap > .ms-options:visible").hide()
                }), i.bind("mousedown", function(i) {
                    if (1 != i.which) return !0;
                    if (t(".ms-options-wrap > .ms-options:visible").each(function() {
                            t(this).parent().prev()[0] != o.parent().prev()[0] && t(this).hide()
                        }), o.toggle(), o.is(":visible")) {
                        o.css("maxHeight", "");
                        var s = t(window).height() - o.offset().top - 20;
                        e.options.maxHeight && (s = (s = t(window).height() - o.offset().top - 20) < e.options.minHeight ? e.options.minHeight : maxheight), s = s < e.options.minHeight ? e.options.minHeight : s, o.css("maxHeight", s)
                    }
                }).click(function(t) {
                    t.preventDefault()
                }), e.options.placeholder && i.text(e.options.placeholder), e.options.search) {
                s.before('<div class="ms-search"><input type="text" value="" placeholder="' + e.options.searchOptions.default+'" /></div>');
                var p = o.find(".ms-search input");
                p.on("keyup", function() {
                    if (t(this).data("lastsearch") == t(this).val()) return !0;
                    t(this).data("lastsearch", t(this).val()), "function" == typeof e.options.searchOptions.onSearch && e.options.searchOptions.onSearch(e.element), s.find("li:not(.optgroup)").each(function() {
                        t(this).text().toLowerCase().indexOf(p.val().toLowerCase()) > -1 ? t(this).show() : t(this).hasClass("selected") || t(this).hide(), !e.options.searchOptions.showOptGroups && t(this).closest("li.optgroup") && (t(this).closest("li.optgroup").show(), t(this).closest("li.optgroup").find("li:visible").length ? t(this).closest("li.optgroup").show() : t(this).closest("li.optgroup").hide())
                    })
                })
            }
            e.options.selectAll && s.before('<a href="#" class="ms-selectall global">Select all</a>'), o.on("click", ".ms-selectall", function(e) {
                if (e.preventDefault(), t(this).hasClass("global")) s.find("li:not(.optgroup)").filter(":not(.selected)").length ? s.find("li:not(.optgroup)").filter(":not(.selected)").find('input[type="checkbox"]').trigger("click") : s.find('li:not(.optgroup).selected input[type="checkbox"]').trigger("click");
                else if (t(this).closest("li").hasClass("optgroup")) {
                    var i = t(this).closest("li.optgroup");
                    i.find("li:not(.selected)").length ? i.find('li:not(.selected) input[type="checkbox"]').trigger("click") : i.find('li.selected input[type="checkbox"]').trigger("click")
                }
            });
            var c = [];
            t(e.element).children().each(function() {
                if ("OPTGROUP" == this.nodeName) {
                    var e = [];
                    t(this).children("option").each(function() {
                        e[t(this).val()] = {
                            name: t(this).text(),
                            value: t(this).val(),
                            checked: t(this).prop("selected")
                        }
                    }), c.push({
                        label: t(this).attr("label"),
                        options: e
                    })
                } else {
                    if ("OPTION" != this.nodeName) return !0;
                    c.push({
                        name: t(this).text(),
                        value: t(this).val(),
                        checked: t(this).prop("selected")
                    })
                }
            }), e.loadOptions(c), n ? (s.find("> li:not(.optgroup)").css({
                float: "left",
                width: 100 / e.options.columns + "%"
            }), s.find("li.optgroup").css({
                clear: "both"
            }).find("> ul").css({
                "column-count": e.options.columns,
                "column-gap": 0,
                "-webkit-column-count": e.options.columns,
                "-webkit-column-gap": 0,
                "-moz-column-count": e.options.columns,
                "-moz-column-gap": 0
            }), this._ieVersion() && this._ieVersion() < 10 && s.find("li.optgroup > ul > li").css({
                float: "left",
                width: 100 / e.options.columns + "%"
            })) : (s.css({
                "column-count": e.options.columns,
                "column-gap": 0,
                "-webkit-column-count": e.options.columns,
                "-webkit-column-gap": 0,
                "-moz-column-count": e.options.columns,
                "-moz-column-gap": 0
            }), this._ieVersion() && this._ieVersion() < 10 && s.find("> li").css({
                float: "left",
                width: 100 / e.options.columns + "%"
            })), o.on("click", 'input[type="checkbox"]', function() {
                t(this).closest("li").toggleClass("selected"), o.parent().prev().find('option[value="' + t(this).val() + '"]').prop("selected", t(this).is(":checked")).closest("select").trigger("change"), "function" == typeof e.options.onOptionClick && e.options.onOptionClick(), e._updatePlaceholderText()
            }), "function" == typeof e.options.onLoad ? e.options.onLoad(e.element) : t(e.element).hide()
        },
        loadOptions: function(e, i) {
            i = "boolean" != typeof i || i;
            var o = t(this.element).next(".ms-options-wrap").find("> .ms-options > ul");
            for (var s in i && o.find("> li").remove(), e) {
                var n = e[s],
                    l = t("<li></li>");
                if (n.hasOwnProperty("options"))
                    for (var a in l.addClass("optgroup"), l.append('<span class="label">' + n.label + "</span>"), l.find("> .label").css({
                            clear: "both"
                        }), this.options.selectGroup && l.append('<a href="#" class="ms-selectall">Select all</a>'), l.append("<ul></ul>"), n.options) {
                        var p = n.options[a],
                            c = t("<li></li>").addClass("ms-reflow");
                        this._addOption(c, p), l.find("> ul").append(c)
                    } else n.hasOwnProperty("value") && (l.addClass("ms-reflow"), this._addOption(l, n));
                o.append(l)
            }
            o.find('.ms-reflow input[type="checkbox"]').each(function(e) {
                if (t(this).css("display").match(/block$/)) {
                    var i = t(this).outerWidth();
                    i = i || 15, t(this).closest("label").css("padding-left", 2 * parseInt(t(this).closest("label").css("padding-left")) + i), t(this).closest(".ms-reflow").removeClass("ms-reflow")
                }
            }), this._updatePlaceholderText()
        },
        unload: function() {
            t(this.element).next(".ms-options-wrap").remove(), t(this.element).show(function() {
                t(this).css("display", "").removeClass("jqmsLoaded")
            })
        },
        reload: function() {
            t(this.element).next(".ms-options-wrap").remove(), t(this.element).removeClass("jqmsLoaded"), this.load()
        },
        _updatePlaceholderText: function() {
            var e = t(this.element).next(".ms-options-wrap").find("> button:first-child"),
                i = t(this.element).next(".ms-options-wrap").find("> .ms-options"),
                o = i.parent().prev(),
                s = [];
            o.find("option:selected").each(function() {
                s.push(t(this).text())
            }), e.text(s.join(", "));
            var n = e.clone().css({
                display: "inline",
                width: "auto",
                visibility: "hidden"
            }).appendTo(i.parent());
            (void 0 !== t.fn.actual ? n.actual("width", this.options.jqActualOpts) : n.width()) > (void 0 !== t.fn.actual ? e.actual("width", this.options.jqActualOpts) : e.width()) ? e.text(s.length + " selected"): s.length ? e.text(s.join(", ")) : e.text(this.options.placeholder), n.remove()
        },
        _addOption: function(e, o) {
            e.text(o.name), e.prepend(t('<input type="checkbox" value="" title="" />').val(o.value).attr("title", o.name).attr("id", "ms-opt-" + i)), o.checked && (e.addClass("default"), e.addClass("selected"), e.find('input[type="checkbox"]').prop("checked", !0));
            var s = t("<label></label>").attr("for", "ms-opt-" + i);
            e.wrapInner(s), this.options.showCheckbox || e.find('input[id="ms-opt-' + i + '"]').hide(), i += 1
        },
        _ieVersion: function() {
            var t = navigator.userAgent.toLowerCase();
            return -1 != t.indexOf("msie") && parseInt(t.split("msie")[1])
        }
    }, t.fn.multiselect = function(e) {
        var i, s = arguments;
        return void 0 === e || "object" == typeof e ? this.each(function() {
            t.data(this, "plugin_multiselect") || t.data(this, "plugin_multiselect", new o(this, e))
        }) : "string" == typeof e && "_" !== e[0] && "init" !== e ? (this.each(function() {
            var n = t.data(this, "plugin_multiselect");
            n instanceof o && "function" == typeof n[e] && (i = n[e].apply(n, Array.prototype.slice.call(s, 1))), "unload" === e && t.data(this, "plugin_multiselect", null)
        }), i) : void 0
    }
}(jQuery);