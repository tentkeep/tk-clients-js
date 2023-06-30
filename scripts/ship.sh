#!/bin/bash

npm run build &&
git add . &&
read -p "Commit Message: " COMMIT_MESSAGE

git commit -m "$COMMIT_MESSAGE"

git push origin head

git log -2