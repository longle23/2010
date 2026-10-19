// Các câu tâm sự cho nút thứ 2 (Tối đa 5 lần bấm)
const noTexts = [
    "Hơi mệt xíu 🥺",
    "Đi học áp lực lắm hửmmm 😭",
    "Hôm nay cột sống hơi đau saoo 💔",
    "Thế giới làm cậu hơi mệt ha 😔",
    "Hết cơ hội chọn nút này rồi, vui lên đi mừ! 💖"
];

// Emoji tương ứng theo từng lần bấm
const emojis = ["🥺", "😭", "💔", "😔", "🥰"];

let clickCount = 0;
const maxClicks = 5; // Giới hạn đúng 5 lần

let yesSize = 16;
let yesPaddingV = 14;
let yesPaddingH = 28;

function refuseProposal() {
    document.getElementById('sound-pop').play().catch(e => {});
    clickCount++;

    // Nếu chưa đến 5 lần thì đổi chữ và phóng to nút chính lên
    if (clickCount < maxClicks) {
        document.getElementById('btn-no').innerText = noTexts[clickCount];
        document.getElementById('emoji').innerText = emojis[clickCount];

        yesSize += 5;
        yesPaddingV += 3;
        yesPaddingH += 6;

        const btnYes = document.getElementById('btn-yes');
        btnYes.style.fontSize = yesSize + 'px';
        btnYes.style.padding = `${yesPaddingV}px ${yesPaddingH}px`;
    } 
    // Đến lần thứ 5 -> Ẩn biến mất nút thứ 2 luôn, ép chọn nút vui!
    else {
        const btnNo = document.getElementById('btn-no');
        btnNo.classList.add('hidden'); // Ẩn nút thứ 2

        document.getElementById('question-text').innerText = "Hết nút mệt mỏi rồi nha! Bắt buộc hôm nay Thảo Ly phải vui vẻ đó! 🥰✨";
        document.getElementById('emoji').innerText = "🥰";

        const btnYes = document.getElementById('btn-yes');
        btnYes.style.fontSize = (yesSize + 8) + 'px';
        btnYes.style.padding = `${yesPaddingV + 5}px ${yesPaddingH + 10}px`;
    }
}

function acceptProposal() {
    document.getElementById('sound-tada').play().catch(e => {});
    // Ẩn màn chính, hiện màn chúc mừng
    document.getElementById('main-card').classList.add('hidden');
    document.getElementById('success-card').classList.remove('hidden');

    // 🎆 KÍCH HOẠT PHÁO HOA TÙM LUM Ở ĐÂY
    createFireworks();
}
// --- XỬ LÝ 3 NÚT TRẠM SẠC HIỆN TRỰC TIẾP ---

function triggerMusic() {
    addEnergy(25); // Tăng năng lượng trước
    try { document.getElementById('sound-pop').play(); } catch(e){}
    var audio = document.getElementById('chill-music');
    if (audio) { try { audio.play(); } catch(e){} }
    document.getElementById('care-emoji').innerText = "🎧🎶";
    showDisplay("🎶 Đã bật giai điệu Lofi chill chữa lành! Hãy đeo tai nghe vào, nhắm mắt lại thả lỏng xíu cho đỡ mệt nhe!");
}

function triggerHug() {
    addEnergy(25); // Tăng năng lượng trước
    try { document.getElementById('sound-pop').play(); } catch(e){}
    document.getElementById('care-emoji').innerText = "🫂💖";
    showDisplay("🫂 Sending a big hug! Dù ở xa không gặp trực tiếp được, nhưng gửi cho Thảo Ly một cái ôm siêu ấm áp từ xa nhé. Cố lên nhe!");
}

function triggerLetter() {
    addEnergy(25); // Tăng năng lượng trước
    try { document.getElementById('sound-pop').play(); } catch(e){}
    document.getElementById('care-emoji').innerText = "💌✨";
    showDisplay("💌 'Thế giới ngoài kia có bận rộn hay áp lực thế nào thì cũng đừng quên chăm sóc bản thân nhe. Chúc Thảo Ly 20/10 luôn xinh đẹp, rạng rỡ, bình an và luôn nở nụ cười!'");
}

function easterEggPin() {
    addEnergy(30); // Tăng năng lượng trước
    try { document.getElementById('sound-secret').play(); } catch(e){}
    showDisplay("🕵️‍♂️ PHÁT HIỆN SECRET: Vừa bấm nhẹ vào cục pin là thấy điều bất ngờ liền đúng không! Đã thưởng cho Thảo Ly 1,000,000 năng lượng siêu cấp! 💖⚡");
    document.getElementById('care-emoji').innerText = "🥳🎉";
    createFireworks();
}

