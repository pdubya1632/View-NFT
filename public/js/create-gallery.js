async function createGalleryHandler(event) {
    event.preventDefault();
    //get info we need
    // const title = document.querySelector("#gallery-title").value.trim();
    const body = document.querySelector("#gallery-body").value.trim();
    
    if (body) {
      //make sure we have comment text
      const response = await fetch("/api/galleries", {
        method: "POST",
        body: JSON.stringify({
          body
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      //check if all good
      if (response.ok) {
        document.location.replace("/dashboard"); //replace with gallery id
      } else {
        alert(response.statusText); // find better way to do this
      }
    }
  }
  
  document
    .querySelector("#search-btn")
    .addEventListener("click", createGalleryHandler);
