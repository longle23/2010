// ==========================================================================
// 20/10 LOVE PROJECT - JAVASCRIPT
// Dành tặng người yêu ngày Phụ nữ Việt Nam 20/10
// ==========================================================================

const CONFIG = {
    // Tùy chỉnh qua URL: ?name=Tên_Người_Yêu (mặc định ưu tiên nội dung viết trong HTML)
    recipientName: new URLSearchParams(window.location.search).get('name')?.trim() || 'em',
    senderName: 'Henry Long',
    senderSignoff: 'Người yêu của em - Henry Long 💕'
};

const targetName = CONFIG.recipientName;

// Đồng bộ tên người yêu vào giao diện (chỉ ghi đè nếu có tham số ?name= trên URL, mặc định giữ nguyên 100% nội dung trong HTML)
function applyRecipientName() {
    const urlName = new URLSearchParams(window.location.search).get('name')?.trim();
    if (!urlName) {
        // Giữ nguyên 100% text gốc viết trong index.html
        return;
    }

    const qEl = document.getElementById('question-text');
    if (qEl) {
        qEl.innerHTML = `Hôm nay 20/10 nè! Thế giới ngoài kia có làm <b>${urlName}</b> mệt mỏi hong? Anh chỉ muốn hỏi: Hôm nay em bé của anh có vui hongg? 🥰`;
    }

    const titleEl = document.getElementById('care-title');
    if (titleEl) {
        titleEl.innerHTML = `<b>${urlName}</b>, cùng nạp đầy năng lượng 20/10 nhé! ⚡💖`;
    }

    const letterTitleEl = document.getElementById('letter-title');
    if (letterTitleEl) {
        letterTitleEl.innerText = `Gửi ${urlName} - Em bé đáng yêu của anh,`;
    }

    const letterHighlight = document.getElementById('letter-highlight');
    if (letterHighlight) {
        letterHighlight.innerText = `Happy Vietnamese Women's Day! Yêu ${urlName} rất nhiều! ✨💖`;
    }

    const signoffEl = document.getElementById('letter-signoff');
    if (signoffEl) {
        signoffEl.innerText = CONFIG.senderSignoff;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyRecipientName);
} else {
    applyRecipientName();
}

// ==================== HỆ THỐNG ÂM THANH NATIVE (WEB AUDIO API) ====================
// Chạy mượt mà 100% offline, không phụ thuộc file mp3 ngoài, không bị lỗi CORS khi mở trực tiếp file
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
    }
    return audioCtx;
}

function playAudioTone(freqs, duration = 0.15, type = 'sine') {
    try {
        const ctx = getAudioContext();
        if (!ctx || ctx.state !== 'running') return;
        freqs.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.connect(gain);
            gain.connect(ctx.destination);
            const startTime = ctx.currentTime + idx * 0.08;
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0.0001, startTime);
            gain.gain.exponentialRampToValueAtTime(0.15, startTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            osc.start(startTime);
            osc.stop(startTime + duration);
        });
    } catch (e) {
        console.warn('Audio tone error:', e);
    }
}

const playPopSound = () => playAudioTone([587, 880], 0.12, 'sine');
const playBoingSound = () => playAudioTone([320, 240, 180], 0.18, 'triangle');
const playTadaSound = () => playAudioTone([523, 659, 784, 1046], 0.3, 'sine');
const playSecretSound = () => playAudioTone([523, 659, 784, 1046, 1318], 0.35, 'triangle');
const playSparkleSound = () => playAudioTone([880, 1046, 1318, 1568], 0.22, 'sine');
const playHeartSound = () => playAudioTone([698, 880, 1046], 0.15, 'sine');

// ==================== BỘ TẠO NHẠC NỀN CHILL BẰNG WEB AUDIO ====================
let isBgmPlaying = false;
let bgmTimer = null;
let bgmNoteIndex = 0;
let unlockListenersAttached = false;
let musicHintTimer = null;

