// Export Interior Pages - RGB JPGs.jsx
// An InDesign Script for Massive Publishing, developed by Randall Bruder
/*  
* @@@BUILDINFO@@@ "Export Interior Pages - RGB JPGs.jsx" 2.4.2 30 March 2025
*/

main();
function main() {

	// Check and see if an InDesign document is open
	if (app.documents.length == 0) {
		alert("Error\r\nPlease have the InDesign document you want to export open in InDesign before running this script.", "", true);
		return;
	}
	
	// Add a polyfill for the includes() method so we can see if one string can be found within another string
	String.prototype.includes = function(search, start) {
		'use strict';
		if (search instanceof RegExp) {
			throw TypeError('first argument must not be a RegExp');
		}
		if (start === undefined) { start = 0; }
		return this.indexOf(search, start) !== -1;
	};
	
	// Check and see if there is a Preflight Profile with the name Massive Publishing
	var preflight_profile_name = "Massive Publishing";
	if (!app.preflightProfiles.itemByName(preflight_profile_name).isValid) {
		alert("Error\r\nA Preflight Profile with the name \"" + preflight_profile_name + "\" was not found. Please make sure you install the preflight profile before running any of these export scripts.");
		return;
	}
	
	// Get the active document
	var current_document = app.activeDocument;
	var current_document_lowercase_name = current_document.name.toLowerCase();
	
	// Check if the file name includes "interior", to make sure the user is running the right script.
	if (!current_document_lowercase_name.includes("interior")) {
		
		if (confirm("Are you sure you're running the right export script?\r\nThis document doesn't include the word 'Interior' in its filename.")) {
		} else { return; }
	}
	
	// Check to make sure the document's page count is a multiple of 4
	if (current_document.pages.length % 4 !== 0) {
		if (confirm("Warning\r\nThis document has " + current_document.pages.length + " pages, which isn't a multiple of 4. Do you want to continue the export?", true)) {
		} else { return; }
	}
	
	// Check and see if there are any Preflight errors, using the `preflight_profile_name` Profile
	var preflight_checker = app.preflightProcesses.add(current_document, app.preflightProfiles.itemByName(preflight_profile_name)); // Set the preflight var
	preflight_checker.waitForProcess(); // Don't process the results until it has finished running
	var preflight_results = preflight_checker.aggregatedResults[2]; // Store the results in a variable
	
	if (preflight_results.length > 0) {
		if (confirm("Error\r\nThis document has Preflight errors. Do you want to continue the export?", true)) {
		} else {
			// Open the Preflight panel and exit the script
			app.panels.item('Preflight').visible = true;
			return;
		}
	}
	
	// Check and see if the "03 RGB jpeg files" folder exists, relative to the open InDesign document's path
	var export_folder = new Folder(current_document.filePath.parent + "/Interiors/03 RGB jpeg files");
	if (export_folder.exists) {
		if (confirm("\"03 RGB jpeg files\" Folder Found\r\nDo you want to use this folder to export to?")) {
		} else {
			// Ask user to select a folder to save the PDFs to
			var export_folder = Folder.selectDialog("\r\nSelect a folder to save the JPGs to.\r\n");
		}
	} else {
		// Ask user to select a folder to save the PDFs to
		var export_folder = Folder.selectDialog("\r\nSelect a folder to save the JPGs to.\r\n");
	}
	
	// Check if a folder was selected
	if (export_folder != null) {
		
		for (var i = 0; i < current_document.pages.length; i++) {
			
			// If the parent page name contains "Full Spread", export the current page and the next page as a spread
			if (current_document.pages[i].appliedMaster.name.includes("Full Spread")) {
				
				// Define the range of pages to export
				var current_page = i + 1;
				var current_page_string = current_page.toString();
				var next_page = i + 2;
				var next_page_string = next_page.toString();
				
				// Set JPEG export preferences
				app.jpegExportPreferences.properties = {
					antiAlias: true,
					embedColorProfile: true,
					exportResolution: 300,
					exportingSpread: true,
					jpegColorSpace: JpegColorSpaceEnum.rgb,
					jpegExportRange: ExportRangeOrAllPages.EXPORT_RANGE,
					jpegQuality: JPEGOptionsQuality.maximum,
					jpegRenderingStyle: JPEGOptionsFormat.baselineEncoding,
					useDocumentBleeds: false,
					simulateOverprint: false,
					pageString: "+" + current_page_string + "-+" + next_page_string // Page(s) to export, must be a string
				}
				
				// Define the PDF file name and location
				var file_name_prefix = current_document.name.substring(0, current_document.name.indexOf(' '));
				var jpg_file_name = file_name_prefix + " Page " + current_page_string + "-" + next_page_string + ".jpg";
				var jpg_file_path = new File(export_folder + "/" + jpg_file_name);
				
				// Export the JPG
				current_document.exportFile(ExportFormat.JPG, jpg_file_path, false);
				
				i++; // Skip the next page since it has already been exported as part of the spread
				
			// Otherwise, export the current page as a single page
			} else {
				
				// Define the range of pages to export
				var current_page = i + 1;
				var current_page_string = current_page.toString();
				
				// Set JPEG export preferences
				app.jpegExportPreferences.properties = {
					antiAlias: true,
					embedColorProfile: true,
					exportResolution: 300,
					exportingSpread: false, // Set back to false in case we just exported a spread
					jpegColorSpace: JpegColorSpaceEnum.rgb,
					jpegExportRange: ExportRangeOrAllPages.EXPORT_RANGE,
					jpegQuality: JPEGOptionsQuality.maximum,
					jpegRenderingStyle: JPEGOptionsFormat.baselineEncoding,
					useDocumentBleeds: false,
					simulateOverprint: false,
					pageString: "+" + current_page_string // Page(s) to export, must be a string
				}
				
				// Define the PDF file name and location
				var file_name_prefix = current_document.name.substring(0, current_document.name.indexOf(' '));
				var jpg_file_name = file_name_prefix + " Page " + current_page_string + ".jpg";
				var jpg_file_path = new File(export_folder + "/" + jpg_file_name);
				
				// Export the JPG
				current_document.exportFile(ExportFormat.JPG, jpg_file_path, false);
			}
		}
		
	}

};