"use strict";(self.webpackChunkghs_editor=self.webpackChunkghs_editor||[]).push([[26],{3026:(et,x,r)=>{r.r(x),r.d(x,{ScenariosModule:()=>g});var u=r(6895),c=r(5142),t=r(4650),L=r(9367),D=r(7819);class m{}m.\u0275fac=function(n){return new(n||m)},m.\u0275cmp=t.Xpm({type:m,selectors:[["ghse-scenarios-list"]],decls:12,vars:2,consts:[[1,"page-header"],[1,"tui-text_h2"],[1,"page-content"],["size","xxl",3,"showLoader","overlay"],[1,"no-items"],[1,"tui-text_h3"],[1,"tui-text_body-l"],["tuiButton","","size","m","icon","tuiIconPlusLarge","routerLink","new"]],template:function(n,e){1&n&&(t.TgZ(0,"div",0)(1,"h2",1),t._uU(2,"Scenarios"),t.qZA()(),t.TgZ(3,"div",2)(4,"tui-loader",3)(5,"div",4)(6,"h3",5),t._uU(7,"No scenarios yet"),t.qZA(),t.TgZ(8,"p",6),t._uU(9,"Add a scenario using button below or by importing existig json in the main menu"),t.qZA(),t.TgZ(10,"button",7),t._uU(11,"Add scenario"),t.qZA()()()()),2&n&&(t.xp6(4),t.Q6J("showLoader",!1)("overlay",!0))},dependencies:[c.rH,L.v0,D.kM],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;width:100%}[_nghost-%COMP%]   .page-header[_ngcontent-%COMP%]{padding:3rem;box-shadow:inset 0 -1px var(--tui-base-03)}[_nghost-%COMP%]   .page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}[_nghost-%COMP%]   .page-header.with-link[_ngcontent-%COMP%]{padding:1.5rem 3rem 3rem}[_nghost-%COMP%]   .page-header.with-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   tui-svg[_ngcontent-%COMP%]{width:.5rem}[_nghost-%COMP%]   .page-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:1.5rem 3rem}[_nghost-%COMP%]   .page-content[_ngcontent-%COMP%]   tui-loader[_ngcontent-%COMP%]{flex:1}[_nghost-%COMP%]   .no-items[_ngcontent-%COMP%]{text-align:center}"]});var U=r(8521),E=r(5983);const T={id:"new",name:"New scenario",group:""};class p extends U.v{constructor(n){super(),this.factory=n}get scenarioDetails$(){return this.model?.data$??null}initializeWithId(n){this.initialize(`scenario-${n}`,this.factory.create(T))}}p.\u0275fac=function(n){return new(n||p)(t.LFG(E.u))},p.\u0275prov=t.Yz7({token:p,factory:p.\u0275fac,providedIn:"root"});var h=r(9383),H=r(2722),F=r(9791),y=r(8276),v=r(655),B=r(8535),R=r(3679),z=r(5753),V=r(3054),J=r(9255),f=r(8923),w=r(8790),N=r(4671),Y=r(4086),Q=r(9300);function $(o,n){1&o&&t.GkF(0)}const I=["*"],X=["tuiStep",""];function j(o,n){if(1&o&&t._UZ(0,"tui-svg",4),2&o){const e=t.oxw();t.Q6J("src",e.icon)}}const G={block:"nearest",inline:"center"},W={block:"center",inline:"nearest"};let Z=(()=>{class o{constructor(){this.steps=B.Mm,this.orientation="horizontal",this.activeItemIndexChange=new t.vpe,this.activeItemIndex=0}set activeIndex(e){this.activeItemIndex=e,this.scrollIntoView(e)}get changes$(){return(0,R.xo)(this.steps).pipe((0,Y.g)(0))}onHorizontal(e,i){"horizontal"!==this.orientation||!e.target||(e.preventDefault(),this.moveFocus(e.target,i))}onVertical(e,i){"vertical"!==this.orientation||!e.target||(e.preventDefault(),this.moveFocus(e.target,i))}indexOf(e){return(0,z.gD)(this.steps).findIndex(({nativeElement:i})=>i===e)}isActive(e){return e===this.activeItemIndex}activate(e){this.activeItemIndex!==e&&(this.activeItemIndex=e,this.activeItemIndexChange.emit(e),this.scrollIntoView(e))}getNativeElements(e){return e.map(({nativeElement:i})=>i)}moveFocus(e,i){if(!(0,V.ve)(e))return;const a=this.getNativeElements(this.steps),s=a.findIndex(b=>b===e);(0,J.VR)(s,a,i)}scrollIntoView(e){var i;null===(i=this.getNativeElements(this.steps)[e])||void 0===i||i.scrollIntoView("vertical"===this.orientation?W:G)}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["tui-stepper"],["nav","tuiStepper",""]],contentQueries:function(e,i,a){if(1&e&&t.Suo(a,A,4,t.SBq),2&e){let s;t.iGM(s=t.CRH())&&(i.steps=s)}},hostVars:1,hostBindings:function(e,i){1&e&&t.NdJ("keydown.arrowRight",function(s){return i.onHorizontal(s,1)})("keydown.arrowLeft",function(s){return i.onHorizontal(s,-1)})("keydown.arrowDown",function(s){return i.onVertical(s,1)})("keydown.arrowUp",function(s){return i.onVertical(s,-1)}),2&e&&t.uIk("data-orientation",i.orientation)},inputs:{orientation:"orientation",activeIndex:["activeItemIndex","activeIndex"]},outputs:{activeItemIndexChange:"activeItemIndexChange"},ngContentSelectors:I,decls:3,vars:3,consts:[[4,"ngIf"]],template:function(e,i){1&e&&(t.F$t(),t.YNc(0,$,1,0,"ng-container",0),t.ALo(1,"async"),t.Hsn(2)),2&e&&t.Q6J("ngIf",t.lcZ(1,1,i.changes$))},dependencies:[u.O5,u.Ov],styles:["[_nghost-%COMP%]{scrollbar-width:none;-ms-overflow-style:none;scroll-behavior:smooth;display:flex;overflow:auto;counter-reset:steps}[_nghost-%COMP%]::-webkit-scrollbar, [_nghost-%COMP%]::-webkit-scrollbar-thumb{background:transparent;width:0;height:0}@media screen and (prefers-reduced-motion: reduce){[_nghost-%COMP%]{scroll-behavior:auto}}[data-orientation=vertical][_nghost-%COMP%]{flex-direction:column}"],changeDetection:0}),(0,v.gn)([(0,f.TH)()],o.prototype,"orientation",void 0),(0,v.gn)([f.UM],o.prototype,"changes$",null),(0,v.gn)([f.UM],o.prototype,"getNativeElements",null),o})(),A=(()=>{class o{constructor(e,i,a,s){this.stepper=a,this.elementRef=s,this.stepState="normal",this.icon="",this.focusVisible=!1,i.pipe((0,Q.h)(N.y)).subscribe(()=>{this.activate()}),e.subscribe(b=>{this.focusVisible=b})}get isActive(){return this.stepper.isActive(this.index)}get isVertical(){return"vertical"===this.stepper.orientation}get tabIndex(){return this.isActive?0:-1}get index(){return this.stepper.indexOf(this.elementRef.nativeElement)}activate(){this.stepper.activate(this.index)}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(h.ku),t.Y36(w.Ok),t.Y36(Z),t.Y36(t.SBq))},o.\u0275cmp=t.Xpm({type:o,selectors:[["button","tuiStep",""],["a","tuiStep","",3,"routerLink",""],["a","tuiStep","","routerLink","","routerLinkActive",""]],hostAttrs:["type","button"],hostVars:8,hostBindings:function(e,i){1&e&&t.NdJ("click",function(){return i.activate()}),2&e&&(t.Ikx("tabIndex",i.tabIndex),t.uIk("data-state",i.stepState),t.ekj("_focus-visible",i.focusVisible)("_active",i.isActive)("_vertical",i.isVertical))},inputs:{stepState:"stepState",icon:"icon"},features:[t._Bn([h.a3,w.Ok,h.ku])],attrs:X,ngContentSelectors:I,decls:5,vars:1,consts:[["class","t-marker t-marker_custom",3,"src",4,"ngIf"],["src","tuiIconWarningLarge",1,"t-marker","t-marker_error"],["src","tuiIconCheckLarge",1,"t-marker","t-marker_pass"],[1,"t-marker","t-marker_index"],[1,"t-marker","t-marker_custom",3,"src"]],template:function(e,i){1&e&&(t.F$t(),t.YNc(0,j,1,1,"tui-svg",0),t._UZ(1,"tui-svg",1)(2,"tui-svg",2)(3,"div",3),t.Hsn(4)),2&e&&t.Q6J("ngIf",i.icon)},dependencies:[y.P,u.O5],styles:['[_nghost-%COMP%]{-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0;border:0;background:none;font-size:inherit;line-height:inherit;position:relative;display:flex;align-items:center;flex-shrink:0;color:var(--tui-link);margin-right:1.5rem;outline:none;cursor:pointer;text-decoration:none;counter-increment:steps}[_nghost-%COMP%]:disabled{pointer-events:none;color:var(--tui-base-07)}[_nghost-%COMP%]:hover{color:var(--tui-link-hover)}[_nghost-%COMP%]:not(:last-of-type)._vertical{margin-bottom:1.25rem}._active[_nghost-%COMP%], ._active[_nghost-%COMP%]:hover{color:var(--tui-text-01);cursor:default}._focus-visible[_nghost-%COMP%]:before{content:"";position:absolute;left:2.75rem;right:0;top:50%;height:1.5rem;margin-top:-.75rem;background:var(--tui-selection)}.t-marker[_ngcontent-%COMP%]{transition-property:background;transition-duration:var(--tui-duration, .3s);transition-timing-function:ease-in-out;display:flex;width:2rem;height:2rem;border-radius:100%;margin-right:.75rem;flex-shrink:0;align-items:center;justify-content:center;background:var(--tui-secondary);color:var(--tui-link)}[_nghost-%COMP%]:disabled   .t-marker[_ngcontent-%COMP%]{background:var(--tui-base-03);color:var(--tui-base-07)}.t-marker_index[_ngcontent-%COMP%]:before{content:counter(steps)}[_nghost-%COMP%]:hover   .t-marker_index[_ngcontent-%COMP%]{color:var(--tui-link-hover);background:var(--tui-secondary-hover)}._active[_nghost-%COMP%]   .t-marker_index[_ngcontent-%COMP%]{color:var(--tui-primary-text);background:var(--tui-primary)}[_nghost-%COMP%]:not([data-state="normal"]):not(._active)   .t-marker_index[_ngcontent-%COMP%], [_nghost-%COMP%]:not(._active)   .t-marker_custom[_ngcontent-%COMP%] ~ .t-marker_index[_ngcontent-%COMP%]{display:none}.t-marker_error[_ngcontent-%COMP%]{background:var(--tui-error-bg);color:var(--tui-error-fill)}[_nghost-%COMP%]:hover   .t-marker_error[_ngcontent-%COMP%]{background:var(--tui-error-bg-hover);color:var(--tui-error-fill)}[_nghost-%COMP%]:not([data-state="error"])   .t-marker_error[_ngcontent-%COMP%], ._active[_nghost-%COMP%]   .t-marker_error[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]:not([data-state="pass"])   .t-marker_pass[_ngcontent-%COMP%], ._active[_nghost-%COMP%]   .t-marker_pass[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]:not([data-state="normal"])   .t-marker_custom[_ngcontent-%COMP%], ._active[_nghost-%COMP%]   .t-marker_custom[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]:hover   .t-marker_custom[_ngcontent-%COMP%]{color:var(--tui-link-hover);background:var(--tui-secondary-hover)}'],changeDetection:0}),(0,v.gn)([(0,f.TH)()],o.prototype,"stepState",void 0),(0,v.gn)([(0,f.TH)()],o.prototype,"icon",void 0),o})(),K=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[u.ez,y.E]]}),o})();class C{constructor(n,e,i,a){this.detailsService=n,this.route=e,this.router=i,this.destroy$=a,this.model=T,this.newScenarioId="new"}get areStepsDisabled(){return this.model.id===this.newScenarioId}ngOnInit(){const n=this.route.snapshot.paramMap.get("id");this.detailsService.initializeWithId(n),this.detailsService.scenarioDetails$?.pipe((0,H.R)(this.destroy$)).subscribe(e=>this.model=e)}}C.\u0275fac=function(n){return new(n||C)(t.Y36(p),t.Y36(c.gz),t.Y36(c.F0),t.Y36(h.a3))},C.\u0275cmp=t.Xpm({type:C,selectors:[["ghse-scenario-detail"]],features:[t._Bn([h.a3])],decls:21,vars:6,consts:[[1,"page-header","with-link"],["tuiLink","","routerLink",".."],["src","tuiIconChevronLeft"],[1,"tui-text_h2"],[1,"page-content"],["tuiStep","","routerLink",".","routerLinkActive",""],["tuiStep","","routerLink","properties","routerLinkActive","",3,"disabled"],["tuiStep","","routerLink","monsters","routerLinkActive","",3,"disabled"],["tuiStep","","routerLink","rooms","routerLinkActive","",3,"disabled"],["tuiStep","","routerLink","rules","routerLinkActive","",3,"disabled"],["tuiStep","","routerLink","sections","routerLinkActive","",3,"disabled"]],template:function(n,e){1&n&&(t.TgZ(0,"div",0)(1,"a",1),t._UZ(2,"tui-svg",2),t._uU(3," Scenarios"),t.qZA(),t.TgZ(4,"h2",3),t._uU(5),t.qZA()(),t.TgZ(6,"div",4)(7,"tui-stepper")(8,"button",5),t._uU(9,"General info"),t.qZA(),t.TgZ(10,"button",6),t._uU(11,"Scenario properties"),t.qZA(),t.TgZ(12,"button",7),t._uU(13,"Monsters"),t.qZA(),t.TgZ(14,"button",8),t._uU(15,"Rooms"),t.qZA(),t.TgZ(16,"button",9),t._uU(17,"Special rules"),t.qZA(),t.TgZ(18,"button",10),t._uU(19,"Sections"),t.qZA()(),t._UZ(20,"router-outlet"),t.qZA()),2&n&&(t.xp6(5),t.Oqu(e.model.name),t.xp6(5),t.Q6J("disabled",e.areStepsDisabled),t.xp6(2),t.Q6J("disabled",e.areStepsDisabled),t.xp6(2),t.Q6J("disabled",e.areStepsDisabled),t.xp6(2),t.Q6J("disabled",e.areStepsDisabled),t.xp6(2),t.Q6J("disabled",e.areStepsDisabled))},dependencies:[c.lC,c.rH,c.Od,F.V,y.P,Z,A],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;width:100%}[_nghost-%COMP%]   .page-header[_ngcontent-%COMP%]{padding:3rem;box-shadow:inset 0 -1px var(--tui-base-03)}[_nghost-%COMP%]   .page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}[_nghost-%COMP%]   .page-header.with-link[_ngcontent-%COMP%]{padding:1.5rem 3rem 3rem}[_nghost-%COMP%]   .page-header.with-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   tui-svg[_ngcontent-%COMP%]{width:.5rem}[_nghost-%COMP%]   .page-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:1.5rem 3rem}[_nghost-%COMP%]   .page-content[_ngcontent-%COMP%]   tui-loader[_ngcontent-%COMP%]{flex:1}[_nghost-%COMP%]   tui-stepper[_ngcontent-%COMP%]{margin-bottom:1.5rem}"],changeDetection:0});class _{}_.\u0275fac=function(n){return new(n||_)},_.\u0275cmp=t.Xpm({type:_,selectors:[["ghse-scenario-general-editor"]],decls:2,vars:0,template:function(n,e){1&n&&(t.TgZ(0,"p"),t._uU(1,"scenario-general-editor works!"),t.qZA())}});class M{}M.\u0275fac=function(n){return new(n||M)},M.\u0275cmp=t.Xpm({type:M,selectors:[["ghse-scenario-properties-editor"]],decls:2,vars:0,template:function(n,e){1&n&&(t.TgZ(0,"p"),t._uU(1,"scenario-properties-editor works!"),t.qZA())}});class S{}S.\u0275fac=function(n){return new(n||S)},S.\u0275cmp=t.Xpm({type:S,selectors:[["ghse-scenario-monsters-editor"]],decls:2,vars:0,template:function(n,e){1&n&&(t.TgZ(0,"p"),t._uU(1,"scenario-monsters-editor works!"),t.qZA())}});class O{}O.\u0275fac=function(n){return new(n||O)},O.\u0275cmp=t.Xpm({type:O,selectors:[["ghse-scenario-rooms-editor"]],decls:2,vars:0,template:function(n,e){1&n&&(t.TgZ(0,"p"),t._uU(1,"scenario-rooms-editor works!"),t.qZA())}});class k{}k.\u0275fac=function(n){return new(n||k)},k.\u0275cmp=t.Xpm({type:k,selectors:[["ghse-scenario-rules-editor"]],decls:2,vars:0,template:function(n,e){1&n&&(t.TgZ(0,"p"),t._uU(1,"scenario-rules-editor works!"),t.qZA())}});class P{}P.\u0275fac=function(n){return new(n||P)},P.\u0275cmp=t.Xpm({type:P,selectors:[["ghse-scenario-sections-editor"]],decls:2,vars:0,template:function(n,e){1&n&&(t.TgZ(0,"p"),t._uU(1,"scenario-sections-editor works!"),t.qZA())}});const q=[{path:"",pathMatch:"full",component:m},{path:":id",component:C,children:[{path:"",pathMatch:"full",component:_},{path:"properties",component:M},{path:"monsters",component:S},{path:"rooms",component:O},{path:"rules",component:k},{path:"sections",component:P}]}];class l{}l.\u0275fac=function(n){return new(n||l)},l.\u0275mod=t.oAB({type:l}),l.\u0275inj=t.cJS({imports:[c.Bz.forChild(q),c.Bz]});class d{}d.\u0275fac=function(n){return new(n||d)},d.\u0275mod=t.oAB({type:d}),d.\u0275inj=t.cJS({imports:[u.ez]});var tt=r(4466);class g{}g.\u0275fac=function(n){return new(n||g)},g.\u0275mod=t.oAB({type:g}),g.\u0275inj=t.cJS({imports:[u.ez,l,d,tt.m,K]})}}]);