# Changelog

## [2.3.2] - 2024-02-19

### New

- Added a new export preset for an RGB PDF, to deliver digital comics to Omnibus

## [2.3.1] - 2023-10-29

### Fixed

- Fixed a bug in the `Export Interior Pages.jsx` script's page number checking warning.

## [2.3.0] - 2023-10-21

### New

- New Photoshop script `Massive Publishing - Save All Open Covers as Print Ready TIFFs.jsx` to export trade dressed covers as print ready flattened TIFFs.

## [2.2.0] - 2023-07-17

### New

- The `Export Interior Pages.jsx` script now checks the the Interiors linked files to see if the number in the file name matches the page number it's placed on.

## [2.1.0] - 2023-07-14

### New

- The `Export Inside Cover C2 C3.jsx` script now can search to see if certain specific strings exist in the document and show a warning.

### Fixed

- Scripts now have the text encoding Unicode (UTF-8) with BOM, which allows for displaying foreign characters in alert dialogs.

## [2.0.0] - 2023-07-05

### New

- This is now a Massive Publishing project.

### Fixed

- In the `Collect Font Files.jsx` script, if the `Document fonts` folder doesn't exist already it will now be created.

## [1.1.2] - 2023-05-26

### Fixed

- With a recent update to InDesign, the Preflight panel is now named `Preflight` rather than `Preflight Panel`. With this version, the scripts now properly open the panel when needed.

## [1.1.1] - 2023-05-16

### Added

- The `Export Interior Pages - RGB JPGs.jsx` script now checks for the "03 RGB jpeg files" folder, and offers to save the RGB JPGs to that folder (rather than showing a folder picker)
- If the folder isn't found, the script defaults back to showing a folder picker

## [1.1.0] - 2023-05-10

### Added

- New script `Collect Font Files.jsx` for collecting all the fonts used in an InDesign document into a "Document fonts" folder

## [1.0.10] - 2023-04-17

### Fixed

- Fixed a bad comparison that only used a single `=`, instead of the proper `==`.

## [1.0.9] - 2023-03-29

### Added

- Export Cover Variants scripts now check to make sure cover pages start a new section in InDesign, which informative error messages if the script finds cover page(s) that don't.

## [1.0.8] - 2023-03-22

### Added

- All scripts check and see if a "Massive Publishing" preflight profile is installed
- Added error checking to all scripts to see if there are any Preflight errors, using the "Massive Publishing" preflight profile

## [1.0.7] - 2023-03-21

### Added

- Added InDesign templates
- Added Trade Dressing Photoshop template

### Changed

- Organized everything into folders a bit better

## [1.0.6] - 2023-03-20

### Changed

- Modified the `Export Inside Cover C2 C3.jsx` script to check the parent page applied, rather than just assume the Hero & Villain spread comes first.

## [1.0.5] - 2023-03-19

### Added

- Alert dialogs have more information to help when using the scripts.
- Added more error checking to the scripts.

### Fixed

- Cleaned up the scripts significantly.

## [1.0.4] - 2023-03-19

### Added

- Created a new script for exporting all of the interior pages as RGB JPGs.

## [1.0.0] - 2023-02-24

_First release._