.PHONY: help build run stop clean test

# الألوان للمخرجات
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

## المساعدة: عرض جميع الأوامر
help:
	@echo ''
	@echo 'الأوامر المتاحة:'
	@echo ''
	@echo '  ${YELLOW}make build${RESET}      ${GREEN}بناء صورة Docker${RESET}'
	@echo '  ${YELLOW}make run${RESET}        ${GREEN}تشغيل الحاوية${RESET}'
	@echo '  ${YELLOW}make stop${RESET}       ${GREEN}إيقاف وإزالة الحاوية${RESET}'
	@echo '  ${YELLOW}make clean${RESET}      ${GREEN}تنظيف جميع الحاويات والصور${RESET}'
	@echo '  ${YELLOW}make test${RESET}       ${GREEN}اختبار الحاوية${RESET}'
	@echo '  ${YELLOW}make logs${RESET}       ${GREEN}عرض سجلات الحاوية${RESET}'
	@echo '  ${YELLOW}make status${RESET}     ${GREEN}عرض حالة الحاوية${RESET}'

## بناء صورة Docker
build:
	@echo "${GREEN}بناء صورة Docker...${RESET}"
	docker-compose build
	@echo "${GREEN}تم بناء الصورة بنجاح${RESET}"

## تشغيل الحاوية
run:
	@echo "${GREEN}تشغيل الحاوية...${RESET}"
	docker-compose up -d
	@echo "${GREEN} الحاوية قيد التشغيل على http://localhost:8080${RESET}"

## إيقاف وإزالة الحاوية
stop:
	@echo "${GREEN}إيقاف الحاوية...${RESET}"
	docker-compose down
	@echo "${GREEN} تم إيقاف الحاوية${RESET}"

## تنظيف جميع الحاويات والصور
clean:
	@echo "${GREEN}تنظيف الحاويات والصور...${RESET}"
	docker-compose down -v --rmi all
	docker system prune -f
	@echo "${GREEN} تم التنظيف${RESET}"

## اختبار الحاوية
test:
	@echo "${GREEN}اختبار الحاوية...${RESET}"
	@if docker-compose ps | grep -q "Up"; then \
		echo "${GREEN} الحاوية تعمل${RESET}"; \
		curl -f http://localhost:8080 || echo "${YELLOW}⚠️  الموقع غير متاح بعد${RESET}"; \
	else \
		echo "${YELLOW}  الحاوية ليست قيد التشغيل${RESET}"; \
	fi

## عرض سجلات الحاوية
logs:
	@echo "${GREEN}عرض السجلات...${RESET}"
	docker-compose logs -f

## عرض حالة الحاوية
status:
	@echo "${GREEN}حالة الحاوية:${RESET}"
	docker-compose ps

## إعادة التشغيل
restart: stop run

## التحديث (إعادة البناء والتشغيل)
update: build restart