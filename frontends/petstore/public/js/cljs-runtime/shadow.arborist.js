goog.provide('shadow.arborist');

/**
* @constructor
 * @implements {shadow.arborist.protocols.IDirectUpdate}
*/
shadow.arborist.TreeRoot = (function (container,env,root){
this.container = container;
this.env = env;
this.root = root;
});
(shadow.arborist.TreeRoot.prototype.shadow$arborist$protocols$IDirectUpdate$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.arborist.TreeRoot.prototype.shadow$arborist$protocols$IDirectUpdate$update_BANG_$arity$2 = (function (this$,next){
var self__ = this;
var this$__$1 = this;
if(cljs.core.truth_(self__.root)){
return shadow.arborist.protocols.update_BANG_(self__.root,next);
} else {
var new_root = shadow.arborist.common.managed_root(self__.env);
(self__.root = new_root);

shadow.arborist.protocols.update_BANG_(self__.root,next);

shadow.arborist.protocols.dom_insert(self__.root,self__.container,null);

return shadow.arborist.protocols.dom_entered_BANG_(self__.root);
}
}));

(shadow.arborist.TreeRoot.prototype.destroy_BANG_ = (function (dom_remove_QMARK_){
var self__ = this;
var this$ = this;
if(cljs.core.truth_(self__.root)){
return shadow.arborist.protocols.destroy_BANG_(self__.root,dom_remove_QMARK_);
} else {
return null;
}
}));

(shadow.arborist.TreeRoot.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"container","container",-96406180,null),cljs.core.with_meta(new cljs.core.Symbol(null,"env","env",-175281708,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"root","root",1191874074,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
}));

(shadow.arborist.TreeRoot.cljs$lang$type = true);

(shadow.arborist.TreeRoot.cljs$lang$ctorStr = "shadow.arborist/TreeRoot");

(shadow.arborist.TreeRoot.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.arborist/TreeRoot");
}));

/**
 * Positional factory function for shadow.arborist/TreeRoot.
 */
shadow.arborist.__GT_TreeRoot = (function shadow$arborist$__GT_TreeRoot(container,env,root){
return (new shadow.arborist.TreeRoot(container,env,root));
});

shadow.arborist.dom_root = (function shadow$arborist$dom_root(var_args){
var G__11871 = arguments.length;
switch (G__11871) {
case 2:
return shadow.arborist.dom_root.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.arborist.dom_root.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.arborist.dom_root.cljs$core$IFn$_invoke$arity$2 = (function (container,env){
if(cljs.core.truth_(shadow.arborist.common.in_document_QMARK_(container))){
} else {
throw (new Error("Assert failed: (common/in-document? container)"));
}

var root = (new shadow.arborist.TreeRoot(container,null,null));
var root_env = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(env,new cljs.core.Keyword("shadow.arborist","root","shadow.arborist/root",1186427103),root,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("dom","element-fn","dom/element-fn",553675770),shadow.arborist.fragments.dom_element_fn], 0));
(root.env = root_env);

return root;
}));

(shadow.arborist.dom_root.cljs$core$IFn$_invoke$arity$3 = (function (container,env,init){
var G__11880 = shadow.arborist.dom_root.cljs$core$IFn$_invoke$arity$2(container,env);
G__11880.shadow$arborist$protocols$IDirectUpdate$update_BANG_$arity$2(null,init);

return G__11880;
}));

(shadow.arborist.dom_root.cljs$lang$maxFixedArity = 3);

shadow.arborist._LT__LT_ = (function shadow$arborist$_LT__LT_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___11895 = arguments.length;
var i__5770__auto___11896 = (0);
while(true){
if((i__5770__auto___11896 < len__5769__auto___11895)){
args__5775__auto__.push((arguments[i__5770__auto___11896]));

var G__11897 = (i__5770__auto___11896 + (1));
i__5770__auto___11896 = G__11897;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return shadow.arborist._LT__LT_.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(shadow.arborist._LT__LT_.cljs$core$IFn$_invoke$arity$variadic = (function (body){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("<< can only be used a macro",cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.arborist._LT__LT_.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(shadow.arborist._LT__LT_.cljs$lang$applyTo = (function (seq11881){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq11881));
}));

shadow.arborist._LT__GT_ = (function shadow$arborist$_LT__GT_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___11899 = arguments.length;
var i__5770__auto___11900 = (0);
while(true){
if((i__5770__auto___11900 < len__5769__auto___11899)){
args__5775__auto__.push((arguments[i__5770__auto___11900]));

var G__11901 = (i__5770__auto___11900 + (1));
i__5770__auto___11900 = G__11901;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return shadow.arborist._LT__GT_.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(shadow.arborist._LT__GT_.cljs$core$IFn$_invoke$arity$variadic = (function (body){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("<> can only be used a macro",cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.arborist._LT__GT_.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(shadow.arborist._LT__GT_.cljs$lang$applyTo = (function (seq11884){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq11884));
}));

shadow.arborist.fragment = (function shadow$arborist$fragment(var_args){
var args__5775__auto__ = [];
var len__5769__auto___11904 = arguments.length;
var i__5770__auto___11905 = (0);
while(true){
if((i__5770__auto___11905 < len__5769__auto___11904)){
args__5775__auto__.push((arguments[i__5770__auto___11905]));

var G__11906 = (i__5770__auto___11905 + (1));
i__5770__auto___11905 = G__11906;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return shadow.arborist.fragment.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(shadow.arborist.fragment.cljs$core$IFn$_invoke$arity$variadic = (function (body){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("fragment can only be used a macro",cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.arborist.fragment.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(shadow.arborist.fragment.cljs$lang$applyTo = (function (seq11885){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq11885));
}));

shadow.arborist.simple_seq = (function shadow$arborist$simple_seq(coll,render_fn){
return shadow.arborist.collections.simple_seq(coll,render_fn);
});
shadow.arborist.render_seq = (function shadow$arborist$render_seq(coll,key_fn,render_fn){
return shadow.arborist.collections.keyed_seq(coll,key_fn,render_fn);
});
shadow.arborist.keyed_seq = (function shadow$arborist$keyed_seq(coll,key_fn,render_fn){
return shadow.arborist.collections.keyed_seq(coll,key_fn,render_fn);
});
shadow.arborist.update_BANG_ = (function shadow$arborist$update_BANG_(x,next){
return shadow.arborist.protocols.update_BANG_(x,next);
});
shadow.arborist.destroy_BANG_ = (function shadow$arborist$destroy_BANG_(root){
return shadow.arborist.protocols.destroy_BANG_(root,true);
});

//# sourceMappingURL=shadow.arborist.js.map
