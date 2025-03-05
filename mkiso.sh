#!/usr/bin/env bash

set -xe
rm -rf iso-build-tmp
mkdir iso-build-tmp
mkarchiso -v -w iso-build-tmp -o iso-build-tmp live-iso
