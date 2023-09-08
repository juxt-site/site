goog.provide('shadow.arborist.collections');

/**
* @constructor
*/
shadow.arborist.collections.KeyedItem = (function (key,data,managed,moved_QMARK_){
this.key = key;
this.data = data;
this.managed = managed;
this.moved_QMARK_ = moved_QMARK_;
});

(shadow.arborist.collections.KeyedItem.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"key","key",124488940,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"managed","managed",-1698536450,null),new cljs.core.Symbol(null,"moved?","moved?",-1762609207,null)], null);
}));

(shadow.arborist.collections.KeyedItem.cljs$lang$type = true);

(shadow.arborist.collections.KeyedItem.cljs$lang$ctorStr = "shadow.arborist.collections/KeyedItem");

(shadow.arborist.collections.KeyedItem.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.arborist.collections/KeyedItem");
}));

/**
 * Positional factory function for shadow.arborist.collections/KeyedItem.
 */
shadow.arborist.collections.__GT_KeyedItem = (function shadow$arborist$collections$__GT_KeyedItem(key,data,managed,moved_QMARK_){
return (new shadow.arborist.collections.KeyedItem(key,data,managed,moved_QMARK_));
});


/**
* @constructor
 * @implements {shadow.arborist.protocols.IManaged}
*/
shadow.arborist.collections.KeyedCollection = (function (env,coll,key_fn,render_fn,items,item_keys,marker_before,marker_after,dom_entered_QMARK_){
this.env = env;
this.coll = coll;
this.key_fn = key_fn;
this.render_fn = render_fn;
this.items = items;
this.item_keys = item_keys;
this.marker_before = marker_before;
this.marker_after = marker_after;
this.dom_entered_QMARK_ = dom_entered_QMARK_;
});
(shadow.arborist.collections.KeyedCollection.prototype.shadow$arborist$protocols$IManaged$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.arborist.collections.KeyedCollection.prototype.shadow$arborist$protocols$IManaged$dom_first$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.marker_before;
}));

(shadow.arborist.collections.KeyedCollection.prototype.shadow$arborist$protocols$IManaged$dom_insert$arity$3 = (function (this$,parent,anchor){
var self__ = this;
var this$__$1 = this;
parent.insertBefore(self__.marker_before,anchor);

self__.items.forEach((function (item){
return item.managed.shadow$arborist$protocols$IManaged$dom_insert$arity$3(null,parent,anchor);
}));

return parent.insertBefore(self__.marker_after,anchor);
}));

(shadow.arborist.collections.KeyedCollection.prototype.shadow$arborist$protocols$IManaged$dom_entered_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
(self__.dom_entered_QMARK_ = true);

return self__.items.forEach((function (item){
return item.managed.shadow$arborist$protocols$IManaged$dom_entered_BANG_$arity$1(null);
}));
}));

(shadow.arborist.collections.KeyedCollection.prototype.shadow$arborist$protocols$IManaged$supports_QMARK_$arity$2 = (function (this$,next){
var self__ = this;
var this$__$1 = this;
return (next instanceof shadow.arborist.collections.KeyedCollectionInit);
}));

