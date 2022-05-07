// ARRAYS
const students = [
  {
    name: 'Sain Varris',
    house: 'Hufflepuff',
    crest: 'assets/hf.jpg',
    expelled: false
  },
  {
    name: 'Loris Nieman',
    house: 'Gryffindor',
    crest: 'assets/gr.jpg',
    expelled: false
  },
  {
    name: 'Pookey Kriesendall',
    house: 'Ravenclaw',
    crest: 'assets/rc.jpg',
    expelled: false
  },
  {
    name: 'Harris Sertian',
    house: 'Slytherin',
    crest: 'assets/sl.jpg',
    expelled: false
  }
];
const voldArmy = [];
const houses =['Hufflepuff', 'Gryffindor', 'Slytherin', 'Ravenclaw'];


// Utility Function
const renderToDom = (divId, textToRender) => {
  const selectedElement = document.querySelector(divId);
  selectedElement.innerHTML = textToRender;
};
// ID assigning
const studentId = (array) =>
  students.forEach((student,index) => {
  student.id = index + 1;                      
});

// Welcome DOM Card
const introHeader = () => {
  const domString = `
  <div class="card">
  <h5 class="card-header">Welcome to Hogwarts young wizard!</h5>
    <div class="card-body">
      <h5 class="card-title">Begin your journey and let the Sorting Hat decide which House you belong to!</h5>
      <p class="card-text">Click the button below to begin the sorting ceremony!</p>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addStudent">Begin Placement!</button>
    </div>
  </div>
  `;
  renderToDom('#intro',domString);
}
// DOM Filter Buttons
const filterButtons = () => {
  const domString = `
  <div class="filter-buttons">
    <button id= 'Hufflepuff'>Hufflepuff</button>
    <button id= 'Gryffindor'>Gryffindor</button>
    <button id= 'Slytherin'>Slytherin</button>
    <button id= 'Ravenclaw'>Ravenclaw</button>
    <button id= 'clear'>Clear</button>
  </div> `;
  renderToDom('#filter-buttons', domString);
};

// Modal Form
const addStudent = () => {
  const domString = `
  <form>
  <div class="modal fade" id="addStudent" tabindex="-1" aria-labelledby="addStudent" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-floating mb-3">
          <input class="form-control form-control-lg" type="text" placeholder="First and Last name" id="name" aria-label="enter name" required>
          <label for="name">First and Last name </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Sort!</button>
        </div>
      </div>
    </div>
  </div>
  </form>
  `;
  renderToDom('#add-wizard', domString);
}

// Students on DOM
const studentsOnDom = (students) => {
  let domString = '';
  for (const student of students) {
    domString += `
    <div class="card" style="width: 18rem;">
    <img src="${student.crest}" class="card-img-top" alt="house crest">
        <h5>${student.name}</h5>
        <div class="card-body">
            <p class="card-text" id="house">${student.house}</p>
          </div>
          <p class="type"></p>
          <button class="btn btn-danger" id="delete--${student.id}">Expel</button>
      </div>
    `;
  }
  renderToDom('#sorted-wizard', domString);
}
const voldArmyDom = (array) => {
  let domString = '';
  for (const snake of array) {
    domString += `
    <div class="card" style="width: 18rem;">
    <img src="" class="card-img-top" alt="">
        <h5>${snake.name}</h5>
        <div class="card-body">
            <p class="card-text" id="house"></p>
          </div>
          <p class="type">Dark Army</p>
      </div>
    `;
  }
  renderToDom('#vold-army', domString);
}
const eventListeners = () => {
  const formModal = new bootstrap.Modal(document.querySelector('#add-wizard'));
// Expel Button
  document.querySelector('#sorted-wizard',).addEventListener('click', (e) => {
    if (e.target.id) {
      const [method, id] = e.target.id.split('--');
      const index = students.findIndex(sortedStudent => sortedStudent.id === parseInt(id));
      if (e.target.id.includes('delete')) {
        voldArmy.push(students[index]);
        students.splice(index,1);
        studentsOnDom(students);
        voldArmyDom(voldArmy);
      }
    }
  });
// filters
  document.querySelector('#filter-buttons').addEventListener('click', (e) => {
    // console.log("Ck", e.target.id);
    if (e.target.id === 'clear') {
      studentsOnDom(students);
    } else if (e.target.id) {
      const house = students.filter(taco => taco.house === e.target.id);
      studentsOnDom(house);
    
    }
  });

  // Form
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newStudentObj = {
      name: document.querySelector('#name').value,
      house: houses[Math.floor(Math.random() * 4)],
      crest: '',
      expelled: false
    };
      if (newStudentObj.house === 'Hufflepuff') {
        newStudentObj.crest = 'assets/hf.jpg';
      }
      else if (newStudentObj.house === 'Gryffindor') {
        newStudentObj.crest = 'assets/gr.jpg';
      }
      else if (newStudentObj.house === 'Slytherin') {
        newStudentObj.crest = 'assets/sl.jpg'
      }
      else {
        newStudentObj.crest = 'assets/rc.jpg';
      };
    students.push(newStudentObj);
    studentsOnDom(students);
    studentId(students);
    formModal.hide();
    form.reset();
  });
}
const startApp = () => {
introHeader();
addStudent();
filterButtons();
studentId(students);
studentsOnDom(students);
voldArmyDom(voldArmy);
eventListeners();
}
startApp();
console.log(students);
console.log(voldArmy);
