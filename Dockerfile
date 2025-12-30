# استخدم صورة Nginx الرسمية
FROM nginx:alpine

# تعيين معلومات المطور
LABEL maintainer="Reem S. Alsersawi"
LABEL description="Portfolio Website for Reem S. Alsersawi"

# تعيين دليل العمل
WORKDIR /usr/share/nginx/html

# إزالة الملفات الافتراضية
RUN rm -rf ./*

# نسخ ملفات المشروع
COPY src/ /usr/share/nginx/html/

# نسخ ملف تهيئة Nginx المخصص
COPY nginx.conf /etc/nginx/conf.d/default.conf

# فتح المنفذ 80
EXPOSE 80

# تشغيل Nginx
CMD ["nginx", "-g", "daemon off;"]
