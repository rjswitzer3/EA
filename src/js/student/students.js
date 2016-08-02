var studentCollection = [
  {
    "_id": "3d3ad3ad-5bce-a672-fddf-bd57ba0190bd",
    "username": "student",
    "firstname": "John",
    "lastname": "Doe",
    "password": "none",
    "email": "jdoe66@gmail.com",
    "points": "243",
    "courses": [
      {
        "_id": "d979c77d-0408-827d-153b-b6bf656e6d40",
        "coursename": "Calculus I",
        "courseId": "MATH-201",
        "teacher": [
          "4cb295fe-e516-4a8b-4abd-94e5da43856c",
          ],
        "students": ["3d3ad3ad-5bce-a672-fddf-bd57ba0190bd",],
        "assignments": [
          "d979c77d-0408-827d-153b-b6bf656e6d40","HW2_id"],
      },
      {
        "_id": "978a0f93-cff4-3d9d-9cff-ef36f202176a",
        "coursename": "Linear Algebra",
        "courseId": "MATH-222",
        "teacher": [
          "4cb295fe-e516-4a8b-4abd-94e5da43856c",
          ],
        "students": ["3d3ad3ad-5bce-a672-fddf-bd57ba0190bd",],
        "assignments": ["HW1","Quiz1","HW2"],
      },
      ],
    "school": "Rochester Institute of Technology",
    "city": "Rochester",
    "state": "NY",
    "zip": "14623",
    "phone": "",
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
};

