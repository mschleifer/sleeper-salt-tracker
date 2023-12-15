import B from"./button.esm.79d9684b.js";import{s as h}from"./index.esm.96f89497.js";import S from"./tieredmenu.esm.8e370956.js";import{X as w,Z as g,i as f,t as c,v as C,a6 as l,z as d,A as a,S as b,a7 as $,a8 as I,a4 as r,aa as D,x as k}from"./entry.db485a10.js";import{s as z}from"./basecomponent.esm.87b535d2.js";import"./badge.esm.25740afc.js";import"./index.esm.174cf799.js";import"./baseicon.esm.bfa6651b.js";import"./overlayeventbus.esm.68d7b4c1.js";import"./portal.esm.d81a6146.js";import"./index.esm.6dfe1272.js";function s(t){"@babel/helpers - typeof";return s=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(t)}function u(t,e,n){return e=P(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function P(t){var e=Z(t,"string");return s(e)==="symbol"?e:String(e)}function Z(t,e){if(s(t)!=="object"||t===null)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var p=n.call(t,e||"default");if(s(p)!=="object")return p;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var V=`
@layer primevue {
    .p-splitbutton {
        display: inline-flex;
        position: relative;
    }

    .p-splitbutton .p-splitbutton-defaultbutton,
    .p-splitbutton.p-button-rounded > .p-splitbutton-defaultbutton.p-button,
    .p-splitbutton.p-button-outlined > .p-splitbutton-defaultbutton.p-button,
    .p-splitbutton.p-button-outlined > .p-splitbutton-defaultbutton.p-button-outlined.p-button:hover {
        flex: 1 1 auto;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: 0 none;
    }

    .p-splitbutton-menubutton,
    .p-splitbutton.p-button-rounded > .p-splitbutton-menubutton.p-button,
    .p-splitbutton.p-button-outlined > .p-splitbutton-menubutton.p-button {
        display: flex;
        align-items: center;
        justify-content: center;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .p-splitbutton .p-menu {
        min-width: 100%;
    }

    .p-fluid .p-splitbutton {
        display: flex;
    }
}
`,E={root:function(e){var n=e.props;return["p-splitbutton p-component",u(u(u(u(u(u(u({},"p-button-".concat(n.severity),n.severity),"p-button-raised",n.raised),"p-button-rounded",n.rounded),"p-button-text",n.text),"p-button-outlined",n.outlined),"p-button-sm",n.size==="small"),"p-button-lg",n.size==="large")]},button:"p-splitbutton-defaultbutton",menuButton:"p-splitbutton-menubutton"},T=w.extend({name:"splitbutton",css:V,classes:E}),K={name:"BaseSplitButton",extends:z,props:{label:{type:String,default:null},icon:{type:String,default:null},model:{type:Array,default:null},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},appendTo:{type:String,default:"body"},disabled:{type:Boolean,default:!1},class:{type:null,default:null},style:{type:null,default:null},buttonProps:{type:null,default:null},menuButtonProps:{type:null,default:null},menuButtonIcon:{type:String,default:void 0},severity:{type:String,default:null},raised:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},text:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},size:{type:String,default:null},plain:{type:Boolean,default:!1}},style:T,provide:function(){return{$parentInstance:this}}},A={name:"SplitButton",extends:K,emits:["click"],data:function(){return{isExpanded:!1}},mounted:function(){var e=this;this.$watch("$refs.menu.visible",function(n){e.isExpanded=n})},methods:{onDropdownButtonClick:function(e){e&&e.preventDefault(),this.$refs.menu.toggle({currentTarget:this.$el,relatedTarget:this.$refs.button.$el}),this.isExpanded=this.$refs.menu.visible},onDropdownKeydown:function(e){(e.code==="ArrowDown"||e.code==="ArrowUp")&&(this.onDropdownButtonClick(),e.preventDefault())},onDefaultButtonClick:function(e){this.isExpanded&&this.$refs.menu.hide(e),this.$emit("click",e)}},computed:{ariaId:function(){return g()},containerClass:function(){return[this.cx("root"),this.class]}},components:{PVSButton:B,PVSMenu:S,ChevronDownIcon:h}},N=["data-pc-severity"];function M(t,e,n,p,y,i){var m=f("PVSButton"),v=f("PVSMenu");return c(),C("div",r({class:i.containerClass,style:t.style},t.ptm("root"),{"data-pc-name":"splitbutton","data-pc-severity":t.severity}),[l(t.$slots,"default",{},function(){return[d(m,r({type:"button",class:t.cx("button"),label:t.label,disabled:t.disabled,severity:t.severity,text:t.text,outlined:t.outlined,size:t.size,"aria-label":t.label,onClick:i.onDefaultButtonClick},t.buttonProps,{pt:t.ptm("button"),unstyled:t.unstyled,"data-pc-section":"button"}),{icon:a(function(o){return[l(t.$slots,"icon",{class:b(o.class)},function(){return[k("span",r({class:[t.icon,o.class]},t.ptm("button").icon,{"data-pc-section":"buttonicon"}),null,16)]})]}),default:a(function(){return[l(t.$slots,"buttoncontent")]}),_:3},16,["class","label","disabled","severity","text","outlined","size","aria-label","onClick","pt","unstyled"])]}),d(m,r({ref:"button",type:"button",class:t.cx("menuButton"),disabled:t.disabled,"aria-haspopup":"true","aria-expanded":y.isExpanded,"aria-controls":i.ariaId+"_overlay",onClick:i.onDropdownButtonClick,onKeydown:i.onDropdownKeydown,severity:t.severity,text:t.text,outlined:t.outlined,size:t.size},t.menuButtonProps,{pt:t.ptm("menuButton"),unstyled:t.unstyled,"data-pc-section":"menubutton"}),{icon:a(function(o){return[l(t.$slots,"menubuttonicon",{class:b(o.class)},function(){return[(c(),$(I(t.menuButtonIcon?"span":"ChevronDownIcon"),r({class:[t.menuButtonIcon,o.class]},t.ptm("menuButton").icon,{"data-pc-section":"menubuttonicon"}),null,16,["class"]))]})]}),_:3},16,["class","disabled","aria-expanded","aria-controls","onClick","onKeydown","severity","text","outlined","size","pt","unstyled"]),d(v,{ref:"menu",id:i.ariaId+"_overlay",model:t.model,popup:!0,autoZIndex:t.autoZIndex,baseZIndex:t.baseZIndex,appendTo:t.appendTo,unstyled:t.unstyled,pt:t.ptm("menu")},D({_:2},[t.$slots.menuitemicon?{name:"itemicon",fn:a(function(o){return[l(t.$slots,"menuitemicon",{item:o.item,class:b(o.class)})]}),key:"0"}:void 0,t.$slots.item?{name:"item",fn:a(function(o){return[l(t.$slots,"item",{item:o.item,hasSubmenu:o.hasSubmenu,label:o.label,props:o.props})]}),key:"1"}:void 0]),1032,["id","model","autoZIndex","baseZIndex","appendTo","unstyled","pt"])],16,N)}A.render=M;export{A as default};
