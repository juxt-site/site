goog.provide('shadow.arborist.fragments');
/**
 * @idGenerator {consistent}
 */
shadow.arborist.fragments.fragment_id = (function shadow$arborist$fragments$fragment_id(s){
return s;
});
shadow.arborist.fragments.array_equiv = (function shadow$arborist$fragments$array_equiv(a,b){
var al = a.length;
var bl = b.length;
if((al === bl)){
var i = (0);
while(true){
if((i === al)){
return true;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((a[i]),(b[i]))){
var G__11765 = (i + (1));
i = G__11765;
continue;
} else {
return null;
}
}
break;
}
} else {
return null;
}
});
shadow.arborist.fragments.svg_ns = "http://www.w3.org/2000/svg";
shadow.arborist.fragments.svg_element_fn = (function shadow$arborist$fragments$svg_element_fn(type){
return document.createElementNS(shadow.arborist.fragments.svg_ns,type.name);
});
shadow.arborist.fragments.dom_element_fn = (function shadow$arborist$fragments$dom_element_fn(type){
return document.createElement(type.name);
});
shadow.arborist.fragments.get_element_fn = (function shadow$arborist$fragments$get_element_fn(env,element_ns){
if((element_ns === shadow.arborist.fragments.svg_ns)){
return shadow.arborist.fragments.svg_element_fn;
} else {
return shadow.arborist.fragments.dom_element_fn;
}
});

/**
* @constructor
*/
shadow.arborist.fragments.FragmentCode = (function (create_fn,mount_fn,update_fn,destroy_fn){
this.create_fn = create_fn;
this.mount_fn = mount_fn;
this.update_fn = update_fn;
this.destroy_fn = destroy_fn;
});

(shadow.arborist.fragments.FragmentCode.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"create-fn","create-fn",44490714,null),new cljs.core.Symbol(null,"mount-fn","mount-fn",1060575271,null),new cljs.core.Symbol(null,"update-fn","update-fn",-1943348456,null),new cljs.core.Symbol(null,"destroy-fn","destroy-fn",1453616805,null)], null);
}));

(shadow.arborist.fragments.FragmentCode.cljs$lang$type = true);

(shadow.arborist.fragments.FragmentCode.cljs$lang$ctorStr = "shadow.arborist.fragments/FragmentCode");

(shadow.arborist.fragments.FragmentCode.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.arborist.fragments/FragmentCode");
}));

/**
 * Positional factory function for shadow.arborist.fragments/FragmentCode.
 */
shadow.arborist.fragments.__GT_FragmentCode = (function shadow$arborist$fragments$__GT_FragmentCode(create_fn,mount_fn,update_fn,destroy_fn){
return (new shadow.arborist.fragments.FragmentCode(create_fn,mount_fn,update_fn,destroy_fn));
});


/**
* @constructor
 * @implements {shadow.arborist.protocols.IManaged}
*/
shadow.arborist.fragments.ManagedFragment = (function (env,code,vals,marker,exports,dom_entered_QMARK_){
this.env = env;
this.code = code;
this.vals = vals;
this.marker = marker;
this.exports = exports;
this.dom_entered_QMARK_ = dom_entered_QMARK_;
});
(shadow.arborist.fragments.ManagedFragment.prototype.shadow$arborist$protocols$IManaged$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.arborist.fragments.ManagedFragment.prototype.shadow$arborist$protocols$IManaged$dom_first$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.marker;
}));

(shadow.arborist.fragments.ManagedFragment.prototype.shadow$arborist$protocols$IManaged$dom_insert$arity$3 = (function (this$,parent,anchor){
var self__ = this;
var this$__$1 = this;
parent.insertBefore(self__.marker,anchor);

return self__.code.mount_fn(self__.exports,parent,anchor);
}));

(shadow.arborist.fragments.ManagedFragment.prototype.shadow$arborist$protocols$IManaged$dom_entered_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
(self__.dom_entered_QMARK_ = true);

return self__.exports.forEach((function (item){
if((((!((item == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === item.shadow$arborist$protocols$IManaged$))))?true:false):false)){
return item.shadow$arborist$protocols$IManaged$dom_entered_BANG_$arity$1(null);
} else {
return null;
}
}));
}));

(shadow.arborist.fragments.ManagedFragment.prototype.shadow$arborist$protocols$IManaged$supports_QMARK_$arity$2 = (function (this$,next){
var self__ = this;
var this$__$1 = this;
var and__5043__auto__ = shadow.arborist.fragments.fragment_init_QMARK_(next);
if(cljs.core.truth_(and__5043__auto__)){
return (self__.code === next.code);
} else {
return and__5043__auto__;
}
}));

