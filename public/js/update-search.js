async function createGalleryHandler(event) {
    event.preventDefault();
    //get info we need
    // const title = document.querySelector("#gallery-title").value.trim();
    const body = document.querySelector("#gallery-body").value.trim();
    const post_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];

    if (body) {
      //make sure we have search text
      const response = await fetch("/api/gallery/" + post_id, {
        method: "PUT",
        body: JSON.stringify({
          title,
          body,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      //check if all good
      if (response.ok) {
        document.location.replace("/dashboard"); //replace with post id
      } else {
        alert(response.statusText); // find better way to do this
      }
    }
  }
  //planning to pass alchemy api results through in this file
  document
    .querySelector("#create-Search-btn")
    .addEventListener("click", createGalleryHandler);