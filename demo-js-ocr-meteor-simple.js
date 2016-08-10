if (Meteor.isClient) {
   imageViewer = {};

   changeImage = function(imageUrl) {
      imageViewer.imageUrl = "http://demo.leadtools.com/LEADTOOLSRESTServicesHost19/Raster.svc/Load?uri=" + imageUrl;
      imageViewer.zoom(lt.Controls.ControlSizeMode.fitAlways, 1.0, imageViewer.defaultZoomOrigin);
   }
   Template.registerHelper("changeImage", changeImage);

   ocrImage = function (imageUrl) {
      Session.set('isLoading', true);
      Meteor.call("getImageInfo", imageUrl, function (error, result) {
         if (error) {
            Session.set('isLoading', false);
            window.alert("Error: " + error.reason);
            console.log("Error occurred on receiving data on server. ", error);
         } else {
            var imageInfo = JSON.parse(result.content);
            Meteor.call("ocrImage", imageUrl, 1, imageInfo.width, imageInfo.height, 662, 343, 1121, 587, function (error, result) {
               if (error) {
                  Session.set('isLoading', false);
                  window.alert("Error: " + error.reason);
                  console.log("Error occurred on receiving data on server. ", error);
               } else {
                  Session.set('isLoading', false);
                  Session.set("text", JSON.parse(result.content));
               }
            });
         }
      });
   }
   Template.registerHelper( "ocrImage", ocrImage);
}

if (Meteor.isServer) {
   Meteor.startup(function () {
      // code to run on server at startup
   });
   Meteor.methods({
      getBarcodes: function () {
         var url = "http://demo.leadtools.com/LEADTOOLSRESTServicesHost19/Barcode.svc/Read?uri=http://demo.leadtools.com/HTML5/BarcodeDemo/Resources/Images/barcode1.png&width=1900&height=2600&left=115&top=737&right=575&bottom=990";
         return Meteor.http.call("GET", url);
      },
      getImageInfo: function (uri) {
         var url = "http://demo.leadtools.com/LEADTOOLSRESTServicesHost19/Raster.svc/Info?uri=" + uri;
         return Meteor.http.call("GET", url);
      },
      getPdfBookmarks: function () {
         var url = "http://demo.leadtools.com/LEADTOOLSRestServicesHost19/Pdf.svc/GetBookmarks?uri=http://demo.leadtools.com/images/pdf/leadtools.pdf";
         return Meteor.http.call("GET", url);
      },
      getImgSrcs: function (uri) {
         var response = HTTP.call("GET", uri);
         return response;
      },
      ocrImage: function (uri, page, imageWidth, imageHeight, left, top, right, bottom) {
         //the rest service url
         var serviceUrl = "http://demo.leadtools.com/LEADTOOLSRestServicesHost19/ocr.svc"
         var uriTemplate = "/GetText?uri=" + uri
             //+ "&page=" + page
             + "&width=" + imageWidth + "&height=" + imageHeight;
         //+ "&left=" + left
         //+ "&top=" + top
         //+ "&right=" + right
         //+ "&bottom="+ bottom;
         //return the meteor call
         return Meteor.http.call("GET", serviceUrl + uriTemplate);
      },
   });
}
