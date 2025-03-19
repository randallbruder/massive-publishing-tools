// Export Interior Pages.jsx
// An InDesign Script for Massive Publishing, developed by Randall Bruder
/*  
* @@@BUILDINFO@@@ "Export Interior Pages.jsx" 2.3.4 18 March 2025
*/

main();
function main() {
	
	// Check if our two PDF Export Presets are properly installed
	var hv_preset_found = false;
	var hv_preset_name = "Massive Publishing (HV, USA, Variants)";
	
	var transcon_preset_found = false;
	var transcon_preset_name = "Massive Publishing (Transcon, Canada)";
	
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
	
	// Check and see if there is a Preflight Profile with the name Massive Publishing
	var preflight_profile_name = "Massive Publishing";
	if (!app.preflightProfiles.itemByName(preflight_profile_name).isValid) {
		alert("Error\r\nA Preflight Profile with the name \"" + preflight_profile_name + "\" was not found. Please make sure you install the preflight profile before running any of these export scripts.");
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
	
	/*
	 * Check Interiors linked files to see if the number in the file name matches the page number it's placed on
	 */
	var current_document_links = current_document.links;
	var links_where_number_doesnt_match_page_number = [];
	
	for (var i = 0; i < current_document_links.length; i++) {
		var file_path = current_document_links[i].filePath;
		
		// Check if "Interiors" is present in the file path
		if (file_path.indexOf("Interiors") !== -1) {
			var file_name = current_document_links[i].name;
			var page_number = current_document_links[i].parent.parentPage.documentOffset + 1;
			var file_number = null;
			var page_number_found = false;
			
			// Extract the numbers from the file name
			var number_matches = file_name.match(/\d+/g);
			
			// Extract any number ranges (two numbers separate by a hyphen) from the file name
			var number_range_matches = file_name.match(/\d+-\d+/g);
			
			// If any number ranges were found, let's check that first
			if (number_range_matches) {
				// Extract the individual numbers from the last number range in the file name
				var numbers_from_number_range_matches = number_range_matches[number_range_matches.length - 1].match(/\d+/g);
				
				// Check and see if the two numbers of the number range in the file name are within 1 digit of each other,
				// which likely means it's a full spread, so we'll save the second to last number as the `file_number`
				if (parseInt(numbers_from_number_range_matches[numbers_from_number_range_matches.length - 2], 10) === parseInt(numbers_from_number_range_matches[numbers_from_number_range_matches.length - 1], 10) - 1) {
					file_number = parseInt(numbers_from_number_range_matches[numbers_from_number_range_matches.length - 2], 10);
					page_number_found = true;	
				}
			}
			
			// If we don't have a page number yet, check the individual number matches
			if (number_matches && !page_number_found) {
				file_number = parseInt(number_matches[number_matches.length - 1], 10);
			}
			
			// Compare the number found from the file name against the page the link is placed on
			if (file_number !== null && file_number !== page_number) {
				links_where_number_doesnt_match_page_number.push("\"" + file_name + "\", placed on page " + page_number);
			}
		}
	}
	
	if (links_where_number_doesnt_match_page_number.length > 1) {
		var links_string = links_where_number_doesnt_match_page_number.join("\r\n");
		if (confirm("Error\r\nSome of the interior pages in this document might be placed on the wrong pages?\r\n\r\nCheck links:\r\n" + links_string + "\r\nand see if they're placed on the correct pages.\r\n\r\nDo you want to continue the export?", true)) {
		} else { return; }
	} else if (links_where_number_doesnt_match_page_number.length == 1) {
		if (confirm("Error\r\One of the interior pages in this document might be placed on the wrong page?\r\n\r\nCheck the link:\r\n" + links_where_number_doesnt_match_page_number.join("") + "\r\nand see if it's placed on the correct page.\r\n\r\nDo you want to continue the export?", true)) {
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
		
		// Define the PDF export options
		var hv_export_preset = app.pdfExportPresets.item(hv_preset_name);
		var transcon_export_preset = app.pdfExportPresets.item(transcon_preset_name);
		
		// Define the range of pages to export
		with(app.pdfExportPreferences){
			var pageRange = "+1-+" + num_pages;
		}
		
		// Define the PDF file name and location
		var hv_file_name = current_document.name.replace(/\.indd$/, "") + " HV.pdf";
		var hv_file_path = export_folder + "/HV/" + hv_file_name;
		
		var transcon_file_name = current_document.name.replace(/\.indd$/, "") + " TC.pdf";
		var transcon_file_path = export_folder + "/Transcon/" + transcon_file_name;
		
		// Export the PDF
		current_document.asynchronousExportFile(ExportFormat.PDF_TYPE, new File(hv_file_path), false, hv_export_preset);
		current_document.asynchronousExportFile(ExportFormat.PDF_TYPE, new File(transcon_file_path), false, transcon_export_preset);
		
		// Open the Background Tasks panel
		app.panels.item('Background Tasks').visible = true;
	}

};