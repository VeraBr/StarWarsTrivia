//variabler 
let showCharacters = document.querySelector(".show-characters")
let character1Container = document.querySelector(".character1")
let character2Container = document.querySelector(".character2")
let infoCharacter1 = document.querySelector(".info-1")
let infoCharacter2 = document.querySelector(".info-2")

let countDifference = (num1, num2) => {

    difference = num1 - num2

    return difference
}

class Character {
    constructor(name, gender, height, mass, hair_color){
        this.name = name
        this.gender = gender
        this.height = height
        this.mass = mass
        this.hair_color = hair_color
        this.pictureUrl

        if (name == "Darth Vader"){
            this.pictureUrl = "./img/darthvader.png"
        } else if (name == "Leia Organa"){
            this.pictureUrl = "./img/leiaorgana.png"
        } else if (name == "Luke Skywalker"){
            this.pictureUrl = "./img/lukeskywalker.png"
        } else if (name == "R2-D2"){
            this.pictureUrl = "./img/r2d2.png"
        } else if (name == "Chewbacca"){
            this.pictureUrl = "./img/chewbacca.png"
        } else if (name == "Han Solo"){
            this.pictureUrl = "./img/hansolo.png"
        } else if (name == "Boba Fett"){
            this.pictureUrl = "./img/bobafett.png"
        } else if (name == "Obi-Wan Kenobi"){
            this.pictureUrl = "./img/obiwankenobi.png"
        } 
    }

    getMass(char) {
        
        let massCharacter1 = parseInt(this.mass);
        let massCharacter2 = parseInt(char.mass);

        let output

        if (massCharacter2 > massCharacter1) {

            countDifference(massCharacter2, massCharacter1)

            output = `${char.name} weighs ${char.mass}kg which is ${difference}kg more than you`

        } else if (massCharacter2 < massCharacter1) {

            countDifference(massCharacter1, massCharacter2)

            output = `${char.name} weighs ${char.mass}kg which is ${difference}kg less than you`
        
        } else {

            output = `${char.name} weighs ${char.mass}kg`

        }

        return output
    }

    getHeight(char) {

        let heightCharacter1 = parseInt(this.height);
        let heightCharacter2 = parseInt(char.height);

        let output

        if (heightCharacter2 > heightCharacter1) {

            countDifference(heightCharacter2, heightCharacter1)
            output = `${char.name} is ${char.height}cm which is ${difference}cm taller than you`

        } else if (heightCharacter2 < heightCharacter1) {

            countDifference(heightCharacter1, heightCharacter2)
            output = `${char.name} is ${char.height}cm which is ${difference}cm shorter than you`

        } else {

            output = `${char.name} is ${char.height}cm`

        }

        return output
    }

    getHairColor (char) {

        let output

        if (this.hair_color == char.hair_color) {
            output = `${char.name} have ${char.hair_color} hair just like you`
        } else {
            output = `${char.name} have ${char.hair_color} hair`
        }

        return output
    }

    getGender (char) {

        let output

        if (this.gender == char.gender) {
            output = `${char.name} is also a ${char.gender} like you`
        } else {
            output = `${char.name} is a ${char.gender}`
        }

        return output
    }
}


//Rendera ut valda karaktärer
const renderCharacter = (char1, char2) => {

    const character1Info =`
    <h2>${char1.name}</h2>
    <img src="${char1.pictureUrl}" alt="">
    <h4>Ask ${char2.name} questions about</h4>
    <div class="btn-wrapper">
        <button class="btn">Mass</button>
        <button class="btn">Height</button>
        <button class="btn">Hair color</button>
        <button class="btn">Gender</button>
    </div>
    <div class="char-1-info"></div>

    `

    const character2Info =`
    <h2>${char2.name}</h2>
    <img src="${char2.pictureUrl}" alt="">
    <h4>Ask ${char1.name} questions about</h4>
    <div class="btn-wrapper">
        <button class="btn">Mass</button>
        <button class="btn">Height</button>
        <button class="btn">Hair color</button>
        <button class="btn">Gender</button>
    </div>
    <div class="char-2-info"></div>

    `

    character1Container.innerHTML = character1Info;
    character2Container.innerHTML = character2Info;


}


const buttonFunction = (char) => {

    const button = document.querySelectorAll(".btn")
    const characterInfo1 = document.querySelector(".char-1-info")
    const characterInfo2 = document.querySelector(".char-2-info")
    
    button.forEach((btn, i) => {

        btn.setAttribute("id", i + 1)

        btn.addEventListener("click", () => {

            let btnId = btn.getAttribute("id");

            if(btnId === "1"){
                let output = char1.getMass(char2)
                characterInfo1.innerHTML = output;
            } 
            else if (btnId === "5") {
                let output = char2.getMass(char1)
                characterInfo2.innerHTML = output;
            }

            else if (btnId === "2"){
                let output = char1.getHeight(char2)
                characterInfo1.innerHTML = output;
            }

            else if (btnId === "6") {
                let output = char2.getHeight(char1)
                characterInfo2.innerHTML = output;
            }

            else if (btnId === "3") {
                let output = char1.getHairColor(char2)
                characterInfo1.innerHTML = output;
            }

            else if (btnId === "7") {
                let output = char2.getHairColor(char1)
                characterInfo2.innerHTML = output;
            }

            else if (btnId === "4") {
                let output = char1.getGender(char2)
                characterInfo1.innerHTML = output;
            }

            else if (btnId === "8") {
                let output = char2.getGender(char1)
                characterInfo2.innerHTML = output;
            }
        

        })

    })

}

let char1
let char2

// Fetch för att hämta data om karaktär
let fetchData = async (chosen) => {
    let response = await fetch(`https://swapi.dev/api/people/${chosen}`);
    let data = response.json();

    return data
}

showCharacters.addEventListener("click", () => {

    character1Container.innerHTML = "";
    character2Container.innerHTML = "";

    let selectedCharacter1 = document.querySelector("#character1").value

    //Karaktär 1
    fetchData(selectedCharacter1).then(data => {
        char1 = new Character (data.name, data.gender, data.height, data.mass, data.hair_color);
        
        buttonFunction(char1)

    })

    let selectedCharacter2 = document.querySelector("#character2").value

    //Karaktär 2
    fetchData(selectedCharacter2).then(data => {
        char2 = new Character (data.name, data.gender, data.height, data.mass, data.hair_color);

        renderCharacter(char1, char2)

        buttonFunction(char2)

    })

})

