# Reem S. Alsersawi - Portfolio Website

![Docker](https://img.shields.io/badge/Docker-✓-blue)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-✓-green)
![Responsive](https://img.shields.io/badge/Responsive-✓-orange)

مشروع بروفايل احترافي لمطورة الواجهات الأمامية **ريم السرساوي**، مع إعداد كامل لـ Docker للتشغيل السهل والمتسق.

##  نظرة عامة

موقع بروفايل شخصي تفاعلي يعرض المهارات، المشاريع، والخبرات المهنية. يتميز بتصميم عصري، تفاعلية عالية، ودعم كامل للوضع المظلم.

## التقنيات المستخدمة

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Custom Properties, Flexbox, Grid
- **Icons**: SVG Icons
- **Fonts**: Google Fonts (Inter)
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx

##  التشغيل باستخدام Docker

### المتطلبات الأساسية
- [Docker](https://docs.docker.com/get-docker/) (الإصدار 20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (الإصدار 2.0+)

### الطريقة السريعة (باستخدام Makefile)

```bash
# بناء وتشغيل المشروع
make run

# أو باستخدام Docker Compose مباشرة
docker-compose up -d

## Notes
This project uses:
- Dockerfile for containerization
- Multi-stage Docker build for optimization
- Docker Compose for service orchestration
- Custom Nginx configuration
