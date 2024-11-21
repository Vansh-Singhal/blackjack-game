export class BlackjackView {
    constructor() {
        this.playerCardsElement = document.getElementById("playerCards");
        this.dealerCardsElement = document.getElementById("dealerCards");
        this.scoreboardElement = document.getElementById("scoreboard");
        this.scoreHistoryElement = document.getElementById("scoreHistory");
        this.hitButton = document.getElementById("hitButton");
        this.standButton = document.getElementById("standButton");
        this.newGameButton = document.getElementById("newGameButton");
    }

    // Render the player's cards
    renderPlayerCards(playerHand) {
        this.playerCardsElement.innerHTML = ''; // Clear the player's hand
        playerHand.forEach(card => {
            const cardImg = this.createCardElement(card);
            this.playerCardsElement.appendChild(cardImg);
        });
    }

    // Render the dealer's cards
    renderDealerCards(dealerHand,val) {
        this.dealerCardsElement.innerHTML = '';

        if (val===1){
            const cardImg = this.createCardElement("1B");
            this.dealerCardsElement.appendChild(cardImg);
        }
        
        for (var i = val;i<dealerHand.length;i++){
            var card = dealerHand[i];
            const cardImg = this.createCardElement(card);
            this.dealerCardsElement.appendChild(cardImg);
        }
    }

    // Create a card element (image) for the card
    createCardElement(card) {
        const cardImg = document.createElement("img");
        cardImg.src = `assets/images/cards/${card}.svg`;
        cardImg.alt = card;
        cardImg.classList.add("w-16", "h-24", "rounded", "shadow-md");
        return cardImg;
    }

    // Update the scoreboard (wins, losses)
    updateScoreboard(wins, losses, draws, history) {
        
        this.scoreboardElement.innerHTML = `
            <p class="text-lg">Games Won: <span class="font-bold text-green-600">${wins}</span></p>
            <p class="text-lg">Games Drawn: <span class="font-bold text-gray-600">${draws}</span></p>
            <p class="text-lg">Games Lost: <span class="font-bold text-red-600">${losses}</span></p>

        `;

        this.scoreHistoryElement.innerHTML = '';

        function createTag(tagName, tagText, tagClass) {
            var tag = document.createElement(tagName);
            tag.innerText = tagText;
            tag.className = tagClass
            return tag;
        }

        function checkClass(val) {
            switch (val){
                case "Won":
                     return "text-green-600";
                case ("Lost"):
                     return "text-red-600";
                case ("Draw"):
                     return "text-gray-600";
            }
        }

        for (var i=1;i<=history.length;i++){
            var li = document.createElement("li");
            li.className = "flex justify-between";
            li.appendChild(createTag('span',"Game "+ i));
            li.appendChild(createTag('span', history[i-1], "font-bold "+checkClass(history[i-1])));

            
            this.scoreHistoryElement.appendChild(li);
        }
    }

    startNewGame(dealerHand,playerHand,wins,losses,draws,history) {
        this.hitButton.removeAttribute("disabled");
        this.standButton.removeAttribute("disabled");

        this.renderDealerCards(dealerHand,1);
        this.renderPlayerCards(playerHand);
        this.updateScoreboard(wins,losses,draws,history);

    }
}