// Giai điệu lãng mạn nhẹ nhàng (chuỗi hợp âm nốt nhạc Cmaj7 - Am7 - Fmaj7 - G)
const bgmMelody = [
    523.25, 659.25, 783.99, 987.77,  // Cmaj7 (C5, E5, G5, B5)
    440.00, 523.25, 659.25, 783.99,  // Am7   (A4, C5, E5, G5)
    349.23, 440.00, 523.25, 698.46,  // Fmaj7 (F4, A4, C5, F5)
    392.00, 493.88, 587.33, 783.99   // G     (G4, B4, D5, G5)
];

function playNextBgmNote() {
    if (!isBgmPlaying) return;
    try {
        const ctx = getAudioContext();
        if (ctx && ctx.state === 'running') {
            const freq = bgmMelody[bgmNoteIndex % bgmMelody.length];
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            const now = ctx.currentTime;
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(0.045, now + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);
            
            osc.start(now);
            osc.stop(now + 0.7);
            
            bgmNoteIndex++;
        }
    } catch (e) {}

    bgmTimer = setTimeout(playNextBgmNote, 380);
}

function showMusicHint() {
    if (isBgmPlaying) return;
    if (musicHintTimer) clearTimeout(musicHintTimer);
    musicHintTimer = setTimeout(() => {
        if (isBgmPlaying) return;
        let hint = document.getElementById('music-autoplay-hint');
        if (!hint) {
            hint = document.createElement('div');
            hint.id = 'music-autoplay-hint';
            hint.className = 'music-autoplay-hint';
            hint.innerHTML = '<span class="music-hint-icon">🎵</span><span class="music-hint-text">Chạm vào màn hình để bật nhạc chill 20/10 nha ✨</span>';
            hint.onclick = () => {
                startBgmMusic();
            };
            document.body.appendChild(hint);
        } else {
            hint.classList.remove('fade-out', 'hidden');
        }
    }, 600);
}

function hideMusicHint() {
    if (musicHintTimer) {
        clearTimeout(musicHintTimer);
        musicHintTimer = null;
    }
    const hint = document.getElementById('music-autoplay-hint');
    if (hint) {
        hint.classList.add('fade-out');
        setTimeout(() => {
            if (hint.parentNode) hint.parentNode.removeChild(hint);
        }, 350);
    }
    const toggleBtn = document.getElementById('btn-music-toggle');
    if (toggleBtn) {
        toggleBtn.classList.remove('music-pending');
    }
}

function setupAutoplayUnlock() {
    if (unlockListenersAttached) return;
    unlockListenersAttached = true;

    const unlockHandler = () => {
        const ctx = getAudioContext();
        if (ctx && ctx.state === 'suspended') {
            ctx.resume().then(() => {
                startBgmMusic();
            }).catch(() => {});
        } else {
            startBgmMusic();
        }

        const events = ['click', 'touchstart', 'touchend', 'pointerdown', 'mousedown', 'keydown'];
        events.forEach(evt => {
            document.removeEventListener(evt, unlockHandler, true);
            window.removeEventListener(evt, unlockHandler, true);
        });
        unlockListenersAttached = false;
        hideMusicHint();
    };

    const events = ['click', 'touchstart', 'touchend', 'pointerdown', 'mousedown', 'keydown'];
    events.forEach(evt => {
        document.addEventListener(evt, unlockHandler, { capture: true, once: true, passive: true });
        window.addEventListener(evt, unlockHandler, { capture: true, once: true, passive: true });
    });
}

