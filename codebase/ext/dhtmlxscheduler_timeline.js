/*
@license
dhtmlxScheduler v.4.4.9 Professional

This software is covered by DHTMLX Commercial License. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler._temp_matrix_scope=function(){scheduler.matrix={},scheduler._merge=function(e,t){for(var a in t)"undefined"==typeof e[a]&&(e[a]=t[a])},scheduler.createTimelineView=function(e){scheduler._skin_init(),scheduler._merge(e,{section_autoheight:!0,name:"matrix",x:"time",y:"time",x_step:1,x_unit:"hour",y_unit:"day",y_step:1,x_start:0,x_size:24,y_start:0,y_size:7,render:"cell",dx:200,dy:50,event_dy:scheduler.xy.bar_height-5,event_min_dy:scheduler.xy.bar_height-5,resize_events:!0,fit_events:!0,show_unassigned:!1,
second_scale:!1,round_position:!1,_logic:function(e,t,a){var r={};return scheduler.checkEvent("onBeforeSectionRender")&&(r=scheduler.callEvent("onBeforeSectionRender",[e,t,a])),r}}),e._original_x_start=e.x_start,"day"!=e.x_unit&&(e.first_hour=e.last_hour=0),e._start_correction=e.first_hour?60*e.first_hour*60*1e3:0,e._end_correction=e.last_hour?60*(24-e.last_hour)*60*1e3:0,scheduler.checkEvent("onTimelineCreated")&&scheduler.callEvent("onTimelineCreated",[e]);var t=scheduler.render_data;scheduler.render_data=function(a,r){
if(this._mode!=e.name)return t.apply(this,arguments);if(r&&!e.show_unassigned&&"cell"!=e.render)for(var n=0;n<a.length;n++)this.clear_event(a[n]),this.render_timeline_event.call(this.matrix[this._mode],a[n],!0);else scheduler._renderMatrix.call(e,!0,!0)},scheduler.matrix[e.name]=e,scheduler.templates[e.name+"_cell_value"]=function(e){return e?e.length:""},scheduler.templates[e.name+"_cell_class"]=function(e){return""},scheduler.templates[e.name+"_scalex_class"]=function(e){return""},scheduler.templates[e.name+"_second_scalex_class"]=function(e){
return""},scheduler.templates[e.name+"_scaley_class"]=function(e,t,a){return""},scheduler.templates[e.name+"_scale_label"]=function(e,t,a){return t},scheduler.templates[e.name+"_tooltip"]=function(e,t,a){return a.text},scheduler.templates[e.name+"_date"]=function(e,t){return e.getDay()==t.getDay()&&864e5>t-e||+e==+scheduler.date.date_part(new Date(t))||+scheduler.date.add(e,1,"day")==+t&&0===t.getHours()&&0===t.getMinutes()?scheduler.templates.day_date(e):e.getDay()!=t.getDay()&&864e5>t-e?scheduler.templates.day_date(e)+" &ndash; "+scheduler.templates.day_date(t):scheduler.templates.week_date(e,t);
},scheduler.templates[e.name+"_scale_date"]=scheduler.date.date_to_str(e.x_date||scheduler.config.hour_date),scheduler.templates[e.name+"_second_scale_date"]=scheduler.date.date_to_str(e.second_scale&&e.second_scale.x_date?e.second_scale.x_date:scheduler.config.hour_date),scheduler.date["add_"+e.name+"_private"]=function(t,a){var r=a,n=e.x_unit;if("minute"==e.x_unit||"hour"==e.x_unit){var i=r;"hour"==e.x_unit&&(i*=60),i%1440||(r=i/1440,n="day")}return scheduler.date.add(t,r,n)},scheduler.date["add_"+e.name]=function(t,a,r){
var n=scheduler.date["add_"+e.name+"_private"](t,(e.x_length||e.x_size)*e.x_step*a);if("minute"==e.x_unit||"hour"==e.x_unit){var i=e.x_length||e.x_size,s="hour"==e.x_unit?60*e.x_step:e.x_step;if(s*i%1440)if(+scheduler.date.date_part(new Date(t))==+scheduler.date.date_part(new Date(n)))e.x_start+=a*i;else{var d=1440/(i*s)-1,l=Math.round(d*i);a>0?e.x_start=e.x_start-l:e.x_start=l+e.x_start}}return n},scheduler.date[e.name+"_start"]=function(t){var a=scheduler.date[e.x_unit+"_start"]||scheduler.date.day_start,r=a.call(scheduler.date,t),n=r.getTimezoneOffset();
r=scheduler.date.add(r,e.x_step*e.x_start,e.x_unit);var i=r.getTimezoneOffset();return n!=i&&r.setTime(r.getTime()+6e4*(i-n)),r},scheduler.callEvent("onOptionsLoad",[e]),scheduler[e.name+"_view"]=function(t){t?scheduler._set_timeline_dates(e):scheduler._renderMatrix.apply(e,arguments)};var a=new Date;scheduler.date.add(a,e.x_step,e.x_unit).valueOf()-a.valueOf();scheduler["mouse_"+e.name]=function(t){var a=this._drag_event;this._drag_id&&(a=this.getEvent(this._drag_id)),t.x-=e.dx;var r=scheduler._timeline_drag_date(e,t.x);
if(t.x=0,t.force_redraw=!0,t.custom=!0,"move"==this._drag_mode&&this._drag_id&&this._drag_event){var a=this.getEvent(this._drag_id),n=this._drag_event;if(t._ignores=this._ignores_detected||e._start_correction||e._end_correction,void 0===n._move_delta&&(n._move_delta=(a.start_date-r)/6e4,this.config.preserve_length&&t._ignores&&(n._move_delta=this._get_real_event_length(a.start_date,r,e),n._event_length=this._get_real_event_length(a.start_date,a.end_date,e))),this.config.preserve_length&&t._ignores){
var i=(n._event_length,this._get_fictional_event_length(r,n._move_delta,e,!0));r=new Date(r-i)}else r=scheduler.date.add(r,n._move_delta,"minute")}if("resize"==this._drag_mode&&a&&(this.config.timeline_swap_resize&&this._drag_id&&(this._drag_from_start&&+r>+a.end_date?this._drag_from_start=!1:!this._drag_from_start&&+r<+a.start_date&&(this._drag_from_start=!0)),t.resize_from_start=this._drag_from_start,!this.config.timeline_swap_resize&&this._drag_id&&this._drag_from_start&&+r>=+scheduler.date.add(a.end_date,-scheduler.config.time_step,"minute")&&(r=scheduler.date.add(a.end_date,-scheduler.config.time_step,"minute"))),
e.round_position)switch(this._drag_mode){case"move":this.config.preserve_length||(r=scheduler._timeline_get_rounded_date.call(e,r,!1),"day"==e.x_unit&&(t.custom=!1));break;case"resize":this._drag_event&&((null===this._drag_event._resize_from_start||void 0===this._drag_event._resize_from_start)&&(this._drag_event._resize_from_start=t.resize_from_start),t.resize_from_start=this._drag_event._resize_from_start,r=scheduler._timeline_get_rounded_date.call(e,r,!this._drag_event._resize_from_start))}this._resolve_timeline_section(e,t),
t.section&&this._update_timeline_section({pos:t,event:this.getEvent(this._drag_id),view:e}),t.y=Math.round((this._correct_shift(r,1)-this._min_date)/(6e4*this.config.time_step)),t.shift=this.config.time_step,e.round_position&&"new-size"==this._drag_mode&&r<=this._drag_start&&(t.shift=scheduler.date.add(this._drag_start,e.x_step,e.x_unit)-this._drag_start);var s=this._is_pos_changed(this._drag_pos,t);return this._drag_pos&&s&&(this._drag_event._dhx_changed=!0),s||this._drag_pos.has_moved||(t.force_redraw=!1),
t}},scheduler._prepare_timeline_events=function(e){var t=[];if("cell"==e.render)t=scheduler._timeline_trace_events.call(e);else for(var a=scheduler.get_visible_events(),r=e.order,n=0;n<a.length;n++){var i=a[n],s=i[e.y_property],d=e.order[s];if(e.show_unassigned&&!s){for(var l in r)if(r.hasOwnProperty(l)){d=r[l],t[d]||(t[d]=[]);var o=scheduler._lame_copy({},i);o[e.y_property]=l,t[d].push(o)}}else t[d]||(t[d]=[]),t[d].push(i)}return t},scheduler._populate_timeline_rendered=function(e){scheduler._rendered=[];
for(var t=e.getElementsByTagName("DIV"),a=0;a<t.length;a++)t[a].getAttribute("event_id")&&scheduler._rendered.push(t[a])},scheduler._get_timeline_event_height=function(e,t){var a=e[t.y_property],r=t.event_dy;return"full"==t.event_dy&&(r=t.section_autoheight?t._section_height[a]-6:t.dy-3),t.resize_events&&(r=Math.max(Math.floor(r/e._count),t.event_min_dy)),r},scheduler._get_timeline_event_y=function(e,t){var a=e,r=2+a*t+(a?2*a:0);return scheduler.config.cascade_event_display&&(r=2+a*scheduler.config.cascade_event_margin+(a?2*a:0)),
r},scheduler.render_timeline_event=function(e,t){var a=e[this.y_property];if(!a)return"";var r=e._sorder,n=scheduler._timeline_getX(e,!1,this),i=scheduler._timeline_getX(e,!0,this),s=scheduler._get_timeline_event_height(e,this),d=s-2;e._inner||"full"!=this.event_dy||(d=(d+2)*(e._count-r)-2);var l=scheduler._get_timeline_event_y(e._sorder,s),o=s+l+2;(!this._events_height[a]||this._events_height[a]<o)&&(this._events_height[a]=o);var _=scheduler.templates.event_class(e.start_date,e.end_date,e);_="dhx_cal_event_line "+(_||""),
e._no_drag_move&&(_+=" no_drag_move");var c=e.color?"background:"+e.color+";":"",h=e.textColor?"color:"+e.textColor+";":"",u=scheduler.templates.event_bar_text(e.start_date,e.end_date,e),v="<div "+scheduler._waiAria.eventBarAttrString(e)+" event_id='"+e.id+"' class='"+_+"' style='"+c+h+"position:absolute; top:"+l+"px; height: "+d+"px; left:"+n+"px; width:"+Math.max(0,i-n)+"px;"+(e._text_style||"")+"'>";if(scheduler.config.drag_resize&&!scheduler.config.readonly){var f="dhx_event_resize",g="<div class='"+f+" "+f+"_start' style='height: "+d+"px;'></div>",m="<div class='"+f+" "+f+"_end' style='height: "+d+"px;'></div>";
v+=(e._no_resize_start?"":g)+(e._no_resize_end?"":m)}if(v+=u+"</div>",!t)return v;var p=document.createElement("DIV");p.innerHTML=v;var y=this.order[a],x=scheduler._els.dhx_cal_data[0].firstChild.rows[y];if(x){var b=x.cells[1].firstChild;scheduler._rendered.push(p.firstChild),b.appendChild(p.firstChild)}},scheduler._timeline_trace_events=function(){for(var e=scheduler.get_visible_events(),t=[],a=0;a<this.y_unit.length;a++)t[a]=[];var r;t[r]||(t[r]=[]);for(var a=0;a<e.length;a++){r=this.order[e[a][this.y_property]];
for(var n=0;this._trace_x[n+1]&&e[a].start_date>=this._trace_x[n+1];)n++;for(;this._trace_x[n]&&e[a].end_date>this._trace_x[n];)t[r][n]||(t[r][n]=[]),t[r][n].push(e[a]),n++}return t},scheduler._timeline_getX=function(e,t,a){var r=0,n=a._step,i=a.round_position,s=0,d=t?e.end_date:e.start_date;d.valueOf()>scheduler._max_date.valueOf()&&(d=scheduler._max_date);var l=d-scheduler._min_date_timeline;if(l>0){var o=scheduler._get_date_index(a,d);scheduler._ignores[o]&&(i=!0);for(var _=0;o>_;_++)r+=scheduler._cols[_];
var c=scheduler._timeline_get_rounded_date.apply(a,[d,!1]);i?+d>+c&&t&&(s=scheduler._cols[o]):(l=d-c,a.first_hour||a.last_hour?(l-=a._start_correction,0>l&&(l=0),s=Math.round(l/n),s>scheduler._cols[o]&&(s=scheduler._cols[o])):s=Math.round(l/n))}return r+=t?0===l||i?s-14:s-12:s+1},scheduler._timeline_get_rounded_date=function(e,t){var a=scheduler._get_date_index(this,e),r=this._trace_x[a];return t&&+e!=+this._trace_x[a]&&(r=this._trace_x[a+1]?this._trace_x[a+1]:scheduler.date.add(this._trace_x[a],this.x_step,this.x_unit)),
new Date(r)},scheduler._timeline_skip_ignored=function(e){if(scheduler._ignores_detected)for(var t,a,r,n,i=0;i<e.length;i++){for(n=e[i],r=!1,t=scheduler._get_date_index(this,n.start_date),a=scheduler._get_date_index(this,n.end_date);a>t;){if(!scheduler._ignores[t]){r=!0;break}t++}r||t!=a||scheduler._ignores[a]||+n.end_date>+this._trace_x[a]&&(r=!0),r||(e.splice(i,1),i--)}},scheduler._timeline_get_events_html=function(e){var t="";if(e&&"cell"!=this.render){scheduler._timeline_skip_ignored.call(this,e),
e.sort(this.sort||function(e,t){return e.start_date.valueOf()==t.start_date.valueOf()?e.id>t.id?1:-1:e.start_date>t.start_date?1:-1});for(var a=[],r=e.length,n=0;r>n;n++){var i=e[n];i._inner=!1;var s=this.round_position?scheduler._timeline_get_rounded_date.apply(this,[i.start_date,!1]):i.start_date;for(this.round_position?scheduler._timeline_get_rounded_date.apply(this,[i.end_date,!0]):i.end_date;a.length;){var d=a[a.length-1];if(!(d.end_date.valueOf()<=s.valueOf()))break;a.splice(a.length-1,1)}for(var l=!1,o=0;o<a.length;o++){
var _=a[o];if(_.end_date.valueOf()<=s.valueOf()){l=!0,i._sorder=_._sorder,a.splice(o,1),i._inner=!0;break}}if(a.length&&(a[a.length-1]._inner=!0),!l)if(a.length)if(a.length<=a[a.length-1]._sorder){if(a[a.length-1]._sorder)for(var c=0;c<a.length;c++){for(var h=!1,u=0;u<a.length;u++)if(a[u]._sorder==c){h=!0;break}if(!h){i._sorder=c;break}}else i._sorder=0;i._inner=!0}else{for(var v=a[0]._sorder,f=1;f<a.length;f++)a[f]._sorder>v&&(v=a[f]._sorder);i._sorder=v+1,i._inner=!1}else i._sorder=0;a.push(i),
a.length>(a.max_count||0)?(a.max_count=a.length,i._count=a.length):i._count=i._count?i._count:1}for(var g=0;g<e.length;g++)e[g]._count=a.max_count;for(var m=0;r>m;m++)t+=scheduler.render_timeline_event.call(this,e[m],!1)}return t},scheduler._timeline_y_scale=function(e){var t="<table style='table-layout:fixed;' cellspacing='0' cellpadding='0'>";scheduler._load_mode&&scheduler._load();for(var a=scheduler._prepare_timeline_events(this),r=0,n=0;n<scheduler._cols.length;n++)r+=scheduler._cols[n];var i=new Date,s=scheduler._cols.length-scheduler._ignores_detected;
i=(scheduler.date.add(i,this.x_step*s,this.x_unit)-i-(this._start_correction+this._end_correction)*s)/r,this._step=i,this._summ=r;var d=scheduler._colsS.heights=[],l=[];this._events_height={},this._section_height={};for(var n=0;n<this.y_unit.length;n++){var o=this._logic(this.render,this.y_unit[n],this);scheduler._merge(o,{height:this.dy}),this.section_autoheight&&(this.y_unit.length*o.height<e.offsetHeight&&(o.height=Math.max(o.height,Math.floor((e.offsetHeight-1)/this.y_unit.length))),this._section_height[this.y_unit[n].key]=o.height),
o.td_className||(o.td_className="dhx_matrix_scell"+(scheduler.templates[this.name+"_scaley_class"](this.y_unit[n].key,this.y_unit[n].label,this.y_unit[n])?" "+scheduler.templates[this.name+"_scaley_class"](this.y_unit[n].key,this.y_unit[n].label,this.y_unit[n]):"")),o.td_content||(o.td_content=scheduler.templates[this.name+"_scale_label"](this.y_unit[n].key,this.y_unit[n].label,this.y_unit[n])),scheduler._merge(o,{tr_className:"",style_height:"height:"+o.height+"px;",style_width:"width:"+this.dx+"px;",
summ_width:"width:"+r+"px;",table_className:""});var _=scheduler._timeline_get_events_html.call(this,a[n]);if(this.fit_events){var c=this._events_height[this.y_unit[n].key]||0;o.height=c>o.height?c:o.height,o.style_height="height:"+o.height+"px;",this._section_height[this.y_unit[n].key]=o.height}if(t+="<tr class='"+o.tr_className+"' style='"+o.style_height+"'><td class='"+o.td_className+"' style='"+o.style_width+" height:"+(o.height-1)+"px;' "+scheduler._waiAria.label(o.td_content)+">"+o.td_content+"</td>",
"cell"==this.render)for(var h=0;h<scheduler._cols.length;h++)t+=scheduler._ignores[h]?"<td></td>":"<td class='dhx_matrix_cell "+scheduler.templates[this.name+"_cell_class"](a[n][h],this._trace_x[h],this.y_unit[n])+"' style='width:"+scheduler._cols[h]+"px'><div style='width:auto'>"+scheduler.templates[this.name+"_cell_value"](a[n][h],this._trace_x[h],this.y_unit[n])+"</div></td>";else{t+="<td><div style='"+o.summ_width+" "+o.style_height+" position:relative;' class='dhx_matrix_line'>",t+=_,t+="<table class='"+o.table_className+"' cellpadding='0' cellspacing='0' style='"+o.summ_width+" "+o.style_height+"' >";
for(var h=0;h<scheduler._cols.length;h++)t+=scheduler._ignores[h]?"<td></td>":"<td class='dhx_matrix_cell "+scheduler.templates[this.name+"_cell_class"](a[n],this._trace_x[h],this.y_unit[n])+"' style='width:"+scheduler._cols[h]+"px'></td>";t+="</table>",t+="</div></td>"}t+="</tr>",l.push(o)}t+="</table>",this._matrix=a,e.innerHTML=t,scheduler._populate_timeline_rendered(e),this._scales={};for(var u=e.firstChild.rows,v=null,n=0,f=l.length;f>n;n++){v=this.y_unit[n],d.push(l[n].height);var g=v.key,m=this._scales[g]=scheduler._isRender("cell")?u[n]:u[n].childNodes[1].getElementsByTagName("div")[0];
scheduler.callEvent("onScaleAdd",[m,g])}},scheduler._timeline_x_dates=function(e){var t=scheduler._min_date,a=scheduler._max_date;scheduler._process_ignores(t,this.x_size,this.x_unit,this.x_step,e);for(var r=(this.x_size+(e?scheduler._ignores_detected:0),0),n=0;+a>+t;)if(this._trace_x[n]=new Date(t),"month"==this.x_unit&&scheduler.date[this.x_unit+"_start"]&&(t=scheduler.date[this.x_unit+"_start"](new Date(t))),t=scheduler.date.add(t,this.x_step,this.x_unit),scheduler.date[this.x_unit+"_start"]&&(t=scheduler.date[this.x_unit+"_start"](t)),
scheduler._ignores[n]||r++,n++,e)if(r<this.x_size&&!(+a>+t))a=scheduler.date["add_"+this.name+"_private"](a,(this.x_length||this.x_size)*this.x_step);else if(r>=this.x_size){scheduler._max_date=t;break}return{total:n,displayed:r}},scheduler._timeline_x_scale=function(e){var t=scheduler.xy.scale_height,a=this._header_resized||scheduler.xy.scale_height;scheduler._cols=[],scheduler._colsS={height:0},this._trace_x=[];var r=scheduler._x-this.dx-scheduler.xy.scroll_width,n=[this.dx],i=scheduler._els.dhx_cal_header[0];
i.style.width=n[0]+r+"px";for(var s=scheduler._min_date_timeline=scheduler._min_date,d=scheduler.config.preserve_scale_length,l=scheduler._timeline_x_dates.call(this,d),o=l.displayed,_=l.total,c=0;_>c;c++)scheduler._ignores[c]?(scheduler._cols[c]=0,o++):scheduler._cols[c]=Math.floor(r/(o-c)),r-=scheduler._cols[c],n[c+1]=n[c]+scheduler._cols[c];if(e.innerHTML="<div></div>",this.second_scale){for(var h=this.second_scale.x_unit,u=[this._trace_x[0]],v=[],f=[this.dx,this.dx],g=0,m=0;m<this._trace_x.length;m++){
var p=this._trace_x[m],y=scheduler._timeline_is_new_interval(h,p,u[g]);y&&(++g,u[g]=p,f[g+1]=f[g]);var x=g+1;v[g]=scheduler._cols[m]+(v[g]||0),f[x]+=scheduler._cols[m]}e.innerHTML="<div></div><div></div>";var b=e.firstChild;b.style.height=a+"px";var w=e.lastChild;w.style.position="relative";for(var k=0;k<u.length;k++){var D=u[k],E=scheduler.templates[this.name+"_second_scalex_class"](D),N=document.createElement("DIV");N.className="dhx_scale_bar dhx_second_scale_bar"+(E?" "+E:""),scheduler.set_xy(N,v[k]-1,a-3,f[k],0),
N.innerHTML=scheduler.templates[this.name+"_second_scale_date"](D),b.appendChild(N)}}scheduler.xy.scale_height=a,e=e.lastChild;for(var S=0;S<this._trace_x.length;S++)if(!scheduler._ignores[S]){s=this._trace_x[S],scheduler._render_x_header(S,n[S],s,e);var M=scheduler.templates[this.name+"_scalex_class"](s);M&&(e.lastChild.className+=" "+M)}scheduler.xy.scale_height=t;var C=this._trace_x;e.onclick=function(e){var t=scheduler._timeline_locate_hcell(e);t&&scheduler.callEvent("onXScaleClick",[t.x,C[t.x],e||event]);
},e.ondblclick=function(e){var t=scheduler._timeline_locate_hcell(e);t&&scheduler.callEvent("onXScaleDblClick",[t.x,C[t.x],e||event])}},scheduler._timeline_is_new_interval=function(e,t,a){switch(e){case"hour":return t.getHours()!=a.getHours()||scheduler._timeline_is_new_interval("day",t,a);case"day":return!(t.getDate()==a.getDate()&&t.getMonth()==a.getMonth()&&t.getFullYear()==a.getFullYear());case"week":return!(scheduler.date.week_start(new Date(t)).valueOf()==scheduler.date.week_start(new Date(a)).valueOf());
case"month":return!(t.getMonth()==a.getMonth()&&t.getFullYear()==a.getFullYear());case"year":return!(t.getFullYear()==a.getFullYear());default:return!1}},scheduler._timeline_reset_scale_height=function(e){if(this._header_resized&&(!e||!this.second_scale)){scheduler.xy.scale_height/=2,this._header_resized=!1;var t=scheduler._els.dhx_cal_header[0];t.className=t.className.replace(/ dhx_second_cal_header/gi,"")}},scheduler._timeline_set_full_view=function(e){if(scheduler._timeline_reset_scale_height.call(this,e),
e){this.second_scale&&!this._header_resized&&(this._header_resized=scheduler.xy.scale_height,scheduler.xy.scale_height*=2,scheduler._els.dhx_cal_header[0].className+=" dhx_second_cal_header"),scheduler.set_sizes(),scheduler._init_matrix_tooltip();var t=scheduler._min_date;scheduler._timeline_x_scale.call(this,scheduler._els.dhx_cal_header[0]),scheduler._timeline_y_scale.call(this,scheduler._els.dhx_cal_data[0]),scheduler._min_date=t,scheduler._els.dhx_cal_date[0].innerHTML=scheduler.templates[this.name+"_date"](scheduler._min_date,scheduler._max_date),
scheduler._mark_now&&scheduler._mark_now(),scheduler._timeline_reset_scale_height.call(this,e)}scheduler._timeline_hideToolTip()},scheduler._timeline_hideToolTip=function(){scheduler._tooltip&&(scheduler._tooltip.style.display="none",scheduler._tooltip.date="")},scheduler._timeline_showToolTip=function(e,t,a){if("cell"==e.render){var r=t.x+"_"+t.y,n=e._matrix[t.y][t.x];if(!n)return scheduler._timeline_hideToolTip();if(n.sort(function(e,t){return e.start_date>t.start_date?1:-1}),scheduler._tooltip){
if(scheduler._tooltip.date==r)return;scheduler._tooltip.innerHTML=""}else{var i=scheduler._tooltip=document.createElement("DIV");i.className="dhx_year_tooltip",document.body.appendChild(i),i.onclick=scheduler._click.dhx_cal_data}for(var s="",d=0;d<n.length;d++){var l=n[d].color?"background-color:"+n[d].color+";":"",o=n[d].textColor?"color:"+n[d].textColor+";":"";s+="<div class='dhx_tooltip_line' event_id='"+n[d].id+"' style='"+l+o+"'>",s+="<div class='dhx_tooltip_date'>"+(n[d]._timed?scheduler.templates.event_date(n[d].start_date):"")+"</div>",
s+="<div class='dhx_event_icon icon_details'>&nbsp;</div>",s+=scheduler.templates[e.name+"_tooltip"](n[d].start_date,n[d].end_date,n[d])+"</div>"}scheduler._tooltip.style.display="",scheduler._tooltip.style.top="0px",document.body.offsetWidth-a.left-scheduler._tooltip.offsetWidth<0?scheduler._tooltip.style.left=a.left-scheduler._tooltip.offsetWidth+"px":scheduler._tooltip.style.left=a.left+t.src.offsetWidth+"px",scheduler._tooltip.date=r,scheduler._tooltip.innerHTML=s,document.body.offsetHeight-a.top-scheduler._tooltip.offsetHeight<0?scheduler._tooltip.style.top=a.top-scheduler._tooltip.offsetHeight+t.src.offsetHeight+"px":scheduler._tooltip.style.top=a.top+"px";
}},scheduler._matrix_tooltip_handler=function(e){var t=scheduler.matrix[scheduler._mode];if(t&&"cell"==t.render){if(t){var a=scheduler._locate_cell_timeline(e),e=e||event;e.target||e.srcElement;if(a)return scheduler._timeline_showToolTip(t,a,getOffset(a.src))}scheduler._timeline_hideToolTip()}},scheduler._init_matrix_tooltip=function(){scheduler._detachDomEvent(scheduler._els.dhx_cal_data[0],"mouseover",scheduler._matrix_tooltip_handler),dhtmlxEvent(scheduler._els.dhx_cal_data[0],"mouseover",scheduler._matrix_tooltip_handler);
},scheduler._set_timeline_dates=function(e){scheduler._min_date=scheduler.date[e.name+"_start"](new Date(scheduler._date)),scheduler._max_date=scheduler.date["add_"+e.name+"_private"](scheduler._min_date,e.x_size*e.x_step),scheduler.date[e.x_unit+"_start"]&&(scheduler._max_date=scheduler.date[e.x_unit+"_start"](scheduler._max_date)),scheduler._table_view=!0},scheduler._renderMatrix=function(e,t){t||(scheduler._els.dhx_cal_data[0].scrollTop=0),scheduler._set_timeline_dates(this),scheduler._timeline_set_full_view.call(this,e);
},scheduler._timeline_html_index=function(e){for(var t=e.parentNode.childNodes,a=-1,r=0;r<t.length;r++)if(t[r]==e){a=r;break}var n=a;if(scheduler._ignores_detected)for(var i in scheduler._ignores)scheduler._ignores[i]&&n>=1*i&&n++;return n},scheduler._timeline_locate_hcell=function(e){e=e||event;for(var t=e.target?e.target:e.srcElement;t&&"DIV"!=t.tagName;)t=t.parentNode;if(t&&"DIV"==t.tagName){var a=scheduler._getClassName(t).split(" ")[0];if("dhx_scale_bar"==a)return{x:scheduler._timeline_html_index(t),
y:-1,src:t,scale:!0}}},scheduler._locate_cell_timeline=function(e){e=e||event;for(var t=e.target?e.target:e.srcElement,a={},r=scheduler.matrix[scheduler._mode],n=scheduler.getActionData(e),i=scheduler._ignores,s=0,d=0;d<r._trace_x.length-1&&!(+n.date<r._trace_x[d+1]);d++)i[d]||s++;a.x=0===s?0:d,a.y=r.order[n.section];var l=scheduler._isRender("cell")?1:0;a.src=r._scales[n.section]?r._scales[n.section].getElementsByTagName("td")[d+l]:null;for(var o=!1;0===a.x&&"dhx_cal_data"!=scheduler._getClassName(t)&&t.parentNode;){
if("dhx_matrix_scell"==scheduler._getClassName(t).split(" ")[0]){o=!0;break}t=t.parentNode}return o?(a.x=-1,a.src=t,a.scale=!0):a.x=d,a};var e=scheduler._click.dhx_cal_data;scheduler._click.dhx_marked_timespan=scheduler._click.dhx_cal_data=function(t){var a=e.apply(this,arguments),r=scheduler.matrix[scheduler._mode];if(r){var n=scheduler._locate_cell_timeline(t);n&&(n.scale?scheduler.callEvent("onYScaleClick",[n.y,r.y_unit[n.y],t||event]):scheduler.callEvent("onCellClick",[n.x,n.y,r._trace_x[n.x],(r._matrix[n.y]||{})[n.x]||[],t||event]));
}return a},scheduler.dblclick_dhx_matrix_cell=function(e){var t=scheduler.matrix[scheduler._mode];if(t){var a=scheduler._locate_cell_timeline(e);a&&(a.scale?scheduler.callEvent("onYScaleDblClick",[a.y,t.y_unit[a.y],e||event]):scheduler.callEvent("onCellDblClick",[a.x,a.y,t._trace_x[a.x],(t._matrix[a.y]||{})[a.x]||[],e||event]))}};var t=scheduler.dblclick_dhx_marked_timespan||function(){};scheduler.dblclick_dhx_marked_timespan=function(e){var a=scheduler.matrix[scheduler._mode];return a?scheduler.dblclick_dhx_matrix_cell(e):t.apply(this,arguments);
},scheduler.dblclick_dhx_matrix_scell=function(e){return scheduler.dblclick_dhx_matrix_cell(e)},scheduler._isRender=function(e){return scheduler.matrix[scheduler._mode]&&scheduler.matrix[scheduler._mode].render==e},scheduler.attachEvent("onCellDblClick",function(e,t,a,r,n){if(!this.config.readonly&&("dblclick"!=n.type||this.config.dblclick_create)){var i=scheduler.matrix[scheduler._mode],s={};s.start_date=i._trace_x[e],s.end_date=i._trace_x[e+1]?i._trace_x[e+1]:scheduler.date.add(i._trace_x[e],i.x_step,i.x_unit),
i._start_correction&&(s.start_date=new Date(1*s.start_date+i._start_correction)),i._end_correction&&(s.end_date=new Date(s.end_date-i._end_correction)),s[i.y_property]=i.y_unit[t].key,scheduler.addEventNow(s,null,n)}}),scheduler.attachEvent("onBeforeDrag",function(e,t,a){return!scheduler._isRender("cell")}),scheduler.attachEvent("onEventChanged",function(e,t){t._timed=this.isOneDayEvent(t)}),scheduler.attachEvent("onBeforeEventChanged",function(e,t,a,r){return e&&(e._move_delta=void 0),r&&(r._move_delta=void 0),
!0}),scheduler._is_column_visible=function(e){var t=scheduler.matrix[scheduler._mode],a=scheduler._get_date_index(t,e);return!scheduler._ignores[a]};var a=scheduler._render_marked_timespan;scheduler._render_marked_timespan=function(e,t,r,n,i){if(!scheduler.config.display_marked_timespans)return[];if(scheduler.matrix&&scheduler.matrix[scheduler._mode]){if(scheduler._isRender("cell"))return;var s=scheduler._lame_copy({},scheduler.matrix[scheduler._mode]);s.round_position=!1;var d=[],l=[],o=[],_=e.sections?e.sections.units||e.sections.timeline:null;
if(r)o=[t],l=[r];else{var c=s.order;if(_)c.hasOwnProperty(_)&&(l.push(_),o.push(s._scales[_]));else if(s._scales)for(var h in c)c.hasOwnProperty(h)&&(l.push(h),o.push(s._scales[h]))}var n=n?new Date(n):scheduler._min_date,i=i?new Date(i):scheduler._max_date;if(n.valueOf()<scheduler._min_date.valueOf()&&(n=new Date(scheduler._min_date)),i.valueOf()>scheduler._max_date.valueOf()&&(i=new Date(scheduler._max_date)),!s._trace_x)return;for(var u=0;u<s._trace_x.length&&!scheduler._is_column_visible(s._trace_x[u]);u++);
if(u==s._trace_x.length)return;var v=[];if(e.days>6){var f=new Date(e.days);scheduler.date.date_part(new Date(n))<=+f&&+i>=+f&&v.push(f)}else v.push.apply(v,scheduler._get_dates_by_index(e.days));for(var g=e.zones,m=scheduler._get_css_classes_by_config(e),p=0;p<l.length;p++){t=o[p],r=l[p];for(var u=0;u<v.length;u++)for(var y=v[u],x=0;x<g.length;x+=2){var b=g[x],w=g[x+1],k=new Date(+y+60*b*1e3),D=new Date(+y+60*w*1e3);if(k=new Date(k.valueOf()+1e3*(k.getTimezoneOffset()-y.getTimezoneOffset())*60),
D=new Date(D.valueOf()+1e3*(D.getTimezoneOffset()-y.getTimezoneOffset())*60),D>n&&i>k){var E=scheduler._get_block_by_config(e);E.className=m;var N=scheduler._timeline_getX({start_date:k},!1,s)-1,S=scheduler._timeline_getX({start_date:D},!1,s)-1,M=Math.max(1,S-N-1),C=s._section_height[r]-1||s.dy-1;E.style.cssText="height: "+C+"px; left: "+N+"px; width: "+M+"px; top: 0;",t.insertBefore(E,t.firstChild),d.push(E)}}}return d}return a.apply(scheduler,[e,t,r])};var r=scheduler._append_mark_now;scheduler._append_mark_now=function(e,t){
if(scheduler.matrix&&scheduler.matrix[scheduler._mode]){var a=scheduler._currentDate(),n=scheduler._get_zone_minutes(a),i={days:+scheduler.date.date_part(a),zones:[n,n+1],css:"dhx_matrix_now_time",type:"dhx_now_time"};return scheduler._render_marked_timespan(i)}return r.apply(scheduler,[e,t])};var n=scheduler._mark_timespans;scheduler._mark_timespans=function(){if(scheduler.matrix&&scheduler.matrix[scheduler.getState().mode]){for(var e=[],t=scheduler.matrix[scheduler.getState().mode],a=t.y_unit,r=0;r<a.length;r++){
var i=a[r].key,s=t._scales[i],d=scheduler._on_scale_add_marker(s,i);e.push.apply(e,d)}return e}return n.apply(this,arguments)};var i=scheduler._on_scale_add_marker;scheduler._on_scale_add_marker=function(e,t){if(scheduler.matrix&&scheduler.matrix[scheduler._mode]){var a=[],r=scheduler._marked_timespans;if(r&&scheduler.matrix&&scheduler.matrix[scheduler._mode])for(var n=scheduler._mode,s=scheduler._min_date,d=scheduler._max_date,l=r.global,o=scheduler.date.date_part(new Date(s));d>o;o=scheduler.date.add(o,1,"day")){
var _=+o,c=o.getDay(),h=[],u=l[_]||l[c];if(h.push.apply(h,scheduler._get_configs_to_render(u)),r[n]&&r[n][t]){var v=[],f=scheduler._get_types_to_render(r[n][t][c],r[n][t][_]);v.push.apply(v,scheduler._get_configs_to_render(f)),v.length&&(h=v)}for(var g=0;g<h.length;g++){var m=h[g],p=m.days;7>p?(p=_,a.push.apply(a,scheduler._render_marked_timespan(m,e,t,o,scheduler.date.add(o,1,"day"))),p=c):a.push.apply(a,scheduler._render_marked_timespan(m,e,t,o,scheduler.date.add(o,1,"day")))}}return a}return i.apply(this,arguments);
},scheduler._resolve_timeline_section=function(e,t){var a=0,r=0;for(a;a<this._colsS.heights.length&&(r+=this._colsS.heights[a],!(r>t.y));a++);e.y_unit[a]||(a=e.y_unit.length-1),this._drag_event&&!this._drag_event._orig_section&&(this._drag_event._orig_section=e.y_unit[a].key),t.fields={},a>=0&&e.y_unit[a]&&(t.section=t.fields[e.y_property]=e.y_unit[a].key)},scheduler._update_timeline_section=function(e){var t=e.view,a=e.event,r=e.pos;if(a){if(a[t.y_property]!=r.section){var n=this._get_timeline_event_height(a,t);
a._sorder=this._get_dnd_order(a._sorder,n,t._section_height[r.section])}a[t.y_property]=r.section}},scheduler._get_date_index=function(e,t){for(var a=0,r=e._trace_x;a<r.length-1&&+t>=+r[a+1];)a++;return a},scheduler._timeline_drag_date=function(e,t){var a,r,n=e,i={x:t},s=0,d=0;for(d;d<=this._cols.length-1;d++)if(r=this._cols[d],s+=r,s>i.x){a=(i.x-(s-r))/r,a=0>a?0:a;break}if(n.round_position){var l=1,o=scheduler.getState().drag_mode;o&&"move"!=o&&"create"!=o&&(l=.5),a>=l&&d++,a=0}if(0===d&&this._ignores[0])for(d=1,
a=0;this._ignores[d];)d++;else if(d==this._cols.length&&this._ignores[d-1]){for(d=this._cols.length-1,a=0;this._ignores[d];)d--;d++}var _;if(d>=n._trace_x.length)_=scheduler.date.add(n._trace_x[n._trace_x.length-1],n.x_step,n.x_unit),n._end_correction&&(_=new Date(_-n._end_correction));else{var c=a*r*n._step+n._start_correction;_=new Date(+n._trace_x[d]+c)}return _},scheduler.attachEvent("onBeforeTodayDisplayed",function(){for(var e in scheduler.matrix){var t=scheduler.matrix[e];t.x_start=t._original_x_start;
}return!0}),scheduler.attachEvent("onOptionsLoad",function(){for(var e in scheduler.matrix){var t=scheduler.matrix[e];t.order={},scheduler.callEvent("onOptionsLoadStart",[]);for(var e=0;e<t.y_unit.length;e++)t.order[t.y_unit[e].key]=e;scheduler.callEvent("onOptionsLoadFinal",[]),scheduler._date&&t.name==scheduler._mode&&scheduler.setCurrentView(scheduler._date,scheduler._mode)}}),scheduler.attachEvent("onSchedulerResize",function(){if(scheduler.matrix[this._mode]){var e=scheduler.matrix[this._mode];
return scheduler._renderMatrix.call(e,!0,!0),!1}return!0}),scheduler.attachEvent("onBeforeDrag",function(e,t,a){if("resize"==t){var r=a.target||a.srcElement,n=scheduler._getClassName(r);n.indexOf("dhx_event_resize_end")<0?scheduler._drag_from_start=!0:scheduler._drag_from_start=!1}return!0})},scheduler._temp_matrix_scope();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_timeline.js.map