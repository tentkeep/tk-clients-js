#!/bin/bash

rm -rf dist
npm run build &&
git add . &&
read -p "Commit Message: " COMMIT_MESSAGE

git commit -m "$COMMIT_MESSAGE"

read -p "Major(M), Minor(m), or Patch(p)? " VERSION

case $VERSION in
  M)
    npm version major
    ;;
  m)
    npm version minor
    ;;
  p)
    npm version patch
    ;;
  *)
    echo -n "No new version"
    ;;
esac

git push origin head

npm publish

npm version