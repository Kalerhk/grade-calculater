// app.js - Bento Academy Interactive Controller Logic

// Topic Library Explanations
const subjectData = {
    math: {
        title: "Mathematics",
        emoji: "📐",
        analogy: "The Cosmic Puzzle-Book",
        body: "Mathematics isn't just about formulas or busy calculations; it's the language of cosmic patterns! When you solve algebra, you are solving a mystery where 'X' is a hidden treasure trying to reveal itself. Geometry is the blueprints of stars and crystals, showing us how space holds together.",
        fact: "Equations are like baking recipes — if you balance both sides correctly, you get a perfect outcome!",
        joke: "Why are circles so popular in math class? Because they have 360 degrees of perfect friendship and never leave anyone out in the cold!"
    },
    science: {
        title: "General Science",
        emoji: "🧪",
        analogy: "The World's Chemical Theater",
        body: "Science is the ultimate detective story! Physics is studying the gravity-glues and light-flickers that animate our world. Chemistry is like molecular magic and baking, where mixing elements creates beautiful bubbles, colors, and entirely new matter. Biology studies the cells—tiny microscopic engine rooms keeping you breathing!",
        fact: "Every single atom in your wonderful body came from an outer space star that exploded billions of years ago!",
        joke: "How do elements greet each other on the Periodic Table? They say, 'I've got my Ion you!'"
    },
    english: {
        title: "English Literature",
        emoji: "📚",
        analogy: "The Memory Teleporter",
        body: "English and storytelling are actually memory-reading nodes! Words on a sheet of paper are symbols that instantly recreate sounds, feelings, and images inside someone else's brain blocks. By reading literature, you can travel back 500 years and talk directly to Shakespeare, or fly forward into sci-fi futures!",
        fact: "Adjectives are paint brushes, and active verbs are the engines that make sentences speed forward!",
        joke: "Why is English class such a wild rollercoaster ride? Because first you parse, and then you run out of adjectives to describe the drop!"
    },
    social: {
        title: "Social Sciences",
        emoji: "🌍",
        analogy: "The Human Time Machine",
        body: "History and Geography are the diaries of the ultimate human expedition! History tracks the lessons, inventions, and mistakes made by earlier generations. Geography is the mapping of our Earth's natural structures, showing how rivers establish cities and mountains protect them.",
        fact: "Understanding history is like looking at a rearview mirror — it helps us drive forward without crashing into the same obstacles!",
        joke: "Why was the geography book so anxious? Because it had too many split coordinates and tectonic tension lines!"
    },
    ai: {
        title: "Artificial Intelligence",
        emoji: "🤖",
        analogy: "Teaching Silicon Puppies",
        body: "Artificial Intelligence is the science of teaching computer boxes how to read patterns! Instead of writing strict rules, we show computers thousands of picture cards (like dogs vs. cats), and the system learns weights and filters by identifying outlines. This is called Machine Learning and mimics the learning pathways of our own amazing brains!",
        fact: "AI doesn't actually think or feel; it is just a super-powered counting machine that loves finding matches!",
        joke: "Why was the computer cold at school? Because it left its Windows open in the classroom!"
    }
};

// Static Age-Appropriate Jokes Collection
const schoolJokes = [
    { q: "Why was the math book sad?", a: "Because it had too many problems!" },
    { q: "What's a study character's favorite meal?", a: "A sweet Pi-zza flavored with sweet decimals!" },
    { q: "Why did the student wear glasses in math class?", a: "Because it helps with div-ision!" },
    { q: "Why didn't the skeleton do their school homework?", a: "Because they had no-body to do it with!" },
    { q: "What is a chemistry teacher's favorite element?", a: "The element of surprise!" },
    { q: "Why did the computer cold at school?", a: "Because it left its Windows wide open!" }
];

// Study advices
const studyTips = [
    "Break your studying sessions into 25-minute Pomodoro bursts. Your brain retains 30% more!",
    "Teach the hard concepts to a soft plushie on your desk. Verbalizing unlocks deep memory nodes!",
    "Take three sips of cold water before solving a tough equation! Oxygen speeds calculation!"
];

// Page Load Setup
window.onload = function() {
    calculateOutputs();
    switchSubjectTab("math");
    renderJokesPile();
};

