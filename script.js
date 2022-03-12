function uploadFile(e) {
  var uploadBtn = document.querySelector(".upload-btn");
  var downloadBtn = document.querySelector(".download-btn");
  var inputBtn = document.querySelector("#file");
  var file = document.getElementById("file").files[0];
  var formData = new FormData();
  formData.append("file", file);
  uploadBtn.innerHTML = "Loading...";
  uploadBtn.disabled = true;
  inputBtn.disabled = true;
  uploadBtn.style.backgroundColor = "#ccc";
  try {
    var res = fetch("https://reportgen-api.herokuapp.com/upload", {
      method: "POST",
      body: formData,
    });
    res
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status) {
          uploadBtn.innerHTML = "Upload";
          uploadBtn.style.backgroundColor = "#b5e985";
          uploadBtn.hidden = true;
          downloadBtn.hidden = false;
          inputBtn.disabled = true;
          alert(json.message);
        } else {
          alert("ERROR: " + json.message);
          uploadBtn.innerHTML = "Upload";
          uploadBtn.disabled = false;
          inputBtn.disabled = false;
          uploadBtn.style.backgroundColor = "#b5e985";
        }
      });
  } catch (e) {
    alert(e);
  }
  e.preventDefault();
}

function downloadFile() {
  var input = document.querySelector("input[type=file]");
  input.value = "";
  var uploadBtn = document.querySelector(".upload-btn");
  var downloadBtn = document.querySelector(".download-btn");
  var inputBtn = document.querySelector("#file");
  downloadBtn.hidden = true;
  uploadBtn.hidden = false;
  inputBtn.disabled = false;
}