function startBgmMusic() {
    const ctx = getAudioContext();
    const bars = document.getElementById('equalizer-bars');
    const label = document.getElementById('music-label');
    const toggleBtn = document.getElementById('btn-music-toggle');

    if (!ctx) return;

    if (ctx.state === 'suspended') {
        ctx.resume().then(() => {
            if (!isBgmPlaying) {
                isBgmPlaying = true;
                if (bars) bars.classList.remove('hidden');
                if (label) label.innerText = 'Nhạc: Bật';
                if (toggleBtn) toggleBtn.classList.remove('music-pending');
                hideMusicHint();
                playNextBgmNote();
            }
        }).catch(() => {
            if (label && !isBgmPlaying) label.innerText = 'Nhạc: Chờ chạm';
            if (toggleBtn) toggleBtn.classList.add('music-pending');
            showMusicHint();
        });

        setupAutoplayUnlock();
        return;
    }

    if (isBgmPlaying) return;
    isBgmPlaying = true;
    if (bars) bars.classList.remove('hidden');
    if (label) label.innerText = 'Nhạc: Bật';
    if (toggleBtn) toggleBtn.classList.remove('music-pending');
    hideMusicHint();
    playNextBgmNote();
}

function stopBgmMusic() {
    isBgmPlaying = false;
    if (bgmTimer) {
        clearTimeout(bgmTimer);
        bgmTimer = null;
    }
    const bars = document.getElementById('equalizer-bars');
    const label = document.getElementById('music-label');
    const toggleBtn = document.getElementById('btn-music-toggle');
    if (bars) bars.classList.add('hidden');
    if (label) label.innerText = 'Nhạc: Tắt';
    if (toggleBtn) toggleBtn.classList.remove('music-pending');
    hideMusicHint();
}

function toggleBgmMusic() {
    playPopSound();
    if (isBgmPlaying) {
        stopBgmMusic();
    } else {
        startBgmMusic();
    }
}

// ==================== GIAI ĐOẠN 1: NÚT CHẠY TRỐN & HỎI THĂM ====================
const noTexts = [
    "Hơi mệt xíu 🥺",
    "Hôm nay đi làm mệt lắm hả em bé iuu? 🥺",
    "Ai dám làm công chúa của anh buồn saoo? 💔",
    "Thương em nhiều lắm nè, ngoan anh ôm anh nha! 🥺",
    "Hôm nay là 20/10 mà, em bé không được mệt đó nha! 😜",
    "Hết nút mệt mỏi rồi! Vui lên cùng anh nè! 💖"
];

const emojis = ["🥺", "😭", "😤", "🫂", "😜", "🥰"];

let clickCount = 0;
const maxClicks = 5;

let yesSize = 16;
let yesPaddingV = 14;
let yesPaddingH = 30;

function refuseProposal() {
    clickCount++;
    if (!isBgmPlaying) {
        startBgmMusic();
    }
    playBoingSound();

    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    const emojiEl = document.getElementById('emoji');
    const qEl = document.getElementById('question-text');
    const hintEl = document.getElementById('hint-text');

    if (clickCount < maxClicks) {
        if (btnNo) btnNo.innerText = noTexts[clickCount];
        if (emojiEl) emojiEl.innerText = emojis[clickCount];

        // Tăng kích thước nút "Vui lắm nha!"
        yesSize += 4;
        yesPaddingV += 3;
        yesPaddingH += 6;
        if (btnYes) {
            btnYes.style.fontSize = yesSize + 'px';
            btnYes.style.padding = `${yesPaddingV}px ${yesPaddingH}px`;
        }

        if (hintEl) {
            hintEl.innerText = `Lần bấm thứ ${clickCount}: Vẫn đang đợi nụ cười của ${targetName} đó nha! 🥰`;
        }

        // Tạo hiệu ứng lắc nhẹ
        btnNo.style.transform = `translate(${Math.random() * 12 - 6}px, ${Math.random() * 12 - 6}px)`;
    } else {
        // Đến lượt bấm cuối cùng: Ẩn nút "Mệt" và bắt buộc vui!
        if (btnNo) btnNo.classList.add('hidden');
        if (qEl) {
            qEl.innerHTML = `Hết nút mệt mỏi rồi nha! Bắt buộc hôm nay <b>${targetName}</b> phải thật vui vẻ và hạnh phúc nhé! 🥰✨`;
        }
        if (emojiEl) emojiEl.innerText = "🥰";
        if (hintEl) hintEl.innerText = "Giờ thì bấm nút màu hồng siêu to khổng lồ này đi nàooo! 👇";

        if (btnYes) {
            btnYes.style.fontSize = (yesSize + 6) + 'px';
            btnYes.style.padding = `${yesPaddingV + 6}px ${yesPaddingH + 12}px`;
            btnYes.style.animation = 'unlockPulse 1s infinite ease-in-out';
        }
    }
}