(shadow.arborist.collections.KeyedCollection.prototype.shadow$arborist$protocols$IManaged$dom_sync_BANG_$arity$2 = (function (this$,next){
var self__ = this;
var this$__$1 = this;
var old_coll_11684 = self__.coll;
var new_coll_11685 = next.coll;
var dom_parent_11686 = self__.marker_after.parentNode;
var rfn_identical_QMARK__11687 = (self__.render_fn === next.render_fn);
if(dom_parent_11686){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("sync while not in dom?",cljs.core.PersistentArrayMap.EMPTY);
}

if(((rfn_identical_QMARK__11687) && ((old_coll_11684 === new_coll_11685)))){
} else {
(self__.coll = new_coll_11685);

(self__.key_fn = next.key_fn);

(self__.render_fn = next.render_fn);

var kfn_11688 = shadow.arborist.common.ifn1_wrap(self__.key_fn);
var rfn_11689 = shadow.arborist.common.ifn3_wrap(self__.render_fn);
var new_len_11690 = new_coll_11685.cljs$core$ICounted$_count$arity$1(null);
var old_items_11691 = self__.items;
var new_items_11692 = (new Array(new_len_11690));
var new_keys_11693 = cljs.core._persistent_BANG_(cljs.core.reduce_kv((function (keys,idx,val){
var key = kfn_11688(val);
var item = (new shadow.arborist.collections.KeyedItem(key,val,null,false));
(new_items_11692[idx] = item);

return keys.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(null,key,item);
}),cljs.core._as_transient(cljs.core.PersistentArrayMap.EMPTY),new_coll_11685));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new_keys_11693.cljs$core$ICounted$_count$arity$1(null),new_len_11690)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("collection contains duplicated keys",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"coll","coll",1647737163),new_coll_11685,new cljs.core.Keyword(null,"keys","keys",1068423698),new_keys_11693], null));
} else {
}

