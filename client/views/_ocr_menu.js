

Template._ocr_menu.events({
   "change select": function (event, template) {
      Session.set("text", "");
      var input = $("select").val();
      Blaze._globalHelpers.ocrImage(input);
      Blaze._globalHelpers.changeImage(input);
   }
});
