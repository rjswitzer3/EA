var courseCollection = [
  {
    "_id": "d979c77d-0408-827d-153b-b6bf656e6d40",
    "coursename": "Calculus I",
    "courseId": "MATH-201",
    "teacher": ["4cb295fe-e516-4a8b-4abd-94e5da43856c",],
    "students": ["3d3ad3ad-5bce-a672-fddf-bd57ba0190bd",],
    "assignments": ["e3968d58-29ef-7784-1ac9-75eaf5fa8ad6","HW2_id"],
  },
  {
    "_id": "bba82643-d356-71dc-6f15-208fe1dfd29d",
    "coursename": "Calculus II",
    "courseId": "MATH-222",
    "teacher": ["4cb295fe-e516-4a8b-4abd-94e5da43856c",],
    "students": [""],
    "assignments": ["HW1_id","HW2_id"],
  },
  {
    "_id": "978a0f93-cff4-3d9d-9cff-ef36f202176a",
    "coursename": "Linear Algebra",
    "courseId": "MATH-309",
    "teacher": ["4cb295fe-e516-4a8b-4abd-94e5da43856c",],
    "students": ["3d3ad3ad-5bce-a672-fddf-bd57ba0190bd",],
    "assignments": ["HW1_id","Quiz1_id","HW2_id"],
  },
];

function pubCourseCollection() {
  return courseCollection;
}