var old_items_11697__$1 = old_items_11691.filter((function (item){
if(cljs.core.contains_QMARK_(new_keys_11693,item.key)){
return true;
} else {
item.managed.shadow$arborist$protocols$IManaged$destroy_BANG_$arity$2(null,true);

return false;
}
}));
var anchor_11698 = self__.marker_after;
var idx_11699 = (new_len_11690 - (1));
var old_idx_11700 = (old_items_11697__$1.length - (1));
while(true){
if((idx_11699 < (0))){
} else {
var new_item_11702 = (new_items_11692[idx_11699]);
var old_item_11703 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.item_keys,new_item_11702.key);
if(cljs.core.not(old_item_11703)){
var rendered_11704 = rfn_11689(new_item_11702.data,idx_11699,new_item_11702.key);
var managed_11705 = shadow.arborist.protocols.as_managed(rendered_11704,self__.env);
managed_11705.shadow$arborist$protocols$IManaged$dom_insert$arity$3(null,dom_parent_11686,anchor_11698);

if(self__.dom_entered_QMARK_){
managed_11705.shadow$arborist$protocols$IManaged$dom_entered_BANG_$arity$1(null);
} else {
}

(new_item_11702.managed = managed_11705);

var G__11706 = managed_11705.shadow$arborist$protocols$IManaged$dom_first$arity$1(null);
var G__11707 = (idx_11699 - (1));
var G__11708 = old_idx_11700;
anchor_11698 = G__11706;
idx_11699 = G__11707;
old_idx_11700 = G__11708;
continue;
} else {
if((old_item_11703 === (old_items_11697__$1[old_idx_11700]))){
var managed_11709 = old_item_11703.managed;
if(((rfn_identical_QMARK__11687) && ((old_item_11703.data === new_item_11702.data)))){
(new_item_11702.managed = managed_11709);

if(old_item_11703.moved_QMARK_){
managed_11709.shadow$arborist$protocols$IManaged$dom_insert$arity$3(null,dom_parent_11686,anchor_11698);
} else {
}

var G__11710 = managed_11709.shadow$arborist$protocols$IManaged$dom_first$arity$1(null);
var G__11711 = (idx_11699 - (1));
var G__11712 = (old_idx_11700 - (1));
anchor_11698 = G__11710;
idx_11699 = G__11711;
old_idx_11700 = G__11712;
continue;
} else {
var rendered_11713 = rfn_11689(new_item_11702.data,idx_11699,new_item_11702.key);
if(managed_11709.shadow$arborist$protocols$IManaged$supports_QMARK_$arity$2(null,rendered_11713)){
managed_11709.shadow$arborist$protocols$IManaged$dom_sync_BANG_$arity$2(null,rendered_11713);

(new_item_11702.managed = managed_11709);

if(old_item_11703.moved_QMARK_){
managed_11709.shadow$arborist$protocols$IManaged$dom_insert$arity$3(null,dom_parent_11686,anchor_11698);
} else {
}

var G__11716 = managed_11709.shadow$arborist$protocols$IManaged$dom_first$arity$1(null);
var G__11717 = (idx_11699 - (1));
var G__11718 = (old_idx_11700 - (1));
anchor_11698 = G__11716;
idx_11699 = G__11717;
old_idx_11700 = G__11718;
continue;
} else {
var new_managed_11719 = shadow.arborist.protocols.as_managed(rendered_11713,self__.env);
new_managed_11719.shadow$arborist$protocols$IManaged$dom_insert$arity$3(null,dom_parent_11686,anchor_11698);

if(self__.dom_entered_QMARK_){
new_managed_11719.shadow$arborist$protocols$IManaged$dom_entered_BANG_$arity$1(null);
} else {
}

managed_11709.shadow$arborist$protocols$IManaged$destroy_BANG_$arity$2(null,true);

(new_item_11702.managed = new_managed_11719);

var G__11721 = new_managed_11719.shadow$arborist$protocols$IManaged$dom_first$arity$1(null);
var G__11722 = (idx_11699 - (1));
var G__11723 = (old_idx_11700 - (1));
anchor_11698 = G__11721;
idx_11699 = G__11722;
old_idx_11700 = G__11723;
continue;
}
}
} else {
var seek_idx_11724 = old_items_11697__$1.indexOf(old_item_11703);
var old_item_11725__$1 = (old_items_11697__$1[seek_idx_11724]);
var managed_11726 = old_item_11725__$1.managed;
var item_at_idx_11727 = (old_items_11697__$1[old_idx_11700]);
(item_at_idx_11727.moved_QMARK_ = true);

(old_items_11697__$1[seek_idx_11724] = item_at_idx_11727);

(old_items_11697__$1[old_idx_11700] = old_item_11725__$1);

if(((rfn_identical_QMARK__11687) && ((new_item_11702.data === old_item_11725__$1.data)))){
(new_item_11702.managed = managed_11726);

managed_11726.shadow$arborist$protocols$IManaged$dom_insert$arity$3(null,dom_parent_11686,anchor_11698);

var G__11728 = managed_11726.shadow$arborist$protocols$IManaged$dom_first$arity$1(null);
var G__11729 = (idx_11699 - (1));
var G__11730 = (old_idx_11700 - (1));
anchor_11698 = G__11728;
idx_11699 = G__11729;
old_idx_11700 = G__11730;
continue;
} else {
var rendered_11731 = rfn_11689(new_item_11702.data,idx_11699,new_item_11702.key);
if(managed_11726.shadow$arborist$protocols$IManaged$supports_QMARK_$arity$2(null,rendered_11731)){
(new_item_11702.managed = managed_11726);

managed_11726.shadow$arborist$protocols$IManaged$dom_sync_BANG_$arity$2(null,rendered_11731);

managed_11726.shadow$arborist$protocols$IManaged$dom_insert$arity$3(null,dom_parent_11686,anchor_11698);

var G__11733 = managed_11726.shadow$arborist$protocols$IManaged$dom_first$arity$1(null);
var G__11734 = (idx_11699 - (1));
var G__11735 = (old_idx_11700 - (1));
anchor_11698 = G__11733;
idx_11699 = G__11734;
old_idx_11700 = G__11735;
continue;
} else {
var new_managed_11736 = shadow.arborist.protocols.as_managed(rendered_11731,self__.env);
(new_item_11702.managed = new_managed_11736);

new_managed_11736.shadow$arborist$protocols$IManaged$dom_insert$arity$3(null,dom_parent_11686,anchor_11698);

if(self__.dom_entered_QMARK_){
new_managed_11736.shadow$arborist$protocols$IManaged$dom_entered_BANG_$arity$1(null);
} else {
}

managed_11726.shadow$arborist$protocols$IManaged$destroy_BANG_$arity$2(null,true);

var G__11737 = new_managed_11736.shadow$arborist$protocols$IManaged$dom_first$arity$1(null);
var G__11738 = (idx_11699 - (1));
var G__11739 = (old_idx_11700 - (1));
anchor_11698 = G__11737;
idx_11699 = G__11738;
old_idx_11700 = G__11739;
continue;
}
}

}
}
}
break;
}

