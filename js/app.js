new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        healCount: 0,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.healCount = 0;
            this.turns = [];
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });

            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();

        },
        specialAttack: function () {
            var damage = this.calculateDamage(10, 34);
            this.monsterHealth -= damage ;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster Hard for ' + damage
            });

            if (this.checkWin()) {
                return;
            }
          

            this.monsterAttacks();

        },
        heal: function () {

            //you only get three heals, don't blow it
            if (this.healCount < 3) {
                var heal = this.calculateHeal();
                this.playerHealth += heal;
                this.healCount += 1;
            } else {
                alert('You are out of heals!');
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for ' + heal
            });heal
            this.monsterAttacks();
            return true;

        },
        endGame: function () {
            this.gameIsRunning = false;
        },
        monsterAttacks: function() {
            var damage = this.calculateDamage(5, 12)
            this.playerHealth -= damage;
            this.turns.push({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
            this.checkWin();
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