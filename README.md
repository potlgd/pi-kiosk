# pi-kiosk

This tiny repo is hopefully useful for turning a Raspberry Pi into a public information kiosk. More documentation than code, these are the steps for getting a full-screen Chromium browser displaying a specific URL. The original inspiration was to place a large [IAmResponding](https://iamresponding.com/) display in a fire station for quick reference responder updates, but it is also generally useful for showing any web-based content in a kiosk-type arrangement.

---

## Quick Start on Raspberry Pi

1. Install [Raspbian with Desktop](https://www.raspberrypi.org/downloads/raspbian/)
2. After boot, `apt-get install npm xscreensaver unclutter`
3. Adjust overscan as needed (see below)
4. Disable screen saver (optional)
5. Install this app tree in `/home/pi/pi-kiosk`
6. Setup autostarts (optional) (see below)
7. Fix Chrome Warnings (optional) (see below)
8. Reboot

---

## Prerequisites

This procedure was developed on the Raspberry Pi 4, though will probably work on at least some earlier models.

Step 2 above recommends a few package installs:

* npm - Node Package Manager - this allows the later use of the [puppeteer Node.js module](https://github.com/puppeteer/puppeteer/), which is critical for this solution.
* xscreensaver - Installing the xscreensaver package is what allows the adjustment of the screensaver settings (to disable them). The default in Raspbian appears to be screen blanking after some period, which is undesirable for this application.
* unclutter - hides the mouse cursor in X after a period of inactivity.

---

## Adjusting overscan if needed

The pi will display an image of imperfect size on many displays. On first startup, it will ask whether the displayed image shows black borders or not, and the answer will affect the overscan setting for the device, but the image is not fine-tuned at that time. Further, if the device is being pre-installed at a workstation before deployment on another display device, the parameters may differ.

For display on the LG monitors in our building, these values are suggested in `/boot/config.txt` - they can be adjusted as needed, rebooting between changes.

```
# uncomment this if your display has a black border of unused pixels visible
# and your display can output without overscan
disable_overscan=0

# uncomment the following to adjust overscan. Use positive numbers if console
# goes off screen, and negative if there is too much border
overscan_left=-8
overscan_right=-8
overscan_top=-20
overscan_bottom=-20
```

## Installing the pi-kiosk "app"

In case you need more detail (my short memory and I do), Step 5 above goes like this:

```
git clone https://github.com/potlgd/pi-kiosk.git
cd pi-kiosk
cp example-config.js config.js
npm install
```

The `npm install` step above will install the javascript module dependencies (critically, `puppeteer-core`).

## Setting up Autostart

There are several ways to handle autostarts in Raspbian. Since the default is that the "pi" user is auto-logged in, I found it most straightforward to use that user's personal autostart. To autostart on login/boot, create a `/home/pi/.config/autostart/pi-kiosk.desktop` file:

```
mkdir -p ~/.config/autostart
vi ~/.config/autostart/pi-kiosk.desktop
```

Make an app entry in the `pi-kiosk.desktop` file:

```
[Desktop Entry]
Type=Application
Name=JS Kiosk
Comment=Start a Chromium Browser and Login to Site
NoDisplay=false
Exec=env AGENCY=firedepartment node /home/pi/pi-kiosk/index.js
NotShowIn=GNOME;KDE;XFCE;
```

Make sure you set the **AGENCY** variable in the autostart file.

## Hide Chrome Warnings

This part is not recommended on systems that will be used for interactive browsing, as this step will disable some important warnings emitted by the Chrome browser. However, for kiosk systems, this step will disable an otherwise-immutable warning bar reading, "Chrome is being controlled by automated test software".

Create a file at an appropriate location based on the browser you have installed (for Raspbian, it's most likely the second option):

    /etc/opt/chrome/policies/managed/managed_policies.json
    ..or..
    /etc/chromium-browser/polices/managed/managed_policies.json

with content:

    {"CommandLineFlagSecurityWarningsEnabled": false}


## License

Copyright 2020, Chris M. Miller

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
