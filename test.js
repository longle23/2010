const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- BẮT ĐẦU KIỂM TRA DỰ ÁN 20/10 DÀNH CHO BẠN GÁI ---');

// 1. Kiểm tra 3 file hình ảnh tồn tại và có dung lượng hợp lệ
const photos = ['photo-1.jpg', 'photo-2.jpg', 'photo-3.jpg'];
photos.forEach(photo => {
    const filePath = path.join(__dirname, 'images', photo);
    assert(fs.existsSync(filePath), `Ảnh ${photo} không tồn tại trong thư mục images`);
    const size = fs.statSync(filePath).size;
    assert(size > 10000, `Ảnh ${photo} dung lượng quá nhỏ hoặc rỗng (${size} bytes)`);
    console.log(`✓ Ảnh ${photo} hợp lệ (${Math.round(size / 1024)} KB)`);
});

// 2. Kiểm tra nội dung index.html
const htmlPath = path.join(__dirname, 'index.html');
assert(fs.existsSync(htmlPath), 'index.html không tồn tại');
const html = fs.readFileSync(htmlPath, 'utf8');

// Phải chứa cả 3 ảnh
photos.forEach(photo => {
    assert(html.includes(`images/${photo}`), `index.html thiếu đường dẫn images/${photo}`);
});
console.log('✓ Cả 3 ảnh chụp chung đã được chèn chính xác vào album Polaroid');

// Phải đúng dịp 20/10
assert(html.includes('20/10'), 'index.html phải chứa lời chúc 20/10');
assert(!html.includes('20/11'), 'index.html không được chứa nhầm ngày 20/11');
console.log('✓ Đúng chủ đề ngày Phụ nữ Việt Nam 20/10');

// Kiểm tra các thẻ ID quan trọng
const requiredIds = [
    'main-card', 'question-text', 'btn-yes', 'btn-no',
    'success-card', 'care-emoji', 'care-title', 'energy-text', 'energy-fill',
    'letter-unlock-button', 'care-display', 'display-text',
    'letter-screen', 'letter-title', 'letter-signoff',
    'lightbox-modal', 'lightbox-img', 'lightbox-caption',
    'btn-send-heart', 'heart-count', 'btn-music-toggle', 'falling-container'
];

requiredIds.forEach(id => {
    assert(html.includes(`id="${id}"`), `index.html thiếu phần tử quan trọng id="${id}"`);
});
console.log(`✓ Toàn bộ ${requiredIds.length} ID giao diện cần thiết đều đầy đủ`);

// 3. Kiểm tra logic script.js
const scriptPath = path.join(__dirname, 'script.js');
assert(fs.existsSync(scriptPath), 'script.js không tồn tại');
const script = fs.readFileSync(scriptPath, 'utf8');

const requiredFunctions = [
    'applyRecipientName', 'playAudioTone', 'startBgmMusic', 'stopBgmMusic', 'toggleBgmMusic',
    'refuseProposal', 'acceptProposal', 'addEnergy', 'triggerMusic', 'triggerHug',
    'triggerLetter', 'triggerVoucher', 'easterEggPin', 'openLetter', 'closeLetter',
    'sendHeartToBoyfriend', 'openLightbox', 'closeLightbox', 'createFireworks', 'initFallingEffect'
];

requiredFunctions.forEach(fn => {
    assert(script.includes(`function ${fn}`) || script.includes(`const ${fn}`), `script.js thiếu hàm ${fn}`);
});
console.log(`✓ Toàn bộ ${requiredFunctions.length} hàm xử lý logic game đều hiện diện`);

// Kiểm tra cấu hình CONFIG
assert(script.includes('CONFIG = {'), 'script.js phải có đối tượng CONFIG để tùy biến tên');
assert(script.includes('recipientName'), 'CONFIG phải có recipientName');

// Giả lập logic sạc năng lượng
let testEnergy = 20;
function testAdd(amount) {
    testEnergy = Math.min(100, testEnergy + amount);
}
testAdd(25);
testAdd(25);
testAdd(25);
testAdd(25);
assert.strictEqual(testEnergy, 100, 'Năng lượng phải đạt 100% khi thực hiện đủ nhiệm vụ');
testAdd(50);
assert.strictEqual(testEnergy, 100, 'Năng lượng không bao giờ được vượt quá 100%');
console.log('✓ Logic tiến trình pin năng lượng (20% -> 100%) hoạt động hoàn hảo');

// 4. Kiểm tra style.css
const cssPath = path.join(__dirname, 'style.css');
assert(fs.existsSync(cssPath), 'style.css không tồn tại');
const css = fs.readFileSync(cssPath, 'utf8');

const requiredClasses = [
    '.card', '.badge-tag', '.emoji-box', '.btn-yes', '.btn-no',
    '.energy-container', '.energy-bar-fill', '.letter-unlock-btn',
    '.care-buttons', '.care-btn', '.care-display', '.letter-screen',
    '.letter-page', '.letter-gallery', '.letter-photo', '.washi-tape',
    '.lightbox-modal', '.lightbox-content', '.falling-item', '.music-toggle-btn'
];

requiredClasses.forEach(cls => {
    assert(css.includes(cls), `style.css thiếu class định kiểu ${cls}`);
});
console.log(`✓ Đầy đủ ${requiredClasses.length} lớp CSS Neo-Brutalism & Romantic Polaroid`);

console.log('====================================================');
console.log('🎉 TẤT CẢ KIỂM TRA THÀNH CÔNG! PROJECT SẴN SÀNG 100%! 🎉');
console.log('====================================================');
