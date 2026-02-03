---
marp: true
title: Flask Fundamentals (Year 1 Project)
paginate: true
---

# Flask Fundamentals
## Year 1 Project-ready basics

- Routing • Request/Response • Templates • Blueprints  
- JSON schema → DB mapping  
- CRUD • Login basics • Flash • Errors

---

# 1) Flask คืออะไร

- **Flask คือเฟรมเวิร์กสำหรับทำเว็บด้วย Python**  
  ช่วยให้เราเขียนเว็บได้โดยไม่ต้องเริ่มจากศูนย์ทุกครั้ง
- เป็น **micro-framework**: ให้แกนหลักที่จำเป็น (routing, request/response, template)  
  แล้วค่อยเติมของเสริม เช่น DB, login, forms
- เหมาะกับงานปี 1 เพราะ **เห็นโฟลว์ชัด** และ “ควบคุมโครงสร้างเองได้”

---

# 2) เว็บทำงานยังไง (Flow ที่ต้องจำ)

- ผู้ใช้กดลิงก์/ส่งฟอร์ม → เกิด **HTTP Request** ไปหา server
- Flask ตรวจ URL → เรียก **route (ฟังก์ชัน)** ที่ตรงกับ URL นั้น
- ฟังก์ชันทำงานเสร็จ → ส่ง **Response** กลับ เช่น
  - HTML (หน้าเว็บ)
  - JSON (ข้อมูล)
  - redirect (พาไปหน้าอื่น)

> จำประโยคเดียว: **Request เข้า → Route รับ → Response ออก**

---

# 3) ส่วนประกอบหลักของ Flask App

- `app` คือ “ศูนย์กลาง” ของเว็บ
  - เก็บ routes, config, extensions
- `route` คือ “ประตูเข้า” ของแต่ละหน้า/ฟังก์ชัน
- `template` คือ HTML ที่ใส่ข้อมูลได้ (dynamic) ด้วย Jinja2

---

# 4) Routing คือหัวใจ (URL → ฟังก์ชัน)

- Routing = ผูก **URL** ให้ไปเรียก **ฟังก์ชัน** ที่รับผิดชอบ
- ตัวอย่างภาพจำ:
  - `/` หน้าแรก
  - `/items` หน้ารายการ
  - `/items/5` หน้า detail ของ item id=5
- Route ที่ดีควร “อ่านแล้วเดาได้ว่าทำอะไร”

---

# 5) Path Parameter (ทำหน้า detail แบบมาตรฐาน)

- เรามักมีหน้ารายละเอียดที่ต้องใช้ id: `/items/<int:id>`
- `<int:id>` ช่วย validate เบื้องต้นว่า id ต้องเป็นเลข
- ภาพจำที่ใช้บ่อย:
  - **list** = ดูทั้งหมด
  - **detail** = ดู 1 ชิ้น ด้วย id

---

# 6) HTTP Methods (GET/POST) สำหรับหน้าเว็บ

- **GET** = ขอหน้า/ขอข้อมูล (อ่าน)
- **POST** = ส่งข้อมูล (สร้าง/แก้)
- แพตเทิร์นที่ควรจำ:
  - `GET /items/new` แสดงฟอร์ม
  - `POST /items/new` รับฟอร์มแล้วบันทึก

---

# 7) รับข้อมูลจากผู้ใช้: Request

- `request` คือ “กล่องข้อมูลของ request นี้”
- แหล่งข้อมูลยอดฮิต:
  - `request.args` → query string `?q=abc`
  - `request.form` → ฟอร์ม HTML
  - `request.json` / `request.get_json()` → JSON body (API)
- หลักคิดพื้นฐาน: **อย่าเชื่อ input ทันที** ต้องตรวจก่อนใช้

---

# 8) Validation แบบพื้นฐาน (ทำให้ฟอร์มไม่พัง)

Validation = ตรวจข้อมูลก่อนบันทึก อย่างน้อย 3 อย่าง:

- **required**: ห้ามว่าง (เช่น title)
- **type**: ชนิดถูกต้อง (เช่นจำนวนต้องเป็นเลข)
- **length/range**: ความยาว/ช่วง (เช่นข้อความไม่เกิน X)

ถ้าไม่ผ่าน:
- แจ้งผู้ใช้ให้เข้าใจง่าย
- ไม่บันทึกลงระบบ

---

# 9) Response 3 แบบที่ต้องใช้เป็น

- `render_template(...)` → ส่งหน้า HTML กลับไป
- `return jsonify(...)` → ส่ง JSON กลับไป (ใช้กับ API/หน้า dynamic บางส่วน)
- `redirect(...)` → หลัง POST สำเร็จ ควร redirect เพื่อกัน refresh แล้วยิงซ้ำ

---

# 10) Jinja2 Template (ทำ HTML ให้ใส่ข้อมูลได้)

- Jinja2 ทำให้ HTML แสดงข้อมูลจาก Python ได้
- สิ่งที่ต้องใช้ให้คล่อง:
  - `{{ ... }}` แสดงค่า
  - `{% for ... %}` loop รายการ
  - `{% if ... %}` เงื่อนไข (เช่นไม่มีข้อมูล)
- จุดสำคัญ: **หน้าเดียว** แสดงข้อมูลได้หลายชุด

---

# 11) Template Inheritance (base.html ลดการก็อป)

- ทำ `base.html` เป็นโครงกลาง (navbar/footer/layout)
- หน้าอื่นสืบทอดด้วย `{% extends "base.html" %}`
- ใส่เนื้อหาเฉพาะหน้าผ่าน `{% block content %}`
- แยกส่วนที่ใช้ซ้ำเป็น partials:
  - `partials/navbar.html`
  - `partials/flash.html`

