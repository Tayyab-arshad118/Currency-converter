const BASE_URL =
  "https://open.er-api.com/v6/latest/";
const dropdowns = document.querySelectorAll(".dropdown select")
const exbtn = document.querySelector(".exbtn");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const amount = document.querySelector(".amount input")
const msg = document.querySelector(".msg")



window.addEventListener("load",()=>{
  getrate();
})

const getrate = async ()=>{
  amtvalue = amount.value;
  console.log(amtvalue)
  newURL = `${BASE_URL}${fromCurr.value}`
  let resp =  await fetch(newURL)
  let data = await resp.json();
  let rate = data.rates[toCurr.value]
  let finalvalue = amtvalue * rate
  msg.innerText = `${amtvalue} ${fromCurr.value} = ${finalvalue}`
}
  

for (let select of dropdowns) {
    for (currcode in countryList) {
        let newopt = document.createElement("option")
          newopt.innerText = currcode;
          newopt.value=currcode;
          if (select.name === "From" && currcode === "USD"){
            newopt.selected = "selected";
          }
          else if (select.name === "to" && currcode === "PKR"){
            newopt.selected = "selected";
          }
          select.append(newopt)
        }

        select.addEventListener("change", (evt)=>{
          updateFlag(evt.target);
        })
}


const updateFlag = (element)=>{
   let currcode = element.value
   let countrycode = countryList[currcode]
   let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
   let img = element.parentElement.querySelector("img")
   img.src = newsrc;
}

exbtn.addEventListener("click", (evt)=>{
  evt.preventDefault();
  getrate();
})