// Simple Grade math calculations
function calculateOutputs() {
    const englishVal = parseInt(document.getElementById("marks-english").value) || 0;
    const mathVal = parseInt(document.getElementById("marks-math").value) || 0;
    const sciVal = parseInt(document.getElementById("marks-science").value) || 0;
    const sstVal = parseInt(document.getElementById("marks-sst").value) || 0;
    const langVal = parseInt(document.getElementById("marks-lang2").value) || 0;

    const totalPct = (englishVal + mathVal + sciVal + sstVal + langVal) / 5;
    document.getElementById("txt-percentage").innerText = totalPct.toFixed(1) + "%";

    let lGrade = "F";
    if (totalPct >= 90) lGrade = "A+";
    else if (totalPct >= 80) lGrade = "A";
    else if (totalPct >= 70) lGrade = "B";
    else if (totalPct >= 50) lGrade = "C";
    else if (totalPct >= 35) lGrade = "D";

    document.getElementById("txt-grade").innerText = lGrade;
}

// 5 Subjects explanations tab switching logic
function switchSubjectTab(tabId) {
    const btns = document.querySelectorAll(".tab-btn");
    btns.forEach(b => b.classList.remove("active"));
    
    // Find active button
    const activeBtnMap = {
        math: 0, science: 1, english: 2, social: 3, ai: 4
    };
    if (btns[activeBtnMap[tabId]]) {
        btns[activeBtnMap[tabId]].classList.add("active");
    }

    const data = subjectData[tabId];
    const box = document.getElementById("subject-desc-box");
    box.innerHTML = `
        <div class="subject-view-header">
            <span>${data.emoji} ${data.title}</span>
            <span class="subject-view-analogy">${data.analogy}</span>
        </div>
        <div class="subject-view-body">${data.body}</div>
        <div class="subject-view-tip">💡 Fun Fact: ${data.fact}</div>
        <div class="subject-view-joke">🤣 Topic Joke: ${data.joke}</div>
    `;
    
    talkMascotSpeech(Reviewing ${data.title}! Fun field! Did you read the topic joke below?, "happy");
}

// Age-appropriate Jokes pile renderer
function renderJokesPile() {
    const pile = document.getElementById("jokes-pile");
    pile.innerHTML = "";
    schoolJokes.forEach((joke, idx) => {
        const div = document.createElement("div");
        div.className = "joke-element";
        div.onclick = function() {
            const punch = document.getElementById("punch-" + idx);
            if (punch.classList.contains("hidden")) {
                punch.classList.remove("hidden");
                talkMascotSpeech("Ahahaha! That is a hilarious joke! Let me tell you another one!", "giggle");
            } else {
                punch.classList.add("hidden");
            }
        };
        div.innerHTML = `
            <div class="joke-quest">❔ ${joke.q} <span style="float:right; font-size:10px; color:#a0aec0;">click to reveal 📂</span></div>
            <div class="joke-punch hidden" id="punch-${idx}">🎉 ${joke.a}</div>
        `;
        pile.appendChild(div);
    });
}

// Companion AI location walking logic (the avatar walks around)
function walkMascot(targetSectionId) {
    const element = document.getElementById(targetSectionId);
    if (!element) return;

    // Apply active visual styling briefly to target element
    const cards = document.querySelectorAll(".card");
    cards.forEach(c => c.classList.remove("active-highlight"));
    element.classList.add("active-highlight");

    // Scroll the target section elegantly into view
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Update status and custom dialogue talks based on where mascot is walking!
    document.getElementById("mascot-status-tag").innerText = "Walking...";
    
    setTimeout(() => {
        document.getElementById("mascot-status-tag").innerText = "Stationed at " + targetSectionId.replace("-section", "");
        if (targetSectionId === "marks-section") {
            talkMascotSpeech("Aha! I've walked over to your Marks inputs cards. Try entering values higher than 90% next to unlock special titles!", "excited");
        } else if (targetSectionId === "subjects-section") {
            talkMascotSpeech("ZIP! I'm now auditing the 5-Subjects study library! Mathematics, Artificial Intelligence - there's so much science to explore!", "happy");
        } else if (targetSectionId === "advisor-section") {
            talkMascotSpeech("Boop! Ready to compute future career paths. Click the green recommendation button to recommend streams!", "excited");
        }
    }, 600);
}

// Speak bubble controller
function talkMascotSpeech(text, mood = "happy") {
    document.getElementById("mascot-talk").innerText = text;
}

