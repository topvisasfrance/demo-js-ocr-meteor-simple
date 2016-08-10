Template._image_viewer.onRendered(function () {
   if (!this._rendered) {
      this._rendered = true;
      var imageViewerDiv = document.getElementById("viewer");
      var createOptions = new lt.Controls.ImageViewerCreateOptions(imageViewerDiv);
      imageViewer = new lt.Controls.ImageViewer(createOptions);
      imageViewer.defaultInteractiveMode = new lt.Controls.ImageViewerPanZoomInteractiveMode();

      var imgUrl = $("select").val();
      // Load an image in the viewer
      changeImage(imgUrl);
      ocrImage(imgUrl);
   }
});