function acceptProposal() {
    playTadaSound();
    document.getElementById('main-card').classList.add('hidden');
    document.getElementById('success-card').classList.remove('hidden');
    createFireworks();
    
    // Tự động bật nhạc chill nếu chưa bật
    if (!isBgmPlaying) {
        startBgmMusic();
    }
}

// ==================== GIAI ĐOẠN 2: TRẠM SẠC NĂNG LƯỢNG ====================
let currentEnergy = 20;

function addEnergy(amount) {
    if (currentEnergy >= 100) return;

    currentEnergy += amount;
    if (currentEnergy > 100) currentEnergy = 100;

    const fillElement = document.getElementById('energy-fill');
    const textElement = document.getElementById('energy-text');

    if (fillElement) fillElement.style.width = currentEnergy + '%';
    if (textElement) textElement.innerText = currentEnergy + '%';

    if (currentEnergy === 100) {
        const letterButton = document.getElementById('letter-unlock-button');
        if (letterButton) letterButton.classList.remove('hidden');
        playSparkleSound();
        createFireworks();
    }
}

// 1. Giai điệu Chill
function triggerMusic() {
    addEnergy(25);
    playPopSound();
    startBgmMusic();
    document.getElementById('care-emoji').innerText = "🎧🎶";
    showDisplay(`🎶 Đã kích hoạt giai điệu chữa lành dành riêng cho ${targetName}! Hãy thả lỏng cơ thể, mọi việc mệt mỏi bên ngoài cứ để anh lo nha! ✨`, "Giai điệu chữa lành:");
}

// 2. Chiếc ôm & 1000 nụ hôn
function triggerHug() {
    addEnergy(25);
    playPopSound();
    spawnHeartExplosion();
    document.getElementById('care-emoji').innerText = "🫂💖";
    showDisplay(`🫂 Sending a big warm hug! Gửi cho ${targetName} một chiếc ôm siêu to ấm áp và 1000 nụ hôn. Hôm nay em là cô gái xinh đẹp và hạnh phúc nhất! 💖`, "Vòng tay ấm áp:");
}

// 3. Lời nhắn 20/10 ngọt ngào
function triggerLetter() {
    addEnergy(25);
    playPopSound();
    document.getElementById('care-emoji').innerText = "💌✨";
    showDisplay(`💌 "Chúc mừng ngày Phụ nữ Việt Nam 20/10! Cảm ơn em vì đã bên anh, cùng anh chia sẻ từng ngày tháng tuyệt vời. Yêu ${targetName} rất nhiều!" 💕`, "Tin nhắn yêu thương:");
}

// 4. Phiếu Quà Tặng Yêu Thương (Love Vouchers)
const vouchers = [
    `🎟️ VOUCHER 20/10: "Một ngày làm Nữ Hoàng" — Hôm nay ${targetName} chỉ việc xinh đẹp, mọi việc từ ăn uống đến dỗ dành đã có anh lo hết! 👑✨`,
    `🎟️ VOUCHER 20/10: "Ăn Thỏa Thích" — Đổi lấy 1 bữa ăn tất cả các món ${targetName} thèm (lẩu, nướng, trà sữa full topping... anh bao trọn gói!) 🧋🥩`,
    `🎟️ VOUCHER 20/10: "Sạc Pin Không Giới Hạn" — Đổi lấy một cái ôm thật chặt và bờ vai êm ái bất cứ khi nào em thấy mệt mỏi! 🫂💖`,
    `🎟️ VOUCHER 20/10: "Miễn Trừ Giận Dỗi" — Khi dùng phiếu này, anh tự động nhận sai 100% và dỗ em đến khi em mỉm cười mới thôi! 🥺🥰`,
    `🎟️ VOUCHER 20/10: "Buổi Hẹn Hò Trong Mơ" — Một chuyến lượn phố hóng gió, chụp 1001 tấm hình sống ảo thật đẹp cùng anh! 🛵📸`
];

