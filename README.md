&nbsp;

<p align="center">
	<picture>
		<source media="(prefers-color-scheme: dark)" srcset="https://files.rb.gd/github/massive_white.svg">
		<source media="(prefers-color-scheme: light)" srcset="https://files.rb.gd/github/massive_black.svg">
		<img alt="Massive Publishing Logo" src="https://files.rb.gd/github/massive_black.svg" width="250">
	</picture>
</p>

&nbsp;

# Massive Publishing Tools

This is a collection of scripts, export presets, templates, and a preflight profile for use with Adobe InDesign and Adobe Photoshop to help facilitate print production work on Massive Publishing comics.

&nbsp;

## Installation (macOS)

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://files.rb.gd/github/scripts.svg"><source media="(prefers-color-scheme: light)" srcset="https://files.rb.gd/github/scripts.svg"><img src="https://files.rb.gd/github/scripts.svg" height="22" /></picture>&nbsp;&nbsp; InDesign Scripts

Copy all six script files (`.jsx`) in the [InDesign Scripts](/InDesign%20Scripts/) folder to:

```
/Applications/Adobe InDesign 2024/Scripts/Scripts Panel/Massive Publishing/
```

You will need to create the **Massive Publishing** folder inside the **Scripts Panel** folder.

> **Note**
> The year in that path will differ depending on which version of Adobe InDesign you have installed.

> **Warning**
When upgrading from a previous year's InDesign release to a new InDesign release, you will manually have to copy over the scripts to the new install folder.

---

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://files.rb.gd/github/export_presets.svg"><source media="(prefers-color-scheme: light)" srcset="https://files.rb.gd/github/export_presets.svg"><img src="https://files.rb.gd/github/export_presets.svg" height="22" /></picture>&nbsp;&nbsp;InDesign Export Presets

Most of the InDesign scripts require having two export presets named *exactly* `Massive Publishing (HV, USA, Variants)` and `Massive Publishing (Transcon, Canada)`.

Additionally, there's a third export preset named `Massive Publishing (Omnibus, Digital RGB PDF)` for exporting a digital PDF for the Omnibus platform.

You can import the presets (or rename your existing presets) in InDesign by selecting in the menu <ins>File</ins> → <ins>Adobe PDF Presets</ins> → <ins>Define…</ins> and either:
	
* Use the <picture><source media="(prefers-color-scheme: dark)" srcset="https://files.rb.gd/github/button_edit.svg"><source media="(prefers-color-scheme: light)" srcset="https://files.rb.gd/github/button_edit.svg"><img src="https://files.rb.gd/github/button_edit.svg" width="60" /></picture> button to rename your existing presets to the correct names,
* or <picture><source media="(prefers-color-scheme: dark)" srcset="https://files.rb.gd/github/button_load.svg"><source media="(prefers-color-scheme: light)" srcset="https://files.rb.gd/github/button_load.svg"><img src="https://files.rb.gd/github/button_load.svg" width="60" /></picture> to import the three `.joboptions` files found in the [Export Presets](/Export%20Presets/) folder.

---

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://files.rb.gd/github/preflight_profile.svg"><source media="(prefers-color-scheme: light)" srcset="https://files.rb.gd/github/preflight_profile.svg"><img src="https://files.rb.gd/github/preflight_profile.svg" height="22" /></picture>&nbsp;&nbsp;InDesign Preflight Profile

One of the included tools is a Preflight profile for Massive Publishing comics, that is more aggressive than InDesign's default Preflight profile and can help catch more errors before exporting.

To install:

* In InDesign, open the Preflight panel (found under <ins>Window</ins> → <ins>Output</ins> → <ins>Preflight</ins>)
* From the panel's menu <picture><source media="(prefers-color-scheme: dark)" srcset="https://files.rb.gd/github/menu.svg"><source media="(prefers-color-scheme: light)" srcset="https://files.rb.gd/github/menu.svg"><img src="https://files.rb.gd/github/menu.svg" width="16" /></picture> select <ins>Define Profiles…</ins>
* In the Preflight Profiles window that appears, again select the menu <picture><source media="(prefers-color-scheme: dark)" srcset="https://files.rb.gd/github/menu.svg"><source media="(prefers-color-scheme: light)" srcset="https://files.rb.gd/github/menu.svg"><img src="https://files.rb.gd/github/menu.svg" width="16" /></picture> and choose <ins>Load Profile…</ins>
* Then select the `.idpp` file found in the [Preflight Profile](/Preflight%20Profile/) folder

---

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://files.rb.gd/github/scripts.svg"><source media="(prefers-color-scheme: light)" srcset="https://files.rb.gd/github/scripts.svg"><img src="https://files.rb.gd/github/scripts.svg" height="22" /></picture>&nbsp;&nbsp; Photoshop Scripts

Copy the script file (`.jsx`) in the [Photoshop Scripts](/Photoshop%20Scripts/) folder to:

```
/Applications/Adobe Photoshop 2024/Presets/Scripts/
```

The script will only appear in Photoshop once you quit and relaunch the application.

> **Note**
> The year in that path will differ depending on which version of Adobe Photoshop you have installed.

> **Warning**
When upgrading from a previous year's Photoshop release to a new Photoshop release, you will manually have to copy over the scripts to the new install folder.

&nbsp;

## Installation (Windows)

[See here ↗](https://www.apple.com/shop/buy-mac)

&nbsp;

## Usage

A script can be run using the Scripts panel in InDesign. If you don't already have the panel open as part of your workspace, you can find it in the menu under <ins>Window</ins> → <ins>Utilities</ins> → <ins>Scripts</ins>. There you'll be able to find the **Massive Publishing** folder of scripts under the **Application** folder.

To run a script, make sure you have the InDesign document you want to export currently open and focused. Then double-click the script you want to use in the Scripts panel.

> **Warning**
> Exporting JPGs doesn't support asynchronous exporting in the background tasks panel. When you run the [Export Interior Pages - RGB JPGs.jsx](/InDesign%20Scripts/Export%20Interior%20Pages%20-%20RGB%20JPGs.jsx) script, InDesign will appear to freeze while it runs the export, which can take several minutes. You can open the folder you selected to export the RGB JPGs into, and see the files get created to track the progress of the export.

&nbsp;

## To-do

- [X] ~~Include the InDesign template files and rename the repo~~
- [X] ~~See if you can key into the Preflight checks, and show a warning if a user tries to run an export while the Preflight is reporting an error~~
	- [X] ~~If possible, use specifically the "Massive Publishing" preflight profile, even if it's not the currently selected profile~~
- [X] ~~Add error checking to the **Export Cover Variants** scripts to notify the user if a cover page is missing the `appliedSection.marker`~~
- [X] ~~Eventually rename everything to Massive:~~
	- [X] ~~The repo name~~
	- [X] ~~Export Presets~~
	- [X] ~~`hv_preset_name` and `transcon_preset_name` variables in each script~~
	- [X] ~~This [README.md](README.md) file~~
- [X] ~~Add error checking to the **Export Interior Pages** script to check each of the linked interiors pages (any link inside of the `\Interiors\` folder) and check the number in the file name matches the page it's on~~
- [X] ~~Write a script to export a complete comic (from three open InDesign files) as a web ready .PDF~~