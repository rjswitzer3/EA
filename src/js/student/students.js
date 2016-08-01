var studentCollection = [
  {
    "username": "student",
    "firstname": "John",
    "lastname": "Doe",
    "password": "none",
    "email": "",
    "points": "",
    "courses": ["Calculus I","Linear Algebra"],
  },
  {
    "username": "student1",
    "firstname": "Jimmy",
    "lastname": "Brown",
    "password": "password123",
    "email": "student1@gmail.com",
    "points": "0",
    "courses": ["Calculus II", "Calculus I", "Linear Algebra"]
  },
]

function getStudentCollection() {
      console.log("getStudentCollection: " + studentCollection);
      return studentCollection;
}