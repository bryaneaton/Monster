new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        healCount: 0
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.healCount = 0;
        },
        attack: function () {
            this.monsterHealth -= this.calculateDamage(3, 10);

            if (this.checkWin()) {
                return;
            }

            this.playerHealth -= this.calculateDamage(5, 12)

            this.checkWin();

        },
        specialAttack: function () {
            this.monsterHealth -= this.calculateDamage(10, 34);

            if (this.checkWin()) {
                return;
            }

            this.playerHealth -= this.calculateDamage(15, 34)

            this.checkWin();

        },
        heal: function () {

            //you only get three heals, don't blow it
            if (this.healCount < 3) {
                this.playerHealth += this.calculateHeal();
                this.healCount += 1;
            } else {
                alert('You are out of heals!');
            }
            return true;

        },
        endGame: function () {
            this.gameIsRunning = false;
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        calculateHeal: function () {
            if (this.playerHealth < 100){
                return Math.floor(Math.random() * 8) + 3
            }
            else{
                return 0;
            }
            
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You Won, new game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You Failed, new game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});