(self__.item_keys = new_keys_11693);

(self__.items = new_items_11692);
}

return new cljs.core.Keyword(null,"synced","synced",-1518561120);
}));

(shadow.arborist.collections.KeyedCollection.prototype.shadow$arborist$protocols$IManaged$destroy_BANG_$arity$2 = (function (this$,dom_remove_QMARK_){
var self__ = this;
var this$__$1 = this;
if(dom_remove_QMARK_){
var G__11600_11740 = document.createRange();
G__11600_11740.setStartBefore(self__.marker_before);

G__11600_11740.setEndAfter(self__.marker_after);

G__11600_11740.deleteContents();

} else {
}

return self__.items.forEach((function (item){
return item.managed.shadow$arborist$protocols$IManaged$destroy_BANG_$arity$2(null,false);
}));
}));

(shadow.arborist.collections.KeyedCollection.getBasis = (function (){
return new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"env","env",-175281708,null),cljs.core.with_meta(new cljs.core.Symbol(null,"coll","coll",-1006698606,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"key-fn","key-fn",1004377048,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"function","function",-486723946,null),new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"render-fn","render-fn",2039328045,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"function","function",-486723946,null),new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"items","items",-1622480831,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"item-keys","item-keys",1023598268,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),new cljs.core.Symbol(null,"marker-before","marker-before",-198173470,null),new cljs.core.Symbol(null,"marker-after","marker-after",-602144151,null),cljs.core.with_meta(new cljs.core.Symbol(null,"dom-entered?","dom-entered?",962657078,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true,new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"boolean","boolean",-278886877,null)], null))], null);
}));

(shadow.arborist.collections.KeyedCollection.cljs$lang$type = true);

(shadow.arborist.collections.KeyedCollection.cljs$lang$ctorStr = "shadow.arborist.collections/KeyedCollection");

(shadow.arborist.collections.KeyedCollection.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.arborist.collections/KeyedCollection");
}));

/**
 * Positional factory function for shadow.arborist.collections/KeyedCollection.
 */
shadow.arborist.collections.__GT_KeyedCollection = (function shadow$arborist$collections$__GT_KeyedCollection(env,coll,key_fn,render_fn,items,item_keys,marker_before,marker_after,dom_entered_QMARK_){
return (new shadow.arborist.collections.KeyedCollection(env,coll,key_fn,render_fn,items,item_keys,marker_before,marker_after,dom_entered_QMARK_));
});


/**
* @constructor
 * @implements {cljs.core.IEquiv}
 * @implements {shadow.arborist.protocols.IConstruct}
*/
shadow.arborist.collections.KeyedCollectionInit = (function (coll,key_fn,render_fn){
this.coll = coll;
this.key_fn = key_fn;
this.render_fn = render_fn;
this.cljs$lang$protocol_mask$partition0$ = 2097152;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.arborist.collections.KeyedCollectionInit.prototype.shadow$arborist$protocols$IConstruct$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.arborist.collections.KeyedCollectionInit.prototype.shadow$arborist$protocols$IConstruct$as_managed$arity$2 = (function (this$,env){
var self__ = this;
var this$__$1 = this;
var len = cljs.core.count(self__.coll);
var marker_before = shadow.arborist.common.dom_marker.cljs$core$IFn$_invoke$arity$2(env,"coll-start");
var marker_after = shadow.arborist.common.dom_marker.cljs$core$IFn$_invoke$arity$2(env,"coll-end");
var kfn = shadow.arborist.common.ifn1_wrap(self__.key_fn);
var rfn = shadow.arborist.common.ifn3_wrap(self__.render_fn);
var items = (new Array(len));
var keys = cljs.core.persistent_BANG_(cljs.core.reduce_kv((function (keys,idx,val){
var key = (kfn.cljs$core$IFn$_invoke$arity$1 ? kfn.cljs$core$IFn$_invoke$arity$1(val) : kfn.call(null,val));
var rendered = (rfn.cljs$core$IFn$_invoke$arity$3 ? rfn.cljs$core$IFn$_invoke$arity$3(val,idx,key) : rfn.call(null,val,idx,key));
var managed = shadow.arborist.protocols.as_managed(rendered,env);
var item = (new shadow.arborist.collections.KeyedItem(key,val,managed,false));
(items[idx] = item);

return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(keys,key,item);
}),cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),self__.coll));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(keys),len)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("collection contains duplicated keys",cljs.core.PersistentArrayMap.EMPTY);
} else {
}

return (new shadow.arborist.collections.KeyedCollection(env,self__.coll,self__.key_fn,self__.render_fn,items,keys,marker_before,marker_after,false));
}));

