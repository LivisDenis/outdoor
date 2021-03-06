(() => {
  "use strict";
  function e(e) {
    this.type = e;
  }
  (e.prototype.init = function () {
    const e = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let e = 0; e < this.nodes.length; e++) {
      const t = this.nodes[e],
        n = t.dataset.da.trim().split(","),
        r = {};
      (r.element = t),
        (r.parent = t.parentNode),
        (r.destination = document.querySelector(n[0].trim())),
        (r.breakpoint = n[1] ? n[1].trim() : "767"),
        (r.place = n[2] ? n[2].trim() : "last"),
        (r.index = this.indexInParent(r.parent, r.element)),
        this.оbjects.push(r);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (e) {
          return (
            "(" + this.type + "-width: " + e.breakpoint + "px)," + e.breakpoint
          );
        },
        this
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (e, t, n) {
          return Array.prototype.indexOf.call(n, e) === t;
        }
      ));
    for (let t = 0; t < this.mediaQueries.length; t++) {
      const n = this.mediaQueries[t],
        r = String.prototype.split.call(n, ","),
        i = window.matchMedia(r[0]),
        o = r[1],
        a = Array.prototype.filter.call(this.оbjects, function (e) {
          return e.breakpoint === o;
        });
      i.addListener(function () {
        e.mediaHandler(i, a);
      }),
        this.mediaHandler(i, a);
    }
  }),
    (e.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const n = t[e];
          (n.index = this.indexInParent(n.parent, n.element)),
            this.moveTo(n.place, n.element, n.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const n = t[e];
          n.element.classList.contains(this.daClassname) &&
            this.moveBack(n.parent, n.element, n.index);
        }
    }),
    (e.prototype.moveTo = function (e, t, n) {
      t.classList.add(this.daClassname),
        "last" === e || e >= n.children.length
          ? n.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? n.children[e].insertAdjacentElement("beforebegin", t)
          : n.insertAdjacentElement("afterbegin", t);
    }),
    (e.prototype.moveBack = function (e, t, n) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[n]
          ? e.children[n].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (e.prototype.indexInParent = function (e, t) {
      const n = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(n, t);
    }),
    (e.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new e("max").init();
  class t {
    constructor(e, t = null) {
      if (
        ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
        this.config.init)
      ) {
        const e = document.querySelectorAll("[data-prlx-mouse]");
        e.length
          ? (this.paralaxMouseInit(e),
            this.setLogging(`Проснулся, слежу за объектами: (${e.length})`))
          : this.setLogging("Нет ни одного объекта. Сплю...zzZZZzZZz...");
      }
    }
    paralaxMouseInit(e) {
      e.forEach((e) => {
        const t = e.closest("[data-prlx-mouse-wrapper]"),
          n = e.dataset.prlxCx ? +e.dataset.prlxCx : 100,
          r = e.dataset.prlxCy ? +e.dataset.prlxCy : 100,
          i = e.hasAttribute("data-prlx-dxr") ? -1 : 1,
          o = e.hasAttribute("data-prlx-dyr") ? -1 : 1,
          a = e.dataset.prlxA ? +e.dataset.prlxA : 50;
        let s = 0,
          c = 0,
          u = 0,
          p = 0;
        function f(t = window) {
          t.addEventListener("mousemove", function (t) {
            const n = e.getBoundingClientRect().top + window.scrollY;
            if (n >= window.scrollY || n + e.offsetHeight >= window.scrollY) {
              const e = window.innerWidth,
                n = window.innerHeight,
                r = t.clientX - e / 2,
                i = t.clientY - n / 2;
              (u = (r / e) * 100), (p = (i / n) * 100);
            }
          });
        }
        !(function t() {
          (s += ((u - s) * a) / 1e3),
            (c += ((p - c) * a) / 1e3),
            (e.style.cssText = `transform: translate3D(${(i * s) / (n / 10)}%,${
              (o * c) / (r / 10)
            }%,0);`),
            requestAnimationFrame(t);
        })(),
          t ? f(t) : f();
      });
    }
    setLogging(e) {
      this.config.logging &&
        (function (e) {
          setTimeout(() => {
            window.FLS && console.log(e);
          }, 0);
        })(`[PRLX Mouse]: ${e}`);
    }
  }
  let n = !0,
    r = (e = 500) => {
      let t = document.querySelector("body");
      if (n) {
        let r = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < r.length; e++) {
            r[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (n = !1),
          setTimeout(function () {
            n = !0;
          }, e);
      }
    },
    i = (e = 500) => {
      let t = document.querySelector("body");
      if (n) {
        let r = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < r.length; e++) {
          r[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (n = !1),
          setTimeout(function () {
            n = !0;
          }, e);
      }
    };
  function o(e) {
    if (null == e) return window;
    if ("[object Window]" !== e.toString()) {
      var t = e.ownerDocument;
      return (t && t.defaultView) || window;
    }
    return e;
  }
  function a(e) {
    return e instanceof o(e).Element || e instanceof Element;
  }
  function s(e) {
    return e instanceof o(e).HTMLElement || e instanceof HTMLElement;
  }
  function c(e) {
    return (
      "undefined" != typeof ShadowRoot &&
      (e instanceof o(e).ShadowRoot || e instanceof ShadowRoot)
    );
  }
  var u = Math.max,
    p = Math.min,
    f = Math.round;
  function l(e, t) {
    void 0 === t && (t = !1);
    var n = e.getBoundingClientRect(),
      r = 1,
      i = 1;
    if (s(e) && t) {
      var o = e.offsetHeight,
        a = e.offsetWidth;
      a > 0 && (r = f(n.width) / a || 1), o > 0 && (i = f(n.height) / o || 1);
    }
    return {
      width: n.width / r,
      height: n.height / i,
      top: n.top / i,
      right: n.right / r,
      bottom: n.bottom / i,
      left: n.left / r,
      x: n.left / r,
      y: n.top / i,
    };
  }
  function d(e) {
    var t = o(e);
    return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
  }
  function m(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
  }
  function h(e) {
    return ((a(e) ? e.ownerDocument : e.document) || window.document)
      .documentElement;
  }
  function v(e) {
    return l(h(e)).left + d(e).scrollLeft;
  }
  function g(e) {
    return o(e).getComputedStyle(e);
  }
  function y(e) {
    var t = g(e),
      n = t.overflow,
      r = t.overflowX,
      i = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + i + r);
  }
  function b(e, t, n) {
    void 0 === n && (n = !1);
    var r,
      i,
      a = s(t),
      c =
        s(t) &&
        (function (e) {
          var t = e.getBoundingClientRect(),
            n = f(t.width) / e.offsetWidth || 1,
            r = f(t.height) / e.offsetHeight || 1;
          return 1 !== n || 1 !== r;
        })(t),
      u = h(t),
      p = l(e, c),
      g = { scrollLeft: 0, scrollTop: 0 },
      b = { x: 0, y: 0 };
    return (
      (a || (!a && !n)) &&
        (("body" !== m(t) || y(u)) &&
          (g =
            (r = t) !== o(r) && s(r)
              ? { scrollLeft: (i = r).scrollLeft, scrollTop: i.scrollTop }
              : d(r)),
        s(t)
          ? (((b = l(t, !0)).x += t.clientLeft), (b.y += t.clientTop))
          : u && (b.x = v(u))),
      {
        x: p.left + g.scrollLeft - b.x,
        y: p.top + g.scrollTop - b.y,
        width: p.width,
        height: p.height,
      }
    );
  }
  function w(e) {
    var t = l(e),
      n = e.offsetWidth,
      r = e.offsetHeight;
    return (
      Math.abs(t.width - n) <= 1 && (n = t.width),
      Math.abs(t.height - r) <= 1 && (r = t.height),
      { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
    );
  }
  function x(e) {
    return "html" === m(e)
      ? e
      : e.assignedSlot || e.parentNode || (c(e) ? e.host : null) || h(e);
  }
  function O(e) {
    return ["html", "body", "#document"].indexOf(m(e)) >= 0
      ? e.ownerDocument.body
      : s(e) && y(e)
      ? e
      : O(x(e));
  }
  function A(e, t) {
    var n;
    void 0 === t && (t = []);
    var r = O(e),
      i = r === (null == (n = e.ownerDocument) ? void 0 : n.body),
      a = o(r),
      s = i ? [a].concat(a.visualViewport || [], y(r) ? r : []) : r,
      c = t.concat(s);
    return i ? c : c.concat(A(x(s)));
  }
  function E(e) {
    return ["table", "td", "th"].indexOf(m(e)) >= 0;
  }
  function T(e) {
    return s(e) && "fixed" !== g(e).position ? e.offsetParent : null;
  }
  function L(e) {
    for (var t = o(e), n = T(e); n && E(n) && "static" === g(n).position; )
      n = T(n);
    return n &&
      ("html" === m(n) || ("body" === m(n) && "static" === g(n).position))
      ? t
      : n ||
          (function (e) {
            var t = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (
              -1 !== navigator.userAgent.indexOf("Trident") &&
              s(e) &&
              "fixed" === g(e).position
            )
              return null;
            var n = x(e);
            for (
              c(n) && (n = n.host);
              s(n) && ["html", "body"].indexOf(m(n)) < 0;

            ) {
              var r = g(n);
              if (
                "none" !== r.transform ||
                "none" !== r.perspective ||
                "paint" === r.contain ||
                -1 !== ["transform", "perspective"].indexOf(r.willChange) ||
                (t && "filter" === r.willChange) ||
                (t && r.filter && "none" !== r.filter)
              )
                return n;
              n = n.parentNode;
            }
            return null;
          })(e) ||
          t;
  }
  var j = "top",
    k = "bottom",
    D = "right",
    C = "left",
    S = "auto",
    M = [j, k, D, C],
    W = "start",
    P = "end",
    R = "viewport",
    H = "popper",
    B = M.reduce(function (e, t) {
      return e.concat([t + "-" + W, t + "-" + P]);
    }, []),
    I = [].concat(M, [S]).reduce(function (e, t) {
      return e.concat([t, t + "-" + W, t + "-" + P]);
    }, []),
    V = [
      "beforeRead",
      "read",
      "afterRead",
      "beforeMain",
      "main",
      "afterMain",
      "beforeWrite",
      "write",
      "afterWrite",
    ];
  function q(e) {
    var t = new Map(),
      n = new Set(),
      r = [];
    function i(e) {
      n.add(e.name),
        []
          .concat(e.requires || [], e.requiresIfExists || [])
          .forEach(function (e) {
            if (!n.has(e)) {
              var r = t.get(e);
              r && i(r);
            }
          }),
        r.push(e);
    }
    return (
      e.forEach(function (e) {
        t.set(e.name, e);
      }),
      e.forEach(function (e) {
        n.has(e.name) || i(e);
      }),
      r
    );
  }
  var N = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function U() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return !t.some(function (e) {
      return !(e && "function" == typeof e.getBoundingClientRect);
    });
  }
  function _(e) {
    void 0 === e && (e = {});
    var t = e,
      n = t.defaultModifiers,
      r = void 0 === n ? [] : n,
      i = t.defaultOptions,
      o = void 0 === i ? N : i;
    return function (e, t, n) {
      void 0 === n && (n = o);
      var i,
        s,
        c = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, N, o),
          modifiersData: {},
          elements: { reference: e, popper: t },
          attributes: {},
          styles: {},
        },
        u = [],
        p = !1,
        f = {
          state: c,
          setOptions: function (n) {
            var i = "function" == typeof n ? n(c.options) : n;
            l(),
              (c.options = Object.assign({}, o, c.options, i)),
              (c.scrollParents = {
                reference: a(e)
                  ? A(e)
                  : e.contextElement
                  ? A(e.contextElement)
                  : [],
                popper: A(t),
              });
            var s = (function (e) {
              var t = q(e);
              return V.reduce(function (e, n) {
                return e.concat(
                  t.filter(function (e) {
                    return e.phase === n;
                  })
                );
              }, []);
            })(
              (function (e) {
                var t = e.reduce(function (e, t) {
                  var n = e[t.name];
                  return (
                    (e[t.name] = n
                      ? Object.assign({}, n, t, {
                          options: Object.assign({}, n.options, t.options),
                          data: Object.assign({}, n.data, t.data),
                        })
                      : t),
                    e
                  );
                }, {});
                return Object.keys(t).map(function (e) {
                  return t[e];
                });
              })([].concat(r, c.options.modifiers))
            );
            return (
              (c.orderedModifiers = s.filter(function (e) {
                return e.enabled;
              })),
              c.orderedModifiers.forEach(function (e) {
                var t = e.name,
                  n = e.options,
                  r = void 0 === n ? {} : n,
                  i = e.effect;
                if ("function" == typeof i) {
                  var o = i({ state: c, name: t, instance: f, options: r }),
                    a = function () {};
                  u.push(o || a);
                }
              }),
              f.update()
            );
          },
          forceUpdate: function () {
            if (!p) {
              var e = c.elements,
                t = e.reference,
                n = e.popper;
              if (U(t, n)) {
                (c.rects = {
                  reference: b(t, L(n), "fixed" === c.options.strategy),
                  popper: w(n),
                }),
                  (c.reset = !1),
                  (c.placement = c.options.placement),
                  c.orderedModifiers.forEach(function (e) {
                    return (c.modifiersData[e.name] = Object.assign(
                      {},
                      e.data
                    ));
                  });
                for (var r = 0; r < c.orderedModifiers.length; r++)
                  if (!0 !== c.reset) {
                    var i = c.orderedModifiers[r],
                      o = i.fn,
                      a = i.options,
                      s = void 0 === a ? {} : a,
                      u = i.name;
                    "function" == typeof o &&
                      (c =
                        o({ state: c, options: s, name: u, instance: f }) || c);
                  } else (c.reset = !1), (r = -1);
              }
            }
          },
          update:
            ((i = function () {
              return new Promise(function (e) {
                f.forceUpdate(), e(c);
              });
            }),
            function () {
              return (
                s ||
                  (s = new Promise(function (e) {
                    Promise.resolve().then(function () {
                      (s = void 0), e(i());
                    });
                  })),
                s
              );
            }),
          destroy: function () {
            l(), (p = !0);
          },
        };
      if (!U(e, t)) return f;
      function l() {
        u.forEach(function (e) {
          return e();
        }),
          (u = []);
      }
      return (
        f.setOptions(n).then(function (e) {
          !p && n.onFirstUpdate && n.onFirstUpdate(e);
        }),
        f
      );
    };
  }
  var F = { passive: !0 };
  function z(e) {
    return e.split("-")[0];
  }
  function $(e) {
    return e.split("-")[1];
  }
  function Y(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
  }
  function Q(e) {
    var t,
      n = e.reference,
      r = e.element,
      i = e.placement,
      o = i ? z(i) : null,
      a = i ? $(i) : null,
      s = n.x + n.width / 2 - r.width / 2,
      c = n.y + n.height / 2 - r.height / 2;
    switch (o) {
      case j:
        t = { x: s, y: n.y - r.height };
        break;
      case k:
        t = { x: s, y: n.y + n.height };
        break;
      case D:
        t = { x: n.x + n.width, y: c };
        break;
      case C:
        t = { x: n.x - r.width, y: c };
        break;
      default:
        t = { x: n.x, y: n.y };
    }
    var u = o ? Y(o) : null;
    if (null != u) {
      var p = "y" === u ? "height" : "width";
      switch (a) {
        case W:
          t[u] = t[u] - (n[p] / 2 - r[p] / 2);
          break;
        case P:
          t[u] = t[u] + (n[p] / 2 - r[p] / 2);
      }
    }
    return t;
  }
  var X = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function Z(e) {
    var t,
      n = e.popper,
      r = e.popperRect,
      i = e.placement,
      a = e.variation,
      s = e.offsets,
      c = e.position,
      u = e.gpuAcceleration,
      p = e.adaptive,
      l = e.roundOffsets,
      d = e.isFixed,
      m = s.x,
      v = void 0 === m ? 0 : m,
      y = s.y,
      b = void 0 === y ? 0 : y,
      w = "function" == typeof l ? l({ x: v, y: b }) : { x: v, y: b };
    (v = w.x), (b = w.y);
    var x = s.hasOwnProperty("x"),
      O = s.hasOwnProperty("y"),
      A = C,
      E = j,
      T = window;
    if (p) {
      var S = L(n),
        M = "clientHeight",
        W = "clientWidth";
      if (
        (S === o(n) &&
          "static" !== g((S = h(n))).position &&
          "absolute" === c &&
          ((M = "scrollHeight"), (W = "scrollWidth")),
        (S = S),
        i === j || ((i === C || i === D) && a === P))
      )
        (E = k),
          (b -=
            (d && S === T && T.visualViewport
              ? T.visualViewport.height
              : S[M]) - r.height),
          (b *= u ? 1 : -1);
      if (i === C || ((i === j || i === k) && a === P))
        (A = D),
          (v -=
            (d && S === T && T.visualViewport ? T.visualViewport.width : S[W]) -
            r.width),
          (v *= u ? 1 : -1);
    }
    var R,
      H = Object.assign({ position: c }, p && X),
      B =
        !0 === l
          ? (function (e) {
              var t = e.x,
                n = e.y,
                r = window.devicePixelRatio || 1;
              return { x: f(t * r) / r || 0, y: f(n * r) / r || 0 };
            })({ x: v, y: b })
          : { x: v, y: b };
    return (
      (v = B.x),
      (b = B.y),
      u
        ? Object.assign(
            {},
            H,
            (((R = {})[E] = O ? "0" : ""),
            (R[A] = x ? "0" : ""),
            (R.transform =
              (T.devicePixelRatio || 1) <= 1
                ? "translate(" + v + "px, " + b + "px)"
                : "translate3d(" + v + "px, " + b + "px, 0)"),
            R)
          )
        : Object.assign(
            {},
            H,
            (((t = {})[E] = O ? b + "px" : ""),
            (t[A] = x ? v + "px" : ""),
            (t.transform = ""),
            t)
          )
    );
  }
  const J = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function (e) {
      var t = e.state;
      Object.keys(t.elements).forEach(function (e) {
        var n = t.styles[e] || {},
          r = t.attributes[e] || {},
          i = t.elements[e];
        s(i) &&
          m(i) &&
          (Object.assign(i.style, n),
          Object.keys(r).forEach(function (e) {
            var t = r[e];
            !1 === t
              ? i.removeAttribute(e)
              : i.setAttribute(e, !0 === t ? "" : t);
          }));
      });
    },
    effect: function (e) {
      var t = e.state,
        n = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      return (
        Object.assign(t.elements.popper.style, n.popper),
        (t.styles = n),
        t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
        function () {
          Object.keys(t.elements).forEach(function (e) {
            var r = t.elements[e],
              i = t.attributes[e] || {},
              o = Object.keys(
                t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]
              ).reduce(function (e, t) {
                return (e[t] = ""), e;
              }, {});
            s(r) &&
              m(r) &&
              (Object.assign(r.style, o),
              Object.keys(i).forEach(function (e) {
                r.removeAttribute(e);
              }));
          });
        }
      );
    },
    requires: ["computeStyles"],
  };
  const G = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: function (e) {
      var t = e.state,
        n = e.options,
        r = e.name,
        i = n.offset,
        o = void 0 === i ? [0, 0] : i,
        a = I.reduce(function (e, n) {
          return (
            (e[n] = (function (e, t, n) {
              var r = z(e),
                i = [C, j].indexOf(r) >= 0 ? -1 : 1,
                o =
                  "function" == typeof n
                    ? n(Object.assign({}, t, { placement: e }))
                    : n,
                a = o[0],
                s = o[1];
              return (
                (a = a || 0),
                (s = (s || 0) * i),
                [C, D].indexOf(r) >= 0 ? { x: s, y: a } : { x: a, y: s }
              );
            })(n, t.rects, o)),
            e
          );
        }, {}),
        s = a[t.placement],
        c = s.x,
        u = s.y;
      null != t.modifiersData.popperOffsets &&
        ((t.modifiersData.popperOffsets.x += c),
        (t.modifiersData.popperOffsets.y += u)),
        (t.modifiersData[r] = a);
    },
  };
  var K = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function ee(e) {
    return e.replace(/left|right|bottom|top/g, function (e) {
      return K[e];
    });
  }
  var te = { start: "end", end: "start" };
  function ne(e) {
    return e.replace(/start|end/g, function (e) {
      return te[e];
    });
  }
  function re(e, t) {
    var n = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (n && c(n)) {
      var r = t;
      do {
        if (r && e.isSameNode(r)) return !0;
        r = r.parentNode || r.host;
      } while (r);
    }
    return !1;
  }
  function ie(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height,
    });
  }
  function oe(e, t) {
    return t === R
      ? ie(
          (function (e) {
            var t = o(e),
              n = h(e),
              r = t.visualViewport,
              i = n.clientWidth,
              a = n.clientHeight,
              s = 0,
              c = 0;
            return (
              r &&
                ((i = r.width),
                (a = r.height),
                /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
                  ((s = r.offsetLeft), (c = r.offsetTop))),
              { width: i, height: a, x: s + v(e), y: c }
            );
          })(e)
        )
      : a(t)
      ? (function (e) {
          var t = l(e);
          return (
            (t.top = t.top + e.clientTop),
            (t.left = t.left + e.clientLeft),
            (t.bottom = t.top + e.clientHeight),
            (t.right = t.left + e.clientWidth),
            (t.width = e.clientWidth),
            (t.height = e.clientHeight),
            (t.x = t.left),
            (t.y = t.top),
            t
          );
        })(t)
      : ie(
          (function (e) {
            var t,
              n = h(e),
              r = d(e),
              i = null == (t = e.ownerDocument) ? void 0 : t.body,
              o = u(
                n.scrollWidth,
                n.clientWidth,
                i ? i.scrollWidth : 0,
                i ? i.clientWidth : 0
              ),
              a = u(
                n.scrollHeight,
                n.clientHeight,
                i ? i.scrollHeight : 0,
                i ? i.clientHeight : 0
              ),
              s = -r.scrollLeft + v(e),
              c = -r.scrollTop;
            return (
              "rtl" === g(i || n).direction &&
                (s += u(n.clientWidth, i ? i.clientWidth : 0) - o),
              { width: o, height: a, x: s, y: c }
            );
          })(h(e))
        );
  }
  function ae(e, t, n) {
    var r =
        "clippingParents" === t
          ? (function (e) {
              var t = A(x(e)),
                n =
                  ["absolute", "fixed"].indexOf(g(e).position) >= 0 && s(e)
                    ? L(e)
                    : e;
              return a(n)
                ? t.filter(function (e) {
                    return a(e) && re(e, n) && "body" !== m(e);
                  })
                : [];
            })(e)
          : [].concat(t),
      i = [].concat(r, [n]),
      o = i[0],
      c = i.reduce(function (t, n) {
        var r = oe(e, n);
        return (
          (t.top = u(r.top, t.top)),
          (t.right = p(r.right, t.right)),
          (t.bottom = p(r.bottom, t.bottom)),
          (t.left = u(r.left, t.left)),
          t
        );
      }, oe(e, o));
    return (
      (c.width = c.right - c.left),
      (c.height = c.bottom - c.top),
      (c.x = c.left),
      (c.y = c.top),
      c
    );
  }
  function se(e) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
  }
  function ce(e, t) {
    return t.reduce(function (t, n) {
      return (t[n] = e), t;
    }, {});
  }
  function ue(e, t) {
    void 0 === t && (t = {});
    var n = t,
      r = n.placement,
      i = void 0 === r ? e.placement : r,
      o = n.boundary,
      s = void 0 === o ? "clippingParents" : o,
      c = n.rootBoundary,
      u = void 0 === c ? R : c,
      p = n.elementContext,
      f = void 0 === p ? H : p,
      d = n.altBoundary,
      m = void 0 !== d && d,
      v = n.padding,
      g = void 0 === v ? 0 : v,
      y = se("number" != typeof g ? g : ce(g, M)),
      b = f === H ? "reference" : H,
      w = e.rects.popper,
      x = e.elements[m ? b : f],
      O = ae(a(x) ? x : x.contextElement || h(e.elements.popper), s, u),
      A = l(e.elements.reference),
      E = Q({ reference: A, element: w, strategy: "absolute", placement: i }),
      T = ie(Object.assign({}, w, E)),
      L = f === H ? T : A,
      C = {
        top: O.top - L.top + y.top,
        bottom: L.bottom - O.bottom + y.bottom,
        left: O.left - L.left + y.left,
        right: L.right - O.right + y.right,
      },
      S = e.modifiersData.offset;
    if (f === H && S) {
      var W = S[i];
      Object.keys(C).forEach(function (e) {
        var t = [D, k].indexOf(e) >= 0 ? 1 : -1,
          n = [j, k].indexOf(e) >= 0 ? "y" : "x";
        C[e] += W[n] * t;
      });
    }
    return C;
  }
  function pe(e, t, n) {
    return u(e, p(t, n));
  }
  const fe = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t = e.state,
        n = e.options,
        r = e.name,
        i = n.mainAxis,
        o = void 0 === i || i,
        a = n.altAxis,
        s = void 0 !== a && a,
        c = n.boundary,
        f = n.rootBoundary,
        l = n.altBoundary,
        d = n.padding,
        m = n.tether,
        h = void 0 === m || m,
        v = n.tetherOffset,
        g = void 0 === v ? 0 : v,
        y = ue(t, { boundary: c, rootBoundary: f, padding: d, altBoundary: l }),
        b = z(t.placement),
        x = $(t.placement),
        O = !x,
        A = Y(b),
        E = "x" === A ? "y" : "x",
        T = t.modifiersData.popperOffsets,
        S = t.rects.reference,
        M = t.rects.popper,
        P =
          "function" == typeof g
            ? g(Object.assign({}, t.rects, { placement: t.placement }))
            : g,
        R =
          "number" == typeof P
            ? { mainAxis: P, altAxis: P }
            : Object.assign({ mainAxis: 0, altAxis: 0 }, P),
        H = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
        B = { x: 0, y: 0 };
      if (T) {
        if (o) {
          var I,
            V = "y" === A ? j : C,
            q = "y" === A ? k : D,
            N = "y" === A ? "height" : "width",
            U = T[A],
            _ = U + y[V],
            F = U - y[q],
            Q = h ? -M[N] / 2 : 0,
            X = x === W ? S[N] : M[N],
            Z = x === W ? -M[N] : -S[N],
            J = t.elements.arrow,
            G = h && J ? w(J) : { width: 0, height: 0 },
            K = t.modifiersData["arrow#persistent"]
              ? t.modifiersData["arrow#persistent"].padding
              : { top: 0, right: 0, bottom: 0, left: 0 },
            ee = K[V],
            te = K[q],
            ne = pe(0, S[N], G[N]),
            re = O
              ? S[N] / 2 - Q - ne - ee - R.mainAxis
              : X - ne - ee - R.mainAxis,
            ie = O
              ? -S[N] / 2 + Q + ne + te + R.mainAxis
              : Z + ne + te + R.mainAxis,
            oe = t.elements.arrow && L(t.elements.arrow),
            ae = oe ? ("y" === A ? oe.clientTop || 0 : oe.clientLeft || 0) : 0,
            se = null != (I = null == H ? void 0 : H[A]) ? I : 0,
            ce = U + ie - se,
            fe = pe(h ? p(_, U + re - se - ae) : _, U, h ? u(F, ce) : F);
          (T[A] = fe), (B[A] = fe - U);
        }
        if (s) {
          var le,
            de = "x" === A ? j : C,
            me = "x" === A ? k : D,
            he = T[E],
            ve = "y" === E ? "height" : "width",
            ge = he + y[de],
            ye = he - y[me],
            be = -1 !== [j, C].indexOf(b),
            we = null != (le = null == H ? void 0 : H[E]) ? le : 0,
            xe = be ? ge : he - S[ve] - M[ve] - we + R.altAxis,
            Oe = be ? he + S[ve] + M[ve] - we - R.altAxis : ye,
            Ae =
              h && be
                ? (function (e, t, n) {
                    var r = pe(e, t, n);
                    return r > n ? n : r;
                  })(xe, he, Oe)
                : pe(h ? xe : ge, he, h ? Oe : ye);
          (T[E] = Ae), (B[E] = Ae - he);
        }
        t.modifiersData[r] = B;
      }
    },
    requiresIfExists: ["offset"],
  };
  const le = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t,
        n = e.state,
        r = e.name,
        i = e.options,
        o = n.elements.arrow,
        a = n.modifiersData.popperOffsets,
        s = z(n.placement),
        c = Y(s),
        u = [C, D].indexOf(s) >= 0 ? "height" : "width";
      if (o && a) {
        var p = (function (e, t) {
            return se(
              "number" !=
                typeof (e =
                  "function" == typeof e
                    ? e(Object.assign({}, t.rects, { placement: t.placement }))
                    : e)
                ? e
                : ce(e, M)
            );
          })(i.padding, n),
          f = w(o),
          l = "y" === c ? j : C,
          d = "y" === c ? k : D,
          m =
            n.rects.reference[u] +
            n.rects.reference[c] -
            a[c] -
            n.rects.popper[u],
          h = a[c] - n.rects.reference[c],
          v = L(o),
          g = v ? ("y" === c ? v.clientHeight || 0 : v.clientWidth || 0) : 0,
          y = m / 2 - h / 2,
          b = p[l],
          x = g - f[u] - p[d],
          O = g / 2 - f[u] / 2 + y,
          A = pe(b, O, x),
          E = c;
        n.modifiersData[r] = (((t = {})[E] = A), (t.centerOffset = A - O), t);
      }
    },
    effect: function (e) {
      var t = e.state,
        n = e.options.element,
        r = void 0 === n ? "[data-popper-arrow]" : n;
      null != r &&
        ("string" != typeof r || (r = t.elements.popper.querySelector(r))) &&
        re(t.elements.popper, r) &&
        (t.elements.arrow = r);
    },
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"],
  };
  function de(e, t, n) {
    return (
      void 0 === n && (n = { x: 0, y: 0 }),
      {
        top: e.top - t.height - n.y,
        right: e.right - t.width + n.x,
        bottom: e.bottom - t.height + n.y,
        left: e.left - t.width - n.x,
      }
    );
  }
  function me(e) {
    return [j, D, k, C].some(function (t) {
      return e[t] >= 0;
    });
  }
  var he = _({
      defaultModifiers: [
        {
          name: "eventListeners",
          enabled: !0,
          phase: "write",
          fn: function () {},
          effect: function (e) {
            var t = e.state,
              n = e.instance,
              r = e.options,
              i = r.scroll,
              a = void 0 === i || i,
              s = r.resize,
              c = void 0 === s || s,
              u = o(t.elements.popper),
              p = [].concat(t.scrollParents.reference, t.scrollParents.popper);
            return (
              a &&
                p.forEach(function (e) {
                  e.addEventListener("scroll", n.update, F);
                }),
              c && u.addEventListener("resize", n.update, F),
              function () {
                a &&
                  p.forEach(function (e) {
                    e.removeEventListener("scroll", n.update, F);
                  }),
                  c && u.removeEventListener("resize", n.update, F);
              }
            );
          },
          data: {},
        },
        {
          name: "popperOffsets",
          enabled: !0,
          phase: "read",
          fn: function (e) {
            var t = e.state,
              n = e.name;
            t.modifiersData[n] = Q({
              reference: t.rects.reference,
              element: t.rects.popper,
              strategy: "absolute",
              placement: t.placement,
            });
          },
          data: {},
        },
        {
          name: "computeStyles",
          enabled: !0,
          phase: "beforeWrite",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              r = n.gpuAcceleration,
              i = void 0 === r || r,
              o = n.adaptive,
              a = void 0 === o || o,
              s = n.roundOffsets,
              c = void 0 === s || s,
              u = {
                placement: z(t.placement),
                variation: $(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: i,
                isFixed: "fixed" === t.options.strategy,
              };
            null != t.modifiersData.popperOffsets &&
              (t.styles.popper = Object.assign(
                {},
                t.styles.popper,
                Z(
                  Object.assign({}, u, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: a,
                    roundOffsets: c,
                  })
                )
              )),
              null != t.modifiersData.arrow &&
                (t.styles.arrow = Object.assign(
                  {},
                  t.styles.arrow,
                  Z(
                    Object.assign({}, u, {
                      offsets: t.modifiersData.arrow,
                      position: "absolute",
                      adaptive: !1,
                      roundOffsets: c,
                    })
                  )
                )),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-placement": t.placement,
              }));
          },
          data: {},
        },
        J,
        G,
        {
          name: "flip",
          enabled: !0,
          phase: "main",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              r = e.name;
            if (!t.modifiersData[r]._skip) {
              for (
                var i = n.mainAxis,
                  o = void 0 === i || i,
                  a = n.altAxis,
                  s = void 0 === a || a,
                  c = n.fallbackPlacements,
                  u = n.padding,
                  p = n.boundary,
                  f = n.rootBoundary,
                  l = n.altBoundary,
                  d = n.flipVariations,
                  m = void 0 === d || d,
                  h = n.allowedAutoPlacements,
                  v = t.options.placement,
                  g = z(v),
                  y =
                    c ||
                    (g === v || !m
                      ? [ee(v)]
                      : (function (e) {
                          if (z(e) === S) return [];
                          var t = ee(e);
                          return [ne(e), t, ne(t)];
                        })(v)),
                  b = [v].concat(y).reduce(function (e, n) {
                    return e.concat(
                      z(n) === S
                        ? (function (e, t) {
                            void 0 === t && (t = {});
                            var n = t,
                              r = n.placement,
                              i = n.boundary,
                              o = n.rootBoundary,
                              a = n.padding,
                              s = n.flipVariations,
                              c = n.allowedAutoPlacements,
                              u = void 0 === c ? I : c,
                              p = $(r),
                              f = p
                                ? s
                                  ? B
                                  : B.filter(function (e) {
                                      return $(e) === p;
                                    })
                                : M,
                              l = f.filter(function (e) {
                                return u.indexOf(e) >= 0;
                              });
                            0 === l.length && (l = f);
                            var d = l.reduce(function (t, n) {
                              return (
                                (t[n] = ue(e, {
                                  placement: n,
                                  boundary: i,
                                  rootBoundary: o,
                                  padding: a,
                                })[z(n)]),
                                t
                              );
                            }, {});
                            return Object.keys(d).sort(function (e, t) {
                              return d[e] - d[t];
                            });
                          })(t, {
                            placement: n,
                            boundary: p,
                            rootBoundary: f,
                            padding: u,
                            flipVariations: m,
                            allowedAutoPlacements: h,
                          })
                        : n
                    );
                  }, []),
                  w = t.rects.reference,
                  x = t.rects.popper,
                  O = new Map(),
                  A = !0,
                  E = b[0],
                  T = 0;
                T < b.length;
                T++
              ) {
                var L = b[T],
                  P = z(L),
                  R = $(L) === W,
                  H = [j, k].indexOf(P) >= 0,
                  V = H ? "width" : "height",
                  q = ue(t, {
                    placement: L,
                    boundary: p,
                    rootBoundary: f,
                    altBoundary: l,
                    padding: u,
                  }),
                  N = H ? (R ? D : C) : R ? k : j;
                w[V] > x[V] && (N = ee(N));
                var U = ee(N),
                  _ = [];
                if (
                  (o && _.push(q[P] <= 0),
                  s && _.push(q[N] <= 0, q[U] <= 0),
                  _.every(function (e) {
                    return e;
                  }))
                ) {
                  (E = L), (A = !1);
                  break;
                }
                O.set(L, _);
              }
              if (A)
                for (
                  var F = function (e) {
                      var t = b.find(function (t) {
                        var n = O.get(t);
                        if (n)
                          return n.slice(0, e).every(function (e) {
                            return e;
                          });
                      });
                      if (t) return (E = t), "break";
                    },
                    Y = m ? 3 : 1;
                  Y > 0;
                  Y--
                ) {
                  if ("break" === F(Y)) break;
                }
              t.placement !== E &&
                ((t.modifiersData[r]._skip = !0),
                (t.placement = E),
                (t.reset = !0));
            }
          },
          requiresIfExists: ["offset"],
          data: { _skip: !1 },
        },
        fe,
        le,
        {
          name: "hide",
          enabled: !0,
          phase: "main",
          requiresIfExists: ["preventOverflow"],
          fn: function (e) {
            var t = e.state,
              n = e.name,
              r = t.rects.reference,
              i = t.rects.popper,
              o = t.modifiersData.preventOverflow,
              a = ue(t, { elementContext: "reference" }),
              s = ue(t, { altBoundary: !0 }),
              c = de(a, r),
              u = de(s, i, o),
              p = me(c),
              f = me(u);
            (t.modifiersData[n] = {
              referenceClippingOffsets: c,
              popperEscapeOffsets: u,
              isReferenceHidden: p,
              hasPopperEscaped: f,
            }),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-reference-hidden": p,
                "data-popper-escaped": f,
              }));
          },
        },
      ],
    }),
    ve = "tippy-content",
    ge = "tippy-backdrop",
    ye = "tippy-arrow",
    be = "tippy-svg-arrow",
    we = { passive: !0, capture: !0 },
    xe = function () {
      return document.body;
    };
  function Oe(e, t, n) {
    if (Array.isArray(e)) {
      var r = e[t];
      return null == r ? (Array.isArray(n) ? n[t] : n) : r;
    }
    return e;
  }
  function Ae(e, t) {
    var n = {}.toString.call(e);
    return 0 === n.indexOf("[object") && n.indexOf(t + "]") > -1;
  }
  function Ee(e, t) {
    return "function" == typeof e ? e.apply(void 0, t) : e;
  }
  function Te(e, t) {
    return 0 === t
      ? e
      : function (r) {
          clearTimeout(n),
            (n = setTimeout(function () {
              e(r);
            }, t));
        };
    var n;
  }
  function Le(e) {
    return [].concat(e);
  }
  function je(e, t) {
    -1 === e.indexOf(t) && e.push(t);
  }
  function ke(e) {
    return e.split("-")[0];
  }
  function De(e) {
    return [].slice.call(e);
  }
  function Ce(e) {
    return Object.keys(e).reduce(function (t, n) {
      return void 0 !== e[n] && (t[n] = e[n]), t;
    }, {});
  }
  function Se() {
    return document.createElement("div");
  }
  function Me(e) {
    return ["Element", "Fragment"].some(function (t) {
      return Ae(e, t);
    });
  }
  function We(e) {
    return Ae(e, "MouseEvent");
  }
  function Pe(e) {
    return !(!e || !e._tippy || e._tippy.reference !== e);
  }
  function Re(e) {
    return Me(e)
      ? [e]
      : (function (e) {
          return Ae(e, "NodeList");
        })(e)
      ? De(e)
      : Array.isArray(e)
      ? e
      : De(document.querySelectorAll(e));
  }
  function He(e, t) {
    e.forEach(function (e) {
      e && (e.style.transitionDuration = t + "ms");
    });
  }
  function Be(e, t) {
    e.forEach(function (e) {
      e && e.setAttribute("data-state", t);
    });
  }
  function Ie(e) {
    var t,
      n = Le(e)[0];
    return null != n && null != (t = n.ownerDocument) && t.body
      ? n.ownerDocument
      : document;
  }
  function Ve(e, t, n) {
    var r = t + "EventListener";
    ["transitionend", "webkitTransitionEnd"].forEach(function (t) {
      e[r](t, n);
    });
  }
  function qe(e, t) {
    for (var n = t; n; ) {
      var r;
      if (e.contains(n)) return !0;
      n =
        null == n.getRootNode || null == (r = n.getRootNode())
          ? void 0
          : r.host;
    }
    return !1;
  }
  var Ne = { isTouch: !1 },
    Ue = 0;
  function _e() {
    Ne.isTouch ||
      ((Ne.isTouch = !0),
      window.performance && document.addEventListener("mousemove", Fe));
  }
  function Fe() {
    var e = performance.now();
    e - Ue < 20 &&
      ((Ne.isTouch = !1), document.removeEventListener("mousemove", Fe)),
      (Ue = e);
  }
  function ze() {
    var e = document.activeElement;
    if (Pe(e)) {
      var t = e._tippy;
      e.blur && !t.state.isVisible && e.blur();
    }
  }
  var $e =
    !!("undefined" != typeof window && "undefined" != typeof document) &&
    !!window.msCrypto;
  var Ye = {
      animateFill: !1,
      followCursor: !1,
      inlinePositioning: !1,
      sticky: !1,
    },
    Qe = Object.assign(
      {
        appendTo: xe,
        aria: { content: "auto", expanded: "auto" },
        delay: 0,
        duration: [300, 250],
        getReferenceClientRect: null,
        hideOnClick: !0,
        ignoreAttributes: !1,
        interactive: !1,
        interactiveBorder: 2,
        interactiveDebounce: 0,
        moveTransition: "",
        offset: [0, 10],
        onAfterUpdate: function () {},
        onBeforeUpdate: function () {},
        onCreate: function () {},
        onDestroy: function () {},
        onHidden: function () {},
        onHide: function () {},
        onMount: function () {},
        onShow: function () {},
        onShown: function () {},
        onTrigger: function () {},
        onUntrigger: function () {},
        onClickOutside: function () {},
        placement: "top",
        plugins: [],
        popperOptions: {},
        render: null,
        showOnCreate: !1,
        touch: !0,
        trigger: "mouseenter focus",
        triggerTarget: null,
      },
      Ye,
      {
        allowHTML: !1,
        animation: "fade",
        arrow: !0,
        content: "",
        inertia: !1,
        maxWidth: 350,
        role: "tooltip",
        theme: "",
        zIndex: 9999,
      }
    ),
    Xe = Object.keys(Qe);
  function Ze(e) {
    var t = (e.plugins || []).reduce(function (t, n) {
      var r,
        i = n.name,
        o = n.defaultValue;
      i && (t[i] = void 0 !== e[i] ? e[i] : null != (r = Qe[i]) ? r : o);
      return t;
    }, {});
    return Object.assign({}, e, t);
  }
  function Je(e, t) {
    var n = Object.assign(
      {},
      t,
      { content: Ee(t.content, [e]) },
      t.ignoreAttributes
        ? {}
        : (function (e, t) {
            return (
              t ? Object.keys(Ze(Object.assign({}, Qe, { plugins: t }))) : Xe
            ).reduce(function (t, n) {
              var r = (e.getAttribute("data-tippy-" + n) || "").trim();
              if (!r) return t;
              if ("content" === n) t[n] = r;
              else
                try {
                  t[n] = JSON.parse(r);
                } catch (e) {
                  t[n] = r;
                }
              return t;
            }, {});
          })(e, t.plugins)
    );
    return (
      (n.aria = Object.assign({}, Qe.aria, n.aria)),
      (n.aria = {
        expanded: "auto" === n.aria.expanded ? t.interactive : n.aria.expanded,
        content:
          "auto" === n.aria.content
            ? t.interactive
              ? null
              : "describedby"
            : n.aria.content,
      }),
      n
    );
  }
  function Ge(e, t) {
    e.innerHTML = t;
  }
  function Ke(e) {
    var t = Se();
    return (
      !0 === e
        ? (t.className = ye)
        : ((t.className = be), Me(e) ? t.appendChild(e) : Ge(t, e)),
      t
    );
  }
  function et(e, t) {
    Me(t.content)
      ? (Ge(e, ""), e.appendChild(t.content))
      : "function" != typeof t.content &&
        (t.allowHTML ? Ge(e, t.content) : (e.textContent = t.content));
  }
  function tt(e) {
    var t = e.firstElementChild,
      n = De(t.children);
    return {
      box: t,
      content: n.find(function (e) {
        return e.classList.contains(ve);
      }),
      arrow: n.find(function (e) {
        return e.classList.contains(ye) || e.classList.contains(be);
      }),
      backdrop: n.find(function (e) {
        return e.classList.contains(ge);
      }),
    };
  }
  function nt(e) {
    var t = Se(),
      n = Se();
    (n.className = "tippy-box"),
      n.setAttribute("data-state", "hidden"),
      n.setAttribute("tabindex", "-1");
    var r = Se();
    function i(n, r) {
      var i = tt(t),
        o = i.box,
        a = i.content,
        s = i.arrow;
      r.theme
        ? o.setAttribute("data-theme", r.theme)
        : o.removeAttribute("data-theme"),
        "string" == typeof r.animation
          ? o.setAttribute("data-animation", r.animation)
          : o.removeAttribute("data-animation"),
        r.inertia
          ? o.setAttribute("data-inertia", "")
          : o.removeAttribute("data-inertia"),
        (o.style.maxWidth =
          "number" == typeof r.maxWidth ? r.maxWidth + "px" : r.maxWidth),
        r.role ? o.setAttribute("role", r.role) : o.removeAttribute("role"),
        (n.content === r.content && n.allowHTML === r.allowHTML) ||
          et(a, e.props),
        r.arrow
          ? s
            ? n.arrow !== r.arrow &&
              (o.removeChild(s), o.appendChild(Ke(r.arrow)))
            : o.appendChild(Ke(r.arrow))
          : s && o.removeChild(s);
    }
    return (
      (r.className = ve),
      r.setAttribute("data-state", "hidden"),
      et(r, e.props),
      t.appendChild(n),
      n.appendChild(r),
      i(e.props, e.props),
      { popper: t, onUpdate: i }
    );
  }
  nt.$$tippy = !0;
  var rt = 1,
    it = [],
    ot = [];
  function at(e, t) {
    var n,
      r,
      i,
      o,
      a,
      s,
      c,
      u,
      p = Je(e, Object.assign({}, Qe, Ze(Ce(t)))),
      f = !1,
      l = !1,
      d = !1,
      m = !1,
      h = [],
      v = Te(Y, p.interactiveDebounce),
      g = rt++,
      y = (u = p.plugins).filter(function (e, t) {
        return u.indexOf(e) === t;
      }),
      b = {
        id: g,
        reference: e,
        popper: Se(),
        popperInstance: null,
        props: p,
        state: {
          isEnabled: !0,
          isVisible: !1,
          isDestroyed: !1,
          isMounted: !1,
          isShown: !1,
        },
        plugins: y,
        clearDelayTimeouts: function () {
          clearTimeout(n), clearTimeout(r), cancelAnimationFrame(i);
        },
        setProps: function (t) {
          0;
          if (b.state.isDestroyed) return;
          W("onBeforeUpdate", [b, t]), z();
          var n = b.props,
            r = Je(e, Object.assign({}, n, Ce(t), { ignoreAttributes: !0 }));
          (b.props = r),
            F(),
            n.interactiveDebounce !== r.interactiveDebounce &&
              (H(), (v = Te(Y, r.interactiveDebounce)));
          n.triggerTarget && !r.triggerTarget
            ? Le(n.triggerTarget).forEach(function (e) {
                e.removeAttribute("aria-expanded");
              })
            : r.triggerTarget && e.removeAttribute("aria-expanded");
          R(), M(), O && O(n, r);
          b.popperInstance &&
            (J(),
            K().forEach(function (e) {
              requestAnimationFrame(e._tippy.popperInstance.forceUpdate);
            }));
          W("onAfterUpdate", [b, t]);
        },
        setContent: function (e) {
          b.setProps({ content: e });
        },
        show: function () {
          0;
          var e = b.state.isVisible,
            t = b.state.isDestroyed,
            n = !b.state.isEnabled,
            r = Ne.isTouch && !b.props.touch,
            i = Oe(b.props.duration, 0, Qe.duration);
          if (e || t || n || r) return;
          if (k().hasAttribute("disabled")) return;
          if ((W("onShow", [b], !1), !1 === b.props.onShow(b))) return;
          (b.state.isVisible = !0), j() && (x.style.visibility = "visible");
          M(), q(), b.state.isMounted || (x.style.transition = "none");
          if (j()) {
            var o = C(),
              a = o.box,
              c = o.content;
            He([a, c], 0);
          }
          (s = function () {
            var e;
            if (b.state.isVisible && !m) {
              if (
                ((m = !0),
                x.offsetHeight,
                (x.style.transition = b.props.moveTransition),
                j() && b.props.animation)
              ) {
                var t = C(),
                  n = t.box,
                  r = t.content;
                He([n, r], i), Be([n, r], "visible");
              }
              P(),
                R(),
                je(ot, b),
                null == (e = b.popperInstance) || e.forceUpdate(),
                W("onMount", [b]),
                b.props.animation &&
                  j() &&
                  (function (e, t) {
                    U(e, t);
                  })(i, function () {
                    (b.state.isShown = !0), W("onShown", [b]);
                  });
            }
          }),
            (function () {
              var e,
                t = b.props.appendTo,
                n = k();
              e =
                (b.props.interactive && t === xe) || "parent" === t
                  ? n.parentNode
                  : Ee(t, [n]);
              e.contains(x) || e.appendChild(x);
              (b.state.isMounted = !0), J(), !1;
            })();
        },
        hide: function () {
          0;
          var e = !b.state.isVisible,
            t = b.state.isDestroyed,
            n = !b.state.isEnabled,
            r = Oe(b.props.duration, 1, Qe.duration);
          if (e || t || n) return;
          if ((W("onHide", [b], !1), !1 === b.props.onHide(b))) return;
          (b.state.isVisible = !1),
            (b.state.isShown = !1),
            (m = !1),
            (f = !1),
            j() && (x.style.visibility = "hidden");
          if ((H(), N(), M(!0), j())) {
            var i = C(),
              o = i.box,
              a = i.content;
            b.props.animation && (He([o, a], r), Be([o, a], "hidden"));
          }
          P(),
            R(),
            b.props.animation
              ? j() &&
                (function (e, t) {
                  U(e, function () {
                    !b.state.isVisible &&
                      x.parentNode &&
                      x.parentNode.contains(x) &&
                      t();
                  });
                })(r, b.unmount)
              : b.unmount();
        },
        hideWithInteractivity: function (e) {
          0;
          D().addEventListener("mousemove", v), je(it, v), v(e);
        },
        enable: function () {
          b.state.isEnabled = !0;
        },
        disable: function () {
          b.hide(), (b.state.isEnabled = !1);
        },
        unmount: function () {
          0;
          b.state.isVisible && b.hide();
          if (!b.state.isMounted) return;
          G(),
            K().forEach(function (e) {
              e._tippy.unmount();
            }),
            x.parentNode && x.parentNode.removeChild(x);
          (ot = ot.filter(function (e) {
            return e !== b;
          })),
            (b.state.isMounted = !1),
            W("onHidden", [b]);
        },
        destroy: function () {
          0;
          if (b.state.isDestroyed) return;
          b.clearDelayTimeouts(),
            b.unmount(),
            z(),
            delete e._tippy,
            (b.state.isDestroyed = !0),
            W("onDestroy", [b]);
        },
      };
    if (!p.render) return b;
    var w = p.render(b),
      x = w.popper,
      O = w.onUpdate;
    x.setAttribute("data-tippy-root", ""),
      (x.id = "tippy-" + b.id),
      (b.popper = x),
      (e._tippy = b),
      (x._tippy = b);
    var A = y.map(function (e) {
        return e.fn(b);
      }),
      E = e.hasAttribute("aria-expanded");
    return (
      F(),
      R(),
      M(),
      W("onCreate", [b]),
      p.showOnCreate && ee(),
      x.addEventListener("mouseenter", function () {
        b.props.interactive && b.state.isVisible && b.clearDelayTimeouts();
      }),
      x.addEventListener("mouseleave", function () {
        b.props.interactive &&
          b.props.trigger.indexOf("mouseenter") >= 0 &&
          D().addEventListener("mousemove", v);
      }),
      b
    );
    function T() {
      var e = b.props.touch;
      return Array.isArray(e) ? e : [e, 0];
    }
    function L() {
      return "hold" === T()[0];
    }
    function j() {
      var e;
      return !(null == (e = b.props.render) || !e.$$tippy);
    }
    function k() {
      return c || e;
    }
    function D() {
      var e = k().parentNode;
      return e ? Ie(e) : document;
    }
    function C() {
      return tt(x);
    }
    function S(e) {
      return (b.state.isMounted && !b.state.isVisible) ||
        Ne.isTouch ||
        (o && "focus" === o.type)
        ? 0
        : Oe(b.props.delay, e ? 0 : 1, Qe.delay);
    }
    function M(e) {
      void 0 === e && (e = !1),
        (x.style.pointerEvents = b.props.interactive && !e ? "" : "none"),
        (x.style.zIndex = "" + b.props.zIndex);
    }
    function W(e, t, n) {
      var r;
      (void 0 === n && (n = !0),
      A.forEach(function (n) {
        n[e] && n[e].apply(n, t);
      }),
      n) && (r = b.props)[e].apply(r, t);
    }
    function P() {
      var t = b.props.aria;
      if (t.content) {
        var n = "aria-" + t.content,
          r = x.id;
        Le(b.props.triggerTarget || e).forEach(function (e) {
          var t = e.getAttribute(n);
          if (b.state.isVisible) e.setAttribute(n, t ? t + " " + r : r);
          else {
            var i = t && t.replace(r, "").trim();
            i ? e.setAttribute(n, i) : e.removeAttribute(n);
          }
        });
      }
    }
    function R() {
      !E &&
        b.props.aria.expanded &&
        Le(b.props.triggerTarget || e).forEach(function (e) {
          b.props.interactive
            ? e.setAttribute(
                "aria-expanded",
                b.state.isVisible && e === k() ? "true" : "false"
              )
            : e.removeAttribute("aria-expanded");
        });
    }
    function H() {
      D().removeEventListener("mousemove", v),
        (it = it.filter(function (e) {
          return e !== v;
        }));
    }
    function B(t) {
      if (!Ne.isTouch || (!d && "mousedown" !== t.type)) {
        var n = (t.composedPath && t.composedPath()[0]) || t.target;
        if (!b.props.interactive || !qe(x, n)) {
          if (
            Le(b.props.triggerTarget || e).some(function (e) {
              return qe(e, n);
            })
          ) {
            if (Ne.isTouch) return;
            if (b.state.isVisible && b.props.trigger.indexOf("click") >= 0)
              return;
          } else W("onClickOutside", [b, t]);
          !0 === b.props.hideOnClick &&
            (b.clearDelayTimeouts(),
            b.hide(),
            (l = !0),
            setTimeout(function () {
              l = !1;
            }),
            b.state.isMounted || N());
        }
      }
    }
    function I() {
      d = !0;
    }
    function V() {
      d = !1;
    }
    function q() {
      var e = D();
      e.addEventListener("mousedown", B, !0),
        e.addEventListener("touchend", B, we),
        e.addEventListener("touchstart", V, we),
        e.addEventListener("touchmove", I, we);
    }
    function N() {
      var e = D();
      e.removeEventListener("mousedown", B, !0),
        e.removeEventListener("touchend", B, we),
        e.removeEventListener("touchstart", V, we),
        e.removeEventListener("touchmove", I, we);
    }
    function U(e, t) {
      var n = C().box;
      function r(e) {
        e.target === n && (Ve(n, "remove", r), t());
      }
      if (0 === e) return t();
      Ve(n, "remove", a), Ve(n, "add", r), (a = r);
    }
    function _(t, n, r) {
      void 0 === r && (r = !1),
        Le(b.props.triggerTarget || e).forEach(function (e) {
          e.addEventListener(t, n, r),
            h.push({ node: e, eventType: t, handler: n, options: r });
        });
    }
    function F() {
      var e;
      L() &&
        (_("touchstart", $, { passive: !0 }),
        _("touchend", Q, { passive: !0 })),
        ((e = b.props.trigger), e.split(/\s+/).filter(Boolean)).forEach(
          function (e) {
            if ("manual" !== e)
              switch ((_(e, $), e)) {
                case "mouseenter":
                  _("mouseleave", Q);
                  break;
                case "focus":
                  _($e ? "focusout" : "blur", X);
                  break;
                case "focusin":
                  _("focusout", X);
              }
          }
        );
    }
    function z() {
      h.forEach(function (e) {
        var t = e.node,
          n = e.eventType,
          r = e.handler,
          i = e.options;
        t.removeEventListener(n, r, i);
      }),
        (h = []);
    }
    function $(e) {
      var t,
        n = !1;
      if (b.state.isEnabled && !Z(e) && !l) {
        var r = "focus" === (null == (t = o) ? void 0 : t.type);
        (o = e),
          (c = e.currentTarget),
          R(),
          !b.state.isVisible &&
            We(e) &&
            it.forEach(function (t) {
              return t(e);
            }),
          "click" === e.type &&
          (b.props.trigger.indexOf("mouseenter") < 0 || f) &&
          !1 !== b.props.hideOnClick &&
          b.state.isVisible
            ? (n = !0)
            : ee(e),
          "click" === e.type && (f = !n),
          n && !r && te(e);
      }
    }
    function Y(e) {
      var t = e.target,
        n = k().contains(t) || x.contains(t);
      if ("mousemove" !== e.type || !n) {
        var r = K()
          .concat(x)
          .map(function (e) {
            var t,
              n = null == (t = e._tippy.popperInstance) ? void 0 : t.state;
            return n
              ? {
                  popperRect: e.getBoundingClientRect(),
                  popperState: n,
                  props: p,
                }
              : null;
          })
          .filter(Boolean);
        (function (e, t) {
          var n = t.clientX,
            r = t.clientY;
          return e.every(function (e) {
            var t = e.popperRect,
              i = e.popperState,
              o = e.props.interactiveBorder,
              a = ke(i.placement),
              s = i.modifiersData.offset;
            if (!s) return !0;
            var c = "bottom" === a ? s.top.y : 0,
              u = "top" === a ? s.bottom.y : 0,
              p = "right" === a ? s.left.x : 0,
              f = "left" === a ? s.right.x : 0,
              l = t.top - r + c > o,
              d = r - t.bottom - u > o,
              m = t.left - n + p > o,
              h = n - t.right - f > o;
            return l || d || m || h;
          });
        })(r, e) && (H(), te(e));
      }
    }
    function Q(e) {
      Z(e) ||
        (b.props.trigger.indexOf("click") >= 0 && f) ||
        (b.props.interactive ? b.hideWithInteractivity(e) : te(e));
    }
    function X(e) {
      (b.props.trigger.indexOf("focusin") < 0 && e.target !== k()) ||
        (b.props.interactive &&
          e.relatedTarget &&
          x.contains(e.relatedTarget)) ||
        te(e);
    }
    function Z(e) {
      return !!Ne.isTouch && L() !== e.type.indexOf("touch") >= 0;
    }
    function J() {
      G();
      var t = b.props,
        n = t.popperOptions,
        r = t.placement,
        i = t.offset,
        o = t.getReferenceClientRect,
        a = t.moveTransition,
        c = j() ? tt(x).arrow : null,
        u = o
          ? {
              getBoundingClientRect: o,
              contextElement: o.contextElement || k(),
            }
          : e,
        p = {
          name: "$$tippy",
          enabled: !0,
          phase: "beforeWrite",
          requires: ["computeStyles"],
          fn: function (e) {
            var t = e.state;
            if (j()) {
              var n = C().box;
              ["placement", "reference-hidden", "escaped"].forEach(function (
                e
              ) {
                "placement" === e
                  ? n.setAttribute("data-placement", t.placement)
                  : t.attributes.popper["data-popper-" + e]
                  ? n.setAttribute("data-" + e, "")
                  : n.removeAttribute("data-" + e);
              }),
                (t.attributes.popper = {});
            }
          },
        },
        f = [
          { name: "offset", options: { offset: i } },
          {
            name: "preventOverflow",
            options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
          },
          { name: "flip", options: { padding: 5 } },
          { name: "computeStyles", options: { adaptive: !a } },
          p,
        ];
      j() &&
        c &&
        f.push({ name: "arrow", options: { element: c, padding: 3 } }),
        f.push.apply(f, (null == n ? void 0 : n.modifiers) || []),
        (b.popperInstance = he(
          u,
          x,
          Object.assign({}, n, { placement: r, onFirstUpdate: s, modifiers: f })
        ));
    }
    function G() {
      b.popperInstance &&
        (b.popperInstance.destroy(), (b.popperInstance = null));
    }
    function K() {
      return De(x.querySelectorAll("[data-tippy-root]"));
    }
    function ee(e) {
      b.clearDelayTimeouts(), e && W("onTrigger", [b, e]), q();
      var t = S(!0),
        r = T(),
        i = r[0],
        o = r[1];
      Ne.isTouch && "hold" === i && o && (t = o),
        t
          ? (n = setTimeout(function () {
              b.show();
            }, t))
          : b.show();
    }
    function te(e) {
      if (
        (b.clearDelayTimeouts(), W("onUntrigger", [b, e]), b.state.isVisible)
      ) {
        if (
          !(
            b.props.trigger.indexOf("mouseenter") >= 0 &&
            b.props.trigger.indexOf("click") >= 0 &&
            ["mouseleave", "mousemove"].indexOf(e.type) >= 0 &&
            f
          )
        ) {
          var t = S(!1);
          t
            ? (r = setTimeout(function () {
                b.state.isVisible && b.hide();
              }, t))
            : (i = requestAnimationFrame(function () {
                b.hide();
              }));
        }
      } else N();
    }
  }
  function st(e, t) {
    void 0 === t && (t = {});
    var n = Qe.plugins.concat(t.plugins || []);
    document.addEventListener("touchstart", _e, we),
      window.addEventListener("blur", ze);
    var r = Object.assign({}, t, { plugins: n }),
      i = Re(e).reduce(function (e, t) {
        var n = t && at(t, r);
        return n && e.push(n), e;
      }, []);
    return Me(e) ? i[0] : i;
  }
  (st.defaultProps = Qe),
    (st.setDefaultProps = function (e) {
      Object.keys(e).forEach(function (t) {
        Qe[t] = e[t];
      });
    }),
    (st.currentInput = Ne);
  Object.assign({}, J, {
    effect: function (e) {
      var t = e.state,
        n = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      Object.assign(t.elements.popper.style, n.popper),
        (t.styles = n),
        t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow);
    },
  });
  st.setDefaultProps({ render: nt });
  st("[data-tippy-content]", {});
  let ct = !1;
  setTimeout(() => {
    if (ct) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          n &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock") ? r(e) : i(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    new t({});
})();
