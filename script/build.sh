#!/bin/bash

# Setup dependencies
npm update
bower --force --verbose --config.interactive=false --allow-root install
coffeegulp release
