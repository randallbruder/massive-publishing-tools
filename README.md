# Whatnot Publishing InDesign Scripts

This is a collection of scripts for use with Adobe InDesign to help facilitate exporting InDesign builds to the necessary files/formats for the **Print Ready Files** folder.

## Installation (macOS)

### Scripts

Move all five script files (`.jsx`) to:

```
/Applications/Adobe InDesign 2023/Scripts/Scripts Panel/Whatnot Publishing/
```

You will need to create the **Whatnot Publishing** folder inside the **Scripts Panel** folder.

> **Note**
> The year in that path will differ depending on which version of Adobe InDesign you have installed.

> **Warning**
When upgrading from a previous year's InDesign release to a new InDesign release, the scripts will have to be copied over. For example, after uninstalling 

### Export Presets

All scripts require having two export presets named exactly `Whatnot Publishing (HV, USA, Variants)` and `Whatnot Publishing (Transcon, Canada)`.

You can import the presets (or rename your existing presets) in InDesign by selecting in the menu <ins>File</ins> → <ins>Adobe PDF Presets</ins> → <ins>Define…</ins> and
	
* Use the <ins>Edit…</ins> button to rename your existing 
* or <ins>Load…</ins> to import the two `.joboptions` files one at a time.

## Usage

Script can be run using the Scripts panel in InDesign. If you don't already have the panel open as part of your workspace, you can find it in the menu under <ins>Window</ins> → <ins>Utilities</ins> → <ins>Scripts</ins>. There you'll be able to find the **Whatnot Publishing** folder of scripts under the **Application** folder.

To run a script, make sure you have the InDesign document you want to export currently open and focused. Then double-click the script you want to use in the Scripts panel.


## To-do

- [X] Include the InDesign template files and rename the repo
- [ ] Add error checking to the **Export Cover Variants** scripts to notify the user if a cover page is missing the `appliedSection.marker`
- [ ] Eventually rename everything to Massive
	- [ ] The repo name
	- [ ] Export Presets
	- [ ] `hv_preset_name` and `transcon_preset_name` variables in each script
	- [ ] This [README.md](README.md) file