// Save All Open Covers as Print Ready TIFFs.jsx
// A Photoshop Script for Massive Publishing, developed by Randall Bruder
/*  
* @@@BUILDINFO@@@ "Massive Publishing - Save All Open Covers as Print Ready TIFFs and Web JPGs.jsx" 2.3.3 4 July 2024
*/

main();
function main() {
	
	// Check if Photoshop is running
	if (app && app.activeDocument) {
		
		// Ensure no dialogs are shown during execution
		app.displayDialogs = DialogModes.NO;
		
		// Store the currently active document, to return to it later.
		var originalDocument = app.activeDocument;
		
		// Set up the save options; saving as a TIFF with LZW compression and discarding layers
		var saveOptions = new TiffSaveOptions();
		saveOptions.imageCompression = TIFFEncoding.TIFFLZW;
		saveOptions.layers = false;
		
		// Iterate through all open documents
		for (var i = 0; i < app.documents.length; i++) {
			
			/*
			 * Save a flattened print-ready TIFF version
			 */
			
			app.activeDocument = app.documents[i];
			
			// Make sure the color mode is CMYK, if it isn't, show an error and don't save the file
			if (app.activeDocument.mode.toString() != "DocumentMode.CMYK") {
				alert("Error\r\n" + app.activeDocument.name + " isn't in the color mode CMYK.", "", true);
			} else {
				// Get the source folder path of the active document
				var sourcePath = decodeURI(app.activeDocument.path);
				
				// Create the target folder path
				var targetFolderPath = sourcePath + '/../03 For Print CMYK covers/';
				
				// Check and see if the folder exists. If it doesn't, create it.
				var targetFolder = new Folder(targetFolderPath);
				if (!targetFolder.exists) {
					targetFolder.create();
				}
				
				// Save the document as a copy
				app.activeDocument.saveAs(new File(targetFolderPath + app.activeDocument.name), saveOptions, true);
			}
			
			/*
			 * Save a lower res JPG version
			 */
			
			
			var doc = app.documents[i];
			var originalDoc = doc.duplicate();
			
			// Resize document to 750px wide
			var targetWidth = 750;
			var targetResolution = 150;
			var targetHeight = (doc.height / doc.width) * targetWidth;
			originalDoc.flatten();
			originalDoc.resizeImage(UnitValue(targetWidth, "px"), UnitValue(targetHeight, "px"), targetResolution, ResampleMethod.BICUBIC);
			
			// Prepare JPEG save options
			var jpegOptions = new JPEGSaveOptions();
			jpegOptions.quality = 12; // Max quality
			jpegOptions.formatOptions = FormatOptions.STANDARDBASELINE;
			jpegOptions.matte = MatteType.NONE;
			
			// Create the target folder path
			var targetFolderPath = sourcePath + '/../04 Web Versions/';
			
			// Check and see if the folder exists. If it doesn't, create it.
			var targetFolder = new Folder(targetFolderPath);
			if (!targetFolder.exists) {
				targetFolder.create();
			}
			
			// Save the document as JPEG
			originalDoc.saveAs(new File(targetFolderPath + app.activeDocument.name.replace(/ copy/, '')), jpegOptions, true, Extension.LOWERCASE);
			
			// Close the duplicated document without saving
			originalDoc.close(SaveOptions.DONOTSAVECHANGES);
			
		}
		
		// Return to the original document
		app.activeDocument = originalDocument;
		
		// Restore dialogs to default
		app.displayDialogs = DialogModes.ALL;
	} else {
		alert("Error\r\nPlease have all the Covers you want to export open in Photoshop before running this script.", "", true);
	}
};