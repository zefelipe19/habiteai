# Comando para rodar o projeto em modo de desenvolvimento
uvicorn main:app --reload

# Comando para aplicar as migrations
alembic upgrade head

# Comando para gerar uma nova migration
alembic revision --autogenerate -m "mensagem da migration"