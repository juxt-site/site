goog.provide('shadow.grove.ui.atoms');

/**
* @constructor
 * @implements {shadow.grove.protocols.IHook}
*/
shadow.grove.ui.atoms.EnvWatch = (function (key_to_atom,path,default$,the_atom,val,component_handle){
this.key_to_atom = key_to_atom;
this.path = path;
this.default$ = default$;
this.the_atom = the_atom;
this.val = val;
this.component_handle = component_handle;
});
(shadow.grove.ui.atoms.EnvWatch.prototype.shadow$grove$protocols$IHook$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.ui.atoms.EnvWatch.prototype.shadow$grove$protocols$IHook$hook_init_BANG_$arity$2 = (function (this$,ch){
var self__ = this;
var this$__$1 = this;
(self__.component_handle = ch);

var atom_12524 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(shadow.grove.protocols.get_component_env(ch),self__.key_to_atom);
if(cljs.core.truth_(atom_12524)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("no atom found under key",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),self__.key_to_atom,new cljs.core.Keyword(null,"path","path",-188191168),self__.path], null));
}

(self__.the_atom = atom_12524);

(self__.val = cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(self__.the_atom),self__.path,self__.default$));

return cljs.core.add_watch(self__.the_atom,this$__$1,(function (_,___$1,___$2,new_value){
var next_val = cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(new_value,self__.path,self__.default$);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(self__.val,next_val)){
(self__.val = next_val);

return shadow.grove.protocols.hook_invalidate_BANG_(self__.component_handle);
} else {
return null;
}
}));
}));

(shadow.grove.ui.atoms.EnvWatch.prototype.shadow$grove$protocols$IHook$hook_ready_QMARK_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return true;
}));

(shadow.grove.ui.atoms.EnvWatch.prototype.shadow$grove$protocols$IHook$hook_value$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.val;
}));

(shadow.grove.ui.atoms.EnvWatch.prototype.shadow$grove$protocols$IHook$hook_update_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return true;
}));

(shadow.grove.ui.atoms.EnvWatch.prototype.shadow$grove$protocols$IHook$hook_deps_update_BANG_$arity$2 = (function (this$,new_val){
var self__ = this;
var this$__$1 = this;
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("shouldn't have changing deps?",cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.grove.ui.atoms.EnvWatch.prototype.shadow$grove$protocols$IHook$hook_destroy_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.remove_watch(self__.the_atom,this$__$1);
}));

(shadow.grove.ui.atoms.EnvWatch.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"key-to-atom","key-to-atom",520528409,null),new cljs.core.Symbol(null,"path","path",1452340359,null),new cljs.core.Symbol(null,"default","default",-347290801,null),cljs.core.with_meta(new cljs.core.Symbol(null,"the-atom","the-atom",-1180896657,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"val","val",1769233139,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"component-handle","component-handle",-970224254,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
}));

(shadow.grove.ui.atoms.EnvWatch.cljs$lang$type = true);

(shadow.grove.ui.atoms.EnvWatch.cljs$lang$ctorStr = "shadow.grove.ui.atoms/EnvWatch");

(shadow.grove.ui.atoms.EnvWatch.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.ui.atoms/EnvWatch");
}));

/**
 * Positional factory function for shadow.grove.ui.atoms/EnvWatch.
 */
shadow.grove.ui.atoms.__GT_EnvWatch = (function shadow$grove$ui$atoms$__GT_EnvWatch(key_to_atom,path,default$,the_atom,val,component_handle){
return (new shadow.grove.ui.atoms.EnvWatch(key_to_atom,path,default$,the_atom,val,component_handle));
});


/**
* @constructor
 * @implements {shadow.grove.protocols.IHook}
*/
shadow.grove.ui.atoms.AtomWatch = (function (the_atom,access_fn,val,component_handle){
this.the_atom = the_atom;
this.access_fn = access_fn;
this.val = val;
this.component_handle = component_handle;
});
(shadow.grove.ui.atoms.AtomWatch.prototype.shadow$grove$protocols$IHook$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.ui.atoms.AtomWatch.prototype.shadow$grove$protocols$IHook$hook_init_BANG_$arity$2 = (function (this$,ch){
var self__ = this;
var this$__$1 = this;
(self__.component_handle = ch);

(self__.val = (function (){var G__12476 = null;
var G__12477 = cljs.core.deref(self__.the_atom);
return (self__.access_fn.cljs$core$IFn$_invoke$arity$2 ? self__.access_fn.cljs$core$IFn$_invoke$arity$2(G__12476,G__12477) : self__.access_fn.call(null,G__12476,G__12477));
})());

return cljs.core.add_watch(self__.the_atom,this$__$1,(function (_,___$1,old,new$){
var next_val = (self__.access_fn.cljs$core$IFn$_invoke$arity$2 ? self__.access_fn.cljs$core$IFn$_invoke$arity$2(old,new$) : self__.access_fn.call(null,old,new$));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(self__.val,next_val)){
(self__.val = next_val);

return shadow.grove.protocols.hook_invalidate_BANG_(self__.component_handle);
} else {
return null;
}
}));
}));

(shadow.grove.ui.atoms.AtomWatch.prototype.shadow$grove$protocols$IHook$hook_ready_QMARK_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return true;
}));

(shadow.grove.ui.atoms.AtomWatch.prototype.shadow$grove$protocols$IHook$hook_value$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.val;
}));

(shadow.grove.ui.atoms.AtomWatch.prototype.shadow$grove$protocols$IHook$hook_update_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return true;
}));

(shadow.grove.ui.atoms.AtomWatch.prototype.shadow$grove$protocols$IHook$hook_deps_update_BANG_$arity$2 = (function (this$,new_val){
var self__ = this;
var this$__$1 = this;
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("shouldn't have changing deps?",cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.grove.ui.atoms.AtomWatch.prototype.shadow$grove$protocols$IHook$hook_destroy_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.remove_watch(self__.the_atom,this$__$1);
}));

(shadow.grove.ui.atoms.AtomWatch.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"the-atom","the-atom",-1180896657,null),new cljs.core.Symbol(null,"access-fn","access-fn",-1173899629,null),cljs.core.with_meta(new cljs.core.Symbol(null,"val","val",1769233139,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"component-handle","component-handle",-970224254,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
}));

(shadow.grove.ui.atoms.AtomWatch.cljs$lang$type = true);

(shadow.grove.ui.atoms.AtomWatch.cljs$lang$ctorStr = "shadow.grove.ui.atoms/AtomWatch");

(shadow.grove.ui.atoms.AtomWatch.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.ui.atoms/AtomWatch");
}));

/**
 * Positional factory function for shadow.grove.ui.atoms/AtomWatch.
 */
shadow.grove.ui.atoms.__GT_AtomWatch = (function shadow$grove$ui$atoms$__GT_AtomWatch(the_atom,access_fn,val,component_handle){
return (new shadow.grove.ui.atoms.AtomWatch(the_atom,access_fn,val,component_handle));
});


//# sourceMappingURL=shadow.grove.ui.atoms.js.map
