# 💖 Dự Án Web Game Mini Chúc Mừng 20/10 Dành Tặng Người Yêu 💖

Dự án web interactive mini-game lãng mạn, vui nhộn theo phong cách **Neo-Brutalism + Sweet Pastel Romance**, được thiết kế đặc biệt nhân dịp ngày Phụ nữ Việt Nam 20/10.

---

## ✨ Các Tính Năng Nổi Bật

1. **Giai đoạn 1: Lời Hỏi Thăm & Nút Chạy Trốn Siêu Dễ Thương**:
   - Câu hỏi: *"Hôm nay 20/10 nè! Thế giới ngoài kia có làm Tâm mệt mỏi hong? Em bé của anh hôm nay có vui hongg? 🥰"*
   - Nút **"Vui lắm nha! 🥰"** và nút **"Hơi mệt xíu 🥺"**.
   - Mỗi lần bấm *"Hơi mệt xíu"*, nút sẽ đổi câu thoại dỗ dành nhí nhố, nút *"Vui lắm nha!"* sẽ phóng to dần với hiệu ứng đập tim. Đến lần thứ 5, nút mệt mỏi biến mất và bắt buộc em bé phải vui vẻ!

2. **Giai đoạn 2: Trạm Sạc Năng Lượng Yêu Thương 20/10**:
   - Thanh tiến trình Pin yêu thương (bắt đầu từ 20% cần nạp đủ 100%).
   - **4 Nút tương tác**:
     - 🎧 **1. Giai điệu Chill chữa lành**: Bật nhạc lofi thư giãn không lời bằng Web Audio API.
     - 🫂 **2. Chiếc ôm & 1000 nụ hôn**: Hiệu ứng bắn tim tung tóe khắp màn hình.
     - 💌 **3. Lời nhắn 20/10 ngọt ngào**: Hiệu ứng chữ gõ máy tính typewriter.
     - 🎁 **4. Rút Phiếu Quà Tặng 20/10**: Rút ngẫu nhiên các voucher đáng yêu (Ăn thả ga, 1 ngày làm công chúa, ôm không giới hạn, miễn trừ giận dỗi...).
     - 💐 **Easter Egg bí mật**: Bấm vào chùm hoa sẽ nhận được thưởng bí mật 999,999 hoa hồng và pháo hoa!
   - Khi sạc đầy 100%, màn hình bắn pháo hoa rực rỡ và mở khóa nút vàng mở lá thư.

3. **Giai đoạn 3: Bức Thư Bí Mật & Album Kỷ Niệm Polaroid**:
   - Thư tình 20/10 trang trọng, ấm áp trên nền giấy cổ điển.
   - **Album 3 tấm hình chụp chung của hai bạn**:
     - `photo-1.jpg`: Kỷ niệm rạp chiếu phim xem cùng nhau chu mỏ cute.
     - `photo-2.jpg`: Vẫy tay chào hạnh phúc.
     - `photo-3.jpg`: Khoảnh khắc lầy lội, nhí nhố đáng yêu nhất.
   - Thiết kế dạng ảnh Polaroid có băng dính washi-tape xinh xắn, góc nghiêng tự nhiên, hiệu ứng hover phóng to.
   - **Xem ảnh phóng to (Lightbox)**: Nhấp vào bất kỳ ảnh nào để xem cận cảnh với độ nét cao.
   - **Thả tim cho bạn trai**: Nút `💖 Thả tim cho anh` để bạn gái bấm gửi tim tương tác lại, tim sẽ bay lên màn hình cùng âm thanh dễ thương.

4. **Âm Thanh & Hiệu Ứng Hoàn Hảo**:
   - Chạy 100% bằng **Web Audio API** native: Không lo thiếu file mp3, không bị lỗi khi mở file trực tiếp.
   - Nút bật/tắt nhạc nền có biểu tượng equalizer nhảy sóng.
   - Cánh hoa và icon trái tim (`🌸`, `🌷`, `✨`, `💖`) tự động rơi nhẹ nhàng khắp nền trang.

---

## 🚀 Cách Sử Dụng & Mở Trang Web

### Cách 1: Mở Trực Tiếp Trên Máy Tính
- Nhấp đúp chuột vào file `index.html` để mở ngay trên trình duyệt (Chrome, Cốc Cốc, Edge, Safari...).

### Cách 2: Tùy Chỉnh Tên Bạn Gái Qua Link
Bạn có thể thêm tham số `?name=...` vào sau đường link để tùy biến tên hiển thị:
- Ví dụ: `index.html?name=Tâm`
- Hoặc chỉnh sửa trực tiếp biến `CONFIG` trong file `script.js`:
  ```javascript
  const CONFIG = {
      recipientName: 'Tâm',
      senderName: 'Henry Long',
      senderSignoff: 'Người yêu của em - Henry Long 💕'
  };
  ```

### Cách 3: Gửi Link Cho Bạn Gái Qua Mạng (Khuyên Dùng)
Để bạn gái mở được trên điện thoại từ xa:
1. Đẩy cả thư mục này lên GitHub và bật **GitHub Pages**.
2. Hoặc kéo thả thư mục vào **Netlify Drop** (https://app.netlify.com/drop) hoặc **Vercel** để có ngay link `https://...` miễn phí gửi qua Messenger / Zalo.
