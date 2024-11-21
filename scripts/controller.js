import { BlackjackModel } from './model.js';
import { BlackjackView } from './view.js';

export class BlackjackController {
    constructor() {
        this.model = new BlackjackModel();
        this.view = new BlackjackView();

        this.wins = 0;
        this.losses = 0;
        this.draws = 0;

        this.gameHistory = [];

        this.initializeEvents();
        this.startGame();
    }

    // Initialize event listeners for buttons
    initializeEvents() {
        this.view.hitButton.addEventListener("click", () => this.handleHit());
        this.view.standButton.addEventListener("click", () => this.handleStand());
        this.view.newGameButton.addEventListener("click", () => this.startNewGame());
    }

    startGame() {
        this.model.createDeck();
        this.model.DealDealer();
        this.view.renderDealerCards(this.model.dealerHand,1);
        this.model.DealPlayer();
        this.view.renderPlayerCards(this.model.playerHand);

        this.view.newGameButton.setAttribute("disabled",true);
    }

    // Start a new game
    startNewGame() {
        this.model.startNewGame();
        this.view.startNewGame(this.model.dealerHand,this.model.playerHand,this.wins,this.losses,this.draws,this.gameHistory);
        
        this.view.newGameButton.setAttribute("disabled",true);
    }

    // Handle "Hit" button
    handleHit() {
        this.model.dealPCard();
        this.view.renderPlayerCards(this.model.playerHand);

        // const score = this.model.calculateScore(this.model.playerHand);
        if (this.model.playerVal > 21) {
            alert("You busted! Dealer wins.");
            this.losses++;
            this.gameHistory.push("Lost");
            this.view.updateScoreboard(this.wins, this.losses, this.draws,this.gameHistory);
            console.log(this.gameHistory);
            
            //Disable Hit button when you lose
            this.view.renderDealerCards(this.model.dealerHand,0)
            this.view.hitButton.setAttribute("disabled",true);
            this.view.standButton.setAttribute("disabled",true);
            this.view.newGameButton.removeAttribute("disabled");
        }
    }

    // Handle "Stand" button
    handleStand() {
        this.model.dealDCards();
        const winner =  this.model.checkWin();

        if (winner === 0){
            alert("The Dealer Won");
            this.losses++;
            this.gameHistory.push("Lost");
        }
        else if (winner === 1){
            alert("Congrats! You won the game");
            this.wins++;
            this.gameHistory.push("Won");
        }
        else{
            alert("You Drew the game!");
            this.draws++;
            this.gameHistory.push("Draw");
        }
        console.log(this.gameHistory);
            
        //Disable Hit button when you lose
        this.view.renderDealerCards(this.model.dealerHand,0);
        this.view.hitButton.setAttribute("disabled",true);
        this.view.standButton.setAttribute("disabled",true);
        this.view.updateScoreboard(this.wins, this.losses, this.draws,this.gameHistory);
        
        this.view.newGameButton.removeAttribute("disabled");
    }
}