(shadow.arborist.collections.KeyedCollectionInit.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var self__ = this;
var this$__$1 = this;
return (((other instanceof shadow.arborist.collections.KeyedCollectionInit)) && (((cljs.core.keyword_identical_QMARK_(self__.key_fn,other.key_fn)) && ((((self__.render_fn === other.render_fn)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.coll,other.coll)))))));
}));

(shadow.arborist.collections.KeyedCollectionInit.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"coll","coll",-1006698606,null),new cljs.core.Symbol(null,"key-fn","key-fn",1004377048,null),new cljs.core.Symbol(null,"render-fn","render-fn",2039328045,null)], null);
}));

(shadow.arborist.collections.KeyedCollectionInit.cljs$lang$type = true);

(shadow.arborist.collections.KeyedCollectionInit.cljs$lang$ctorStr = "shadow.arborist.collections/KeyedCollectionInit");

(shadow.arborist.collections.KeyedCollectionInit.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.arborist.collections/KeyedCollectionInit");
}));

/**
 * Positional factory function for shadow.arborist.collections/KeyedCollectionInit.
 */
shadow.arborist.collections.__GT_KeyedCollectionInit = (function shadow$arborist$collections$__GT_KeyedCollectionInit(coll,key_fn,render_fn){
return (new shadow.arborist.collections.KeyedCollectionInit(coll,key_fn,render_fn));
});

shadow.arborist.collections.keyed_seq = (function shadow$arborist$collections$keyed_seq(coll,key_fn,render_fn){
if(cljs.core.sequential_QMARK_(coll)){
} else {
throw (new Error("Assert failed: (sequential? coll)"));
}

if(cljs.core.ifn_QMARK_(key_fn)){
} else {
throw (new Error("Assert failed: (ifn? key-fn)"));
}

if(cljs.core.ifn_QMARK_(render_fn)){
} else {
throw (new Error("Assert failed: (ifn? render-fn)"));
}

var coll__$1 = cljs.core.vec(coll);
if((cljs.core.count(coll__$1) === (0))){
return null;
} else {
return (new shadow.arborist.collections.KeyedCollectionInit(coll__$1,key_fn,render_fn));
}
});

/**
* @constructor
*/
shadow.arborist.collections.SimpleItem = (function (data,managed){
this.data = data;
this.managed = managed;
});

(shadow.arborist.collections.SimpleItem.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"managed","managed",-1698536450,null)], null);
}));

(shadow.arborist.collections.SimpleItem.cljs$lang$type = true);

(shadow.arborist.collections.SimpleItem.cljs$lang$ctorStr = "shadow.arborist.collections/SimpleItem");

(shadow.arborist.collections.SimpleItem.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.arborist.collections/SimpleItem");
}));

/**
 * Positional factory function for shadow.arborist.collections/SimpleItem.
 */
