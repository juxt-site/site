goog.provide('todo.ui');
if((typeof todo !== 'undefined') && (typeof todo.ui !== 'undefined') && (typeof todo.ui.root_el !== 'undefined')){
} else {
todo.ui.root_el = document.getElementById("app");
}
todo.ui.render = (function todo$ui$render(){
return shadow.grove.render(todo.ui.env.rt_ref,todo.ui.root_el,todo.ui.views.ui_root.cljs$core$IFn$_invoke$arity$0());
});
todo.ui.init = (function todo$ui$init(){
if(goog.DEBUG){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(todo.ui.env.rt_ref,cljs.core.assoc,new cljs.core.Keyword("shadow.grove.runtime","tx-reporter","shadow.grove.runtime/tx-reporter",-1162168653),(function (p__12112){
var map__12113 = p__12112;
var map__12113__$1 = cljs.core.__destructure_map(map__12113);
var report = map__12113__$1;
var event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12113__$1,new cljs.core.Keyword(null,"event","event",301435442));
return console.log(new cljs.core.Keyword(null,"e","e",1381269198).cljs$core$IFn$_invoke$arity$1(event),event,report);
}));
} else {
}

shadow.grove.history.init_BANG_(todo.ui.env.rt_ref,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"use-fragment","use-fragment",-1617737154),true,new cljs.core.Keyword(null,"start-token","start-token",-722174320),"/all"], null));

return todo.ui.render();
});
todo.ui.reload_BANG_ = (function todo$ui$reload_BANG_(){
return todo.ui.render();
});

//# sourceMappingURL=todo.ui.js.map
