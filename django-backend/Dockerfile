FROM python:3.11-alpine
WORKDIR /app
RUN apk update
RUN apk upgrade
COPY ./requirements.txt ./
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY ./src ./src
# COPY ./robots.txt ./robots.txt

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

CMD gunicorn -w 3 --chdir ./src proj.wsgi --bind 0.0.0.0:8000
