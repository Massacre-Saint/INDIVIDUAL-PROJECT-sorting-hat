const students = [
  {
    name: 'Jacob Martin',
    house: 'Hufflepuff',
  },
  {
    name: 'Ron',
    house: 'Gryffindor'
  }
];
const houses = ['Hufflepuff', 'Gryffindor', 'Slytherin', 'Ravenclaw'];
const renderToDom = (divId, textToRender) => {
  const selectedElement = document.querySelector(divId);
  selectedElement.innerHTML = textToRender;
};

const studentId = () =>
  students.forEach((student,index) => {
  student.id = index + 1;                      
});


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

const studentsOnDom = () => {
  let domString = '';
  for (const student of students) {
    domString += `
    <div class="card" style="width: 18rem;">
        <h5>${student.name}</h5>
        <div class="card-body">
            <p class="card-text">${student.house}</p>
          </div>
          <p class="type"></p>
          <button class="btn btn-danger" id="delete--${student.id}">Expel</button>
      </div>
    `;
  }
  renderToDom('#sorted-wizard', domString);
}
const eventListeners = () => {
  const formModal = new bootstrap.Modal(document.querySelector('#add-wizard'));
// Expel Button
  document.querySelector('#sorted-wizard',).addEventListener('click', (e) => {
    if (e.target.id) {
      const [method, id] = e.target.id.split('--');
      const index = students.findIndex(sortedStudent => sortedStudent.id === parseInt(id));
      if (e.target.id.includes('delete')) {
        students.splice(index,1);
        studentsOnDom(students);
      }
    }
  });




  // Form
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newStudentObj = {
      name: document.querySelector('#name').value,
      house: houses[Math.floor(Math.random() * 4)] 
    };
    console.log(newStudentObj);
    students.push(newStudentObj);
    studentsOnDom(students);
    studentId(students);
    formModal.hide();
    form.reset();
  });
}
introHeader();
addStudent();
studentsOnDom();
studentId();
eventListeners();
console.log(students);
