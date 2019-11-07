$(document).ready(function() {
  function formatItem(item) {
    return (
      "<td>" +
      item.user_id +
      "</td> <td>" +
      item.display_name +
      '</td> > <td> <img src="' +
      item.profile_image +
      '" alt="name" /> </td> <td> ' +
      item.location +
      " </td> <td>" +
      item.user_type +
      "</td>"
    );
  }

  $.when(
    $.getJSON("https://api.stackexchange.com/2.2/users?site=stackoverflow"),
    $.getJSON(
      "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
      {
        tags: "bird",
        tagmode: "any",
        format: "json"
      }
    )
  ).then(function(res1, res2) {
    $.each(res1[0].items, function(i, item) {
      $("<tr>", {
        html: formatItem(item)
      }).appendTo($("#tbdata"));
    });
    $.each(res2[0].items, function(i, item) {
      var img = $("<img/>");
      img.attr("class", "img-responsive");
      img.attr("src", item.media.m).appendTo("#dvImages");
      if (i == 3) return false;
    });
  });
});
