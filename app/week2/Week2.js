const tasks = [
  {
    id: 1,
    title: "Complete the project documentation",
    description: "Kerjain tugas",
    date: "16 April 2026",
    time: "14.00",
    completed: false,
    status: "lagi dikerjain nih",
  },
  {
    id: 2,
    title: "Tidur",
    description: "Tidur",
    date: "13 November 2026",
    time: "21.00",
    completed: false,
    status: "belum ngantuk",
  },
];

const newTask = {
  id: 3,
  title: "Belajar bareng temen",
  description: "Belajar UTBK",
  date: "15 April 2026",
  time: "16.00",
  completed: false,
  status: "jadinya mabar",
};

tasks.push(newTask);

for (let i = 0; i < tasks.length; i++) {
  if (tasks[i].completed == true) {
    tasks[i].status = "completed";
  } else {
    tasks[i].status = "not completed";
  }
}

export default tasks;
