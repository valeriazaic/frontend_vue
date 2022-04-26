FROM node:lts-alpine

USER root
# делаем каталог 'app' текущим рабочим каталогом

WORKDIR /home/root

# копируем оба 'package.json' и 'package-lock.json' (если есть)
COPY package*.json ./

# устанавливаем зависимости проекта
RUN npm install

# копируем файлы и каталоги проекта в текущий рабочий каталог (т.е. в каталог 'app')
COPY . .
# собираем приложение для production с минификацией
COPY entrypoint.sh .


ENTRYPOINT ["sh", "/home/root/entrypoint.sh"]\