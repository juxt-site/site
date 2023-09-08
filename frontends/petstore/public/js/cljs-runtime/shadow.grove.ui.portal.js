goog.provide('shadow.grove.ui.portal');

/**
* @constructor
 * @implements {shadow.arborist.protocols.IManaged}
*/
shadow.grove.ui.portal.PortalNode = (function (env,ref_node,root){
this.env = env;
this.ref_node = ref_node;
this.root = root;
});
(shadow.grove.ui.portal.PortalNode.prototype.shadow$arborist$protocols$IManaged$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.ui.portal.PortalNode.prototype.shadow$arborist$protocols$IManaged$supports_QMARK_$arity$2 = (function (this$,next){
var self__ = this;
var this$__$1 = this;
return (((next instanceof shadow.grove.ui.portal.PortalSeed)) && ((self__.ref_node === next.ref_node)));
}));

(shadow.grove.ui.portal.PortalNode.prototype.shadow$arborist$protocols$IManaged$dom_sync_BANG_$arity$2 = (function (this$,next){
var self__ = this;
var this$__$1 = this;
return shadow.arborist.protocols.update_BANG_(self__.root,next.body);
}));

(shadow.grove.ui.portal.PortalNode.prototype.shadow$arborist$protocols$IManaged$dom_insert$arity$3 = (function (this$,parent,anchor){
var self__ = this;
var this$__$1 = this;
return shadow.arborist.protocols.dom_insert(self__.root,self__.ref_node,null);
}));

(shadow.grove.ui.portal.PortalNode.prototype.shadow$arborist$protocols$IManaged$dom_first$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return shadow.arborist.protocols.dom_first(self__.root);
}));

(shadow.grove.ui.portal.PortalNode.prototype.shadow$arborist$protocols$IManaged$dom_entered_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return shadow.arborist.protocols.dom_entered_BANG_(self__.root);
}));

(shadow.grove.ui.portal.PortalNode.prototype.shadow$arborist$protocols$IManaged$destroy_BANG_$arity$2 = (function (this$,dom_remove_QMARK_){
var self__ = this;
var this$__$1 = this;
return shadow.arborist.protocols.destroy_BANG_(self__.root,true);
}));

(shadow.grove.ui.portal.PortalNode.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"env","env",-175281708,null),new cljs.core.Symbol(null,"ref-node","ref-node",-1075966329,null),new cljs.core.Symbol(null,"root","root",1191874074,null)], null);
}));

(shadow.grove.ui.portal.PortalNode.cljs$lang$type = true);

(shadow.grove.ui.portal.PortalNode.cljs$lang$ctorStr = "shadow.grove.ui.portal/PortalNode");

(shadow.grove.ui.portal.PortalNode.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.ui.portal/PortalNode");
}));

/**
 * Positional factory function for shadow.grove.ui.portal/PortalNode.
 */
shadow.grove.ui.portal.__GT_PortalNode = (function shadow$grove$ui$portal$__GT_PortalNode(env,ref_node,root){
return (new shadow.grove.ui.portal.PortalNode(env,ref_node,root));
});


/**
* @constructor
 * @implements {shadow.arborist.protocols.IConstruct}
*/
shadow.grove.ui.portal.PortalSeed = (function (ref_node,body){
this.ref_node = ref_node;
this.body = body;
});
(shadow.grove.ui.portal.PortalSeed.prototype.shadow$arborist$protocols$IConstruct$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.ui.portal.PortalSeed.prototype.shadow$arborist$protocols$IConstruct$as_managed$arity$2 = (function (this$,env){
var self__ = this;
var this$__$1 = this;
return (new shadow.grove.ui.portal.PortalNode(env,self__.ref_node,(function (){var G__11886 = shadow.arborist.common.managed_root(env);
G__11886.shadow$arborist$protocols$IDirectUpdate$update_BANG_$arity$2(null,self__.body);

return G__11886;
})()));
}));

(shadow.grove.ui.portal.PortalSeed.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ref-node","ref-node",-1075966329,null),new cljs.core.Symbol(null,"body","body",-408674142,null)], null);
}));

(shadow.grove.ui.portal.PortalSeed.cljs$lang$type = true);

(shadow.grove.ui.portal.PortalSeed.cljs$lang$ctorStr = "shadow.grove.ui.portal/PortalSeed");

(shadow.grove.ui.portal.PortalSeed.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.ui.portal/PortalSeed");
}));

/**
 * Positional factory function for shadow.grove.ui.portal/PortalSeed.
 */
shadow.grove.ui.portal.__GT_PortalSeed = (function shadow$grove$ui$portal$__GT_PortalSeed(ref_node,body){
return (new shadow.grove.ui.portal.PortalSeed(ref_node,body));
});

shadow.grove.ui.portal.portal = (function shadow$grove$ui$portal$portal(ref_node,body){
return (new shadow.grove.ui.portal.PortalSeed(ref_node,body));
});

//# sourceMappingURL=shadow.grove.ui.portal.js.map
