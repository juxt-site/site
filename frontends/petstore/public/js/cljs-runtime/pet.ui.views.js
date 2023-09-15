goog.provide('pet.ui.views');
pet.ui.views.fragment_l16_c4 = (new shadow.arborist.fragments.FragmentCode((function (env12782,vals12783,element_fn12784){
var el0_li = element_fn12784(new cljs.core.Keyword(null,"li","li",723558921));
var el1_div = element_fn12784(new cljs.core.Keyword(null,"div","div",1057191632));
var el2_label = element_fn12784(new cljs.core.Keyword(null,"label","label",1718410804));
var text_12778 = shadow.arborist.fragments.create_text(env12782,"Name: ");
var d4 = shadow.arborist.fragments.managed_create(env12782,(vals12783[0]));
var el5_label = element_fn12784(new cljs.core.Keyword(null,"label","label",1718410804));
var text_12779 = shadow.arborist.fragments.create_text(env12782,"Status: ");
var d7 = shadow.arborist.fragments.managed_create(env12782,(vals12783[1]));
var el8_button = element_fn12784(new cljs.core.Keyword(null,"button","button",1456579943));
shadow.arborist.fragments.append_child(el0_li,el1_div);

shadow.arborist.fragments.set_attr(env12782,el1_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"view");

shadow.arborist.fragments.append_child(el1_div,el2_label);

shadow.arborist.fragments.append_child(el2_label,text_12778);

shadow.arborist.fragments.managed_append(el2_label,d4);

shadow.arborist.fragments.append_child(el1_div,el5_label);

shadow.arborist.fragments.append_child(el5_label,text_12779);

shadow.arborist.fragments.managed_append(el5_label,d7);

shadow.arborist.fragments.append_child(el1_div,el8_button);

shadow.arborist.fragments.set_attr(env12782,el8_button,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,(vals12783[2]));

shadow.arborist.fragments.set_attr(env12782,el8_button,new cljs.core.Keyword(null,"class","class",-2030961996),null,"destroy");

return [el0_li,d4,d7,el8_button];
}),(function (exports12786,parent12787,anchor12788){
return shadow.arborist.fragments.dom_insert_before(parent12787,(exports12786[0]),anchor12788);
}),(function (this12789,env12790,exports12791,oldv12792,newv12793){
shadow.arborist.fragments.update_managed(this12789,env12790,exports12791,1,(oldv12792[0]),(newv12793[0]));

shadow.arborist.fragments.update_managed(this12789,env12790,exports12791,2,(oldv12792[1]),(newv12793[1]));

return shadow.arborist.fragments.update_attr(env12790,exports12791,3,new cljs.core.Keyword(null,"on-click","on-click",1632826543),(oldv12792[2]),(newv12793[2]));
}),(function (env12796,exports12795,oldv12797,dom_remove12798){
if(dom_remove12798){
shadow.arborist.fragments.dom_remove((exports12795[0]));
} else {
}

shadow.arborist.fragments.managed_remove((exports12795[1]),false);

return shadow.arborist.fragments.managed_remove((exports12795[2]),false);
})));

