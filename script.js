// تبديل الصفحات
function switchPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'block';

  // تحديث زر التنقل السفلي (اختياري)
  document.querySelectorAll('.bottom-nav button').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = [...document.querySelectorAll('.bottom-nav button')]
    .find(btn => btn.getAttribute('onclick').includes(pageId));
  if (activeBtn) activeBtn.classList.add('active');
}

// نظام XP و رتب
let xp = 0;
const xpPerPrayer = 100;
const xpDisplay = document.getElementById('xp');
const rankDisplay = document.getElementById('rank');

// تحديث الرتبة حسب XP
function updateRank() {
  let rank = "مبتدئ";
  if (xp >= 500) rank = "متقدم";
  if (xp >= 1000) rank = "محترف";
  if (xp >= 2000) rank = "خاشع";
  rankDisplay.textContent = rank;
}

// تسجيل صلاة
document.querySelectorAll('.prayer-card').forEach(card => {
  card.addEventListener('click', () => {
    xp += xpPerPrayer;
    if (xpDisplay) xpDisplay.textContent = xp;
    updateRank();
    alert("تم تسجيل الصلاة! +100 XP 🎉");
  });
});

// تخزين محلي (اختياري)
window.addEventListener('beforeunload', () => {
  localStorage.setItem("xp", xp);
});

window.addEventListener('load', () => {
  const savedXP = localStorage.getItem("xp");
  if (savedXP) {
    xp = parseInt(savedXP);
    if (xpDisplay) xpDisplay.textContent = xp;
    updateRank();
  }
});