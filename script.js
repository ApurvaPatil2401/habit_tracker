// Local Storage Key
const STORAGE_KEY = "focus3_habits";

// Day labels
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

// DOM Elements
const habitInput = document.getElementById("habitInput");
const habitList = document.getElementById("habitList");
const addHabitBtn = document.getElementById("addHabitBtn");
const resetWeekBtn = document.getElementById("resetWeekBtn");

// Load habits from localStorage
let habits = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Render habits on screen
function renderHabits() {
    habitList.innerHTML = "";

    habits.forEach((habit, index) => {
        let li = document.createElement("li");
        li.className = "habit-item";

        // Title
        let title = document.createElement("div");
        title.className = "habit-title";
        title.textContent = habit.name;
        li.appendChild(title);

        // Days Grid
        let daysDiv = document.createElement("div");
        daysDiv.className = "days";

        habit.days.forEach((checked, dayIndex) => {
            let dayBox = document.createElement("div");
            dayBox.className = "day";
            dayBox.textContent = DAYS[dayIndex];

            if (checked) dayBox.classList.add("checked");

            dayBox.addEventListener("click", () => {
                habit.days[dayIndex] = !habit.days[dayIndex];
                saveHabits();
                renderHabits();
            });

            daysDiv.appendChild(dayBox);
        });

        li.appendChild(daysDiv);
        habitList.appendChild(li);
    });
}

// Save habits to localStorage
function saveHabits() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

// Add Habit
addHabitBtn.addEventListener("click", () => {
    let name = habitInput.value.trim();
    if (!name) return alert("Please enter a habit name.");
    if (habits.length >= 3) return alert("You can only track 3 habits.");

    habits.push({
        name: name,
        days: [false, false, false, false, false, false, false]
    });

    habitInput.value = "";
    saveHabits();
    renderHabits();
});

// Reset Week
resetWeekBtn.addEventListener("click", () => {
    if (!confirm("Reset all progress for this week?")) return;

    habits.forEach(h => h.days = [false, false, false, false, false, false, false]);
    saveHabits();
    renderHabits();
});

// On load
renderHabits();
