import threading
from flask import Flask, render_template, request, jsonify
import telebot
from google import genai

app = Flask(__name__, template_folder='.') # لتشغيل الـ HTML من نفس المجلد

# 1. إعدادات البوت والـ AI المأخوذة من كودك الأصلي
TELEGRAM_TOKEN = "8708652512:AAGQsLfWKXM492w5rQFhWJJo9-J0t2E1dbM"
GEMINI_API_KEY = "AIzaSyDsnkAE5ipOr4BtNZW_ddI7SzeU00f8Eos"
AI_MODEL = "gemini-2.5-flash"
SYSTEM_INSTRUCTION = "أنت مساعد ذكاء اصطناعي ذكي، سريع جداً، وموجز في إجاباتك باللغة العربية. اسمك هو 'النجم'."

bot = telebot.TeleBot(TELEGRAM_TOKEN)
ai_client = genai.Client(api_key=GEMINI_API_KEY)

bot_status = "متوقف"
bot_thread = None

# --- إعدادات تفاعل البوت مع تيليجرام عند بدء التشغيل ---
@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    welcome_text = "مرحباً بك! أنا **النجم** ✨، بوت الذكاء الاصطناعي السريع الخاص بك.\nأرسل لي أي سؤال أو استفسار وسأجيبك فوراً!"
    bot.reply_to(message, welcome_text, parse_mode='Markdown')

@bot.message_handler(func=lambda message: True)
def handle_message(message):
    bot.send_chat_action(message.chat.id, 'typing')
    try:
        response = ai_client.models.generate_content(
            model=AI_MODEL, contents=message.text,
            config={"system_instruction": SYSTEM_INSTRUCTION}
        )
        bot.reply_to(message, response.text)
    except Exception as e:
        bot.reply_to(message, "عذراً، واجهت مشكلة في معالجة طلبك.")

def run_bot():
    global bot_status
    bot_status = "يعمل الآن"
    try:
        bot.infinity_polling(skip_pending=True)
    except Exception as e:
        bot_status = "متوقف"

# --- مسارات السيرفر للربط مع صفحة الويب ---

@app.route('/')
def index():
    # عرض صفحة التحكم المرفقة
    return render_template('index.html')

@app.route('/control', methods=['POST'])
def control():
    global bot_thread, bot_status
    data = request.json
    action = data.get('action')
    
    if action == 'start':
        if bot_status != "يعمل الآن":
            bot_thread = threading.Thread(target=run_bot, daemon=True)
            bot_thread.start()
            return jsonify({"status": "يعمل الآن", "message": "تم إطلاق نبضات البوت بنجاح واستقبال رسائل تيليجرام الحية!"})
        return jsonify({"status": "يعمل الآن", "message": "البوت يعمل مسبقاً في الخلفية."})
        
    elif action == 'stop':
        if bot_status == "يعمل الآن":
            bot.stop_polling()
            bot_status = "متوقف"
            return jsonify({"status": "متوقف", "message": "تم إيقاف استقبال الرسائل عبر تيليجرام مؤقتاً."})
        return jsonify({"status": "متوقف", "message": "البوت متوقف بالفعل."})

@app.route('/ask-ai', methods=['POST'])
def ask_ai():
    data = request.json
    user_text = data.get('text', '')
    try:
        # إرسال النص إلى نموذج الذكاء الاصطناعي وجلب الرد مباشرة لواجهة الويب
        response = ai_client.models.generate_content(
            model=AI_MODEL, contents=user_text,
            config={"system_instruction": SYSTEM_INSTRUCTION}
        )
        return jsonify({"reply": response.text})
    except Exception as e:
        return jsonify({"reply": f"خطأ أثناء توليد الرد من الذكاء الاصطناعي: {e}"})

if __name__ == "__main__":
    print("لوحة تحكم النجم جاهزة! افتح الرابط التالي في المتصفح: http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
