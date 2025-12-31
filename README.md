# Reem S. Alsersawi - Portfolio Website

![Docker](https://img.shields.io/badge/Docker-✓-blue)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-✓-green)
![Responsive](https://img.shields.io/badge/Responsive-✓-orange)

مشروع بروفايل احترافي لمطورة الواجهات الأمامية **ريم السرساوي**، مع إعداد كامل لـ Docker للتشغيل السهل والمتسق.

## وصف مختصر

موقع بروفايل شخصي تفاعلي يعرض المهارات، المشاريع، والخبرات المهنية. يتميز بتصميم عصري، تفاعلية عالية، ودعم كامل للوضع المظلم.

## التقنيات المستخدمة

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Custom Properties, Flexbox, Grid
- **Icons**: SVG Icons
- **Fonts**: Google Fonts (Inter)
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx

## كيفية بناء وتشغيل التطبيق باستخدام Docker

### المتطلبات الأساسية
- [Docker](https://docs.docker.com/get-docker/) (الإصدار 20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (الإصدار 2.0+)

### الطريقة السريعة (باستخدام Makefile)
```bash
# بناء وتشغيل المشروع
make run

# أو باستخدام Docker Compose مباشرة
docker-compose up -d

### الطريقة اليدوية باستخدام Docker
bash
# بناء الـ image
docker build -t simple-portfolio .

# تشغيل الحاوية
docker run -d -p 8080:80 simple-portfolio

 ### كيفية إيقاف الحاوية وتنظيفها: 
 # عرض الحاويات الحالية
docker ps

# إيقاف الحاوية
docker stop <container_id>

# حذف الحاوية
docker rm <container_id>

# حذف الـ image إذا أردت
docker rmi simple-portfolio


 ### ملاحظات التكوين:
البورت المستخدم للموقع: 8080

القيم الافتراضية للبيئة: غير مطلوبة حالياً (يمكن إضافة ENV variables لاحقًا إذا تطلب المشروع)

Nginx مهيأ لخدمة ملفات HTML/CSS/JS من /usr/share/nginx/html


### الإسناد (Attribution):
استخدمت مشروع ويب 1 من زميلتي وعدلت عليه ليصبح خاص بي.


