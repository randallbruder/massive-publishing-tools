// Export Cover Variants - All.jsx
// An InDesign Script for Whatnot Publishing, developed by Randall Bruder
/*  
* @@@BUILDINFO@@@ "Export Cover Variants - All.jsx" 1.0.6 20 March 2023
*/

main();
function main() {
	
	// Check if our two PDF Export Presets are properly installed
	var hv_preset_found = false;
	var hv_preset_name = "Whatnot Publishing (HV, USA, Variants)";
	
	var transcon_preset_found = false;
	var transcon_preset_name = "Whatnot Publishing (Transcon, Canada)";
	
	for (var i=0; i<app.pdfExportPresets.count(); i++) {
		if (app.pdfExportPresets[i].name == hv_preset_name) { hv_preset_found = true; }
		if (app.pdfExportPresets[i].name == transcon_preset_name) { transcon_preset_found = true; }
	}
	
	if (!hv_preset_found && !transcon_preset_found) {
		alert("Error\r\nThis script requires you to have both export presets installed, and named exactly:\r\n\r\n" + hv_preset_name + "\r\n\r\n" + transcon_preset_name, "", true);
		return;
	} else if (!hv_preset_found) {
		alert("Error\r\nWhile it looks like you have the Transcon export preset installed, you're missing a Hero & Villain preset exactly named:\r\n\r\n" + hv_preset_name, "", true);
		return;
	} else if (!transcon_preset_found) {
		alert("Error\r\nWhile it looks like you have the Hero & Villain export preset installed, you're missing a Transcon preset exactly named:\r\n\r\n" + transcon_preset_name, "", true);
		return;
	}
	
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
	if (!current_document_lowercase_name.includes("variant")) {
		if (confirm("Are you sure you're running the right export script?\r\nThis document doesn't include the word 'Variant' in its filename.")) {
		} else { return; }
	}

	// Ask user to select a folder to save the PDFs to
	var export_folder = Folder.selectDialog("Select a folder to save the PDFs to.\r\n\r\nChoose the root issue folder, Hero & Villain and Transcon versions will be saved into subfolders named HV and Transcon automatically.");
	
	// Check if a folder was selected
	if (export_folder != null) {
		
		// Check if the HV and Transcon subfolders exist, and if they don't, create them
		var hv_folder = new Folder(export_folder + "/HV/");
		if (!hv_folder.exists) { hv_folder.create(); }
		
		var transcon_folder = new Folder(export_folder + "/Transcon/");
		if (!transcon_folder.exists) { transcon_folder.create(); }
	
		// Get number of pages in the document
		var num_pages = current_document.pages.length;
		
		// Loop through every two pages and export as separate PDFs
		for (var i=0; i<num_pages; i+=2) {
			
			// Get the section marker name
			var section_marker_name = current_document.pages[i].appliedSection.marker;
			
			// Define the PDF export options
			var hv_export_preset = app.pdfExportPresets.item(hv_preset_name);
			var transcon_export_preset = app.pdfExportPresets.item(transcon_preset_name);
			
			// Define the range of pages to export
			with(app.pdfExportPreferences){
				var first_page = i+1;
				var second_page = i+2;
				var pageRange = "+" + first_page + "-+" + second_page;
			}
			
			// Define the PDF file name and location
			var file_name_prefix = current_document.name.substring(0, current_document.name.indexOf(' '));
			
			var hv_file_name = file_name_prefix + " " + section_marker_name + " HV.pdf";
			var hv_file_path = export_folder + "/HV/" + hv_file_name;
			
			var transcon_file_name = file_name_prefix + " " + section_marker_name + " TC.pdf";
			var transcon_file_path = export_folder + "/Transcon/" + transcon_file_name;
			
			// Export the PDF
			current_document.asynchronousExportFile(ExportFormat.PDF_TYPE, new File(hv_file_path), false, hv_export_preset);
			current_document.asynchronousExportFile(ExportFormat.PDF_TYPE, new File(transcon_file_path), false, transcon_export_preset);
		}
		
		// Open the Background Tasks panel
		var background_tasks_panel = app.panels.item('Background Tasks');
		background_tasks_panel.visible = true;
	}
};