---

# 12) url_for() (ทำลิงก์ให้ถูกและแก้ง่าย)

- ถ้า hardcode URL ใน HTML: เปลี่ยน route ทีเดียว ลิงก์พังได้ทั้งระบบ
- `url_for("endpoint", ...)` ให้ Flask สร้าง URL ให้จากชื่อ endpoint
- ดีมากสำหรับงานกลุ่ม เพราะลดบั๊ก “พิมพ์ URL ผิด”

---

# 13) Blueprints (จัดระเบียบโปรเจกต์ให้ทำงานเป็นทีม)

- Blueprint = แบ่ง routes ออกเป็นหมวดหมู่
- ประโยชน์:
  - โค้ดไม่กองในไฟล์เดียว
  - แบ่งงานในทีมได้ชัด (แต่ละคนทำคนละโมดูล)
- แนวแบ่งง่ายสำหรับปี 1:
  - `web` (หน้าทั่วไป)
  - `auth` (login/register/logout)
  - `admin` (หน้าจัดการ)

---

# 11A) Data Schema แบบ JSON (ก่อนทำ DB)

- ก่อนทำฐานข้อมูล เราควรตกลง “หน้าตาข้อมูล” ให้ตรงกัน
- JSON เหมาะสำหรับ:
  - mock data ช่วงเริ่มต้น
  - สื่อสาร field / type ให้ทีมตรงกัน (data contract)
- ตัวอย่าง field ที่เจอบ่อย (ทั่วไป ไม่ผูกระบบ)
  - `id`, `title/name`, `description`
  - `status`, `created_at`, `owner_id`

**ข้อจำกัดของ JSON file**
- query/filter ยาก
- relation ยาก
- หลายคนเขียนพร้อมกัน เสี่ยงชนกัน

---

# 11B) DB Mapping (JSON → Database ด้วย ORM)

- เมื่อเป็นของจริง: ใช้ DB เพราะค้นหา/กรอง/จัดการข้อมูลได้ดี
- ORM (เช่น SQLAlchemy) แปลง “ตาราง ↔ class” ให้เรา
- แนวคิด mapping ที่ต้องเข้าใจ:
  - JSON field → DB column
  - `id` → Primary Key
  - `owner_id` → Foreign Key (เชื่อมตารางผู้ใช้)
  - `status` ช่วย filter เช่น active/closed

สรุปจำง่าย:
- JSON = แบบร่าง/สื่อสาร
- DB/ORM = เก็บจริง + query เก่ง + รองรับงานจริง

---

# 14) CRUD ด้วย DB (รูปแบบการทำงานที่ต้องจำ)

- **Create**: รับ input → validate → สร้าง record → commit
- **Read**: query list / query detail ด้วย id
- **Update**: query ของเดิม → แก้ field → commit
- **Delete**: query ของเดิม → delete → commit

> จำ: “แก้ DB เมื่อไหร่ ต้อง commit”

---

# 15) Login/Session พื้นฐาน (เพื่อแยกสิทธิ์)

- ระบบส่วนใหญ่ต้องรู้ว่า “ใครกำลังใช้งานอยู่”
- แนวคิด session: login แล้ว server จำสถานะผู้ใช้ชั่วคราว
- ประโยชน์ในโปรเจกต์ปี 1:
  - แยกหน้าสาธารณะกับหน้าสมาชิก
  - ทำ “ของฉัน” ได้ เช่นประวัติของผู้ใช้
- พื้นฐานที่ต้องย้ำ:
  - รหัสผ่านต้องเก็บแบบ **hash** ไม่เก็บ plain text

---

# 16) Flash Message (ทำให้เว็บดูเป็นงานจริง)

- Flash = ข้อความแจ้งผลหลังทำงาน เช่น
  - “บันทึกสำเร็จ”
  - “กรอกข้อมูลไม่ครบ”
- ใช้หลัง POST แล้ว redirect เพื่อให้ผู้ใช้รู้ว่าเกิดอะไรขึ้น
- UX ดีขึ้นมาก แม้หน้าเว็บยังเรียบ ๆ

---

# 17) Error Page (404/400) แบบเป็นมิตร

- 404: หน้า/ข้อมูลไม่พบ
- 400: ส่งข้อมูลไม่ถูกต้อง
- ทำไมต้องทำ?
  - เว็บดูเป็นระบบ
  - ผู้ใช้ไม่หลุดไปหน้า error แปลก ๆ
- ข้อความควรสั้น ชัด และมีทางกลับ เช่น “กลับหน้ารายการ”

---

# 18) Config & Environment (dev vs prod)

- แยกค่าที่เปลี่ยนตามเครื่อง เช่น secret key, database url
- dev: เปิด debug เพื่อช่วยพัฒนา
- prod: ต้องปิด debug เพื่อความปลอดภัย
- ผลดีงานกลุ่ม: โค้ดเดียวกัน รันได้หลายเครื่องด้วย config ที่ต่างกัน

---

# 19) Checklist ก่อนเข้า Workshop

- เข้าใจ flow: request → route → response
- ทำ GET/POST สำหรับฟอร์มได้
- ใช้ Jinja2 + base.html ได้
- ใช้ url_for ได้
- แยก Blueprint ได้
- เข้าใจ 11A (JSON schema) และ 11B (DB mapping)

---

# Next: Workshop

- เราจะเอาชิ้นส่วนทั้งหมดไปประกอบเป็นระบบตัวอย่างจริง
- โครงจะเหมือนกันทุกระบบ: routes + templates + validation + DB + login
