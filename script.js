const input = document.querySelector("#input");
const listPlayers = document.querySelector("#list-players");
const listSelected = document.querySelector("#list-selected");
const containerDescription = document.querySelector("#container-description");
const loading = document.querySelector("h3");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b83c4c021amsh3983c7298d63292p1155a9jsnaa9b026a3b17',
		'X-RapidAPI-Host': 'nba-player-individual-stats.p.rapidapi.com'
	}
};

fetch('https://nba-player-individual-stats.p.rapidapi.com/players', options)
	.then(response => response.json())
	.then(data => {
        let playerData
        if (playerData === undefined) {
            loading.classList.add("hide")
        }
        playerData = data.filter(player => player.firstName !== null && player.position !== null)
        let playerLi;
        for (let i = 0; i < playerData.length; i++) {
            playerLi = document.createElement("li");
            playerLi.classList.add("on-load")
            playerLi.innerHTML = `${playerData[i].firstName} ${playerData[i].lastName} (${playerData[i].position})`
            listPlayers.appendChild(playerLi)
        }

        let selectedPlayer;
        listPlayers.addEventListener("click", (e) => {
            if (e.target.tagName === "LI") {
                e.target.remove();
                selectedPlayer = document.createElement("li");
                selectedPlayer.classList.add("selected-players");
                selectedPlayer.innerHTML = e.target.innerHTML
                listSelected.appendChild(selectedPlayer)
            }

            for (let i = 0; i < listSelected.children.length; i++) {
                   if (listSelected.children[i].tagName === "LI") {
                    containerDescription.style.display = "none";
                    listSelected.style.flexDirection = "column";
                   }
               }
        })

        listSelected.addEventListener("click", (e) => {
            if (e.target.tagName === "LI") {
                e.target.remove()
                playerLi.innerHTML = e.target.innerHTML
                listPlayers.appendChild(playerLi)
            }

            for (let i = 0; i < listSelected.children.length; i++) {
                if (listSelected.children.length === 1) {
                    containerDescription.style.display = "block";
                    listSelected.style.flexDirection = "row";
                }
            }
        })

        //search filter
        const initialLi = document.querySelectorAll("li")
        input.addEventListener("keyup", (e) => {
          for (let i = 0; i < initialLi.length; i++) {
            if (initialLi[i].innerHTML.toLowerCase().includes(e.target.value.toLowerCase())) {
               initialLi[i].style.display = "block";
            } else {
                initialLi[i].style.display = "none";
            }
          }
        })        
    })
	.catch(err => console.error(err));