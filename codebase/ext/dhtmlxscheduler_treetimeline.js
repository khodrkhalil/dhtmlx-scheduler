/*
@license
dhtmlxScheduler v.4.4.9 Professional

This software is covered by DHTMLX Commercial License. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.attachEvent("onTimelineCreated",function(e){"tree"==e.render&&(e.y_unit_original=e.y_unit,e.y_unit=scheduler._getArrayToDisplay(e.y_unit_original),scheduler.attachEvent("onOptionsLoadStart",function(){e.y_unit=scheduler._getArrayToDisplay(e.y_unit_original)}),scheduler.form_blocks[e.name]={render:function(e){var t="<div class='dhx_section_timeline' style='overflow: hidden; height: "+e.height+"px'></div>";return t},set_value:function(e,t,r,a){var i=scheduler._getArrayForSelect(scheduler.matrix[a.type].y_unit_original,a.type);
e.innerHTML="";var n=document.createElement("select");e.appendChild(n);var s=e.getElementsByTagName("select")[0];!s._dhx_onchange&&a.onchange&&(s.onchange=a.onchange,s._dhx_onchange=!0);for(var d=0;d<i.length;d++){var l=document.createElement("option");l.value=i[d].key,l.value==r[scheduler.matrix[a.type].y_property]&&(l.selected=!0),l.innerHTML=i[d].label,s.appendChild(l)}},get_value:function(e,t,r){return e.firstChild.value},focus:function(e){}})}),scheduler.attachEvent("onBeforeSectionRender",function(e,t,r){
var a={};if("tree"==e){var i,n,s,d,l,o;d="dhx_matrix_scell",t.children?(i=r.folder_dy||r.dy,r.folder_dy&&!r.section_autoheight&&(s="height:"+r.folder_dy+"px;"),n="dhx_row_folder",d+=" folder",l="<div class='dhx_scell_expand'>"+(t.open?"-":"+")+"</div>",o=r.folder_events_available?"dhx_data_table folder_events":"dhx_data_table folder"):(i=r.dy,n="dhx_row_item",d+=" item",l="",o="dhx_data_table"),d+=scheduler.templates[r.name+"_scaley_class"](t.key,t.label,t)?" "+scheduler.templates[r.name+"_scaley_class"](t.key,t.label,t):"";
var _="<div class='dhx_scell_level"+t.level+"'>"+l+"<div class='dhx_scell_name'>"+(scheduler.templates[r.name+"_scale_label"](t.key,t.label,t)||t.label)+"</div></div>";a={height:i,style_height:s,tr_className:n,td_className:d,td_content:_,table_className:o}}return a});var section_id_before;scheduler.attachEvent("onBeforeEventChanged",function(e,t,r){if(scheduler._isRender("tree"))for(var a=scheduler._get_event_sections?scheduler._get_event_sections(e):[e[scheduler.matrix[scheduler._mode].y_property]],i=0;i<a.length;i++){
var n=scheduler.getSection(a[i]);if(n&&n.children&&!scheduler.matrix[scheduler._mode].folder_events_available)return r||(e[scheduler.matrix[scheduler._mode].y_property]=section_id_before),!1}return!0}),scheduler.attachEvent("onBeforeDrag",function(e,t,r){if(scheduler._isRender("tree")){var a,i=scheduler._locate_cell_timeline(r);if(i&&(a=scheduler.matrix[scheduler._mode].y_unit[i.y].key,scheduler.matrix[scheduler._mode].y_unit[i.y].children&&!scheduler.matrix[scheduler._mode].folder_events_available))return!1;
var n=scheduler.getEvent(e),s=scheduler.matrix[scheduler._mode].y_property;section_id_before=n&&n[s]?n[s]:a}return!0}),scheduler._getArrayToDisplay=function(e){var t=[],r=function(e,a){for(var i=a||0,n=0;n<e.length;n++)e[n].level=i,e[n].children&&"undefined"==typeof e[n].key&&(e[n].key=scheduler.uid()),t.push(e[n]),e[n].open&&e[n].children&&r(e[n].children,i+1)};return r(e),t},scheduler._getArrayForSelect=function(e,t){var r=[],a=function(e){for(var i=0;i<e.length;i++)scheduler.matrix[t].folder_events_available?r.push(e[i]):e[i].children||r.push(e[i]),
e[i].children&&a(e[i].children,t)};return a(e),r},scheduler._toggleFolderDisplay=function(e,t,r){var a,i=function(e,t,r,n){for(var s=0;s<t.length&&(t[s].key!=e&&!n||!t[s].children||(t[s].open="undefined"!=typeof r?r:!t[s].open,a=!0,n||!a));s++)t[s].children&&i(e,t[s].children,r,n)},n=scheduler.getSection(e);"undefined"!=typeof t||r||(t=!n.open),scheduler.callEvent("onBeforeFolderToggle",[n,t,r])&&(i(e,scheduler.matrix[scheduler._mode].y_unit_original,t,r),scheduler.matrix[scheduler._mode].y_unit=scheduler._getArrayToDisplay(scheduler.matrix[scheduler._mode].y_unit_original),
scheduler.callEvent("onOptionsLoad",[]),scheduler.callEvent("onAfterFolderToggle",[n,t,r]))},scheduler.attachEvent("onCellClick",function(e,t,r,a,i){scheduler._isRender("tree")&&(scheduler.matrix[scheduler._mode].folder_events_available||"undefined"!=typeof scheduler.matrix[scheduler._mode].y_unit[t]&&scheduler.matrix[scheduler._mode].y_unit[t].children&&scheduler._toggleFolderDisplay(scheduler.matrix[scheduler._mode].y_unit[t].key))}),scheduler.attachEvent("onYScaleClick",function(e,t,r){scheduler._isRender("tree")&&t.children&&scheduler._toggleFolderDisplay(t.key);
}),scheduler.getSection=function(e){if(scheduler._isRender("tree")){var t,r=function(e,a){for(var i=0;i<a.length;i++)a[i].key==e&&(t=a[i]),a[i].children&&r(e,a[i].children)};return r(e,scheduler.matrix[scheduler._mode].y_unit_original),t||null}},scheduler.deleteSection=function(e){if(scheduler._isRender("tree")){var t=!1,r=function(e,a){for(var i=0;i<a.length&&(a[i].key==e&&(a.splice(i,1),t=!0),!t);i++)a[i].children&&r(e,a[i].children)};return r(e,scheduler.matrix[scheduler._mode].y_unit_original),
scheduler.matrix[scheduler._mode].y_unit=scheduler._getArrayToDisplay(scheduler.matrix[scheduler._mode].y_unit_original),scheduler.callEvent("onOptionsLoad",[]),t}},scheduler.deleteAllSections=function(){scheduler._isRender("tree")&&(scheduler.matrix[scheduler._mode].y_unit_original=[],scheduler.matrix[scheduler._mode].y_unit=scheduler._getArrayToDisplay(scheduler.matrix[scheduler._mode].y_unit_original),scheduler.callEvent("onOptionsLoad",[]))},scheduler.addSection=function(e,t){if(scheduler._isRender("tree")){
var r=!1,a=function(e,i,n){if(t)for(var s=0;s<n.length&&(n[s].key==i&&n[s].children&&(n[s].children.push(e),r=!0),!r);s++)n[s].children&&a(e,i,n[s].children);else n.push(e),r=!0};return a(e,t,scheduler.matrix[scheduler._mode].y_unit_original),scheduler.matrix[scheduler._mode].y_unit=scheduler._getArrayToDisplay(scheduler.matrix[scheduler._mode].y_unit_original),scheduler.callEvent("onOptionsLoad",[]),r}},scheduler.openAllSections=function(){scheduler._isRender("tree")&&scheduler._toggleFolderDisplay(1,!0,!0);
},scheduler.closeAllSections=function(){scheduler._isRender("tree")&&scheduler._toggleFolderDisplay(1,!1,!0)},scheduler.openSection=function(e){scheduler._isRender("tree")&&scheduler._toggleFolderDisplay(e,!0)},scheduler.closeSection=function(e){scheduler._isRender("tree")&&scheduler._toggleFolderDisplay(e,!1)};
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_treetimeline.js.map