// Hàm hỗ trợ hiện khung chữ bên dưới
function showDisplay(text) {
    const displayBox = document.getElementById('care-display');
    const displayText = document.getElementById('display-text');
    displayBox.classList.remove('hidden');
   typeWriter(displayText, text);
}
// Hàm tạo hiệu ứng pháo hoa tung tóe
function createFireworks() {
    const colors = ['#ff2a5f', '#ffef62', '#a7f3d0', '#60a5fa', '#f472b6', '#fb7185'];
    
    // Tạo nhiều đợt pháo hoa liên tiếp cho hoành tráng
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            // Lấy ngẫu nhiên vị trí trung tâm màn hình
            const startX = window.innerWidth / 2;
            const startY = window.innerHeight / 2;

            // Mỗi đợt bắn ra 35 hạt pháo hoa bay tứ tung
            for (let j = 0; j < 35; j++) {
                const particle = document.createElement('div');
                particle.classList.add('firework-particle');
                
                // Chọn màu ngẫu nhiên
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                // Đặt vị trí xuất phát ở giữa màn hình
                particle.style.left = startX + 'px';
                particle.style.top = startY + 'px';

                // Tính toán hướng bay ngẫu nhiên 360 độ
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 180 + 50; // Tầm bay xa của hạt
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;

                particle.style.setProperty('--tx', `${tx}px`);
                particle.style.setProperty('--ty', `${ty}px`);

                document.body.appendChild(particle);

                // Xóa phần tử sau khi animation chạy xong để nhẹ máy
                setTimeout(() => {
                    particle.remove();
                }, 800);
            }
        }, i * 300); // Mỗi đợt cách nhau 0.3 giây
    }
}
// Hàm hỗ trợ hiện khung chữ bên dưới
let typingTimer = null;

function showDisplay(text) {
    const displayBox = document.getElementById('care-display');
    const displayText = document.getElementById('display-text');
    
    displayBox.classList.remove('hidden');
    
    // Nếu đang gõ dở mà bấm nút khác, ngắt ngay lập tức
    if (typingTimer) {
        clearTimeout(typingTimer);
    }
    
    displayText.innerText = "";
    typeWriter(displayText, text, 0); // Truyền chuẩn tham số i = 0 ở đây
}

function typeWriter(element, text, i) {
    if (i < text.length) {
        element.innerText += text.charAt(i);
        typingTimer = setTimeout(() => {
            typeWriter(element, text, i + 1);
        }, 20); // Tốc độ gõ 20ms/chữ
    }
}

// Hàm tạo hiệu ứng pháo hoa
function createFireworks() {
    const colors = ['#ff2a5f', '#ffef62', '#a7f3d0', '#60a5fa', '#f472b6', '#fb7185'];
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const startX = window.innerWidth / 2;
            const startY = window.innerHeight / 2;

            for (let j = 0; j < 35; j++) {
                const particle = document.createElement('div');
                particle.classList.add('firework-particle');
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.left = startX + 'px';
                particle.style.top = startY + 'px';

                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 180 + 50;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;

                particle.style.setProperty('--tx', `${tx}px`);
                particle.style.setProperty('--ty', `${ty}px`);

                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 800);
            }
        }, i * 300);
    }
}
// --- EASTER EGG BẤM BÍ MẬT 5 LẦN ---
// Bấm 1 lần là hiện bí mật luôn
function easterEggPin() {
    addEnergy(30);
    document.getElementById('sound-secret').play().catch(e => {});
    showDisplay("🕵️‍♂️ PHÁT HIỆN SECRET: Cậu vừa bấm lén vào cục pin đúng hong? Tính tò mò cao quá nha! Đã thưởng cho Thảo Ly 1,000,000 năng lượng bá khí! 💖⚡");
    
    // Đổi emoji cho nhí nhảnh
    document.getElementById('care-emoji').innerText = "🥳🎉";
    
    // Bắn pháo hoa ăn mừng
    createFireworks();
}
// --- THANH NĂNG LƯỢNG (ENERGY BAR) FIXED LỖI BẤM LẠI ---
var currentEnergy = 20;

function addEnergy(amount) {
    if (currentEnergy >= 100) return;

    currentEnergy += amount;
    if (currentEnergy > 100) currentEnergy = 100;
    
    var fillElement = document.getElementById('energy-fill');
    var textElement = document.getElementById('energy-text');
    
    if (fillElement) fillElement.style.width = currentEnergy + '%';
    if (textElement) textElement.innerText = currentEnergy + '%';

    // Mở nút thư bí mật ngay trong khung năng lượng khi đạt 100%.
    if (currentEnergy === 100) {
        var letterButton = document.getElementById('letter-unlock-button');
        if (letterButton) letterButton.classList.remove('hidden');
        createFireworks();
    }
}

function openLetter() {
    if (currentEnergy < 100) return;

    var letterScreen = document.getElementById('letter-screen');
    if (!letterScreen) return;

    letterScreen.classList.remove('hidden');
    document.body.classList.add('letter-open');
    document.querySelector('.letter-screen-close').focus();
}

function closeLetter() {
    var letterScreen = document.getElementById('letter-screen');
    if (!letterScreen) return;

    letterScreen.classList.add('hidden');
    document.body.classList.remove('letter-open');
    document.getElementById('letter-unlock-button').focus();
}

document.addEventListener('keydown', function(event) {
    var letterScreen = document.getElementById('letter-screen');
    if (event.key === 'Escape' && letterScreen && !letterScreen.classList.contains('hidden')) {
        closeLetter();
    }
});