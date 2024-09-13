// const Apikey = "e02ac36c9ac2ae38e9528667bd294b2d";
// const ApiUrl =
//     "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=pakistan";
let Input_field = document.getElementById("Input-field");
async function checkweater(cityname) {
    try {
        document.querySelector(".spinner").innerHTML = `
    <div class="loader"></div>
    `;
        // document.querySelector("#weather").classList.add("expand");

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${cityname}&appid=e02ac36c9ac2ae38e9528667bd294b2d`
        );
        if (response.status === 404) {
            document.querySelector(".msg").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            document.querySelector(".spinner").innerHTML = null;
        } else {
            // const response = await fetch(ApiUrl + `&appid=${Apikey}`);
            var data = await response.json();
            document.querySelector(".msg").style.display = "none";
            document.querySelector(".weather").style.display = "flex";
            // document.querySelector(".expand").style.opacity = "1";
            document.querySelector(".spinner").innerHTML = null;
            // console.log(data);
            const { name, wind, main, weather } = data;
            document.querySelector(".cityname").innerHTML = name;
            document.querySelector(".temp").innerHTML = Math.round(main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = main.humidity + "%";
            document.querySelector(".wind").innerHTML = wind.speed + " Km/h";
            // document.getElementById("Input-field").innerHTML = "";
            weather.forEach((element) => {
                //   console.log(element.main);
                if (
                    element.main === "Clear" ||
                    element.main === "Clouds" ||
                    element.main === "Drizzle" ||
                    element.main === "Mist" ||
                    element.main === "Rain" ||
                    element.main === "Snow" ||
                    element.main === "Smoke"
                ) {
                    let text = element.main;
                    // console.log(text);
                    let convertcapitalize = text.toLowerCase();
                    document.getElementById(
                        "Weather-icon"
                    ).src = `./${convertcapitalize}.png`;
                    // console.log();
                } else {
                    document.getElementById("Weather-icon").src = `./rain.png`;
                    // console.log(element.main);
                }
            });
        }
    } catch (err) {
        console.log("I Has come an error" + err);
        //  ();
    }

    // let convertdatainjson = response.json();
    // console.log(convertdatainjson.Object);
}
document.getElementById("Btn-search").addEventListener("click", () => {
    // console.log(Input_field.value);

    if (Input_field.value.length > 0) {
        checkweater(Input_field.value);
    } else {
        alert("Please Enter City Name");
    }
    // checkweater();
    Input_field.value = null;
});