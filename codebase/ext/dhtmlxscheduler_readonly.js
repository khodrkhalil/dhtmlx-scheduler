/*
@license
dhtmlxScheduler v.5.0.0 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.attachEvent("onTemplatesReady",function(){function t(e,t,a,i){for(var n=t.getElementsByTagName(e),r=a.getElementsByTagName(e),s=r.length-1;s>=0;s--){var a=r[s];if(i){var d=document.createElement("span");d.className="dhx_text_disabled",d.innerHTML=i(n[s]),a.parentNode.insertBefore(d,a),a.parentNode.removeChild(a)}else a.disabled=!0,t.checked&&(a.checked=!0)}}var a=e.config.lightbox.sections.slice(),i=e.config.buttons_left.slice(),n=e.config.buttons_right.slice();e.attachEvent("onBeforeLightbox",function(t){
if(this.config.readonly_form||this.getEvent(t).readonly){this.config.readonly_active=!0;for(var r=0;r<this.config.lightbox.sections.length;r++)this.config.lightbox.sections[r].focus=!1}else this.config.readonly_active=!1,e.config.lightbox.sections=a.slice(),e.config.buttons_left=i.slice(),e.config.buttons_right=n.slice();var s=this.config.lightbox.sections;if(this.config.readonly_active){for(var r=0;r<s.length;r++)if("recurring"==s[r].type){this.config.readonly_active&&s.splice(r,1);break}for(var d=["dhx_delete_btn","dhx_save_btn"],o=[e.config.buttons_left,e.config.buttons_right],r=0;r<d.length;r++)for(var l=d[r],_=0;_<o.length;_++){
for(var c=o[_],h=-1,u=0;u<c.length;u++)if(c[u]==l){h=u;break}-1!=h&&c.splice(h,1)}}return this.resetLightbox(),!0});var r=e._fill_lightbox;e._fill_lightbox=function(){var a=this.getLightbox();this.config.readonly_active&&(a.style.visibility="hidden",a.style.display="block");var i=r.apply(this,arguments);if(this.config.readonly_active&&(a.style.visibility="",a.style.display="none"),this.config.readonly_active){var n=this.getLightbox(),d=this._lightbox_r=n.cloneNode(!0);d.id=e.uid(),d.className+=" dhx_cal_light_readonly",
t("textarea",n,d,function(e){return e.value}),t("input",n,d,!1),t("select",n,d,function(e){return e.options.length?e.options[Math.max(e.selectedIndex||0,0)].text:""}),n.parentNode.insertBefore(d,n),s.call(this,d),e._lightbox&&e._lightbox.parentNode.removeChild(e._lightbox),this._lightbox=d,e.config.drag_lightbox&&(d.firstChild.onmousedown=e._ready_to_dnd),this.setLightboxSize(),d.onclick=function(t){var a=t?t.target:event.srcElement;if(a.className||(a=a.previousSibling),(!(a&&a.className&&e._getClassName(a).indexOf("dhx_btn_set")>-1)||(a=a.querySelector("[dhx_button]")))&&(e._getClassName(a)||(a=a.previousSibling),
a&&e._getClassName(a)))switch(e._getClassName(a)){case"dhx_cancel_btn":e.callEvent("onEventCancel",[e._lightbox_id]),e._edit_stop_event(e.getEvent(e._lightbox_id),!1),e.hide_lightbox()}},d.onkeydown=function(t){var a=t||window.event,i=t.target||t.srcElement,n=i.querySelector("[dhx_button]");switch(n||(n=i.parentNode.querySelector(".dhx_custom_button, .dhx_readonly")),(t||a).keyCode){case 32:if((t||a).shiftKey)return;n&&n.click&&n.click();break;case e.keys.edit_cancel:e.cancel_lightbox()}}}return i;
};var s=e.showCover;e.showCover=function(){this.config.readonly_active||s.apply(this,arguments)};var d=e.hide_lightbox;e.hide_lightbox=function(){return this._lightbox_r&&(this._lightbox_r.parentNode.removeChild(this._lightbox_r),this._lightbox_r=this._lightbox=null),d.apply(this,arguments)}})});