(shadow.arborist.fragments.ManagedFragment.prototype.shadow$arborist$protocols$IManaged$dom_sync_BANG_$arity$2 = (function (this$,next){
var self__ = this;
var this$__$1 = this;
var nvals_11781 = next.vals;
self__.code.update_fn(this$__$1,self__.env,self__.exports,self__.vals,nvals_11781);

(self__.vals = nvals_11781);

return new cljs.core.Keyword(null,"synced","synced",-1518561120);
}));

(shadow.arborist.fragments.ManagedFragment.prototype.shadow$arborist$protocols$IManaged$destroy_BANG_$arity$2 = (function (this$,dom_remove_QMARK_){
var self__ = this;
var this$__$1 = this;
if(dom_remove_QMARK_){
self__.marker.remove();
} else {
}

return self__.code.destroy_fn(self__.env,self__.exports,self__.vals,dom_remove_QMARK_);
}));

(shadow.arborist.fragments.ManagedFragment.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"env","env",-175281708,null),cljs.core.with_meta(new cljs.core.Symbol(null,"code","code",-1068142627,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"FragmentCode","FragmentCode",1795368532,null)], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"vals","vals",-1886377036,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),new cljs.core.Symbol(null,"marker","marker",-1789317456,null),new cljs.core.Symbol(null,"exports","exports",895523255,null),cljs.core.with_meta(new cljs.core.Symbol(null,"dom-entered?","dom-entered?",962657078,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true,new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"boolean","boolean",-278886877,null)], null))], null);
}));

(shadow.arborist.fragments.ManagedFragment.cljs$lang$type = true);

(shadow.arborist.fragments.ManagedFragment.cljs$lang$ctorStr = "shadow.arborist.fragments/ManagedFragment");

(shadow.arborist.fragments.ManagedFragment.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.arborist.fragments/ManagedFragment");
}));

/**
 * Positional factory function for shadow.arborist.fragments/ManagedFragment.
 */
shadow.arborist.fragments.__GT_ManagedFragment = (function shadow$arborist$fragments$__GT_ManagedFragment(env,code,vals,marker,exports,dom_entered_QMARK_){
return (new shadow.arborist.fragments.ManagedFragment(env,code,vals,marker,exports,dom_entered_QMARK_));
});


/**
* @constructor
 * @implements {cljs.core.IEquiv}
 * @implements {shadow.arborist.protocols.IConstruct}
*/
shadow.arborist.fragments.FragmentInit = (function (vals,element_ns,code){
this.vals = vals;
this.element_ns = element_ns;
this.code = code;
this.cljs$lang$protocol_mask$partition0$ = 2097152;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.arborist.fragments.FragmentInit.prototype.shadow$arborist$protocols$IConstruct$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.arborist.fragments.FragmentInit.prototype.shadow$arborist$protocols$IConstruct$as_managed$arity$2 = (function (_,env){
var self__ = this;
var ___$1 = this;
var element_fn = (((self__.element_ns == null))?new cljs.core.Keyword("dom","element-fn","dom/element-fn",553675770).cljs$core$IFn$_invoke$arity$1(env):shadow.arborist.fragments.get_element_fn(env,self__.element_ns));
var env__$1 = (function (){var G__11695 = env;
if((!((self__.element_ns == null)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(G__11695,new cljs.core.Keyword("dom","element-fn","dom/element-fn",553675770),element_fn,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("dom","svg","dom/svg",856951640),true], 0));
} else {
return G__11695;
}
})();
var exports__$1 = self__.code.create_fn(env__$1,self__.vals,element_fn);
return (new shadow.arborist.fragments.ManagedFragment(env__$1,self__.code,self__.vals,shadow.arborist.common.dom_marker.cljs$core$IFn$_invoke$arity$1(env__$1),exports__$1,false));
}));

(shadow.arborist.fragments.FragmentInit.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var self__ = this;
var this$__$1 = this;
var and__5043__auto__ = (other instanceof shadow.arborist.fragments.FragmentInit);
if(and__5043__auto__){
var and__5043__auto____$1 = (self__.code === other.code);
if(and__5043__auto____$1){
return shadow.arborist.fragments.array_equiv(self__.vals,other.vals);
} else {
return and__5043__auto____$1;
}
} else {
return and__5043__auto__;
}
}));

(shadow.arborist.fragments.FragmentInit.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"vals","vals",-1886377036,null),new cljs.core.Symbol(null,"element-ns","element-ns",400349362,null),cljs.core.with_meta(new cljs.core.Symbol(null,"code","code",-1068142627,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"FragmentCode","FragmentCode",1795368532,null)], null))], null);
}));

(shadow.arborist.fragments.FragmentInit.cljs$lang$type = true);

(shadow.arborist.fragments.FragmentInit.cljs$lang$ctorStr = "shadow.arborist.fragments/FragmentInit");

(shadow.arborist.fragments.FragmentInit.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.arborist.fragments/FragmentInit");
}));

/**
 * Positional factory function for shadow.arborist.fragments/FragmentInit.
 */
