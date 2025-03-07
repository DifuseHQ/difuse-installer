.PHONY = clean build-bin set-bin build-iso

clean:
	cd gui-installer && rm -rf node_modules && cd src-tauri && rm -rf target

build-bin: 
	cd gui-installer && npm i && npm run tauri build

set-bin:
	cp -r ./gui-installer/src-tauri/target/release/bundle/appimage/gui-installer_0.1.0_amd64.AppImage ./live-iso/airootfs/usr/local/bin/

build-iso:
	rm -rf iso-build-tmp
	mkdir iso-build-tmp
	mkarchiso -v -w iso-build-tmp -o iso-build-tmp live-iso


.PHONY = clean build-bin set-bin build-iso
