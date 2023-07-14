// Collect Font Files.jsx
// An InDesign Script for Massive Publishing, developed by Randall Bruder
/*  
* @@@BUILDINFO@@@ "Collect Font Files.jsx" 2.1.0 13 July 2023
*/

main();
function main() {
	
	// Get the active document
	var current_document = app.activeDocument;
	var current_document_file_path = current_document.filePath;
	var current_document_lowercase_name = current_document.name.toLowerCase();
	
	// Create a new folder named "packaged" in the same folder as the open file
	var package_folder = new Folder(current_document_file_path + "/Packaged");
	if (!package_folder.exists) {
		package_folder.create();
	}
	
	// Package the current file and save it in the "packaged" folder
	// Documentation: https://www.indesignjs.de/extendscriptAPI/indesign-latest/index.html#Document.html#d1e49521__d1e54831
	var copyingFonts = true;			// If true, copies fonts used in the document to the package folder.
	var copyingLinkedGraphics = false;	// If true, copies linked graphics files to the package folder.
	var copyingProfiles = true;			// If true, copies color profiles to the package folder.
	var updatingGraphics = false;		// If true, updates graphics links to the package folder.
	var includingHiddenLayers = true;	// If true, copies fonts and links from hidden layers to the package.
	var ignorePreflightErrors = true;	// If true, ignores preflight errors and proceeds with the packaging. If false, cancels the packaging when errors exist.
	var creatingReport = false;			// If true, creates a package report that includes printing instructions, print settings, lists of fonts, links and required inks, and other information.
	var includeIdml = false;			// If true, generates and includes IDML in the package folder. (Optional)
	var includePdf = false;				// If true, generates and includes PDF in the package folder. (Optional)
	
	current_document.packageForPrint(package_folder, copyingFonts, copyingLinkedGraphics, copyingProfiles, updatingGraphics, includingHiddenLayers, ignorePreflightErrors, creatingReport, includeIdml, includePdf);
	
	
	// Copy the fonts to the main "Document fonts" folder
	
	// Find the Document fonts folder inside the packaged folder
	var package_folder_fonts_folder = new Folder(package_folder + "/Document fonts");
	if (!package_folder_fonts_folder.exists) {
		package_folder_fonts_folder.create();
	}
	
	// Find the "Document fonts" folder in the original file's directory, if it doesn't exist, create it
	var original_fonts_folder = new Folder(current_document_file_path + "/Document fonts");
	if (!original_fonts_folder.exists) {
		original_fonts_folder.create();
	}
	
	// Copy all files from the "Document fonts" folder in the package to the original folder, then remove them
	var files_to_copy = package_folder_fonts_folder.getFiles();
	for (var i = 0; i < files_to_copy.length; i++) {
		var file_to_copy = files_to_copy[i];
		var new_file = new File(original_fonts_folder + "/" + file_to_copy.name);
		file_to_copy.copy(new_file);
		file_to_copy.remove();
	}
	// Remove the (now empty) Document fonts folder
	package_folder_fonts_folder.remove();
	
	// Delete all files in the main packaged folder
	var files_to_remove = package_folder.getFiles();
	for (var i = 0; i < files_to_remove.length; i++) {
		var file_to_remove = files_to_remove[i];
		file_to_remove.remove();
	}
	
	// Finally, remove the (now empty) packaged folder
	package_folder.remove();
	
};