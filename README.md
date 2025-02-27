# Difuse Linux Installer

> Recommended to run on an Arch based Linux distribution

## Requirements

- The following packages need to be installed to be able to create an image with the included scripts:

    - arch-install-scripts
    - awk
    - dosfstools
    - e2fsprogs
    - erofs-utils (optional)
    - findutils
    - grub
    - gzip
    - libarchive
    - libisoburn
    - mtools
    - openssl
    - pacman
    - sed
    - squashfs-tools


- Run this with:

```bash
sudo pacman -Syu
sudo pacman -S arch-install-scripts \
             awk           \
             dosfstools    \
             e2fsprogs     \
             erofs-utils   \
             findutils     \
             grub          \
             gzip          \
             libarchive    \
             libisoburn    \
             mtools        \
             openssl       \
             pacman        \
             sed           \
             squashfs-tools
```


- For running the images in a virtualized test environment the following packages are required:

```bash
    sudo pacman -S edk2-ovmf qemu qemu-desktop
````

- Clone the repo

```bash
    git clone https://github.com/DifuseHQ/difuse-installer 

```

- Run this command as root to build the iso:
```bash

    sudo mkarchiso -v -w /path/to/build/folder difuse-installer

```
> NOTE
> You need atleast 4-5GB space in the build folder 

- You will see an iso with name archlinux-<current-date>-x86_64.iso, where current data is in YYYY-MM-DD format on the day the iso was built

- Run the iso on qemu
```bash
 $ run_archiso -i /path/to/archlinux-yyyy.mm.dd-x86_64.iso

```

Run this on virtual machine using UEFI emulation:
```
 $ run_archiso -u -i /path/to/archlinux-yyyy.mm.dd-x86_64.iso

```