shadow.arborist.collections.__GT_SimpleItem = (function shadow$arborist$collections$__GT_SimpleItem(data,managed){
return (new shadow.arborist.collections.SimpleItem(data,managed));
});


/**
* @constructor
 * @implements {shadow.arborist.protocols.IManaged}
*/
shadow.arborist.collections.SimpleCollection = (function (env,coll,render_fn,items,marker_before,marker_after,dom_entered_QMARK_){
this.env = env;
this.coll = coll;
this.render_fn = render_fn;
this.items = items;
this.marker_before = marker_before;
this.marker_after = marker_after;
this.dom_entered_QMARK_ = dom_entered_QMARK_;
});
(shadow.arborist.collections.SimpleCollection.prototype.shadow$arborist$protocols$IManaged$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.arborist.collections.SimpleCollection.prototype.shadow$arborist$protocols$IManaged$dom_first$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.marker_before;
}));

(shadow.arborist.collections.SimpleCollection.prototype.shadow$arborist$protocols$IManaged$dom_insert$arity$3 = (function (this$,parent,anchor){
var self__ = this;
var this$__$1 = this;
parent.insertBefore(self__.marker_before,anchor);

self__.items.forEach((function (item){
return item.managed.shadow$arborist$protocols$IManaged$dom_insert$arity$3(null,parent,anchor);
}));

return parent.insertBefore(self__.marker_after,anchor);
}));

(shadow.arborist.collections.SimpleCollection.prototype.shadow$arborist$protocols$IManaged$dom_entered_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
(self__.dom_entered_QMARK_ = true);

return self__.items.forEach((function (item){
return item.managed.shadow$arborist$protocols$IManaged$dom_entered_BANG_$arity$1(null);
}));
}));

(shadow.arborist.collections.SimpleCollection.prototype.shadow$arborist$protocols$IManaged$supports_QMARK_$arity$2 = (function (this$,next){
var self__ = this;
var this$__$1 = this;
return (next instanceof shadow.arborist.collections.SimpleCollectionInit);
}));

