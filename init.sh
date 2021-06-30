#!/bin/sh

echo "Running project"
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npm run dev