// بيانات المستخدم - مؤقتة (يمكن تخزينها في Firebase لاحقًا)
let userData = {
  xp: 0,
  level: 1,
  prayersDone: {
    الفجر: false,
    الظهر: false,
    العصر: false,
    المغرب: false,
    العشاء: false,
  }
};

// تعريف نقاط XP لكل صلاة
const XP_PER_PRAYER = 100;

// تعريف مستويات XP (تقدم على حسب XP)
const levels = [
  { level: 1, name: "مبتدئ", xpNeeded: 0 },
  { level: 2, name: "محافظ", xpNeeded: 500 },
  { level: 3, name: "مُتقدم", xpNeeded: 1200 },
  { level: 4, name: "مُخلص", xpNeeded: 2200 },
  { level: 5, name: "نَجِد", xpNeeded: 3500 },
  // ممكن تضيف مستويات أكثر حسب رغبتك
];

// تحديث الواجهة بعد التغيير
function updateUI() {
  // حساب المستوى الحالي بناءً على xp
  let currentLevel = levels[levels.length - 1]; // افتراضياً أعلى مستوى
  for (let i = levels.length - 1; i >= 0; i--) {
    if (userData.xp >= levels[i].xpNeeded) {
      currentLevel = levels[i];
      break;
    }
  }
  userData.level = currentLevel.level;

  // تحديث النصوص في الصفحة
  document.getElementById("rank").textContent = currentLevel.name;
  document.getElementById("xp").textContent = userData.xp;

  // الـ XP المطلوب للمستوى التالي
  const nextLevel = levels.find(l => l.level === currentLevel.level + 1);
  const nextXpNeeded = nextLevel ? nextLevel.xpNeeded : currentLevel.xpNeeded;
  document.getElementById("next-xp").textContent = nextXpNeeded;

  // حساب نسبة الشريط
  const xpRange = nextXpNeeded - currentLevel.xpNeeded;
  const xpProgress = userData.xp - currentLevel.xpNeeded;
  const percent = nextLevel ? (xpProgress / xpRange) * 100 : 100;

  // تحديث شريط التقدم
  const xpFill = document.getElementById("xp-fill");
  xpFill.style.width = percent + "%";

  // تحديث أزرار الصلاة (معطلة للصلوات المنجزة)
  for (const prayer in userData.prayersDone) {
    const card = document.querySelector(`.prayer-card[onclick*="${prayer}"]`);
    if (userData.prayersDone[prayer]) {
      card.classList.add("done");
      card.style.cursor = "default";
      card.onclick = null;
    } else {
      card.classList.remove("done");
      card.style.cursor = "pointer";
      card.onclick = () => markPrayer(prayer);
    }
  }
}

// علامة على أداء الصلاة
function markPrayer(prayer) {
  if (userData.prayersDone[prayer]) return; // منع التكرار

  // تحديث بيانات الصلاة
  userData.prayersDone[prayer] = true;
  userData.xp += XP_PER_PRAYER;

  // تحديث الواجهة
  updateUI();

  // TODO: تخزين البيانات في Firebase عند الربط
  console.log(`تم تسجيل أداء صلاة ${prayer}. XP الحالي: ${userData.xp}`);
}

// تسجيل خروج (يمكن ربطه بـ Firebase Auth)
function logout() {
  alert("تم تسجيل الخروج. شكرًا لاستخدامك مرتق!");
  // TODO: أضف عملية تسجيل الخروج هنا عند ربط Firebase
  // حالياً فقط إعادة تحميل الصفحة
  location.reload();
}

// تهيئة الصفحة
window.onload = () => {
  updateUI();
};