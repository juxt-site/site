goog.provide('pet.ui');
var module$node_modules$$juxt$pass$dist$juxt_pass_cjs=shadow.js.require("module$node_modules$$juxt$pass$dist$juxt_pass_cjs", {});
if((typeof pet !== 'undefined') && (typeof pet.ui !== 'undefined') && (typeof pet.ui.root_el !== 'undefined')){
} else {
pet.ui.root_el = document.getElementById("app");
}
pet.ui.render = (function pet$ui$render(){
return shadow.grove.render(pet.ui.env.rt_ref,pet.ui.root_el,pet.ui.views.ui_root.cljs$core$IFn$_invoke$arity$0());
});
pet.ui.init = (function pet$ui$init(){
if(goog.DEBUG){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(pet.ui.env.rt_ref,cljs.core.assoc,new cljs.core.Keyword("shadow.grove.runtime","tx-reporter","shadow.grove.runtime/tx-reporter",-1162168653),(function (p__25349){
var map__25350 = p__25349;
var map__25350__$1 = cljs.core.__destructure_map(map__25350);
var report = map__25350__$1;
var event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25350__$1,new cljs.core.Keyword(null,"event","event",301435442));
return console.log(new cljs.core.Keyword(null,"e","e",1381269198).cljs$core$IFn$_invoke$arity$1(event),event,report);
}));
} else {
}

shadow.grove.history.init_BANG_(pet.ui.env.rt_ref,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"use-fragment","use-fragment",-1617737154),true,new cljs.core.Keyword(null,"start-token","start-token",-722174320),"/all"], null));

module$node_modules$$juxt$pass$dist$juxt_pass_cjs.registerOAuth2Worker();

return pet.ui.render();
});
pet.ui.reload_BANG_ = (function pet$ui$reload_BANG_(){
return pet.ui.render();
});

//# sourceMappingURL=pet.ui.js.map