(shadow.arborist.collections.SimpleCollection.prototype.shadow$arborist$protocols$IManaged$dom_sync_BANG_$arity$2 = (function (this$,next){
var self__ = this;
var this$__$1 = this;
var rfn_identical_QMARK__11747 = (self__.render_fn === next.render_fn);
var old_coll_11748 = self__.coll;
var new_coll_11749 = next.coll;
if(((rfn_identical_QMARK__11747) && ((old_coll_11748 === new_coll_11749)))){
} else {
var dom_parent_11750 = self__.marker_after.parentNode;
var oc_11751 = old_coll_11748.cljs$core$ICounted$_count$arity$1(null);
var nc_11752 = new_coll_11749.cljs$core$ICounted$_count$arity$1(null);
var max_idx_11753 = Math.min(oc_11751,nc_11752);
if(cljs.core.truth_(dom_parent_11750)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("sync while not in dom?",cljs.core.PersistentArrayMap.EMPTY);
}

(self__.coll = new_coll_11749);

(self__.render_fn = next.render_fn);

var rfn_11755 = shadow.arborist.common.ifn2_wrap(self__.render_fn);
var n__5636__auto___11756 = max_idx_11753;
var idx_11757 = (0);
while(true){
if((idx_11757 < n__5636__auto___11756)){
var item_11758 = (self__.items[idx_11757]);
var managed_11759 = item_11758.managed;
var new_data_11760 = new_coll_11749.cljs$core$IIndexed$_nth$arity$2(null,idx_11757);
if(((rfn_identical_QMARK__11747) && ((new_data_11760 === item_11758.data)))){
} else {
var new_rendered_11761 = rfn_11755(new_data_11760,idx_11757);
(item_11758.data = new_data_11760);

if(managed_11759.shadow$arborist$protocols$IManaged$supports_QMARK_$arity$2(null,new_rendered_11761)){
managed_11759.shadow$arborist$protocols$IManaged$dom_sync_BANG_$arity$2(null,new_rendered_11761);
} else {
var new_managed_11762 = shadow.arborist.common.replace_managed(self__.env,managed_11759,new_rendered_11761);
if(self__.dom_entered_QMARK_){
shadow.arborist.protocols.dom_entered_BANG_(new_managed_11762);
} else {
}

(item_11758.managed = new_managed_11762);
}
}

var G__11764 = (idx_11757 + (1));
idx_11757 = G__11764;
continue;
} else {
}
break;
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(oc_11751,nc_11752)){
} else {
if((oc_11751 > nc_11752)){
var n__5636__auto___11766 = (oc_11751 - nc_11752);
var idx_11767 = (0);
while(true){
if((idx_11767 < n__5636__auto___11766)){
var idx_11768__$1 = (max_idx_11753 + idx_11767);
var item_11769 = (self__.items[idx_11768__$1]);
item_11769.managed.shadow$arborist$protocols$IManaged$destroy_BANG_$arity$2(null,true);

var G__11770 = (idx_11767 + (1));
idx_11767 = G__11770;
continue;
} else {
}
break;
}

(self__.items.length = max_idx_11753);
} else {
if((oc_11751 < nc_11752)){
var n__5636__auto___11771 = (nc_11752 - oc_11751);
var idx_11772 = (0);
while(true){
if((idx_11772 < n__5636__auto___11771)){
var idx_11773__$1 = (max_idx_11753 + idx_11772);
var data_11774 = new_coll_11749.cljs$core$IIndexed$_nth$arity$2(null,idx_11773__$1);
var rendered_11775 = rfn_11755(data_11774,idx_11773__$1);
var managed_11776 = shadow.arborist.protocols.as_managed(rendered_11775,self__.env);
self__.items.push((new shadow.arborist.collections.SimpleItem(data_11774,managed_11776)));

shadow.arborist.protocols.dom_insert(managed_11776,dom_parent_11750,self__.marker_after);

if(self__.dom_entered_QMARK_){
shadow.arborist.protocols.dom_entered_BANG_(managed_11776);
} else {
}

var G__11778 = (idx_11772 + (1));
idx_11772 = G__11778;
continue;
} else {
}
break;
}
} else {
}
}
}
}

return new cljs.core.Keyword(null,"synced","synced",-1518561120);
}));

(shadow.arborist.collections.SimpleCollection.prototype.shadow$arborist$protocols$IManaged$destroy_BANG_$arity$2 = (function (this$,dom_remove_QMARK_){
var self__ = this;
var this$__$1 = this;
if(dom_remove_QMARK_){
var G__11651_11779 = document.createRange();
G__11651_11779.setStartBefore(self__.marker_before);

G__11651_11779.setEndAfter(self__.marker_after);

G__11651_11779.deleteContents();

} else {
}

return self__.items.forEach((function (item){
return item.managed.shadow$arborist$protocols$IManaged$destroy_BANG_$arity$2(null,false);
}));
}));

(shadow.arborist.collections.SimpleCollection.getBasis = (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"env","env",-175281708,null),cljs.core.with_meta(new cljs.core.Symbol(null,"coll","coll",-1006698606,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"render-fn","render-fn",2039328045,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"function","function",-486723946,null),new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"items","items",-1622480831,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"array","array",-440182315,null),new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),new cljs.core.Symbol(null,"marker-before","marker-before",-198173470,null),new cljs.core.Symbol(null,"marker-after","marker-after",-602144151,null),cljs.core.with_meta(new cljs.core.Symbol(null,"dom-entered?","dom-entered?",962657078,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true,new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"boolean","boolean",-278886877,null)], null))], null);
}));

(shadow.arborist.collections.SimpleCollection.cljs$lang$type = true);

(shadow.arborist.collections.SimpleCollection.cljs$lang$ctorStr = "shadow.arborist.collections/SimpleCollection");

(shadow.arborist.collections.SimpleCollection.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.arborist.collections/SimpleCollection");
}));

