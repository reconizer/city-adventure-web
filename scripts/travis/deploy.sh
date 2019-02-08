#!/bin/bash
set -ev
echo "PREPARING CREATOR APP DEPLOYMENT"

if [ "${TRAVIS_PULL_REQUEST}" == "false" ] && [ "${TRAVIS_BRANCH}" == "staging-deployment" ] ; then
  npm run build
fi