function tellMascotJoke() {
    const rand = schoolJokes[Math.floor(Math.random() * schoolJokes.length)];
    talkMascotSpeech("Classic Joke: " + rand.q + " ... " + rand.a, "giggle");
}

function giveUsefulAdvice() {
    const rand = studyTips[Math.floor(Math.random() * studyTips.length)];
    talkMascotSpeech("Super Study Hack: " + rand, "happy");
}

// Interactive chat matching
function submitMascotChat() {
    const input = document.getElementById("mascot-chat-input");
    const val = input.value.trim().toLowerCase();
    if (!val) return;

    input.value = "";
    
    const elementKeywords = [
        { key: "math", reply: "Mathematics is just solving cosmic puzzles where 'X' is a secret chest! Balancing formulas is fun!" },
        { key: "exam", reply: "Exams are just opportunities to showcase your brain nodes! Remember to Pomodoro and study in 25 mins chunks!" },
        { key: "hard", reply: "If concepts look tough, try explaining them out loud to a soft teddy bear, that is called the Feynman technique!" },
        { key: "hello", reply: "Hello bright student! I enjoy discussing science and streams with you! Try calculating career suggestions below." },
        { key: "ai", reply: "Artificial Intelligence teaches computers to read patterns like friendly digital puppies!" },
        { key: "science", reply: "Science is the ultimate detective story! Elements, biology, physics rules are amazing!" }
    ];

    let found = false;
    for (let el of elementKeywords) {
        if (val.includes(el.key)) {
            talkMascotSpeech(el.reply, "excited");
            found = true;
            break;
        }
    }

    if (!found) {
        const genericReplies = [
            "Fascinating point! Hydrate with cool water and keep exploring educational horizons!",
            "I totally agree classmate! Let's work harder and secure our top report credentials!",
            "I'm dancing with silicon microchips on my robot body! Study hard, play harder!"
        ];
        const r = genericReplies[Math.floor(Math.random() * genericReplies.length)];
        talkMascotSpeech(r, "happy");
    }
}

// 10th-grade stream advisor recommendation logic (Medical, Non-Medical, Commerce, Arts, AI)
function recommendStream() {
    const englishVal = parseInt(document.getElementById("marks-english").value) || 0;
    const mathVal = parseInt(document.getElementById("marks-math").value) || 0;
    const sciVal = parseInt(document.getElementById("marks-science").value) || 0;
    const sstVal = parseInt(document.getElementById("marks-sst").value) || 0;
    const langVal = parseInt(document.getElementById("marks-lang2").value) || 0;

    const output = document.getElementById("advisor-output");
    output.classList.remove("hidden");

    let suggestedPath = "Arts & Humanities";
    let commentary = "Your language scores are fantastic! The stream of Arts focuses on literature, political histories, and creative storytelling.";

    if (mathVal >= 85 && sciVal >= 85) {
        suggestedPath = "AI Science Specialization";
        commentary = "Amazing! Math (" + mathVal + "%) and Science (" + sciVal + "%) scores are blazing supercomputers. Modern Artificial Intelligence and programming fields correspond perfectly with your analytical coding mind block!";
    } else if (sciVal >= 80 && mathVal >= 75) {
        suggestedPath = "Non-Medical (Engineering PCM)";
        commentary = "Outstanding! Excellent physics configurations. Technical engineering streams, physics, architectures, and design processes will suit you beautifully.";
    } else if (sciVal >= 80 && mathVal < 75) {
        suggestedPath = "Medical (Biology / Genetics PCB)";
        commentary = "Impressive science! Exploring biochemical mechanisms, medicine, biotechnology, doctors scope, and microscopic cells will be your grand adventure.";
    } else if (mathVal >= 75 && sciVal < 80) {
        suggestedPath = "Commerce (Finance & Economics)";
        commentary = "Excellent analytical calculations! Ideal for Business Accounting, Economics, Chartered Financial analyses, and Entrepreneurship paths.";
    }

    output.innerHTML = `
        <span class="path-badge">🏆 Best recommendation: ${suggestedPath}</span>
        <div class="path-commentary">
            <p>${commentary}</p>
            <p style="margin-top:8px; font-size:0.75rem; color:#718096; font-style:italic;">Counseling Warning: True path follows your organic passion! Grade indices are helpful analytical blueprints.</p>
        </div>
    `;

    talkMascotSpeech("Eureka! Created a personalized counseling report for " + suggestedPath + "! Check it out!", "excited");
}
