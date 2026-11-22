(function(){
"use strict";
var WA="989934164512";
var _a="AQ.Ab8RN6JrO1vIe6oRk-2";
var _b="ewt5hUO0ag0AebOjQDRsrxx2SDr_tyA";
var GEMINI_KEY=_a+_b;
var MODELS=["gemini-3.5-flash-lite","gemini-3.5-flash","gemini-flash-lite-latest"];
var SYS="تو «وکیل‌یار وکالت‌وند» هستی: دستیار حقوقی فارسی دفتر مرتضی الماس‌پور، وکیل پایه یک دادگستری (بیش از ۱۰ سال تجربه، ۱۰۰+ پرونده موفق). متخصص قوانین ایران (مدنی، کیفری، خانواده، کار، تجارت، آیین دادرسی).\nقواعد:\n- فارسی روان، دقیق و کاربردی جواب بده. اول خلاصه، بعد قدم‌به‌قدم، بعد مدارک لازم و قدم بعدی.\n- اگر اسم خودت را پرسیدند بگو: من وکیل‌یار وکالت‌وند هستم، دستیار هوشمند دفتر مرتضی الماس‌پور.\n- شماره ماده را فقط وقتی مطمئنی بگو، وگرنه کلی بگو.\n- در انتهای جواب یک خط بگو: این راهنمایی عمومی است و جایگزین مشاوره وکیل نیست. برای پرونده‌تان در واتساپ پیام دهید.\n- جواب کوتاه و مفید بده (حداکثر ۳۰۰ کلمه) مگر قرارداد/لایحه خواسته شود.";
var hist=[];
var css="#vyFab{position:fixed;left:16px;bottom:148px;z-index:980;width:58px;height:58px;border-radius:50%;border:2px solid #f5e3b8;background:linear-gradient(145deg,#fff3d1,#c89b5a 60%,#7a4d1f);color:#1a120b;font-size:26px;cursor:pointer;box-shadow:0 12px 30px rgba(200,155,90,.5);display:grid;place-items:center;font-family:inherit}"
+"#vyPanel{position:fixed;left:12px;bottom:214px;z-index:981;width:min(372px,calc(100vw - 24px));height:min(560px,68vh);background:#120c07;border:1px solid #c89b5a;border-radius:20px;display:none;flex-direction:column;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.7);font-family:'Vazirmatn',sans-serif}"
+"#vyPanel.open{display:flex}"
+"#vyHead{background:linear-gradient(90deg,#5c3a1c,#c89b5a);color:#160e06;padding:12px 16px;font-weight:900;display:flex;align-items:center;gap:10px;font-size:.95rem}"
+"#vyHead small{display:block;font-size:.7rem;font-weight:500;opacity:.85}"
+"#vyBody{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}"
+".vyM{max-width:88%;padding:10px 14px;border-radius:14px;font-size:.85rem;line-height:1.9;white-space:pre-wrap}"
+".vyB{background:#1e1409;border:1px solid rgba(200,155,90,.35);color:#f7f0e2;border-start-start-radius:4px;align-self:flex-start}"
+".vyU{background:linear-gradient(145deg,#f5e3b8,#c89b5a);color:#1a120b;font-weight:700;border-start-end-radius:4px;align-self:flex-end}"
+".vyM a{color:#e8c88a;font-weight:800}"
+".vyChips{display:flex;flex-wrap:wrap;gap:8px;padding:0 14px 8px}"
+".vyChips button{background:rgba(200,155,90,.12);border:1px solid #c89b5a;color:#e8c88a;border-radius:999px;padding:6px 14px;font-size:.75rem;font-family:inherit;cursor:pointer;font-weight:700}"
+"#vyFoot{display:flex;gap:8px;padding:10px;border-top:1px solid rgba(200,155,90,.25)}"
+"#vyIn{flex:1;background:#0a0705;border:1px solid rgba(200,155,90,.4);border-radius:12px;color:#f7f0e2;padding:10px 14px;font-family:inherit;font-size:.85rem}"
+"#vySend{background:linear-gradient(145deg,#fff3d1,#c89b5a);border:none;border-radius:12px;padding:10px 18px;font-weight:900;cursor:pointer;font-family:inherit}"
+".vyWa{display:inline-block;margin-top:8px;background:#1faa53;color:#fff!important;text-decoration:none;padding:8px 16px;border-radius:10px;font-size:.78rem;font-weight:800}"
+".vyDis{font-size:.68rem;opacity:.7;border-top:1px dashed rgba(200,155,90,.4);padding-top:8px;margin-top:4px}"
+".vyPow{font-size:.62rem;opacity:.55;text-align:center}";
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
if(document.getElementById("vyFab")){document.getElementById("vyFab").remove();}
if(document.getElementById("vyPanel")){document.getElementById("vyPanel").remove();}
var fab=document.createElement("button");fab.id="vyFab";fab.setAttribute("aria-label","دستیار حقوقی");fab.innerHTML="⚖️";
var panel=document.createElement("div");panel.id="vyPanel";panel.setAttribute("role","dialog");panel.setAttribute("aria-label","وکیل‌یار وکالت‌وند");
panel.innerHTML='<div id="vyHead"><span style="font-size:1.5rem">⚖️</span><div>وکیل‌یار وکالت‌وند<small>متصل به Gemini • پاسخ هوشمند • دفتر مرتضی الماس‌پور</small></div></div><div id="vyBody"></div><div class="vyChips" id="vyChips"></div><div id="vyFoot"><input id="vyIn" placeholder="سوالت را بنویس... (مثل: مهریه)" autocomplete="off"><button id="vySend">➤</button></div>';
document.body.appendChild(fab);document.body.appendChild(panel);
var body=panel.querySelector("#vyBody"),inp=panel.querySelector("#vyIn");
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function fmt(s){var h=esc(s);h=h.replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");h=h.replace(/\n/g,"<br>");return h;}
function addWho(text,who,html){var d=document.createElement("div");d.className="vyM "+who;if(html){d.innerHTML=text;}else{d.textContent=text;}body.appendChild(d);body.scrollTop=body.scrollHeight;return d;}
async function answer(q){
  addWho(q,"vyU");
  hist.push({role:"user",text:q});
  var typing=addWho("⏳ جمینای داره فکر می‌کنه...","vyB");
  try{
    var past=hist.slice(-8,-1).map(function(m){return {role:m.role==="user"?"user":"model",parts:[{text:m.text}]};});
    var payload={system_instruction:{parts:[{text:SYS}]},contents:past.concat([{role:"user",parts:[{text:q}]}]),generationConfig:{temperature:0.4,maxOutputTokens:1500}};
    var lastErr="";var t="";
    for(var i=0;i<MODELS.length;i++){
      try{
        var url="https://generativelanguage.googleapis.com/v1beta/models/"+MODELS[i]+":generateContent?key="+encodeURIComponent(GEMINI_KEY);
        var res=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
        var j=await res.json();
        if(!res.ok) throw new Error((j.error&&j.error.message)||("خطای "+res.status));
        t=(j.candidates&&j.candidates[0]&&j.candidates[0].content&&j.candidates[0].content.parts||[]).map(function(x){return x.text||"";}).join("")||"";
        if(t) break;
        lastErr="پاسخ خالی";
      }catch(e){lastErr=e.message;}
    }
    if(!t) throw new Error(lastErr||"خطا در اتصال");
    hist.push({role:"ai",text:t});
    typing.innerHTML=fmt(t)+'<br><a class="vyWa" target="_blank" rel="noopener" href="https://wa.me/'+WA+'?text='+encodeURIComponent("سلام، سوال من درباره: "+q)+'">مشاوره واتساپ با وکیل</a><div class="vyDis">توجه: این راهنمایی عمومی با هوش مصنوعی است و مشاوره حقوقی محسوب نمی‌شود.</div><div class="vyPow">⚡ Powered by Gemini</div>';
    body.scrollTop=body.scrollHeight;
  }catch(e){
    typing.innerHTML='موقتاً وصل نشدم ('+esc(e.message)+'). سوالتان را مستقیم برای وکیل بفرستید:<br><a class="vyWa" target="_blank" rel="noopener" href="https://wa.me/'+WA+'?text='+encodeURIComponent("سلام، سوال حقوقی من: "+q)+'">ارسال به واتساپ وکیل</a>';
  }
}
fab.onclick=function(){panel.classList.toggle("open");if(panel.classList.contains("open")&&!body.children.length){addWho("سلام! من <b>وکیل‌یار وکالت‌وند</b> هستم 🤝<br>حالا با <b>Gemini</b> جواب می‌دهم، نه کلمه‌کلیدی! درباره مهریه، طلاق، چک، کیفری، ملکی... بپرسید.<div class='vyDis'>پاسخ‌ها با هوش مصنوعی + اطلاعات عمومی است.</div>","vyB",true);}};
var chips=["مهریه","طلاق توافقی","چک برگشتی","کلاهبرداری","حضانت","حق‌الوکاله"];
var cc=panel.querySelector("#vyChips");
chips.forEach(function(c){var b=document.createElement("button");b.textContent=c;b.onclick=function(){answer(c);};cc.appendChild(b);});
panel.querySelector("#vySend").onclick=function(){var v=inp.value.trim();if(v){inp.value="";answer(v);}};
inp.addEventListener("keydown",function(e){if(e.key==="Enter"){var v=inp.value.trim();if(v){inp.value="";answer(v);}}});
})();
