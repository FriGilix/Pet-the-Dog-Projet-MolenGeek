// ÉTAPE 1
// Création des trois variables
LOVE = 100
FOOD = 100
POOPY = 0


// Récupération des jauges
loveValue = document.getElementById('loveValue')
foodValue = document.getElementById('foodValue')
poopyValue = document.getElementById('poopyValue')


// Largeur des jauges
loveValue.style.width = LOVE + "%"
foodValue.style.width = FOOD + "%"
poopyValue.style.width = POOPY + "%"


// Nombre de chocolats
let CHOCOLAT = 0


// Récupération des Spans pour le Chocolat
let chocolatCount = document.getElementById('chocolatCount')
chocolatCount.innerText = CHOCOLAT




// ÉTAPE 2
// Création de chocolat By Click
let CHOCOLAT_BY_CLICK = 1


// Récupération de "EXPLORE"
let btnExplore = document.getElementById('btnExplore')


// Ajouter des chocolats
function plusChocolat(quantity){
    CHOCOLAT += quantity
    chocolatCount.innerText = CHOCOLAT
}

// Ajout du clique pour "EXPLORE"
btnExplore.addEventListener("click", () =>{
    plusChocolat(CHOCOLAT_BY_CLICK)
})




// ÉTAPE 3
// Création des variables pour la perte de "food" et "love"
let LOVE_LOST_BY_SEC = 2
let FOOD_LOST_BY_SEC = 5

// Fonction diminuer FOOD
function lostLove(quantity){
    if (LOVE > 0){
        LOVE -= quantity
        if (LOVE < 0) LOVE = 0
        loveValue.style.width = LOVE + "%"
    }
}

// Fonction pour diminuer LOVE
function lostFood(quantity){
    if (FOOD > 0){
        FOOD -= quantity
        if (FOOD < 0) FOOD = 0
        foodValue.style.width = FOOD + "%"
    }
}

// Intervalle pour diminuer les jauges chaques seconde
let lost_interval = setInterval(() =>{
    lostLove(LOVE_LOST_BY_SEC)
    lostFood(FOOD_LOST_BY_SEC)
}, 1000)




// ÉTAPE 4
// Récuparation des boutons "FEED" et "PET"
let btnFeed = document.getElementById("btnFeed")
let btnPet = document.getElementById("btnPet")

// Variable pour restaurer "LOVE" et "FOOD"
let LOVE_RESTORE = 3
let FOOD_RESTORE = 3

// Restaurer LOVE 
function restoreLove(quantity){
    if (LOVE < 100){
        LOVE += quantity
        if (LOVE > 100) LOVE = 100
        loveValue.style.width = LOVE + "%"
    }
}

// Restaurer FOOD
function restoreFood(quantity){
    if (FOOD < 100){
        FOOD += quantity
        if (FOOD > 100) FOOD = 100
        foodValue.style.width = FOOD + "%"
    }
}

// Ajout des évenements click
btnFeed.addEventListener("click", () =>{
    restoreFood(FOOD_RESTORE)
})

btnPet.addEventListener("click", () =>{
    restoreLove(LOVE_RESTORE)
})




// ÉTAPE 5
// Récuparation des HTML pour les Buddies
let btnBuyBuddy = document.getElementById('btnBuyBuddy')
let spanBuddyCount = document.getElementById('buddyCount')

// Variable pour les buddies
let BUDDY_COST = 15
let BUDDY_COUNT = 0
let BUDDY_CHOCOLAT_BY_SEC = 1
let BUDDY_LIST = []

// Fonction BUY BUDDIES
btnBuyBuddy.addEventListener("click", () =>{
    if (CHOCOLAT >= BUDDY_COST){
        CHOCOLAT -= BUDDY_COST

        chocolatCount.innerText = CHOCOLAT
        BUDDY_COUNT++

        spanBuddyCount.innerText = BUDDY_COUNT

        let intervalle = setInterval(() =>{
            plusChocolat(BUDDY_CHOCOLAT_BY_SEC)
        }, 1000)

        BUDDY_LIST.push(intervalle)
    }
})




// ÉTAPE 6
// Récupération de "GameOver"
let divGameOver = document.getElementById("gameover")

// Vérification de la fin de partie
function checkGameOver(){
    if (LOVE === 0 || FOOD === 0){
        divGameOver.classList.remove("hide")

        // Arrêt de tout les intervalles
        BUDDY_LIST.forEach(intervalle => 
            clearInterval(intervalle))
            clearInterval(lost_interval)
    }
}

// Vérification de perte
function lostLove(quantity){
    if (LOVE > 0){
        LOVE -= quantity
        if (LOVE < 0) LOVE = 0
        loveValue.style.width = LOVE + "%"
    }
    checkGameOver()
}

function lostFood(quantity){
    if (FOOD > 0){
        FOOD -= quantity
        if (FOOD < 0) FOOD = 0

        foodValue.style.width = FOOD + "%"
    }
    checkGameOver()
}


// Reset la game quand GameOver
let btnRestart = document.getElementById("btnRESET")

btnRestart.addEventListener("click", restartGame)

function restartGame(){
    LOVE = 100
    FOOD = 100
    POOPY = 0
    CHOCOLAT = 0
    BUDDY_COUNT = 0

    BUDDY_LIST.forEach(clearInterval)
    BUDDY_LIST = []

    loveValue.style.width = LOVE + "%"
    foodValue.style.width = FOOD + "%"
    poopyValue.style.width = POOPY + "%"
    chocolatCount.innerText = CHOCOLAT
}

spanBuddyCount.innerText = BUDDY_COUNT

divGameOver.classList.add("hide")

lost_interval = setInterval(() =>{
    lostLove(LOVE_LOST_BY_SEC)
    lostFood(FOOD_LOST_BY_SEC)
}, 1000) 





