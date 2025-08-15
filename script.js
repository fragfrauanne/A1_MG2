const tasks = [
    { question: "_____ heißen Sie?", answer: "Wie heißen Sie?" },
    { question: "Wie alt _____ Sie?", answer: "Wie alt sind Sie?" },
    { question: "_____ _____ verheiratet?", answer: "Sind Sie verheiratet?" },
    { question: "Was sprechen _____?", answer: "Was sprechen Sie?" },
    { question: "Wie alt _____ Ihre Kinder?", answer: "Wie alt sind Ihre Kinder?" },
    { question: "_____ wohnen _____?", answer: "Wo wohnen Sie?" },
    { question: "_____ _____ Ihre Telefonnummer?", answer: "Wie ist Ihre Telefonnummer?" },
    { question: "_____ _____ Englisch?", answer: "Sprechen Sie Englisch?" },
    { question: "_____ _____ Ihre E-Mail-Adresse?", answer: "Wie ist Ihre E-Mail-Adresse?" },
    { question: "Woher _____ Ihr Mann / Ihre Frau?", answer: "Woher kommt Ihr Mann / Ihre Frau?" },
    { question: "Wie geht _____ _____?", answer: "Wie geht es Ihnen?" },
    { question: "_____ wohnen Ihre Eltern?", answer: "Wo wohnen Ihre Eltern?" },
    { question: "_____ _____ Kinder?", answer: "Haben Sie Kinder?" },
    { question: "_____ _____ Ihre Handynummer?", answer: "Wie ist Ihre Handynummer?" },
    { question: "_____ kommen Sie?", answer: "Woher kommen Sie?" },
    { question: "_____ heißt Ihr Mann / Ihre Frau?", answer: "Wie heißt Ihr Mann / Ihre Frau?" },
    { question: "Wo _____ _____ geboren?", answer: "Wo sind Sie geboren?" },
    { question: "_____ _____ Ihr Familienname?", answer: "Wie ist Ihr Familienname?" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        // card.addEventListener("click", () => {
        //     if (!card.classList.contains("flipped")) {
        //         card.classList.add("flipped");
        //     }
        // });


        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });


        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Prevent card flip
            card.classList.add("fade-out"); // fades out a card when you click the "checked" sign

            // Wait for the transition to finish before removing
            setTimeout(() => {
                card.remove();
                checkEnd();
            }, 600); // Match the CSS transition duration
        };


        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}



// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);

// layout toggling logic

const toggleBtn = document.getElementById("toggleLayoutBtn");
let isStacked = false;

toggleBtn.addEventListener("click", () => {
    isStacked = !isStacked;
    container.classList.toggle("stack-mode", isStacked);
    container.classList.toggle("grid-mode", !isStacked);
});
