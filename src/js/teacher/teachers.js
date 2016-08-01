var teacherCollection = [
  {
    "_id": "4cb295fe-e516-4a8b-4abd-94e5da43856c",
    "username": "teacher",
    "firstname": "Alexis",
    "lastname": "Rack",
    "formalname": "Mrs. Rack",
    "password": "none",
    "email": "lexirack100@gmail.com",
    "courses": [
      {
        "_id": "d979c77d-0408-827d-153b-b6bf656e6d40",
        "coursename": "Calculus I",
        "courseId": "MATH-201",
        "teacher": [
          "4cb295fe-e516-4a8b-4abd-94e5da43856c",
          ],
        "students": ["3d3ad3ad-5bce-a672-fddf-bd57ba0190bd",],
        "assignments": ["HW1","HW2"],
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

]

function pubTeacherCollection() {
  return teacherCollection;
}