/**
 * Positional factory function for shadow.arborist.collections/SimpleCollection.
 */
shadow.arborist.collections.__GT_SimpleCollection = (function shadow$arborist$collections$__GT_SimpleCollection(env,coll,render_fn,items,marker_before,marker_after,dom_entered_QMARK_){
return (new shadow.arborist.collections.SimpleCollection(env,coll,render_fn,items,marker_before,marker_after,dom_entered_QMARK_));
});


/**
* @constructor
 * @implements {cljs.core.IEquiv}
 * @implements {shadow.arborist.protocols.IConstruct}
*/
shadow.arborist.collections.SimpleCollectionInit = (function (coll,render_fn){
this.coll = coll;
this.render_fn = render_fn;
this.cljs$lang$protocol_mask$partition0$ = 2097152;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.arborist.collections.SimpleCollectionInit.prototype.shadow$arborist$protocols$IConstruct$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.arborist.collections.SimpleCollectionInit.prototype.shadow$arborist$protocols$IConstruct$as_managed$arity$2 = (function (this$,env){
var self__ = this;
var this$__$1 = this;
var marker_before = shadow.arborist.common.dom_marker.cljs$core$IFn$_invoke$arity$2(env,"coll-start");
var marker_after = shadow.arborist.common.dom_marker.cljs$core$IFn$_invoke$arity$2(env,"coll-end");
var arr = (new Array(cljs.core.count(self__.coll)));
var rfn = shadow.arborist.common.ifn2_wrap(self__.render_fn);
cljs.core.reduce_kv((function (_,idx,data){
return (arr[idx] = (new shadow.arborist.collections.SimpleItem(data,shadow.arborist.protocols.as_managed((rfn.cljs$core$IFn$_invoke$arity$2 ? rfn.cljs$core$IFn$_invoke$arity$2(data,idx) : rfn.call(null,data,idx)),env))));
}),null,self__.coll);

return (new shadow.arborist.collections.SimpleCollection(env,self__.coll,self__.render_fn,arr,marker_before,marker_after,false));
}));

(shadow.arborist.collections.SimpleCollectionInit.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var self__ = this;
var this$__$1 = this;
return (((other instanceof shadow.arborist.collections.SimpleCollectionInit)) && ((((self__.render_fn === other.render_fn)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.coll,other.coll)))));
}));

(shadow.arborist.collections.SimpleCollectionInit.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"coll","coll",-1006698606,null),new cljs.core.Symbol(null,"render-fn","render-fn",2039328045,null)], null);
}));

(shadow.arborist.collections.SimpleCollectionInit.cljs$lang$type = true);

(shadow.arborist.collections.SimpleCollectionInit.cljs$lang$ctorStr = "shadow.arborist.collections/SimpleCollectionInit");

(shadow.arborist.collections.SimpleCollectionInit.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.arborist.collections/SimpleCollectionInit");
}));

/**
 * Positional factory function for shadow.arborist.collections/SimpleCollectionInit.
 */
shadow.arborist.collections.__GT_SimpleCollectionInit = (function shadow$arborist$collections$__GT_SimpleCollectionInit(coll,render_fn){
return (new shadow.arborist.collections.SimpleCollectionInit(coll,render_fn));
});

shadow.arborist.collections.simple_seq = (function shadow$arborist$collections$simple_seq(coll,render_fn){
if(cljs.core.sequential_QMARK_(coll)){
} else {
throw (new Error("Assert failed: (sequential? coll)"));
}

if(cljs.core.ifn_QMARK_(render_fn)){
} else {
throw (new Error("Assert failed: (ifn? render-fn)"));
}

var coll__$1 = cljs.core.vec(coll);
if((cljs.core.count(coll__$1) === (0))){
return null;
} else {
return (new shadow.arborist.collections.SimpleCollectionInit(coll__$1,render_fn));
}
});

//# sourceMappingURL=shadow.arborist.collections.js.map
