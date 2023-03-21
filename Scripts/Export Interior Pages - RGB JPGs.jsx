// Export Interior Pages - RGB JPGs.jsx
// An InDesign Script for Whatnot Publishing, developed by Randall Bruder
/*  
* @@@BUILDINFO@@@ "Export Interior Pages - RGB JPGs.jsx" 1.0.6 20 March 2023
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
	
	// Get the active document
	var current_document = app.activeDocument;
	var current_document_lowercase_name = current_document.name.toLowerCase();
	
	// Check if the file name includes "interior pages", to make sure the user is running the right script.
	if (!current_document_lowercase_name.includes("interior")) {
		
		if (confirm("Are you sure you're running the right export script?\r\nThis document doesn't include the word 'Interior' in its filename.")) {
		} else { return; }
	}
	
	// Ask user to select a folder to save the PDFs to
	var export_folder = Folder.selectDialog("\r\nSelect a folder to save the JPGs to.\r\n");
	
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