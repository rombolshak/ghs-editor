"use strict";(self.webpackChunkghs_editor=self.webpackChunkghs_editor||[]).push([[592],{8521:(O,v,o)=>{o.d(v,{v:()=>t});var d=o(5684);class t{constructor(){this.model=null,this.storeKey=""}initialize(_,i){this.storeKey=_;const r=this.loadFromStore();r&&i.set(r),i.data$.pipe((0,d.T)(1)).subscribe(c=>this.saveToStore(c)),this.model=i}loadFromStore(){const _=localStorage.getItem(`ghse-data-${this.storeKey}`);return null!=_?JSON.parse(_):null}saveToStore(_){localStorage.setItem(`ghse-data-${this.storeKey}`,JSON.stringify(_))}}},5983:(O,v,o)=>{o.d(v,{u:()=>r});var d=o(1135),t=o(4004),l=o(4782),_=o(4650);class i{constructor(n,a,M,g){this.immutable=a,this.clone=g,this._data=new d.X(n),this.data$=this._data.asObservable().pipe((0,t.U)(u=>this.immutable?g?g(u):JSON.parse(JSON.stringify(u)):u),M?(0,l.d)({bufferSize:1,refCount:!0}):(0,t.U)(u=>u))}get(){const n=this._data.getValue();return this.immutable?this.clone?this.clone(n):JSON.parse(JSON.stringify(n)):n}set(n){if(this.immutable){const a=this.clone?this.clone(n):JSON.parse(JSON.stringify(n));this._data.next(a)}else this._data.next(n)}}class r{create(n){return new i(n,!0,!1)}createMutable(n){return new i(n,!1,!1)}createMutableWithSharedSubscription(n){return new i(n,!1,!0)}createWithCustomClone(n,a){return new i(n,!0,!1,a)}createWithConfig(n){const{initialData:a,immutable:M,sharedSubscription:g,clone:u}=n;return new i(a,M,g,u)}}r.\u0275fac=function(n){return new(n||r)},r.\u0275prov=_.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"})},4466:(O,v,o)=>{o.d(v,{m:()=>a});var d=o(6895),t=o(9367),l=o(7819),_=o(9791),i=o(8276),r=o(5601),c=o(4650);const n=[d.ez,t.fN,l.dS,_.j,i.E,r.y];class a{}a.\u0275fac=function(g){return new(g||a)},a.\u0275mod=c.oAB({type:a}),a.\u0275inj=c.cJS({imports:[n,d.ez,t.fN,l.dS,_.j,i.E,r.y]})},9791:(O,v,o)=>{o.d(v,{V:()=>L,j:()=>T});var d=o(655),t=o(4650),l=o(3679),_=o(9255),i=o(9383),r=o(7414),c=o(8923),n=o(4645),a=o(1308),M=o(6451),g=o(9718),u=o(8276),P=o(6895);const f=["tuiLink",""];function p(e,m){if(1&e&&t._UZ(0,"tui-svg",3),2&e){const s=t.oxw();t.Q6J("src",s.icon||"")}}function E(e,m){if(1&e&&t._UZ(0,"tui-svg",4),2&e){const s=t.oxw();t.Q6J("src",s.icon||"")}}const D=["*"];let L=(()=>{class e{constructor(s,h,C){this.elementRef=s,this.mode$=h,this.pseudo=!1,this.icon="",this.iconAlign="right",this.iconRotated=!1,this.mode=null,this.focusVisible=!1,this.focusedChange=(0,M.T)((0,l.mL)(this.elementRef.nativeElement,"focusin").pipe((0,g.h)(!0)),(0,l.mL)(this.elementRef.nativeElement,"focusout").pipe((0,g.h)(!1))),C.subscribe(A=>{this.focusVisible=A})}get nativeFocusableElement(){return this.elementRef.nativeElement}get focused(){return(0,_.V8)(this.nativeFocusableElement)}get hasIcon(){return!!this.icon}get iconAlignLeft(){return this.hasIcon&&"left"===this.iconAlign}get iconAlignRight(){return this.hasIcon&&"right"===this.iconAlign}}return e.\u0275fac=function(s){return new(s||e)(t.Y36(t.SBq),t.Y36(a.Au),t.Y36(i.ku))},e.\u0275cmp=t.Xpm({type:e,selectors:[["a","tuiLink",""],["button","tuiLink",""]],hostVars:7,hostBindings:function(s,h){1&s&&t.NdJ("$.data-mode.attr",function(){return h.mode$}),2&s&&(t.uIk("data-host-mode",h.mode),t.ekj("_pseudo",h.pseudo)("_icon-rotated",h.iconRotated)("_focus-visible",h.focusVisible))},inputs:{pseudo:"pseudo",icon:"icon",iconAlign:"iconAlign",iconRotated:"iconRotated",mode:"mode"},exportAs:["tuiLink"],features:[t._Bn([(0,r.FT)(e),i.ku,i.a3,n.CV])],attrs:f,ngContentSelectors:D,decls:4,vars:2,consts:[["class","t-icon t-icon_left",3,"src",4,"ngIf"],[1,"t-content"],["class","t-icon t-icon_right",3,"src",4,"ngIf"],[1,"t-icon","t-icon_left",3,"src"],[1,"t-icon","t-icon_right",3,"src"]],template:function(s,h){1&s&&(t.F$t(),t.YNc(0,p,1,1,"tui-svg",0),t.TgZ(1,"span",1),t.Hsn(2),t.qZA(),t.YNc(3,E,1,1,"tui-svg",2)),2&s&&(t.Q6J("ngIf",h.iconAlignLeft),t.xp6(3),t.Q6J("ngIf",h.iconAlignRight))},dependencies:[u.P,P.O5],styles:["[_nghost-%COMP%]{-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0;border:0;background:none;font-size:inherit;line-height:inherit;transition-property:color;transition-duration:var(--tui-duration, .3s);transition-timing-function:ease-in-out;color:var(--tui-link);text-decoration:none;text-align:left;text-transform:inherit;font-weight:inherit;cursor:pointer;outline:none}[_nghost-%COMP%]:hover{color:var(--tui-link-hover)}[_nghost-%COMP%]:disabled{opacity:var(--tui-disabled-opacity);cursor:default}[data-mode=onLight][_nghost-%COMP%]{color:var(--tui-text-02)}[data-mode=onLight][_nghost-%COMP%]:hover, [data-mode=onLight]._active[_nghost-%COMP%]{color:var(--tui-text-01)}[data-mode=onLight]._pseudo[_nghost-%COMP%]{color:var(--tui-text-01)}[data-mode=onLight]._pseudo[_nghost-%COMP%]   .t-content[_ngcontent-%COMP%]{-webkit-text-decoration-color:rgba(0,0,0,.48);text-decoration-color:rgba(0,0,0,.48)}[data-mode=onLight]._pseudo[_nghost-%COMP%]:hover, [data-mode=onLight]._pseudo._active[_nghost-%COMP%]{color:var(--tui-text-03)}[data-mode=onLight][data-host-mode=negative][_nghost-%COMP%]{color:var(--tui-negative-night)}[data-mode=onLight][data-host-mode=negative][_nghost-%COMP%]:hover, [data-mode=onLight][data-host-mode=negative][_nghost-%COMP%]:active, [data-mode=onLight][data-host-mode=negative]._active[_nghost-%COMP%]{color:var(--tui-negative-night-hover)}[data-mode=onDark][_nghost-%COMP%]{color:var(--tui-text-03-night)}[data-mode=onDark][_nghost-%COMP%]:hover, [data-mode=onDark][_nghost-%COMP%]:active, [data-mode=onDark]._active[_nghost-%COMP%]{color:var(--tui-text-01-night)}[data-mode=onDark]._pseudo[_nghost-%COMP%]{color:var(--tui-text-01-night)}[data-mode=onDark]._pseudo[_nghost-%COMP%]   .t-content[_ngcontent-%COMP%]{-webkit-text-decoration-color:rgba(255,255,255,.48);text-decoration-color:rgba(255,255,255,.48)}[data-mode=onDark]._pseudo[_nghost-%COMP%]:hover, [data-mode=onDark]._pseudo[_nghost-%COMP%]:active, [data-mode=onDark]._pseudo._active[_nghost-%COMP%]{color:var(--tui-text-03-night)}[data-mode=onDark][data-host-mode=positive][_nghost-%COMP%]{color:var(--tui-positive-night)}[data-mode=onDark][data-host-mode=positive][_nghost-%COMP%]:hover, [data-mode=onDark][data-host-mode=positive][_nghost-%COMP%]:active, [data-mode=onDark][data-host-mode=positive]._active[_nghost-%COMP%]{color:var(--tui-positive-night-hover)}[data-host-mode=negative][_nghost-%COMP%]{color:var(--tui-negative)}[data-host-mode=negative][_nghost-%COMP%]:hover{color:var(--tui-negative-hover)}[data-host-mode=negative]._pseudo[_nghost-%COMP%]   .t-content[_ngcontent-%COMP%]{-webkit-text-decoration-color:rgba(222,76,30,.48);text-decoration-color:rgba(222,76,30,.48)}[data-host-mode=positive][_nghost-%COMP%]{color:var(--tui-positive)}[data-host-mode=positive][_nghost-%COMP%]:hover{color:var(--tui-positive-hover)}[data-host-mode=positive]._pseudo[_nghost-%COMP%]   .t-content[_ngcontent-%COMP%]{-webkit-text-decoration-color:rgba(58,169,129,.48);text-decoration-color:rgba(58,169,129,.48)}._focus-visible[_nghost-%COMP%]   .t-content[_ngcontent-%COMP%]{background:var(--tui-selection)}[data-mode=onLight]._focus-visible[_nghost-%COMP%]   .t-content[_ngcontent-%COMP%]{background:var(--tui-clear);color:var(--tui-text-01)}[data-mode=onDark]._focus-visible[_nghost-%COMP%]   .t-content[_ngcontent-%COMP%]{background:var(--tui-clear-inverse);color:var(--tui-text-01-night)}[data-host-mode=positive]._focus-visible[_nghost-%COMP%]   .t-content[_ngcontent-%COMP%]{background:var(--tui-success-bg)}[data-host-mode=negative]._focus-visible[_nghost-%COMP%]   .t-content[_ngcontent-%COMP%]{background:var(--tui-error-bg)}._pseudo[_nghost-%COMP%]   .t-content[_ngcontent-%COMP%]{padding-bottom:.15em;-webkit-text-decoration:underline dashed rgba(51,111,238,.48);text-decoration:underline dashed rgba(51,111,238,.48);text-underline-offset:.2em;text-decoration-thickness:.7px}.t-icon[_ngcontent-%COMP%]{transition-property:transform;transition-duration:var(--tui-duration, .3s);transition-timing-function:ease-in-out;margin-top:-.125rem;opacity:.8}.t-icon_left[_ngcontent-%COMP%]{margin-right:.25rem}.t-icon_right[_ngcontent-%COMP%]{margin-left:.25rem}[_nghost-%COMP%]:hover   .t-icon[_ngcontent-%COMP%]{opacity:1}._icon-rotated[_nghost-%COMP%]   .t-icon[_ngcontent-%COMP%]{transform:rotate(180deg)}"],changeDetection:0}),(0,d.gn)([(0,c.TH)()],e.prototype,"pseudo",void 0),(0,d.gn)([(0,c.TH)()],e.prototype,"icon",void 0),(0,d.gn)([(0,c.TH)()],e.prototype,"iconAlign",void 0),(0,d.gn)([(0,c.TH)()],e.prototype,"iconRotated",void 0),(0,d.gn)([(0,c.TH)()],e.prototype,"mode",void 0),e})(),T=(()=>{class e{}return e.\u0275fac=function(s){return new(s||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[P.ez,u.E]]}),e})()}}]);