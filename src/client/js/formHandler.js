function handleSubmit(event) {
  event.preventDefault();

  // check what url was put into the form field
  let formURL = document.getElementById("name").value;
  if (Client.checkURL(JSON.parse(JSON.stringify(formURL)))) {
    console.log("::: Form url is ok :::");
    fetch("http://localhost:3000/article", {
      method: "POST",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        text: formURL 
      }),
    })
      .then((res) => {
       return JSON.parse(res)
      })
      .then(function (res) {
        //for debugging
        console.log("result: " + res);

        document.getElementById("polarity").innerHTML = res.polarity;
        document.getElementById("subjectivity").innerHTML = res.subjectivity;
        document.getElementById("polarity_confidence").innerHTML =
          res.polarity_confidence;
        document.getElementById("subjectivity_confidence").innerHTML =
          res.subjectivity_confidence;
        document.getElementById("text").innerHTML = res.text;
      });
  }
}

export { handleSubmit };
