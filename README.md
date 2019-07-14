# MyCo Backend

## Getting started

Deben tener instalado:
- NodeJS (Entorno de javascript en el servidor)
- MySQL (Base de datos)

Además recomiendo:
- Gitkraken (GUI para git)
- Insomnia (Cliente HTTP para pruebas)

Para poder ejecutar el proyecto es necesario que tengan configurado su archivo `.env`
con valores similares a estos (adecuados a los de su maquina local)

DEV_DB_HOST=localhost
DEV_DB_USER=root
DEV_DB_PASSWORD=1234567890
DEV_DATABASE_NAME=myco

## NOTAS

- Las cantidades relacionadas a precios/metrajes/montos están "limitadas" por la definición de utilizando FLOAT(14, 2)
(14 digitos, precisión de 2 puntos)
- El concepto de los gastos (Expense) están limitados a 400 caracteres