pet.ui.views.pet_item = shadow.grove.components.make_component_config("pet.ui.views/pet-item",[shadow.grove.components.make_hook_config((0),(30),(function (comp12775){
var pet__$1 = shadow.grove.components.get_arg(comp12775,0);
return shadow.grove.query_ident.cljs$core$IFn$_invoke$arity$2(pet__$1,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","pet-name","pet.model/pet-name",327604697),new cljs.core.Keyword("pet.model","pet-status","pet.model/pet-status",-499091780),new cljs.core.Keyword("pet.model","editing?","pet.model/editing?",-1168397610),new cljs.core.Keyword("pet.model","completed?","pet.model/completed?",-500140336)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12775){
var data = shadow.grove.components.get_hook_value(comp12775,(0));
return new cljs.core.Keyword("pet.model","completed?","pet.model/completed?",-500140336).cljs$core$IFn$_invoke$arity$2(data,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12775){
var data = shadow.grove.components.get_hook_value(comp12775,(0));
return new cljs.core.Keyword("pet.model","editing?","pet.model/editing?",-1168397610).cljs$core$IFn$_invoke$arity$2(data,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12775){
var data = shadow.grove.components.get_hook_value(comp12775,(0));
return new cljs.core.Keyword("pet.model","pet-name","pet.model/pet-name",327604697).cljs$core$IFn$_invoke$arity$2(data,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12775){
var data = shadow.grove.components.get_hook_value(comp12775,(0));
return new cljs.core.Keyword("pet.model","pet-status","pet.model/pet-status",-499091780).cljs$core$IFn$_invoke$arity$2(data,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp12775,old12776,new12777){
shadow.grove.components.check_args_BANG_(comp12775,new12777,1);

if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old12776.cljs$core$IIndexed$_nth$arity$2(null,0),new12777.cljs$core$IIndexed$_nth$arity$2(null,0))){
shadow.grove.components.arg_triggers_render_BANG_(comp12775,0);

shadow.grove.components.arg_triggers_hooks_BANG_(comp12775,0,(1));
} else {
}

return null;
}),(24),(function (comp12775){
var pet_name = shadow.grove.components.get_hook_value(comp12775,(3));
var pet_status = shadow.grove.components.get_hook_value(comp12775,(4));
var pet__$1 = shadow.grove.components.get_arg(comp12775,0);
return shadow.arborist.fragments.fragment_init([pet_name,pet_status,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","delete-handler!","pet.model/delete-handler!",1923428943),new cljs.core.Keyword(null,"pet","pet",-1587748619),pet__$1], null)],null,pet.ui.views.fragment_l16_c4);
}),cljs.core.PersistentArrayMap.EMPTY);
pet.ui.views.fragment_l34_c5 = (new shadow.arborist.fragments.FragmentCode((function (env12803,vals12804,element_fn12805){
var el0_ul = element_fn12805(new cljs.core.Keyword(null,"ul","ul",-1349521403));
var d1 = shadow.arborist.fragments.managed_create(env12803,(vals12804[0]));
shadow.arborist.fragments.set_attr(env12803,el0_ul,new cljs.core.Keyword(null,"class","class",-2030961996),null,"filters");

shadow.arborist.fragments.managed_append(el0_ul,d1);

return [el0_ul,d1];
}),(function (exports12807,parent12808,anchor12809){
return shadow.arborist.fragments.dom_insert_before(parent12808,(exports12807[0]),anchor12809);
}),(function (this12810,env12811,exports12812,oldv12813,newv12814){
return shadow.arborist.fragments.update_managed(this12810,env12811,exports12812,1,(oldv12813[0]),(newv12814[0]));
}),(function (env12817,exports12816,oldv12818,dom_remove12819){
if(dom_remove12819){
shadow.arborist.fragments.dom_remove((exports12816[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports12816[1]),false);
})));

pet.ui.views.fragment_l37_c14 = (new shadow.arborist.fragments.FragmentCode((function (env12825,vals12826,element_fn12827){
var el0_li = element_fn12827(new cljs.core.Keyword(null,"li","li",723558921));
var el1_a = element_fn12827(new cljs.core.Keyword(null,"a","a",-2123407586));
var d2 = shadow.arborist.fragments.managed_create(env12825,(vals12826[2]));
shadow.arborist.fragments.append_child(el0_li,el1_a);

shadow.arborist.fragments.set_attr(env12825,el1_a,new cljs.core.Keyword(null,"class","class",-2030961996),null,(vals12826[0]));

shadow.arborist.fragments.set_attr(env12825,el1_a,new cljs.core.Keyword("ui","href","ui/href",-793802206),null,(vals12826[1]));

shadow.arborist.fragments.managed_append(el1_a,d2);

return [el0_li,el1_a,d2];
}),(function (exports12829,parent12830,anchor12831){
return shadow.arborist.fragments.dom_insert_before(parent12830,(exports12829[0]),anchor12831);
}),(function (this12832,env12833,exports12834,oldv12835,newv12836){
shadow.arborist.fragments.update_attr(env12833,exports12834,1,new cljs.core.Keyword(null,"class","class",-2030961996),(oldv12835[0]),(newv12836[0]));

shadow.arborist.fragments.update_attr(env12833,exports12834,1,new cljs.core.Keyword("ui","href","ui/href",-793802206),(oldv12835[1]),(newv12836[1]));

return shadow.arborist.fragments.update_managed(this12832,env12833,exports12834,2,(oldv12835[2]),(newv12836[2]));
}),(function (env12839,exports12838,oldv12840,dom_remove12841){
if(dom_remove12841){
shadow.arborist.fragments.dom_remove((exports12838[0]));
} else {
}

shadow.arborist.fragments.clear_attr(env12839,exports12838,1,new cljs.core.Keyword("ui","href","ui/href",-793802206),(oldv12840[1]));

return shadow.arborist.fragments.managed_remove((exports12838[2]),false);
})));

pet.ui.views.ui_filter_select = shadow.grove.components.make_component_config("pet.ui.views/ui-filter-select",[shadow.grove.components.make_hook_config((0),(2),(function (comp12799){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","current-filter","pet.model/current-filter",-2083944763)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12799){
var __hook$0 = shadow.grove.components.get_hook_value(comp12799,(0));
return new cljs.core.Keyword("pet.model","current-filter","pet.model/current-filter",-2083944763).cljs$core$IFn$_invoke$arity$2(__hook$0,null);
})),shadow.grove.components.make_hook_config((0),(0),(function (comp12799){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"All",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"all","all",892129742)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Active",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"active","active",1895962068)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Completed",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"completed","completed",-486056503)], null)], null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp12799,old12800,new12801){
shadow.grove.components.check_args_BANG_(comp12799,new12801,0);

return null;
}),(6),(function (comp12799){
var filter_options = shadow.grove.components.get_hook_value(comp12799,(2));
var current_filter = shadow.grove.components.get_hook_value(comp12799,(1));
return shadow.arborist.fragments.fragment_init([shadow.grove.keyed_seq(filter_options,new cljs.core.Keyword(null,"value","value",305978217),(function (p__12820){
var map__12821 = p__12820;
var map__12821__$1 = cljs.core.__destructure_map(map__12821);
var label = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12821__$1,new cljs.core.Keyword(null,"label","label",1718410804));
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12821__$1,new cljs.core.Keyword(null,"value","value",305978217));
return shadow.arborist.fragments.fragment_init([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selected","selected",574897764),cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_filter,value)], null),["/",cljs.core.name(value)].join(''),label],null,pet.ui.views.fragment_l37_c14);
}))],null,pet.ui.views.fragment_l34_c5);
}),cljs.core.PersistentArrayMap.EMPTY);
pet.ui.views.fragment_l48_c5 = (new shadow.arborist.fragments.FragmentCode((function (env12846,vals12847,element_fn12848){
var el0_ul = element_fn12848(new cljs.core.Keyword(null,"ul","ul",-1349521403));
var d1 = shadow.arborist.fragments.managed_create(env12846,(vals12847[0]));
shadow.arborist.fragments.set_attr(env12846,el0_ul,new cljs.core.Keyword(null,"class","class",-2030961996),null,"pet-list");

shadow.arborist.fragments.managed_append(el0_ul,d1);

return [el0_ul,d1];
}),(function (exports12850,parent12851,anchor12852){
return shadow.arborist.fragments.dom_insert_before(parent12851,(exports12850[0]),anchor12852);
}),(function (this12853,env12854,exports12855,oldv12856,newv12857){
return shadow.arborist.fragments.update_managed(this12853,env12854,exports12855,1,(oldv12856[0]),(newv12857[0]));
}),(function (env12860,exports12859,oldv12861,dom_remove12862){
if(dom_remove12862){
shadow.arborist.fragments.dom_remove((exports12859[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports12859[1]),false);
})));

pet.ui.views.ui_pet_list = shadow.grove.components.make_component_config("pet.ui.views/ui-pet-list",[shadow.grove.components.make_hook_config((0),(2),(function (comp12842){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","filtered-pets","pet.model/filtered-pets",803039257)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12842){
var query = shadow.grove.components.get_hook_value(comp12842,(0));
return new cljs.core.Keyword("pet.model","filtered-pets","pet.model/filtered-pets",803039257).cljs$core$IFn$_invoke$arity$2(query,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp12842,old12843,new12844){
shadow.grove.components.check_args_BANG_(comp12842,new12844,0);

return null;
}),(2),(function (comp12842){
var filtered_pets = shadow.grove.components.get_hook_value(comp12842,(1));
return shadow.arborist.fragments.fragment_init([shadow.grove.keyed_seq(filtered_pets,cljs.core.identity,pet.ui.views.pet_item)],null,pet.ui.views.fragment_l48_c5);
}),cljs.core.PersistentArrayMap.EMPTY);
pet.ui.views.fragment_l56_c6 = (new shadow.arborist.fragments.FragmentCode((function (env12870,vals12871,element_fn12872){
var el0_nav = element_fn12872(new cljs.core.Keyword(null,"nav","nav",719540477));
var el1_a = element_fn12872(new cljs.core.Keyword(null,"a","a",-2123407586));
var text_12866 = shadow.arborist.fragments.create_text(env12870,"LOG OUT");
var el3_a = element_fn12872(new cljs.core.Keyword(null,"a","a",-2123407586));
var text_12867 = shadow.arborist.fragments.create_text(env12870,"PETS");
var el5_a = element_fn12872(new cljs.core.Keyword(null,"a","a",-2123407586));
var text_12868 = shadow.arborist.fragments.create_text(env12870,"WHOAMI");
shadow.arborist.fragments.set_attr(env12870,el0_nav,new cljs.core.Keyword(null,"class","class",-2030961996),null,"nabar");

shadow.arborist.fragments.append_child(el0_nav,el1_a);

shadow.arborist.fragments.set_attr(env12870,el1_a,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","login-toggle!","pet.model/login-toggle!",-124906044)], null));

shadow.arborist.fragments.set_attr(env12870,el1_a,new cljs.core.Keyword(null,"class","class",-2030961996),null,"login");

shadow.arborist.fragments.append_child(el1_a,text_12866);

shadow.arborist.fragments.append_child(el0_nav,el3_a);

shadow.arborist.fragments.set_attr(env12870,el3_a,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","change-route!","pet.model/change-route!",1457742632),new cljs.core.Keyword(null,"route","route",329891309),"/"], null));

shadow.arborist.fragments.set_attr(env12870,el3_a,new cljs.core.Keyword(null,"class","class",-2030961996),null,"login");

shadow.arborist.fragments.append_child(el3_a,text_12867);

shadow.arborist.fragments.append_child(el0_nav,el5_a);

shadow.arborist.fragments.set_attr(env12870,el5_a,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","change-route!","pet.model/change-route!",1457742632),new cljs.core.Keyword(null,"route","route",329891309),"/whoami"], null));

shadow.arborist.fragments.set_attr(env12870,el5_a,new cljs.core.Keyword(null,"class","class",-2030961996),null,"login");

shadow.arborist.fragments.append_child(el5_a,text_12868);

return [el0_nav];
}),(function (exports12874,parent12875,anchor12876){
return shadow.arborist.fragments.dom_insert_before(parent12875,(exports12874[0]),anchor12876);
}),(function (this12877,env12878,exports12879,oldv12880,newv12881){
return null;
}),(function (env12884,exports12883,oldv12885,dom_remove12886){
if(dom_remove12886){
return shadow.arborist.fragments.dom_remove((exports12883[0]));
} else {
return null;
}
})));

pet.ui.views.fragment_l64_c6 = (new shadow.arborist.fragments.FragmentCode((function (env12889,vals12890,element_fn12891){
var el0_nav = element_fn12891(new cljs.core.Keyword(null,"nav","nav",719540477));
var el1_a = element_fn12891(new cljs.core.Keyword(null,"a","a",-2123407586));
var text_12887 = shadow.arborist.fragments.create_text(env12889,"LOG IN");
shadow.arborist.fragments.set_attr(env12889,el0_nav,new cljs.core.Keyword(null,"class","class",-2030961996),null,"nabar");

shadow.arborist.fragments.append_child(el0_nav,el1_a);

shadow.arborist.fragments.set_attr(env12889,el1_a,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","change-route!","pet.model/change-route!",1457742632),new cljs.core.Keyword(null,"route","route",329891309),"/login"], null));

shadow.arborist.fragments.set_attr(env12889,el1_a,new cljs.core.Keyword(null,"class","class",-2030961996),null,"login");

shadow.arborist.fragments.append_child(el1_a,text_12887);

return [el0_nav];
}),(function (exports12893,parent12894,anchor12895){
return shadow.arborist.fragments.dom_insert_before(parent12894,(exports12893[0]),anchor12895);
}),(function (this12896,env12897,exports12898,oldv12899,newv12900){
return null;
}),(function (env12903,exports12902,oldv12904,dom_remove12905){
if(dom_remove12905){
return shadow.arborist.fragments.dom_remove((exports12902[0]));
} else {
return null;
}
})));

pet.ui.views.navbar = shadow.grove.components.make_component_config("pet.ui.views/navbar",[shadow.grove.components.make_hook_config((0),(2),(function (comp12863){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","logged-in","pet.model/logged-in",1179984977)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12863){
var query = shadow.grove.components.get_hook_value(comp12863,(0));
return new cljs.core.Keyword("pet.model","logged-in","pet.model/logged-in",1179984977).cljs$core$IFn$_invoke$arity$2(query,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp12863,old12864,new12865){
shadow.grove.components.check_args_BANG_(comp12863,new12865,0);

return null;
}),(2),(function (comp12863){
var logged_in = shadow.grove.components.get_hook_value(comp12863,(1));
if(cljs.core.truth_(logged_in)){
return shadow.arborist.fragments.fragment_init([],null,pet.ui.views.fragment_l56_c6);
} else {
return shadow.arborist.fragments.fragment_init([],null,pet.ui.views.fragment_l64_c6);
}
}),cljs.core.PersistentArrayMap.EMPTY);
pet.ui.views.fragment_l73_c4 = (new shadow.arborist.fragments.FragmentCode((function (env12912,vals12913,element_fn12914){
var el0_div = element_fn12914(new cljs.core.Keyword(null,"div","div",1057191632));
var el1_h2 = element_fn12914(new cljs.core.Keyword(null,"h2","h2",-372662728));
var d2 = shadow.arborist.fragments.managed_create(env12912,(vals12913[0]));
var el3_h3 = element_fn12914(new cljs.core.Keyword(null,"h3","h3",2067611163));
var text_12909 = shadow.arborist.fragments.create_text(env12912,"Roles");
var d5 = shadow.arborist.fragments.managed_create(env12912,(vals12913[1]));
var el6_h3 = element_fn12914(new cljs.core.Keyword(null,"h3","h3",2067611163));
var text_12910 = shadow.arborist.fragments.create_text(env12912,"Permissions");
var d8 = shadow.arborist.fragments.managed_create(env12912,(vals12913[2]));
shadow.arborist.fragments.set_attr(env12912,el0_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"pet-view");

shadow.arborist.fragments.append_child(el0_div,el1_h2);

shadow.arborist.fragments.managed_append(el1_h2,d2);

shadow.arborist.fragments.append_child(el0_div,el3_h3);

shadow.arborist.fragments.append_child(el3_h3,text_12909);

shadow.arborist.fragments.managed_append(el0_div,d5);

shadow.arborist.fragments.append_child(el0_div,el6_h3);

shadow.arborist.fragments.append_child(el6_h3,text_12910);

shadow.arborist.fragments.managed_append(el0_div,d8);

return [el0_div,d2,d5,d8];
}),(function (exports12916,parent12917,anchor12918){
return shadow.arborist.fragments.dom_insert_before(parent12917,(exports12916[0]),anchor12918);
}),(function (this12919,env12920,exports12921,oldv12922,newv12923){
shadow.arborist.fragments.update_managed(this12919,env12920,exports12921,1,(oldv12922[0]),(newv12923[0]));

shadow.arborist.fragments.update_managed(this12919,env12920,exports12921,2,(oldv12922[1]),(newv12923[1]));

return shadow.arborist.fragments.update_managed(this12919,env12920,exports12921,3,(oldv12922[2]),(newv12923[2]));
}),(function (env12926,exports12925,oldv12927,dom_remove12928){
if(dom_remove12928){
shadow.arborist.fragments.dom_remove((exports12925[0]));
} else {
}

shadow.arborist.fragments.managed_remove((exports12925[1]),false);

shadow.arborist.fragments.managed_remove((exports12925[2]),false);

return shadow.arborist.fragments.managed_remove((exports12925[3]),false);
})));

pet.ui.views.fragment_l79_c22 = (new shadow.arborist.fragments.FragmentCode((function (env12930,vals12931,element_fn12932){
var el0_li = element_fn12932(new cljs.core.Keyword(null,"li","li",723558921));
var d1 = shadow.arborist.fragments.managed_create(env12930,(vals12931[0]));
shadow.arborist.fragments.managed_append(el0_li,d1);

return [el0_li,d1];
}),(function (exports12934,parent12935,anchor12936){
return shadow.arborist.fragments.dom_insert_before(parent12935,(exports12934[0]),anchor12936);
}),(function (this12937,env12938,exports12939,oldv12940,newv12941){
return shadow.arborist.fragments.update_managed(this12937,env12938,exports12939,1,(oldv12940[0]),(newv12941[0]));
}),(function (env12944,exports12943,oldv12945,dom_remove12946){
if(dom_remove12946){
shadow.arborist.fragments.dom_remove((exports12943[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports12943[1]),false);
})));

pet.ui.views.fragment_l84_c22 = (new shadow.arborist.fragments.FragmentCode((function (env12948,vals12949,element_fn12950){
var el0_li = element_fn12950(new cljs.core.Keyword(null,"li","li",723558921));
var d1 = shadow.arborist.fragments.managed_create(env12948,(vals12949[0]));
shadow.arborist.fragments.managed_append(el0_li,d1);

return [el0_li,d1];
}),(function (exports12952,parent12953,anchor12954){
return shadow.arborist.fragments.dom_insert_before(parent12953,(exports12952[0]),anchor12954);
}),(function (this12955,env12956,exports12957,oldv12958,newv12959){
return shadow.arborist.fragments.update_managed(this12955,env12956,exports12957,1,(oldv12958[0]),(newv12959[0]));
}),(function (env12962,exports12961,oldv12963,dom_remove12964){
if(dom_remove12964){
shadow.arborist.fragments.dom_remove((exports12961[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports12961[1]),false);
})));

pet.ui.views.whoami = shadow.grove.components.make_component_config("pet.ui.views/whoami",[shadow.grove.components.make_hook_config((0),(2),(function (comp12906){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","whoami","pet.model/whoami",-1166872991)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12906){
var query = shadow.grove.components.get_hook_value(comp12906,(0));
return new cljs.core.Keyword("pet.model","whoami","pet.model/whoami",-1166872991).cljs$core$IFn$_invoke$arity$2(query,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp12906,old12907,new12908){
shadow.grove.components.check_args_BANG_(comp12906,new12908,0);

return null;
}),(2),(function (comp12906){
var whoami = shadow.grove.components.get_hook_value(comp12906,(1));
return shadow.arborist.fragments.fragment_init([cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("juxt.site","user","juxt.site/user",-1099199318).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("juxt.site","subject","juxt.site/subject",-1761809841).cljs$core$IFn$_invoke$arity$1(whoami))),shadow.grove.simple_seq(new cljs.core.Keyword("juxt.site","roles","juxt.site/roles",-1112975592).cljs$core$IFn$_invoke$arity$1(whoami),(function (item){
return shadow.arborist.fragments.fragment_init([cljs.core.str.cljs$core$IFn$_invoke$arity$1(item)],null,pet.ui.views.fragment_l79_c22);
})),shadow.grove.keyed_seq(new cljs.core.Keyword("juxt.site","permitted-operations","juxt.site/permitted-operations",183409044).cljs$core$IFn$_invoke$arity$1(whoami),new cljs.core.Keyword("juxt.site","operation-ref","juxt.site/operation-ref",1192020725),(function (item){
return shadow.arborist.fragments.fragment_init([cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("juxt.site","operation-ref","juxt.site/operation-ref",1192020725).cljs$core$IFn$_invoke$arity$1(item))],null,pet.ui.views.fragment_l84_c22);
}))],null,pet.ui.views.fragment_l73_c4);
}),cljs.core.PersistentArrayMap.EMPTY);
pet.ui.views.fragment_l107_c6 = (new shadow.arborist.fragments.FragmentCode((function (env12978,vals12979,element_fn12980){
var el0_div = element_fn12980(new cljs.core.Keyword(null,"div","div",1057191632));
var el1_input = element_fn12980(new cljs.core.Keyword(null,"input","input",556931961));
var el2_form = element_fn12980(new cljs.core.Keyword(null,"form","form",-1624062471));
var el3_input = element_fn12980(new cljs.core.Keyword(null,"input","input",556931961));
var el4_select = element_fn12980(new cljs.core.Keyword(null,"select","select",1147833503));
var el5_option = element_fn12980(new cljs.core.Keyword(null,"option","option",65132272));
var text_12974 = shadow.arborist.fragments.create_text(env12978,"available");
var el7_option = element_fn12980(new cljs.core.Keyword(null,"option","option",65132272));
var text_12975 = shadow.arborist.fragments.create_text(env12978,"pending");
var el9_option = element_fn12980(new cljs.core.Keyword(null,"option","option",65132272));
var text_12976 = shadow.arborist.fragments.create_text(env12978,"sold");
var el11_input = element_fn12980(new cljs.core.Keyword(null,"input","input",556931961));
var d12 = shadow.arborist.fragments.managed_create(env12978,(vals12979[0]));
shadow.arborist.fragments.set_attr(env12978,el0_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"pet-view");

shadow.arborist.fragments.append_child(el0_div,el1_input);

shadow.arborist.fragments.set_attr(env12978,el1_input,new cljs.core.Keyword(null,"type","type",1174270348),null,"button");

shadow.arborist.fragments.set_attr(env12978,el1_input,new cljs.core.Keyword(null,"value","value",305978217),null,"Sync with DB");

shadow.arborist.fragments.set_attr(env12978,el1_input,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","refresh-pets-handler!","pet.model/refresh-pets-handler!",-282146106)], null));

shadow.arborist.fragments.append_child(el0_div,el2_form);

shadow.arborist.fragments.set_attr(env12978,el2_form,new cljs.core.Keyword(null,"class","class",-2030961996),null,"pet-form");

shadow.arborist.fragments.append_child(el2_form,el3_input);

shadow.arborist.fragments.set_attr(env12978,el3_input,new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),null,"Pet Name");

shadow.arborist.fragments.set_attr(env12978,el3_input,new cljs.core.Keyword(null,"autofocus","autofocus",-712814732),null,true);

shadow.arborist.fragments.set_attr(env12978,el3_input,new cljs.core.Keyword(null,"required","required",1807647006),null,true);

shadow.arborist.fragments.set_attr(env12978,el3_input,new cljs.core.Keyword(null,"class","class",-2030961996),null,"new-pet");

shadow.arborist.fragments.append_child(el2_form,el4_select);

shadow.arborist.fragments.set_attr(env12978,el4_select,new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),null,"Pet Status");

shadow.arborist.fragments.set_attr(env12978,el4_select,new cljs.core.Keyword(null,"autofocus","autofocus",-712814732),null,true);

shadow.arborist.fragments.set_attr(env12978,el4_select,new cljs.core.Keyword(null,"class","class",-2030961996),null,"new-pet");

shadow.arborist.fragments.append_child(el4_select,el5_option);

shadow.arborist.fragments.append_child(el5_option,text_12974);

shadow.arborist.fragments.append_child(el4_select,el7_option);

shadow.arborist.fragments.append_child(el7_option,text_12975);

shadow.arborist.fragments.append_child(el4_select,el9_option);

shadow.arborist.fragments.append_child(el9_option,text_12976);

shadow.arborist.fragments.append_child(el2_form,el11_input);

shadow.arborist.fragments.set_attr(env12978,el11_input,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","create-new!","pet.model/create-new!",-309029761)], null));

shadow.arborist.fragments.set_attr(env12978,el11_input,new cljs.core.Keyword(null,"autofocus","autofocus",-712814732),null,true);

shadow.arborist.fragments.set_attr(env12978,el11_input,new cljs.core.Keyword(null,"type","type",1174270348),null,"submit");

shadow.arborist.fragments.set_attr(env12978,el11_input,new cljs.core.Keyword(null,"value","value",305978217),null,"Submit");

shadow.arborist.fragments.set_attr(env12978,el11_input,new cljs.core.Keyword(null,"class","class",-2030961996),null,"submit-pet");

shadow.arborist.fragments.managed_append(el0_div,d12);

return [el0_div,d12];
}),(function (exports12982,parent12983,anchor12984){
return shadow.arborist.fragments.dom_insert_before(parent12983,(exports12982[0]),anchor12984);
}),(function (this12985,env12986,exports12987,oldv12988,newv12989){
return shadow.arborist.fragments.update_managed(this12985,env12986,exports12987,1,(oldv12988[0]),(newv12989[0]));
}),(function (env12992,exports12991,oldv12993,dom_remove12994){
if(dom_remove12994){
shadow.arborist.fragments.dom_remove((exports12991[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports12991[1]),false);
})));

pet.ui.views.fragment_l126_c10 = (new shadow.arborist.fragments.FragmentCode((function (env12996,vals12997,element_fn12998){
var el0_section = element_fn12998(new cljs.core.Keyword(null,"section","section",-300141526));
var d1 = shadow.arborist.fragments.managed_create(env12996,(vals12997[0]));
shadow.arborist.fragments.set_attr(env12996,el0_section,new cljs.core.Keyword(null,"class","class",-2030961996),null,"main");

shadow.arborist.fragments.managed_append(el0_section,d1);

return [el0_section,d1];
}),(function (exports13000,parent13001,anchor13002){
return shadow.arborist.fragments.dom_insert_before(parent13001,(exports13000[0]),anchor13002);
}),(function (this13003,env13004,exports13005,oldv13006,newv13007){
return shadow.arborist.fragments.update_managed(this13003,env13004,exports13005,1,(oldv13006[0]),(newv13007[0]));
}),(function (env13010,exports13009,oldv13011,dom_remove13012){
if(dom_remove13012){
shadow.arborist.fragments.dom_remove((exports13009[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports13009[1]),false);
})));

pet.ui.views.fragment_l129_c6 = (new shadow.arborist.fragments.FragmentCode((function (env13015,vals13016,element_fn13017){
var el0_div = element_fn13017(new cljs.core.Keyword(null,"div","div",1057191632));
var el1_h2 = element_fn13017(new cljs.core.Keyword(null,"h2","h2",-372662728));
var text_13013 = shadow.arborist.fragments.create_text(env13015,"You do not have permission to view this page");
shadow.arborist.fragments.set_attr(env13015,el0_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"pet-view");

shadow.arborist.fragments.append_child(el0_div,el1_h2);

shadow.arborist.fragments.append_child(el1_h2,text_13013);

return [el0_div];
}),(function (exports13019,parent13020,anchor13021){
return shadow.arborist.fragments.dom_insert_before(parent13020,(exports13019[0]),anchor13021);
}),(function (this13022,env13023,exports13024,oldv13025,newv13026){
return null;
}),(function (env13029,exports13028,oldv13030,dom_remove13031){
if(dom_remove13031){
return shadow.arborist.fragments.dom_remove((exports13028[0]));
} else {
return null;
}
})));

pet.ui.views.pets = shadow.grove.components.make_component_config("pet.ui.views/pets",[shadow.grove.components.make_hook_config((0),(62),(function (comp12965){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","editing","pet.model/editing",-200754725),new cljs.core.Keyword("pet.model","num-total","pet.model/num-total",321749835),new cljs.core.Keyword("pet.model","num-active","pet.model/num-active",-1036825883),new cljs.core.Keyword("pet.model","num-completed","pet.model/num-completed",595162868),new cljs.core.Keyword("pet.model","route","pet.model/route",-88160937),new cljs.core.Keyword("pet.model","logged-in","pet.model/logged-in",1179984977)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12965){
var query = shadow.grove.components.get_hook_value(comp12965,(0));
return new cljs.core.Keyword("pet.model","num-total","pet.model/num-total",321749835).cljs$core$IFn$_invoke$arity$2(query,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12965){
var query = shadow.grove.components.get_hook_value(comp12965,(0));
return new cljs.core.Keyword("pet.model","num-active","pet.model/num-active",-1036825883).cljs$core$IFn$_invoke$arity$2(query,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12965){
var query = shadow.grove.components.get_hook_value(comp12965,(0));
return new cljs.core.Keyword("pet.model","num-completed","pet.model/num-completed",595162868).cljs$core$IFn$_invoke$arity$2(query,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12965){
var query = shadow.grove.components.get_hook_value(comp12965,(0));
return new cljs.core.Keyword("pet.model","route","pet.model/route",-88160937).cljs$core$IFn$_invoke$arity$2(query,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12965){
var query = shadow.grove.components.get_hook_value(comp12965,(0));
return new cljs.core.Keyword("pet.model","logged-in","pet.model/logged-in",1179984977).cljs$core$IFn$_invoke$arity$2(query,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp12965,old12966,new12967){
shadow.grove.components.check_args_BANG_(comp12965,new12967,0);

return null;
}),(34),(function (comp12965){
var num_total = shadow.grove.components.get_hook_value(comp12965,(1));
var logged_in = shadow.grove.components.get_hook_value(comp12965,(5));
if(cljs.core.truth_(logged_in)){
return shadow.arborist.fragments.fragment_init([(((num_total > (0)))?shadow.arborist.fragments.fragment_init([pet.ui.views.ui_pet_list.cljs$core$IFn$_invoke$arity$0()],null,pet.ui.views.fragment_l126_c10):null)],null,pet.ui.views.fragment_l107_c6);
} else {
return shadow.arborist.fragments.fragment_init([],null,pet.ui.views.fragment_l129_c6);
}
}),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("pet.model","create-new!","pet.model/create-new!",-309029761),(function (env,_,e){
var vec__13032_13091 = e.target.form;
var seq__13033_13092 = cljs.core.seq(vec__13032_13091);
var first__13034_13093 = cljs.core.first(seq__13033_13092);
var seq__13033_13094__$1 = cljs.core.next(seq__13033_13092);
var name_13095 = first__13034_13093;
var first__13034_13096__$1 = cljs.core.first(seq__13033_13094__$1);
var seq__13033_13097__$2 = cljs.core.next(seq__13033_13094__$1);
var status_13098 = first__13034_13096__$1;
var __13099__$1 = seq__13033_13097__$2;
console.log(name_13095);

shadow.grove.run_tx(env,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","create-new!","pet.model/create-new!",-309029761),new cljs.core.Keyword("pet.model","pet-name","pet.model/pet-name",327604697),name_13095.value,new cljs.core.Keyword("pet.model","pet-status","pet.model/pet-status",-499091780),status_13098.value], null));

return null;
}),new cljs.core.Keyword("pet.model","toggle-all!","pet.model/toggle-all!",999464727),(function (env,_,e){
shadow.grove.run_tx(env,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","toggle-all!","pet.model/toggle-all!",999464727),new cljs.core.Keyword(null,"completed?","completed?",946828354),e.target.checked], null));

return null;
})], null));
pet.ui.views.fragment_l145_c4 = (new shadow.arborist.fragments.FragmentCode((function (env13046,vals13047,element_fn13048){
var el0_div = element_fn13048(new cljs.core.Keyword(null,"div","div",1057191632));
var el1_h2 = element_fn13048(new cljs.core.Keyword(null,"h2","h2",-372662728));
var text_13041 = shadow.arborist.fragments.create_text(env13046,"This app wants to authorise Site");
var el3_h3 = element_fn13048(new cljs.core.Keyword(null,"h3","h3",2067611163));
var text_13042 = shadow.arborist.fragments.create_text(env13046,"Select the scopes you wish to allow");
var el5_form = element_fn13048(new cljs.core.Keyword(null,"form","form",-1624062471));
var el6_div = element_fn13048(new cljs.core.Keyword(null,"div","div",1057191632));
var el7_input = element_fn13048(new cljs.core.Keyword(null,"input","input",556931961));
var el8_label = element_fn13048(new cljs.core.Keyword(null,"label","label",1718410804));
var text_13043 = shadow.arborist.fragments.create_text(env13046,"read pets");
var el10_div = element_fn13048(new cljs.core.Keyword(null,"div","div",1057191632));
var el11_input = element_fn13048(new cljs.core.Keyword(null,"input","input",556931961));
var el12_label = element_fn13048(new cljs.core.Keyword(null,"label","label",1718410804));
var text_13044 = shadow.arborist.fragments.create_text(env13046,"write pets");
var el14_input = element_fn13048(new cljs.core.Keyword(null,"input","input",556931961));
shadow.arborist.fragments.set_attr(env13046,el0_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"pet-view");

shadow.arborist.fragments.append_child(el0_div,el1_h2);

shadow.arborist.fragments.append_child(el1_h2,text_13041);

shadow.arborist.fragments.append_child(el0_div,el3_h3);

shadow.arborist.fragments.append_child(el3_h3,text_13042);

shadow.arborist.fragments.append_child(el0_div,el5_form);

shadow.arborist.fragments.set_attr(env13046,el5_form,new cljs.core.Keyword(null,"class","class",-2030961996),null,"auth-form");

shadow.arborist.fragments.append_child(el5_form,el6_div);

shadow.arborist.fragments.set_attr(env13046,el6_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"column-override");

shadow.arborist.fragments.append_child(el6_div,el7_input);

shadow.arborist.fragments.set_attr(env13046,el7_input,new cljs.core.Keyword(null,"type","type",1174270348),null,"checkbox");

shadow.arborist.fragments.set_attr(env13046,el7_input,new cljs.core.Keyword(null,"value","value",305978217),null,"read");

shadow.arborist.fragments.set_attr(env13046,el7_input,new cljs.core.Keyword(null,"id","id",-1388402092),null,"read-1");

shadow.arborist.fragments.append_child(el6_div,el8_label);

shadow.arborist.fragments.set_attr(env13046,el8_label,new cljs.core.Keyword(null,"for","for",-1323786319),null,"read-1");

shadow.arborist.fragments.append_child(el8_label,text_13043);

shadow.arborist.fragments.append_child(el5_form,el10_div);

shadow.arborist.fragments.set_attr(env13046,el10_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"column-override");

shadow.arborist.fragments.append_child(el10_div,el11_input);

shadow.arborist.fragments.set_attr(env13046,el11_input,new cljs.core.Keyword(null,"type","type",1174270348),null,"checkbox");

shadow.arborist.fragments.set_attr(env13046,el11_input,new cljs.core.Keyword(null,"value","value",305978217),null,"write");

shadow.arborist.fragments.set_attr(env13046,el11_input,new cljs.core.Keyword(null,"id","id",-1388402092),null,"write-1");

shadow.arborist.fragments.append_child(el10_div,el12_label);

shadow.arborist.fragments.set_attr(env13046,el12_label,new cljs.core.Keyword(null,"for","for",-1323786319),null,"write-1");

shadow.arborist.fragments.append_child(el12_label,text_13044);

shadow.arborist.fragments.append_child(el5_form,el14_input);

shadow.arborist.fragments.set_attr(env13046,el14_input,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","login-toggle!","pet.model/login-toggle!",-124906044)], null));

shadow.arborist.fragments.set_attr(env13046,el14_input,new cljs.core.Keyword(null,"type","type",1174270348),null,"submit");

shadow.arborist.fragments.set_attr(env13046,el14_input,new cljs.core.Keyword(null,"value","value",305978217),null,"authorize");

shadow.arborist.fragments.set_attr(env13046,el14_input,new cljs.core.Keyword(null,"class","class",-2030961996),null,"submit-pet");

return [el0_div];
}),(function (exports13050,parent13051,anchor13052){
return shadow.arborist.fragments.dom_insert_before(parent13051,(exports13050[0]),anchor13052);
}),(function (this13053,env13054,exports13055,oldv13056,newv13057){
return null;
}),(function (env13060,exports13059,oldv13061,dom_remove13062){
if(dom_remove13062){
return shadow.arborist.fragments.dom_remove((exports13059[0]));
} else {
return null;
}
})));

pet.ui.views.login_page = shadow.grove.components.make_component_config("pet.ui.views/login-page",[],cljs.core.PersistentArrayMap.EMPTY,(function (comp13035,old13036,new13037){
shadow.grove.components.check_args_BANG_(comp13035,new13037,0);

return null;
}),(0),(function (comp13035){
return shadow.arborist.fragments.fragment_init([],null,pet.ui.views.fragment_l145_c4);
}),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("pet.model","login-toggle!","pet.model/login-toggle!",-124906044),(function (env,_,e){
var vec__13063_13100 = e.target.form;
var seq__13064_13101 = cljs.core.seq(vec__13063_13100);
var first__13065_13102 = cljs.core.first(seq__13064_13101);
var seq__13064_13103__$1 = cljs.core.next(seq__13064_13101);
var read_13104 = first__13065_13102;
var first__13065_13105__$1 = cljs.core.first(seq__13064_13103__$1);
var seq__13064_13106__$2 = cljs.core.next(seq__13064_13103__$1);
var write_13107 = first__13065_13105__$1;
var __13108__$1 = seq__13064_13106__$2;
console.log(["READ ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(read_13104.checked),"\n","WRITE ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(write_13107.checked)].join(''));

shadow.grove.run_tx(env,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","login-toggle!","pet.model/login-toggle!",-124906044),new cljs.core.Keyword("pet.model","read","pet.model/read",715584447),read_13104.checked,new cljs.core.Keyword("pet.model","write","pet.model/write",-927887002),write_13107.checked], null));

shadow.grove.run_tx(env,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","change-route!","pet.model/change-route!",1457742632),new cljs.core.Keyword(null,"route","route",329891309),"/"], null));

return null;
})], null));
pet.ui.views.fragment_l166_c4 = (new shadow.arborist.fragments.FragmentCode((function (env13071,vals13072,element_fn13073){
var d0 = shadow.arborist.fragments.managed_create(env13071,(vals13072[0]));
var el1_header = element_fn13073(new cljs.core.Keyword(null,"header","header",119441134));
var el2_h1 = element_fn13073(new cljs.core.Keyword(null,"h1","h1",-1896887462));
var text_13069 = shadow.arborist.fragments.create_text(env13071,"Petstore");
var d4 = shadow.arborist.fragments.managed_create(env13071,(vals13072[1]));
shadow.arborist.fragments.set_attr(env13071,el1_header,new cljs.core.Keyword(null,"class","class",-2030961996),null,"header");

shadow.arborist.fragments.append_child(el1_header,el2_h1);

shadow.arborist.fragments.append_child(el2_h1,text_13069);

return [d0,el1_header,d4];
}),(function (exports13075,parent13076,anchor13077){
shadow.arborist.fragments.managed_insert((exports13075[0]),parent13076,anchor13077);

shadow.arborist.fragments.dom_insert_before(parent13076,(exports13075[1]),anchor13077);

return shadow.arborist.fragments.managed_insert((exports13075[2]),parent13076,anchor13077);
}),(function (this13078,env13079,exports13080,oldv13081,newv13082){
shadow.arborist.fragments.update_managed(this13078,env13079,exports13080,0,(oldv13081[0]),(newv13082[0]));

return shadow.arborist.fragments.update_managed(this13078,env13079,exports13080,2,(oldv13081[1]),(newv13082[1]));
}),(function (env13085,exports13084,oldv13086,dom_remove13087){
shadow.arborist.fragments.managed_remove((exports13084[0]),dom_remove13087);

if(dom_remove13087){
shadow.arborist.fragments.dom_remove((exports13084[1]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports13084[2]),dom_remove13087);
})));

pet.ui.views.ui_root = shadow.grove.components.make_component_config("pet.ui.views/ui-root",[shadow.grove.components.make_hook_config((0),(2),(function (comp13066){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","route","pet.model/route",-88160937)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp13066){
var query = shadow.grove.components.get_hook_value(comp13066,(0));
return new cljs.core.Keyword("pet.model","route","pet.model/route",-88160937).cljs$core$IFn$_invoke$arity$2(query,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp13066,old13067,new13068){
shadow.grove.components.check_args_BANG_(comp13066,new13068,0);

return null;
}),(2),(function (comp13066){
var route = shadow.grove.components.get_hook_value(comp13066,(1));
return shadow.arborist.fragments.fragment_init([pet.ui.views.navbar.cljs$core$IFn$_invoke$arity$0(),(function (){var G__13088 = route;
switch (G__13088) {
case "/":
return pet.ui.views.pets.cljs$core$IFn$_invoke$arity$0();

break;
case "/login":
return pet.ui.views.login_page.cljs$core$IFn$_invoke$arity$0();

break;
case "/whoami":
return pet.ui.views.whoami.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__13088)].join('')));

}
})()],null,pet.ui.views.fragment_l166_c4);
}),cljs.core.PersistentArrayMap.EMPTY);

//# sourceMappingURL=pet.ui.views.js.map
