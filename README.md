# Flask Lecture (Doc + Slides) — GitHub Pages-ready

ชุดเอกสารและสไลด์สำหรับสอน **Flask พื้นฐาน** (เหมาะกับงาน Project ปี 1)

## โครงสร้างโฟลเดอร์
- `docs/` = เว็บไซต์ที่พร้อม deploy ขึ้น GitHub Pages
  - `docs/index.html` = หน้าหลัก
  - `docs/chapters/chapXX/*-doc.html` = เอกสารประกอบ (อ่านยาว)
  - `docs/chapters/chapXX/*-present.html` = สไลด์ (กดลูกศรเลื่อน)

## วิธีเปิดดูแบบเร็ว (เครื่องตัวเอง)
เปิดไฟล์นี้ด้วย Browser ได้เลย:
- `docs/index.html`

> แนะนำ: ถ้าใช้ VS Code ให้ลง extension “Live Server” แล้วคลิก “Go Live” เพื่อให้ลิงก์ relative ทำงานเหมือนบนเว็บ

## Deploy ขึ้น GitHub Pages (แนะนำ)
1) สร้าง repo ใหม่บน GitHub  
2) push โค้ดชุดนี้ขึ้น repo  
3) ไปที่ **Settings → Pages**
   - Source: *Deploy from a branch*
   - Branch: `main`
   - Folder: `/docs`
4) รอสักครู่ แล้วเปิด URL ของ GitHub Pages

## แหล่งอ้างอิงเนื้อหา
- GeeksforGeeks — Flask Tutorial (อัปเดต 7 Oct 2025) และบทความย่อย: Routing, HTTP Methods, Templates, Static, SQLAlchemy, Blueprints
- เนื้อหา README ที่คุณเตรียมไว้ (รวมเป็นบทเรียนภาษาไทย และปรับให้เป็น Project ปี 1)

Generated on 2026-02-04.