let lastVoucherIndex = -1;

function triggerVoucher() {
    addEnergy(25);
    playSparkleSound();
    document.getElementById('care-emoji').innerText = "🎁🎉";
    
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * vouchers.length);
    } while (randomIndex === lastVoucherIndex && vouchers.length > 1);
    lastVoucherIndex = randomIndex;

    showDisplay(vouchers[randomIndex], "Phiếu quà tặng 20/10:");
}

// Easter Egg khi click vào bó hoa
function easterEggPin() {
    addEnergy(35);
    playSecretSound();
    document.getElementById('care-emoji').innerText = "💐🎉";
    showDisplay(`🕵️‍♂️ BÍ MẬT ĐƯỢC MỞ KHÓA: Em bé tò mò ghé bấm trộm bó hoa đúng hong? Thưởng nóng cho ${targetName} 999,999 đóa hồng và tình yêu vô cực từ anh! 🌹⚡`, "Phần thưởng bí mật:");
    createFireworks();
}

// Hiệu ứng gõ máy tính cho khung hiển thị tin nhắn
let typingTimer = null;

function showDisplay(text, tag = "Tin nhắn yêu thương:") {
    const displayBox = document.getElementById('care-display');
    const displayText = document.getElementById('display-text');
    const displayTag = document.getElementById('display-tag');
    if (!displayBox || !displayText) return;

    if (displayTag && tag) {
        displayTag.innerText = tag;
    }

    displayBox.classList.remove('hidden');

    if (typingTimer) clearTimeout(typingTimer);
    displayText.textContent = "";
    
    // Tách mảng ký tự bằng Array.from để bảo toàn emoji và khoảng trắng
    const chars = Array.from(text);
    typeWriter(displayText, chars, 0);
}

function typeWriter(element, chars, i) {
    const list = Array.isArray(chars) ? chars : Array.from(chars);
    if (i < list.length) {
        element.textContent = list.slice(0, i + 1).join('');
        typingTimer = setTimeout(() => {
            typeWriter(element, list, i + 1);
        }, 18);
    }
}

// ==================== GIAI ĐOẠN 3: BỨC THƯ BÍ MẬT & ALBUM ====================
function openLetter() {
    if (currentEnergy < 100) return;
    const letterScreen = document.getElementById('letter-screen');
    if (!letterScreen) return;

    letterScreen.classList.remove('hidden');
    document.body.classList.add('letter-open');
    createFireworks();
    playTadaSound();
}

function closeLetter() {
    const letterScreen = document.getElementById('letter-screen');
    if (!letterScreen) return;

    letterScreen.classList.add('hidden');
    document.body.classList.remove('letter-open');
    const letterBtn = document.getElementById('letter-unlock-button');
    if (letterBtn) letterBtn.focus();
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const lightbox = document.getElementById('lightbox-modal');
        if (lightbox && !lightbox.classList.contains('hidden')) {
            closeLightbox();
            return;
        }

        const letterScreen = document.getElementById('letter-screen');
        if (letterScreen && !letterScreen.classList.contains('hidden')) {
            closeLetter();
        }
    }
});

// Thả tim cho bạn trai
let boyfriendHearts = 0;

