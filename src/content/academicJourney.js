// ─────────────────────────────────────────────────────────────────────────────
// Academic Journey — placeholder data
// ─────────────────────────────────────────────────────────────────────────────
// Replace the placeholder values below with real semester results whenever
// they're available. The shape of each object is what the Academic Journey
// section (and its SemesterCard) expects — keep the same keys so the UI
// doesn't need to change, just the values:
//
//   id               unique string, e.g. 'sem-1'
//   semester         number shown on the card (1, 2, 3, ...)
//   sgpa             this semester's SGPA (number or null if not yet declared)
//   cgpa             cumulative CGPA up to this semester (number or null)
//   status           'completed' | 'upcoming' — controls whether marksheet
//                    actions are enabled
//   subjects         array of subject name strings for that semester
//   marksheetUrl     path to the marksheet PDF for that semester
//   marksheetFilename filename used when the marksheet is downloaded
//
// One shared placeholder PDF (`/assets/documents/results/marksheet-placeholder.pdf`) is used
// for every semester for now — swap in a real per-semester file and update
// `marksheetUrl` once actual marksheets are available.
// ─────────────────────────────────────────────────────────────────────────────

const PLACEHOLDER_MARKSHEET = '/assets/documents/results/marksheet-placeholder.pdf';

export const ACADEMIC_JOURNEY = [
  {
    id: 'sem-1',
    semester: 1,
    sgpa: 8.6,
    cgpa: 8.6,
    status: 'completed',
    subjects: ['Mathematics I', 'Physics', 'Programming Basics', 'English', 'Workshop'],
    marksheetUrl: PLACEHOLDER_MARKSHEET,
    marksheetFilename: 'Semester_1_Marksheet.pdf',
  },
  {
    id: 'sem-2',
    semester: 2,
    sgpa: 8.7,
    cgpa: 8.65,
    status: 'completed',
    subjects: ['Mathematics II', 'Data Structures', 'Digital Logic', 'Environmental Science'],
    marksheetUrl: PLACEHOLDER_MARKSHEET,
    marksheetFilename: 'Semester_2_Marksheet.pdf',
  },
  {
    id: 'sem-3',
    semester: 3,
    sgpa: 8.9,
    cgpa: 8.73,
    status: 'completed',
    subjects: ['Algorithms', 'OOP with Java', 'Computer Organization', 'Discrete Mathematics'],
    marksheetUrl: PLACEHOLDER_MARKSHEET,
    marksheetFilename: 'Semester_3_Marksheet.pdf',
  },
  {
    id: 'sem-4',
    semester: 4,
    sgpa: 9.0,
    cgpa: 8.8,
    status: 'completed',
    subjects: ['Operating Systems', 'DBMS', 'Computer Networks', 'Software Engineering'],
    marksheetUrl: PLACEHOLDER_MARKSHEET,
    marksheetFilename: 'Semester_4_Marksheet.pdf',
  },
  {
    id: 'sem-5',
    semester: 5,
    sgpa: 8.8,
    cgpa: 8.8,
    status: 'completed',
    subjects: ['Cloud Computing', 'Web Technologies', 'Machine Learning Basics', 'Elective I'],
    marksheetUrl: PLACEHOLDER_MARKSHEET,
    marksheetFilename: 'Semester_5_Marksheet.pdf',
  },
  {
    id: 'sem-6',
    semester: 6,
    sgpa: null,
    cgpa: null,
    status: 'upcoming',
    subjects: ['Distributed Systems', 'Cybersecurity', 'Elective II', 'Minor Project'],
    marksheetUrl: null,
    marksheetFilename: null,
  },
];
