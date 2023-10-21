// Save All Open Covers as Print Ready TIFFs.jsx
// A Photoshop Script for Massive Publishing, developed by Randall Bruder
/*  
* @@@BUILDINFO@@@ "Massive Publishing - Save All Open Covers as Print Ready TIFFs.jsx" 2.3.0 16 August 2023
*/

main();
function main() {
	
	// Check if Photoshop is running
	if (app && app.activeDocument) {
		
		// Store the currently active document, to return to it later.
		var originalDocument = app.activeDocument;
		
		// Set up the save options; saving as a TIFF with LZW compression and discarding layers
		var saveOptions = new TiffSaveOptions();
		saveOptions.imageCompression = TIFFEncoding.TIFFLZW;
		saveOptions.layers = false;
		
		// Iterate through all open documents
		for (var i = 0; i < app.documents.length; i++) {
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
		}
		
		// Return to the original document
		app.activeDocument = originalDocument;
		
		alert("Files saved as TIFF with LZW compression and discarded layers.");
	} else {
		alert("Error\r\nPlease have all the Covers you want to export open in Photoshop before running this script.", "", true);
	}
};