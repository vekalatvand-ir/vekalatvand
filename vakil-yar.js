(function(){
"use strict";
var WA="989934164512";
var KB=[
{k:["مهریه","مهر","نرخ روز","شاخص","سکه","محاسبه"],t:"محاسبه مهریه به نرخ روز",a:"مهریه پولی که در عقد تعیین شده، با شاخص سالانه بانک مرکزی به نرخ روز حساب می‌شود: مبلغ × شاخص سال مطالبه ÷ شاخص سال عقد. بخش «مهریه‌ات الان چقدر می‌ارزه؟» همین صفحه را امتحان کنید.",l:"legal-center/mahrieh/rahnamaye-jame/"},
{k:["110","114","14","سقف","حبس","زندان","مصوبه"],t:"سقف ۱۱۰ سکه و حبس",a:"طبق قانون، فقط تا ۱۱۰ سکه مهریه ضمانت حبس (جلب) دارد؛ مازاد آن باید از اموال مرد وصول شود. بحث مصوبه جدید ۱۴ سکه هنوز نهایی و لازم‌الاجرا نشده — ملاک همان ۱۱۰ سکه است.",l:"legal-center/mahrieh/rahnamaye-jame/"},
{k:["اعسار","قسط","تقسیط","ندارم","بیکار"],t:"اعسار و تقسیط مهریه",a:"اگر مرد توان پرداخت یکجای مهریه را نداشته باشد، دادخواست اعسار می‌دهد و دادگاه با بررسی اموال و درآمد، پرداخت را قسطی می‌کند. داشتن شغل یا ملک معمولاً اعسار را رد می‌کند.",l:"legal-center/mahrieh/rahnamaye-jame/"},
{k:["توقیف","مصادره","ماشین","خودرو","حساب","ملک مرد","اموال"],t:"توقیف اموال برای مهریه",a:"زن می‌تواند همزمان با دادخواست، تأمین خواسته بخواهد و ماشین، ملک، حساب و حقوق مرد را توقیف کند تا قبل از رأی نهایی منتقل نشود. مستثنیات دِین (مثل خانه حداقلی) توقیف نمی‌شود.",l:"legal-center/mahrieh/rahnamaye-jame/"},
{k:["ثبت","اجرای ثبت","اجراییه","سند ازدواج"],t:"مطالبه مهریه از اجرای ثبت",a:"دو راه دارید: ۱) اجرای ثبت (سریع‌تر، با سند ازدواج به اداره ثبت مراجعه می‌کنید) ۲) دادگاه خانواده (برای موارد اختلافی مثل اعسار). خیلی‌ها اول از ثبت شروع می‌کنند.",l:"legal-center/mahrieh/rahnamaye-jame/"},
{k:["عندالمطالبه","عندالاستطاعه","عند الاستطاعه","تفاوت"],t:"عندالمطالبه و عندالاستطاعه",a:"عندالمطالبه یعنی هر وقت زن بخواهد می‌تواند بگیرد. عندالاستطاعه یعنی فقط وقتی مرد توان مالی داشته باشد. اکثر سندهای امروزی عندالمطالبه است — داخل سند ازدواجتان قید شده.",l:"legal-center/mahrieh/anvae-mahrieh/"},
{k:["انواع مهریه","مهرالمثل","مهرالمتعه","مهرالسنه"],t:"انواع مهریه",a:"مهرالمسمی (تعیین‌شده در عقد)، مهرالمثل (عرف هم‌شأن زن وقتی مهری تعیین نشده)، مهرالمتعه (هدیه بعد از طلاق قبل از نزدیکی)، مهرالسنه (سنت ۵۰۰ درهم). جزئیات با مثال در صفحه انواع مهریه هست.",l:"legal-center/mahrieh/anvae-mahrieh/"},
{k:["طلاق","جدایی","توافقی","خلع","مبارات","رجعی","بائن"],t:"طلاق",a:"طلاق توافقی (سریع‌تر، چند هفته با توافق روی مهریه/حضانت/نفقه)، طلاق یک‌طرفه از طرف مرد (هر وقت، با پرداخت حقوق زن)، و طلاق از طرف زن (با عسر و حرج یا وکالت در طلاق/شرط ضمن عقد). شرح پرونده‌تان را در واتساپ بفرستید تا مسیر دقیق را بگویم.",l:"#contact"},
{k:["حضانت","بچه","فرزند","کودک","ملاقات"],t:"حضانت فرزند",a:"قاعده کلی: حضانت تا ۷ سالگی با مادر، بعد با پدر است؛ اما دادگاه همیشه «مصلحت طفل» را ملاک می‌داند و قابل تغییر است. بعد از ۷ سال هم نظر و مصلحت بچه بررسی می‌شود.",l:"#contact"},
{k:["نفقه","خرجی","اجرت المثل","نحله"],t:"نفقه و اجرت‌المثل",a:"نفقه (خوراک، مسکن، درمان) با تمکین زن واجب می‌شود. اجرت‌المثل دستمزد کارهای زن در خانه در ایام زوجیت است و در طلاق مطالبه می‌شود. مبلغ را کارشناس رسمی تعیین می‌کند.",l:"#contact"},
{k:["کلاهبرداری","برداشت","فیشینگ","پیامک جعلی"],t:"کلاهبرداری",a:"کلاهبرداری یعنی بردن مال با فریب (مثل پیامک جعلی، فروش مال غیر). مجازات آن حبس + رد مال است. مهم‌ترین کار: سریع شکایت کیفری + حفظ ادله (پیامک‌ها، رسیدها). یک نمونه برائت موفق ما در صفحه پرونده‌هاست.",l:"#cases"},
{k:["سرقت","دزدی","موبایل","کیف قاپی"],t:"سرقت",a:"مجازات سرقت بسته به نوع (تعزیری یا حدی) و سابقه متفاوت است. اگر متهم هستید یا شاکی، قبل از هر اظهارنظر در کلانتری با وکیل مشورت کنید — یک جمله اشتباه سرنوشت پرونده را عوض می‌کند.",l:"#contact"},
{k:["جعل","سند جعلی","امضا","ساخته"],t:"جعل و استفاده از سند مجعول",a:"جعل یعنی ساختن یا تغییر سند/امضا. هم جاعل و هم کسی که با علم به جعلی بودن از آن استفاده کند مجازات می‌شود. کارشناسی خط و امضا در این پرونده‌ها تعیین‌کننده است.",l:"#contact"},
{k:["مواد","مخدر","شیشه","تریاک","اعتیاد"],t:"مواد مخدر",a:"مجازات مواد مخدر از جریمه تا حبس‌های سنگین، بسته به نوع و مقدار ماده و سابقه است. این پرونده‌ها فنی‌اند (وزن خالص، آزمایشگاه) و حتماً وکیل متخصص می‌خواهند.",l:"#contact"},
{k:["چک","برگشتی","سفته","طلب","قرض","پولم"],t:"چک و مطالبه طلب",a:"برای چک برگشتی سه راه دارید: شکایت کیفری (سریع ولی شرایطی دارد)، مطالبه حقوقی، و اجرای ثبت (مستقیم از طریق اداره ثبت بدون دادگاه). گواهی عدم پرداخت را سریع بگیرید و مهلتش را از دست ندهید.",l:"#contact"},
{k:["قرارداد","مبایعه","قولنامه","بیعانه","فسخ"],t:"قرارداد و مبایعه‌نامه",a:"قبل از امضا یا فسخ هر قراردادی، متن را برای وکیل بفرستید. خیلی از پرونده‌های ملکی ما از یک بند مبهم در قولنامه شروع شده. خسارت فسخ یک‌طرفه معمولاً همان وجه التزام داخل قرارداده است.",l:"#contact"},
{k:["ملک","زمین","آپارتمان","خلع ید","تصرف","سند","ثبتی","افراز"],t:"دعاوی ملکی و ثبتی",a:"دعاوی ملکی (خلع ید، تصرف عدوانی، الزام به تنظیم سند، افراز) از پرهزینه‌ترین دعواهاست و اشتباه در انتخاب خواسته ماه‌ها وقت تلف می‌کند. سند و قولنامه را در واتساپ بفرستید تا خواسته درست مشخص شود.",l:"#services"},
{k:["دیوان","عدالت اداری","اداره کار","اخراج","بیمه","کارگر","کارفرما"],t:"دیوان عدالت و اداره کار",a:"اعتراض به رأی اداره کار، اخراج، بیمه و آرای ادارات دولتی در دیوان عدالت اداری یا هیأت‌های اداره کار بررسی می‌شود و مهلت اعتراض محدود است. رأی‌تان را بفرستید تا مهلتش را حساب کنم.",l:"#services"},
{k:["حق الوکاله","هزینه","دستمزد","تعرفه","قیمت وکیل","چقدر میگیری"],t:"حق‌الوکاله",a:"حق‌الوکاله طبق تعرفه قانونی و پیچیدگی پرونده تعیین و حتماً در قرارداد کتبی ذکر می‌شود. مشاوره تلفنی اولیه کوتاه برای بررسی اجمالی رایگان است — زنگ بزنید: 09934164512",l:"#faq"},
{k:["مشاوره","سوال","بپرسم","تلفنی","حضوری","تصویری"],t:"مشاوره",a:"مشاوره تلفنی اولیه کوتاه رایگان است. برای پرونده‌های جدی، مشاوره حضوری/تصویری با بررسی مدارک انجام می‌شود. مستقیم زنگ بزنید یا واتساپ پیام بدهید: 09934164512",l:"#contact"},
{k:["مدت","طول","چقدر طول میکشه","زمان"],t:"مدت پرونده",a:"بسته به نوع دعوا از چند هفته (طلاق توافقی، مطالبه چک از ثبت) تا یک تا دو سال (کیفری و ملکی سنگین) متغیر است. نوع پرونده‌تان را بگویید تا زمان واقع‌بینانه بگویم.",l:"#faq"},
{k:["شهرستان","شهر دیگر","تهران نیستم","حضوری"],t:"پرونده شهرستانی",a:"بله — با شبکه همکاران در سراسر کشور و مشاوره تصویری، از هر شهری پرونده قبول می‌کنیم. خیلی از موکل‌های ما بدون حتی یک سفر، کارشان را انجام می‌دهند.",l:"#faq"},
{k:["کیست","رزومه","سابقه","تحصیل","الماس"],t:"مرتضی الماس‌پور کیست",a:"مرتضی الماس‌پور، وکیل پایه یک دادگستری و مدیر دفتر وکالت‌وند؛ فارغ‌التحصیل دانشگاه بین‌المللی امام خمینی قزوین با بیش از ۱۰ سال تجربه و ۱۰۰+ پرونده موفق در سراسر کشور.",l:"#about"},
{k:["آدرس","کجاست","دفتر","لوکیشن"],t:"آدرس دفتر",a:"دفتر وکالت‌وند به‌صورت سراسری فعال است (مشاوره حضوری با هماهنگی، تلفنی و تصویری). برای هماهنگی: 09934164512",l:"#contact"},
{k:["سلام","درود","هی","hello","hi"],t:"سلام",a:"سلام! من «وکیل‌یار وکالت‌وند» هستم. سوالتان را بپرسید — مثلاً بنویسید: مهریه، طلاق، چک برگشتی، کلاهبرداری یا حضانت.",l:null}
];
function norm(s){return (s||"").replace(/[ي]/g,"ی").replace(/[ك]/g,"ک").replace(/[‌‍‎‏\u064B-\u0652]/g,"").replace(/[^\u0600-\u06FF0-9\s]/g," ").replace(/\s+/g," ").trim();}
function find(q){
  var n=" "+norm(q)+" ",best=null,bs=0;
  for(var i=0;i<KB.length;i++){var e=KB[i],s=0;
    for(var j=0;j<e.k.length;j++){var k=norm(e.k[j]);if(k&&n.indexOf(k)>-1){s+=k.length>4?3:(k.length>2?2:1);}}
    if(s>bs){bs=s;best=e;}}
  return bs>0?best:null;
}
var css="#vyFab{position:fixed;left:16px;bottom:148px;z-index:980;width:58px;height:58px;border-radius:50%;border:2px solid #f5e3b8;background:linear-gradient(145deg,#fff3d1,#c89b5a 60%,#7a4d1f);color:#1a120b;font-size:26px;cursor:pointer;box-shadow:0 12px 30px rgba(200,155,90,.5);display:grid;place-items:center;font-family:inherit}"
+"#vyPanel{position:fixed;left:12px;bottom:214px;z-index:981;width:min(372px,calc(100vw - 24px));height:min(560px,68vh);background:#120c07;border:1px solid #c89b5a;border-radius:20px;display:none;flex-direction:column;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.7);font-family:'Vazirmatn',sans-serif}"
+"#vyPanel.open{display:flex}"
+"#vyHead{background:linear-gradient(90deg,#5c3a1c,#c89b5a);color:#160e06;padding:12px 16px;font-weight:900;display:flex;align-items:center;gap:10px;font-size:.95rem}"
+"#vyHead small{display:block;font-size:.7rem;font-weight:500;opacity:.85}"
+"#vyBody{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}"
+".vyM{max-width:88%;padding:10px 14px;border-radius:14px;font-size:.85rem;line-height:1.9}"
+".vyB{background:#1e1409;border:1px solid rgba(200,155,90,.35);color:#f7f0e2;border-start-start-radius:4px;align-self:flex-start}"
+".vyU{background:linear-gradient(145deg,#f5e3b8,#c89b5a);color:#1a120b;font-weight:700;border-start-end-radius:4px;align-self:flex-end}"
+".vyM a{color:#e8c88a;font-weight:800}"
+".vyChips{display:flex;flex-wrap:wrap;gap:8px;padding:0 14px 8px}"
+".vyChips button{background:rgba(200,155,90,.12);border:1px solid #c89b5a;color:#e8c88a;border-radius:999px;padding:6px 14px;font-size:.75rem;font-family:inherit;cursor:pointer;font-weight:700}"
+"#vyFoot{display:flex;gap:8px;padding:10px;border-top:1px solid rgba(200,155,90,.25)}"
+"#vyIn{flex:1;background:#0a0705;border:1px solid rgba(200,155,90,.4);border-radius:12px;color:#f7f0e2;padding:10px 14px;font-family:inherit;font-size:.85rem}"
+"#vySend{background:linear-gradient(145deg,#fff3d1,#c89b5a);border:none;border-radius:12px;padding:10px 18px;font-weight:900;cursor:pointer;font-family:inherit}"
+".vyWa{display:inline-block;margin-top:8px;background:#1faa53;color:#fff!important;text-decoration:none;padding:8px 16px;border-radius:10px;font-size:.78rem;font-weight:800}"
+".vyDis{font-size:.68rem;opacity:.7;border-top:1px dashed rgba(200,155,90,.4);padding-top:8px;margin-top:4px}";
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
var fab=document.createElement("button");fab.id="vyFab";fab.setAttribute("aria-label","دستیار حقوقی");fab.innerHTML="⚖️";
var panel=document.createElement("div");panel.id="vyPanel";panel.setAttribute("role","dialog");panel.setAttribute("aria-label","وکیل‌یار وکالت‌وند");
panel.innerHTML='<div id="vyHead"><span style="font-size:1.5rem">⚖️</span><div>وکیل‌یار وکالت‌وند<small>پاسخ فوری هوشمند • دفتر مرتضی الماس‌پور</small></div></div><div id="vyBody"></div><div class="vyChips" id="vyChips"></div><div id="vyFoot"><input id="vyIn" placeholder="سوالت را بنویس... (مثل: مهریه)" autocomplete="off"><button id="vySend">➤</button></div>';
document.body.appendChild(fab);document.body.appendChild(panel);
var body=panel.querySelector("#vyBody"),inp=panel.querySelector("#vyIn");
function addWho(text,who,html){var d=document.createElement("div");d.className="vyM "+who;if(html){d.innerHTML=text;}else{d.textContent=text;}body.appendChild(d);body.scrollTop=body.scrollHeight;return d;}
function answer(q){
  addWho(q,"vyU");
  var e=find(q);
  if(e){
    var h="<b>"+e.t+"</b><br>"+e.a;
    if(e.l){h+='<br><a href="'+e.l+'">← مطالعه بیشتر</a>';}
    h+='<br><a class="vyWa" target="_blank" rel="noopener" href="https://wa.me/'+WA+'?text='+encodeURIComponent("سلام، سوال من درباره "+e.t+": "+q)+'">مشاوره واتساپ درباره این موضوع</a>';
    addWho(h,"vyB",true);
  }else{
    addWho('پاسخ دقیق این سوال را بهتر است وکیل بدهد تا اشتباه نشود. سوالتان را همین‌طور برای وکیل بفرستید:<br><a class="vyWa" target="_blank" rel="noopener" href="https://wa.me/'+WA+'?text='+encodeURIComponent("سلام، سوال حقوقی من: "+q)+'">ارسال سوال به واتساپ وکیل</a><div class="vyDis">توجه: پاسخ‌های من اطلاعات عمومی است و مشاوره حقوقی محسوب نمی‌شود.</div>',"vyB",true);
  }
}
fab.onclick=function(){panel.classList.toggle("open");if(panel.classList.contains("open")&&!body.children.length){addWho("سلام! من <b>وکیل‌یار وکالت‌وند</b> هستم 🤝<br>درباره مهریه، طلاق، چک، کیفری، ملکی... بپرسید. جواب فوری می‌دهم و اگر لازم بود مستقیم وصلتان می‌کنم به واتساپ وکیل.<div class='vyDis'>توجه: پاسخ‌ها اطلاعات عمومی است، نه مشاوره حقوقی.</div>","vyB",true);}};
var chips=["مهریه","طلاق توافقی","چک برگشتی","کلاهبرداری","حضانت","حق‌الوکاله"];
var cc=panel.querySelector("#vyChips");
chips.forEach(function(c){var b=document.createElement("button");b.textContent=c;b.onclick=function(){answer(c);};cc.appendChild(b);});
panel.querySelector("#vySend").onclick=function(){var v=inp.value.trim();if(v){inp.value="";answer(v);}};
inp.addEventListener("keydown",function(e){if(e.key==="Enter"){var v=inp.value.trim();if(v){inp.value="";answer(v);}}});
})();