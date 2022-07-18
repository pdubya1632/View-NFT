// //handle editing the gallery
// async function editGalleryHandler(event) {
//     event.preventDefault();
//     //get the Gallery title and the text
//     // const title = document.querySelector("#gallery-title").innerHTML;
//     const body = document.querySelector("#gallery-body").innerHTML;
//     const gallery_id = window.location.toString().split("/")[
//       window.location.toString().split("/").length - 1
//     ];
//     console.log(title, body);
//     document.location.replace("/edit/" + gallery_id);
//   }
  
  //handle deleting the gallery
  async function deleteGalleryHandler(event) {
    event.preventDefault();
    //make request to gallery route delete with the current gallery id in nav bar
    const gallery_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
    const response = await fetch("/api/galleries/" + gallery_id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    //check if all good
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText); // find better way
    }
  }
  
  //edit gallery
  document.querySelector("#edit-btn").addEventListener("click", editGalleryHandler);
  //delete gallery
  document
    .querySelector("#delete-btn")
    .addEventListener("click", deleteGalleryHandler);