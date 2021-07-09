#!/bin/sh

echo "Running project"
#./wait-for-it.sh -t 5 postgres:5432
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npm run dev