function sendHeartToBoyfriend() {
    boyfriendHearts++;
    playHeartSound();
    
    const countEl = document.getElementById('heart-count');
    if (countEl) countEl.innerText = boyfriendHearts;

    const feedback = document.getElementById('heart-feedback');
    if (feedback) {
        feedback.classList.remove('hidden');
        feedback.innerText = `Đã gửi ${boyfriendHearts} trái tim đến anh ${CONFIG.senderName}! 🥰`;
    }

    // Bắn tim bay lên
    const btn = document.getElementById('btn-send-heart');
    if (btn) {
        const rect = btn.getBoundingClientRect();
        for (let i = 0; i < 5; i++) {
            createFloatingHeart(rect.left + rect.width / 2, rect.top);
        }
    }
}

function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'flying-heart';
    const emojis = ['💖', '💕', '💗', '💓', '🥰', '✨'];
    heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    const tx = (Math.random() - 0.5) * 120;
    heart.style.setProperty('--tx', `${tx}px`);
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
}

function spawnHeartExplosion() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    for (let i = 0; i < 18; i++) {
        setTimeout(() => {
            createFloatingHeart(
                centerX + (Math.random() - 0.5) * 200,
                centerY + (Math.random() - 0.5) * 100
            );
        }, i * 40);
    }
}

// ==================== LIGHTBOX XEM ẢNH PHÓNG TO ====================
function openLightbox(imgSrc, caption) {
    playPopSound();
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');

    if (modal && img && cap) {
        img.src = imgSrc;
        cap.innerText = caption;
        modal.classList.remove('hidden');
    }
}

function closeLightbox(event) {
    if (event) event.stopPropagation();
    const modal = document.getElementById('lightbox-modal');
    if (modal) modal.classList.add('hidden');
}

// ==================== HIỆU ỨNG PHÁO HOA ĂN MỪNG ====================
function createFireworks() {
    const colors = ['#ff2a5f', '#fef08a', '#a7f3d0', '#60a5fa', '#f472b6', '#fb7185', '#e9d5ff'];
    for (let wave = 0; wave < 3; wave++) {
        setTimeout(() => {
            const startX = window.innerWidth * (0.3 + Math.random() * 0.4);
            const startY = window.innerHeight * (0.3 + Math.random() * 0.4);

            for (let j = 0; j < 30; j++) {
                const particle = document.createElement('div');
                particle.classList.add('firework-particle');
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.left = startX + 'px';
                particle.style.top = startY + 'px';

                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 180 + 40;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;

                particle.style.setProperty('--tx', `${tx}px`);
                particle.style.setProperty('--ty', `${ty}px`);

                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 850);
            }
        }, wave * 250);
    }
}

// ==================== CÁNH HOA & TRÁI TIM RƠI TỰ DO NỀN ====================
function initFallingEffect() {
    const container = document.getElementById('falling-container');
    if (!container) return;

    const symbols = ['🌸', '🌷', '✨', '💖', '💮', '💕'];
    
    function createFallingItem() {
        if (document.hidden) return;
        const item = document.createElement('span');
        item.className = 'falling-item';
        item.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        item.style.left = Math.random() * 100 + 'vw';
        item.style.fontSize = (Math.random() * 14 + 14) + 'px';
        const duration = Math.random() * 5 + 6; // 6s - 11s
        item.style.animationDuration = duration + 's';
        
        container.appendChild(item);
        setTimeout(() => {
            item.remove();
        }, duration * 1000);
    }

    // Tạo cánh hoa rơi định kỳ
    setInterval(createFallingItem, 700);
}

// ==================== TỰ ĐỘNG BẬT NHẠC KHI VÀO TRANG ====================
function initAutoMusic() {
    startBgmMusic();
    setupAutoplayUnlock();
}

// Khởi chạy khi tải trang
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initFallingEffect();
        initAutoMusic();
    });
} else {
    initFallingEffect();
    initAutoMusic();
}

window.addEventListener('load', initAutoMusic, { once: true });
window.addEventListener('pageshow', initAutoMusic, { once: true });

// Cố gắng kích hoạt ngay lập tức
initAutoMusic();

