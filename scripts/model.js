export class BlackjackModel {
    constructor() {
        this.suits = ["H", "D", "C", "S"];
        this.ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
        
        this.deck = [];
        this.playerHand = [];
        this.dealerHand = [];

        this.dealerVal = 0;
        this.playerVal = 0;
        this.dealerAces = 0;
        this.playerAces = 0;
    }

    // Create a fresh deck
    createDeck() {
        this.deck = [];
        for (let suit of this.suits) {
            for (let rank of this.ranks) {
                this.deck.push(rank + suit);
            }
        }
        this.shuffleDeck();
    }

    // Shuffle the deck using the Fisher-Yates algorithm
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    startNewGame() {
        this.createDeck();
        this.playerHand = [];
        this.dealerHand = [];
        this.dealerVal = 0;
        this.playerVal = 0;
        this.dealerAces = 0;
        this.playerAces = 0;
        this.DealDealer();
        this.DealPlayer();
    }

    // Deal a card to the player
    dealPCard() {
        const card = this.deck.pop();
        this.playerHand.push(card);
        this.playerVal += this.calScore(card,this.playerHand);

        while (this.playerVal > 21 && this.playerAces){
            this.playerVal-=10;
            this.playerAces--;
        }
    }

    //Deal Dealer at the start of Game
    DealDealer(){
        for (var i=0;i<2;i++){
            let card = this.deck.pop();
            this.dealerHand.push(card);
            this.dealerVal += this.calScore(card,this.dealerHand);
        }
    }

    //Deal Player at the start of Game
    DealPlayer() {
        for (var i=0;i<2;i++){
            let card = this.deck.pop();
            this.playerHand.push(card);
            this.playerVal += this.calScore(card,this.playerHand);
        }
    }

    //Calculate the Score of each Card
    calScore(card,hand) {
        let score = 0;
        let val = card.slice(0,-1);

        if (["T", "J", "Q", "K"].includes(val)){
            val = "10";
        }
        if (val === "A"){
            val = "11"
            if (hand === this.dealerHand ? this.dealerAces++ : this.playerAces++);
        }
        let cacheVal = parseInt(val);

        score += cacheVal;
        return score;
    }

    //Check Win
    checkWin() {
        if (this.dealerVal>21){
            return 1;
        } 
        else{
            if (this.dealerVal>this.playerVal) return 0;
            else if (this.dealerVal<this.playerVal) return 1;
            else return 2;
        } 
    }

    dealDCards() {
        while (this.dealerVal<17){
            let card = this.deck.pop();
            this.dealerHand.push(card);
            this.dealerVal += this.calScore(card,this.dealerHand);

            while (this.dealerVal > 21 && this.dealerAces){
                this.dealerVal-=10;
                this.dealerAces--;
            }
        }
    }
}