shadow.arborist.fragments.__GT_FragmentInit = (function shadow$arborist$fragments$__GT_FragmentInit(vals,element_ns,code){
return (new shadow.arborist.fragments.FragmentInit(vals,element_ns,code));
});

shadow.arborist.fragments.fragment_init_QMARK_ = (function shadow$arborist$fragments$fragment_init_QMARK_(thing){
return (thing instanceof shadow.arborist.fragments.FragmentInit);
});
shadow.arborist.fragments.has_no_lazy_seqs_QMARK_ = (function shadow$arborist$fragments$has_no_lazy_seqs_QMARK_(vals){
return cljs.core.every_QMARK_((function (p1__11720_SHARP_){
return (!((p1__11720_SHARP_ instanceof cljs.core.LazySeq)));
}),vals);
});
shadow.arborist.fragments.fragment_init = (function shadow$arborist$fragments$fragment_init(vals,element_ns,code){
if(shadow.arborist.fragments.has_no_lazy_seqs_QMARK_(vals)){
} else {
throw (new Error(["Assert failed: ","no lazy seqs allowed in fragments","\n","(has-no-lazy-seqs? vals)"].join('')));
}

return (new shadow.arborist.fragments.FragmentInit(vals,element_ns,code));
});
/**
 * @dict
 */
shadow.arborist.fragments.known_fragments = ({});
shadow.arborist.fragments.reset_known_fragments_BANG_ = (function shadow$arborist$fragments$reset_known_fragments_BANG_(){
return (shadow.arborist.fragments.known_fragments = ({}));
});
shadow.arborist.fragments.create_text = (function shadow$arborist$fragments$create_text(env,text){
return document.createTextNode(text);
});
shadow.arborist.fragments.set_attr = (function shadow$arborist$fragments$set_attr(env,node,key,oval,nval){
return shadow.arborist.attributes.set_attr(env,node,key,oval,nval);
});
shadow.arborist.fragments.append_child = (function shadow$arborist$fragments$append_child(parent,child){
return parent.appendChild(child);
});
shadow.arborist.fragments.managed_create = (function shadow$arborist$fragments$managed_create(env,other){
return shadow.arborist.protocols.as_managed(other,env);
});
shadow.arborist.fragments.managed_append = (function shadow$arborist$fragments$managed_append(parent,other){
if((((!((other == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === other.shadow$arborist$protocols$IManaged$))))?true:(((!other.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_(shadow.arborist.protocols.IManaged,other):false)):cljs.core.native_satisfies_QMARK_(shadow.arborist.protocols.IManaged,other))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("cannot append-managed",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"parent","parent",-878878779),parent,new cljs.core.Keyword(null,"other","other",995793544),other], null));
}

return shadow.arborist.protocols.dom_insert(other,parent,null);
});
shadow.arborist.fragments.managed_insert = (function shadow$arborist$fragments$managed_insert(component,parent,anchor){
return shadow.arborist.protocols.dom_insert(component,parent,anchor);
});
shadow.arborist.fragments.managed_remove = (function shadow$arborist$fragments$managed_remove(component,dom_remove_QMARK_){
return shadow.arborist.protocols.destroy_BANG_(component,dom_remove_QMARK_);
});
shadow.arborist.fragments.update_managed = (function shadow$arborist$fragments$update_managed(fragment,env,nodes,idx,oval,nval){
var el = (nodes[idx]);
if(el.shadow$arborist$protocols$IManaged$supports_QMARK_$arity$2(null,nval)){
return el.shadow$arborist$protocols$IManaged$dom_sync_BANG_$arity$2(null,nval);
} else {
var next = shadow.arborist.common.replace_managed(env,el,nval);
(nodes[idx] = next);

if(fragment.dom_entered_QMARK_){
return shadow.arborist.protocols.dom_entered_BANG_(next);
} else {
return null;
}
}
});
shadow.arborist.fragments.update_attr = (function shadow$arborist$fragments$update_attr(env,nodes,idx,attr,oval,nval){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(oval,nval)){
var el = (nodes[idx]);
return shadow.arborist.fragments.set_attr(env,el,attr,oval,nval);
} else {
return null;
}
});
shadow.arborist.fragments.clear_attr = (function shadow$arborist$fragments$clear_attr(env,nodes,idx,attr,oval){
var node = (nodes[idx]);
return shadow.arborist.attributes.set_attr(env,node,attr,oval,null);
});
shadow.arborist.fragments.dom_insert_before = (function shadow$arborist$fragments$dom_insert_before(parent,node,anchor){
return parent.insertBefore(node,anchor);
});
shadow.arborist.fragments.dom_remove = (function shadow$arborist$fragments$dom_remove(node){
return node.remove();
});
shadow.arborist.fragments.css_join = (function shadow$arborist$fragments$css_join(from_el,from_attrs){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [from_el,from_attrs], null);
});

//# sourceMappingURL=shadow.arborist.fragments.js.map
