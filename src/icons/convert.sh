#!/usr/bin/env bash
for file in apple-touch-icon*.png; do convert $file -background white -flatten $file; done
