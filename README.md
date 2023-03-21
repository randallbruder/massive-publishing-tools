&nbsp;

<p align="center">
	<picture>
		<source media="(prefers-color-scheme: dark)" srcset="https://files.rb.gd/whatnot_white.png">
		<source media="(prefers-color-scheme: light)" srcset="https://files.rb.gd/whatnot_black.png">
		<img alt="Whatnot Publishing Logo" src="https://files.rb.gd/whatnot_black.png" width="250">
	</picture>
</p>

&nbsp;

# Whatnot Publishing Tools

This is a collection of scripts, export presets, and templates for use with Adobe InDesign and Photoshop to help facilitate print production work on Whatnot Publishing comics.

## Installation (macOS)

### Scripts

Move all five script files (`.jsx`) in the [Scripts](/Scripts/) folder to:

```
/Applications/Adobe InDesign 2023/Scripts/Scripts Panel/Whatnot Publishing/
```

You will need to create the **Whatnot Publishing** folder inside the **Scripts Panel** folder.

> **Note**
> The year in that path will differ depending on which version of Adobe InDesign you have installed.

> **Warning**
When upgrading from a previous year's InDesign release to a new InDesign release, the scripts will have to be copied over.

### Export Presets

All scripts require having two export presets named exactly `Whatnot Publishing (HV, USA, Variants)` and `Whatnot Publishing (Transcon, Canada)`.

You can import the presets (or rename your existing presets) in InDesign by selecting in the menu <ins>File</ins> → <ins>Adobe PDF Presets</ins> → <ins>Define…</ins> and
	
* Use the <ins>Edit…</ins> button to rename your existing 
* or <ins>Load…</ins> to import the two `.joboptions` files found in the [Export Presets](/Export%20Presets/) folder.

### Preflight Profile

One of the included tools is a Preflight profile for Whatnot Publishing comics, that is more aggressive than InDesign's default Preflight profile and can help catch more errors before exporting.

To install:

* In InDesign open the Preflight panel (found under <ins>Window</ins> → <ins>Output</ins> → <ins>Preflight</ins>)
* From the panel's menu (≡) select <ins>Define Profiles…</ins>
* In the Preflight Profiles window that appears, again select the menu (≡) and choose <ins>Load Profile…</ins>
* Then select the `.idpp` file found in the [Preflight Profile](/Preflight%20Profile/) folder

## Usage

A script can be run using the Scripts panel in InDesign. If you don't already have the panel open as part of your workspace, you can find it in the menu under <ins>Window</ins> → <ins>Utilities</ins> → <ins>Scripts</ins>. There you'll be able to find the **Whatnot Publishing** folder of scripts under the **Application** folder.

To run a script, make sure you have the InDesign document you want to export currently open and focused. Then double-click the script you want to use in the Scripts panel.


## To-do

- [X] Include the InDesign template files and rename the repo
- [ ] See if you can key into the Preflight checks, and show a warning if a user tries to run an export while the Preflight is reporting an error
	- [ ] If possible, use specifically the "Whatnot Publishing" preflight profile, even if it's not the currently selected profile
- [ ] Add error checking to the **Export Cover Variants** scripts to notify the user if a cover page is missing the `appliedSection.marker`
- [ ] Eventually rename everything to Massive:
	- [ ] The repo name
	- [ ] Export Presets
	- [ ] `hv_preset_name` and `transcon_preset_name` variables in each script
	- [ ] This [README.md](README.md) file