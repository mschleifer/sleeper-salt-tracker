import{s as l}from"./index.esm.f810302e.js";import{s as p,a as c}from"./index.esm.c88c74e8.js";import{s as m}from"./index.esm.4c5d7aad.js";import{s as u}from"./basecomponent.esm.87b535d2.js";import{X as d,t as r,v as f,a6 as a,x as v,a4 as i,a7 as g,a8 as y,B as $}from"./entry.db485a10.js";import"./baseicon.esm.bfa6651b.js";var h=`
@layer primevue {
    .p-inline-message {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: top;
    }
    
    .p-inline-message-icon {
        flex-shrink: 0;
    }

    .p-inline-message-icon-only .p-inline-message-text {
        visibility: hidden;
        width: 0;
    }

    .p-fluid .p-inline-message {
        display: flex;
    }
}
`,x={root:function(n){var s=n.props,t=n.instance;return["p-inline-message p-component p-inline-message-"+s.severity,{"p-inline-message-icon-only":!t.$slots.default}]},icon:function(n){var s=n.props;return["p-inline-message-icon",s.icon]},text:"p-inline-message-text"},B=d.extend({name:"inlinemessage",css:h,classes:x}),k={name:"BaseInlineMessage",extends:u,props:{severity:{type:String,default:"error"},icon:{type:String,default:void 0}},style:B,provide:function(){return{$parentInstance:this}}},S={name:"InlineMessage",extends:k,timeout:null,data:function(){return{visible:!0}},mounted:function(){var n=this;this.sticky||setTimeout(function(){n.visible=!1},this.life)},computed:{iconComponent:function(){return{info:p,success:l,warn:c,error:m}[this.severity]}}};function C(e,n,s,t,I,o){return r(),f("div",i({role:"alert","aria-live":"assertive","aria-atomic":"true",class:e.cx("root")},e.ptm("root")),[a(e.$slots,"icon",{},function(){return[(r(),g(y(e.icon?"span":o.iconComponent),i({class:e.cx("icon")},e.ptm("icon")),null,16,["class"]))]}),v("span",i({class:e.cx("text")},e.ptm("text")),[a(e.$slots,"default",{},function(){return[$(" ")]})],16)],16)}S.render=C;export{S as default};
