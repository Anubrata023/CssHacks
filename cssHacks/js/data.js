/* ============================================
   FAXX - Complaint Data Structure
   ============================================ */

const COMPLAINT_CATEGORIES = {
  "mess-food": {
    title: "Mess & Food",
    icon: "🍽️",
    color: "#e17055",
    description: "Complaints related to mess services, food quality, hygiene and menu",
    subcategories: {
      "food-quality": {
        title: "Food Quality",
        icon: "🥘",
        complaints: [
          { id: "fq1", title: "Stale / Expired Food", description: "Food served is stale, old, or past expiry date" },
          { id: "fq2", title: "Undercooked Food", description: "Food is raw or not properly cooked" },
          { id: "fq3", title: "Taste & Flavor Issues", description: "Food tastes bad, too spicy, too bland, etc." },
          { id: "fq4", title: "Quantity Insufficient", description: "Serving portions are too small or limited" },
          { id: "fq5", title: "Cold Food Served", description: "Food is served cold instead of hot" }
        ]
      },
      "hygiene": {
        title: "Hygiene & Cleanliness",
        icon: "🧹",
        complaints: [
          { id: "hy1", title: "Dirty Utensils", description: "Plates, glasses, or cutlery are not properly washed" },
          { id: "hy2", title: "Foreign Objects in Food", description: "Found insects, hair, or other objects in food" },
          { id: "hy3", title: "Unhygienic Kitchen", description: "Kitchen conditions are unhygienic" },
          { id: "hy4", title: "Dining Area Not Clean", description: "Tables, chairs, and floor are dirty" },
          { id: "hy5", title: "Handwash / Sanitizer Missing", description: "No soap or sanitizer available" }
        ]
      },
      "menu-timing": {
        title: "Menu & Timing",
        icon: "📋",
        complaints: [
          { id: "mt1", title: "Menu Not Followed", description: "Meals served don't match the displayed menu" },
          { id: "mt2", title: "Late Meal Service", description: "Meals are served late or not on time" },
          { id: "mt3", title: "No Variety in Menu", description: "Same food items are repeated frequently" },
          { id: "mt4", title: "Special Diet Not Available", description: "No options for allergies, vegan, Jain food, etc." }
        ]
      },
      "staff-behavior": {
        title: "Staff Behavior",
        icon: "👨‍🍳",
        complaints: [
          { id: "sb1", title: "Rude / Impolite Staff", description: "Mess staff is rude or unhelpful" },
          { id: "sb2", title: "Discrimination in Serving", description: "Unfair treatment or favoritism while serving" },
          { id: "sb3", title: "Staff Hygiene Issues", description: "Staff not wearing gloves, caps, or aprons" }
        ]
      }
    },
    formFields: ["messNo", "hostelName", "mealType"]
  },

  "hostel": {
    title: "Hostel",
    icon: "🏠",
    color: "#00b894",
    description: "Complaints related to hostel rooms, facilities, maintenance and security",
    subcategories: {
      "room-maintenance": {
        title: "Room Maintenance",
        icon: "🔧",
        complaints: [
          { id: "rm1", title: "Fan / AC Not Working", description: "Ceiling fan or air conditioner is not functioning" },
          { id: "rm2", title: "Electrical Issues", description: "Faulty switches, sockets, or wiring problems" },
          { id: "rm3", title: "Furniture Damaged", description: "Bed, table, chair, or wardrobe is broken" },
          { id: "rm4", title: "Door / Lock Issues", description: "Door or lock is broken, jammed, or missing key" },
          { id: "rm5", title: "Window Problems", description: "Window glass broken, won't close, or mosquito net torn" },
          { id: "rm6", title: "Wall / Ceiling Damage", description: "Paint peeling, cracks, or water seepage" }
        ]
      },
      "water-plumbing": {
        title: "Water & Plumbing",
        icon: "🚿",
        complaints: [
          { id: "wp1", title: "No Water Supply", description: "Water not available in rooms or floors" },
          { id: "wp2", title: "Hot Water Not Working", description: "Geyser or hot water system is down" },
          { id: "wp3", title: "Leaking Pipes / Taps", description: "Water leaking from pipes, taps, or fittings" },
          { id: "wp4", title: "Bathroom / Toilet Issues", description: "Toilet flush, shower, or drainage not working" },
          { id: "wp5", title: "Dirty Water Supply", description: "Water is discolored or has smell" }
        ]
      },
      "cleanliness": {
        title: "Cleanliness",
        icon: "✨",
        complaints: [
          { id: "cl1", title: "Room Not Cleaned", description: "Regular sweeping/mopping not done" },
          { id: "cl2", title: "Corridors / Common Areas Dirty", description: "Hallways and common areas not maintained" },
          { id: "cl3", title: "Pest Infestation", description: "Rats, cockroaches, mosquitoes, or bed bugs" },
          { id: "cl4", title: "Common Washroom Unclean", description: "Shared washrooms are dirty or smelly" },
          { id: "cl5", title: "Garbage Not Collected", description: "Dustbins overflowing or not emptied regularly" }
        ]
      },
      "security-safety": {
        title: "Security & Safety",
        icon: "🔒",
        complaints: [
          { id: "ss1", title: "CCTV Not Working", description: "Security cameras are offline or broken" },
          { id: "ss2", title: "Guard Absent / Sleeping", description: "Security guard not on duty or sleeping" },
          { id: "ss3", title: "Theft / Loss Report", description: "Items stolen or missing from hostel" },
          { id: "ss4", title: "Fire Safety Issues", description: "Fire extinguisher missing or exit blocked" },
          { id: "ss5", title: "Unauthorized Entry", description: "Outsiders entering hostel without permission" }
        ]
      }
    },
    formFields: ["hostelName", "roomNo", "floorNo", "blockName"]
  },

  "academics": {
    title: "Academics",
    icon: "📚",
    color: "#6c5ce7",
    description: "Complaints related to faculty, classes, curriculum, exams, and academic infrastructure",
    subcategories: {
      "faculty": {
        title: "Faculty Issues",
        icon: "👨‍🏫",
        complaints: [
          { id: "fa1", title: "Faculty Not Taking Classes", description: "Regular classes are being missed or cancelled" },
          { id: "fa2", title: "Poor Teaching Quality", description: "Lectures are not understandable or engaging" },
          { id: "fa3", title: "Unfair Grading / Marks", description: "Marks or grades seem unfair or biased" },
          { id: "fa4", title: "Faculty Misbehavior", description: "Inappropriate or rude conduct by faculty" },
          { id: "fa5", title: "Not Available for Doubts", description: "Faculty not accessible for doubt clearing" }
        ]
      },
      "curriculum": {
        title: "Curriculum & Syllabus",
        icon: "📖",
        complaints: [
          { id: "cu1", title: "Outdated Syllabus", description: "Course content is old and not industry-relevant" },
          { id: "cu2", title: "Syllabus Not Completed", description: "Full syllabus is not covered before exams" },
          { id: "cu3", title: "Lab Resources Missing", description: "Lab equipment, chemicals, or software unavailable" },
          { id: "cu4", title: "Study Material Not Provided", description: "Notes, PPTs, or references not shared" }
        ]
      },
      "examination": {
        title: "Examination",
        icon: "📝",
        complaints: [
          { id: "ex1", title: "Results Delayed", description: "Exam results are taking too long to be declared" },
          { id: "ex2", title: "Question Paper Issues", description: "Out of syllabus, ambiguous, or wrong questions" },
          { id: "ex3", title: "Revaluation Not Processed", description: "Re-evaluation request pending for too long" },
          { id: "ex4", title: "Exam Hall Issues", description: "Insufficient seating, AC/fan not working during exam" },
          { id: "ex5", title: "Unfair Invigilation", description: "Invigilator behavior issues during exam" }
        ]
      },
      "class-infrastructure": {
        title: "Classroom Infrastructure",
        icon: "🏫",
        complaints: [
          { id: "ci1", title: "Projector / Smartboard Not Working", description: "Classroom AV equipment is faulty" },
          { id: "ci2", title: "AC / Fan / Lighting Issues", description: "Temperature or lighting problems in classroom" },
          { id: "ci3", title: "Seating / Desk Problems", description: "Broken desks, chairs, or insufficient seats" },
          { id: "ci4", title: "Whiteboard / Marker Issues", description: "Poor quality markers or unclean board" },
          { id: "ci5", title: "Classroom Not Clean", description: "Dusty or dirty classroom environment" }
        ]
      }
    },
    formFields: ["department", "semester", "section", "subject", "facultyName"]
  },

  "infrastructure": {
    title: "Campus Infrastructure",
    icon: "🏗️",
    color: "#fdcb6e",
    description: "Complaints related to WiFi, transport, sports facilities, and general campus issues",
    subcategories: {
      "wifi-it": {
        title: "WiFi & IT Services",
        icon: "📶",
        complaints: [
          { id: "wi1", title: "WiFi Not Working", description: "Internet connectivity issues on campus" },
          { id: "wi2", title: "Slow Internet Speed", description: "Very slow download/upload speeds" },
          { id: "wi3", title: "Lab Computers Not Working", description: "PCs in computer lab are faulty" },
          { id: "wi4", title: "College Portal / ERP Issues", description: "College website or ERP system is down" },
          { id: "wi5", title: "Printer / Scanner Issues", description: "Printing or scanning facilities not working" }
        ]
      },
      "transport": {
        title: "Transport",
        icon: "🚌",
        complaints: [
          { id: "tr1", title: "Bus Running Late", description: "College bus is frequently late" },
          { id: "tr2", title: "Route Not Convenient", description: "Bus route doesn't cover required areas" },
          { id: "tr3", title: "Bus Condition Poor", description: "Vehicle is in bad condition, safety concerns" },
          { id: "tr4", title: "Overcrowded Bus", description: "Bus is too crowded, insufficient seats" },
          { id: "tr5", title: "Driver Behavior", description: "Rash driving or rude behavior by driver" }
        ]
      },
      "sports": {
        title: "Sports & Recreation",
        icon: "⚽",
        complaints: [
          { id: "sp1", title: "Ground / Court Not Maintained", description: "Playground or court in poor condition" },
          { id: "sp2", title: "Sports Equipment Missing", description: "Balls, bats, nets, etc. not available" },
          { id: "sp3", title: "Gym Equipment Issues", description: "Gym machines broken or insufficient" },
          { id: "sp4", title: "Indoor Games Facility", description: "Indoor recreation area issues" }
        ]
      },
      "general-campus": {
        title: "General Campus",
        icon: "🏛️",
        complaints: [
          { id: "gc1", title: "Parking Problems", description: "Insufficient or unorganized parking spaces" },
          { id: "gc2", title: "Streetlights Not Working", description: "Campus lighting is insufficient at night" },
          { id: "gc3", title: "Road / Pathway Damaged", description: "Broken roads, potholes, or muddy paths" },
          { id: "gc4", title: "Canteen / Cafe Issues", description: "Issues with campus canteen services" },
          { id: "gc5", title: "Drinking Water Issues", description: "Water coolers not working or unhygienic" },
          { id: "gc6", title: "Garden / Green Area", description: "Campus gardens not maintained" }
        ]
      }
    },
    formFields: ["location", "building"]
  },

  "administration": {
    title: "Administration",
    icon: "🏛️",
    color: "#74b9ff",
    description: "Complaints related to fees, documentation, scholarships, and office services",
    subcategories: {
      "fees": {
        title: "Fee Related",
        icon: "💰",
        complaints: [
          { id: "fe1", title: "Incorrect Fee Amount", description: "Wrong fee has been charged or calculated" },
          { id: "fe2", title: "Refund Not Processed", description: "Fee refund pending for a long time" },
          { id: "fe3", title: "Receipt Not Provided", description: "No receipt or acknowledgment for payment" },
          { id: "fe4", title: "Late Fee Penalty Dispute", description: "Unfair late fee charges applied" },
          { id: "fe5", title: "Fee Portal Issues", description: "Online fee payment system not working" }
        ]
      },
      "documentation": {
        title: "Documentation",
        icon: "📄",
        complaints: [
          { id: "do1", title: "ID Card Not Issued", description: "Student ID card not provided or delayed" },
          { id: "do2", title: "Certificate Delay", description: "Bonafide, migration, or other certificates delayed" },
          { id: "do3", title: "Marksheet / Transcript Issues", description: "Problems with grade sheets or transcripts" },
          { id: "do4", title: "Library Card Issues", description: "Library membership card problems" }
        ]
      },
      "scholarship": {
        title: "Scholarship",
        icon: "🎓",
        complaints: [
          { id: "sh1", title: "Scholarship Amount Not Received", description: "Scholarship money not credited to account" },
          { id: "sh2", title: "Application Wrongly Rejected", description: "Scholarship application denied without valid reason" },
          { id: "sh3", title: "Scholarship Form Issues", description: "Difficulty in filling or submitting scholarship form" }
        ]
      },
      "office-services": {
        title: "Office Services",
        icon: "🏢",
        complaints: [
          { id: "os1", title: "Long Waiting Time", description: "Too much time spent in queues at office" },
          { id: "os2", title: "Staff Not Helpful", description: "Office staff not cooperating or guiding properly" },
          { id: "os3", title: "Office Timings Not Followed", description: "Office opens late or closes early" }
        ]
      }
    },
    formFields: ["department", "enrollmentYear"]
  },

  "others": {
    title: "Other Complaints",
    icon: "📝",
    color: "#fd79a8",
    description: "Ragging complaints, general suggestions, feedback, and miscellaneous issues",
    subcategories: {
      "ragging": {
        title: "Ragging & Harassment",
        icon: "⚠️",
        complaints: [
          { id: "ra1", title: "Physical Harassment", description: "Any form of physical ragging or abuse" },
          { id: "ra2", title: "Verbal / Mental Harassment", description: "Mental torture, threats, or verbal abuse" },
          { id: "ra3", title: "Cyber Bullying", description: "Online harassment, trolling, or threats" },
          { id: "ra4", title: "Sexual Harassment", description: "Any form of sexual misconduct or harassment" },
          { id: "ra5", title: "Discrimination / Bias", description: "Discrimination based on caste, gender, religion, etc." }
        ]
      },
      "suggestions": {
        title: "Suggestions & Feedback",
        icon: "💡",
        complaints: [
          { id: "su1", title: "New Facility Request", description: "Requesting a new facility or service on campus" },
          { id: "su2", title: "Event / Activity Suggestion", description: "Ideas for college events or extra-curricular activities" },
          { id: "su3", title: "General Feedback", description: "General feedback for college improvement" },
          { id: "su4", title: "Policy Change Request", description: "Suggesting changes in college rules or policies" }
        ]
      },
      "miscellaneous": {
        title: "Miscellaneous",
        icon: "📌",
        complaints: [
          { id: "mi1", title: "Lost & Found", description: "Report a lost item or found item" },
          { id: "mi2", title: "Medical Facility Issues", description: "Campus clinic or medical services issue" },
          { id: "mi3", title: "Stationery Shop Issues", description: "Issues with campus stationery or photocopy shop" }
        ]
      }
    },
    formFields: []
  }
};

// Form field definitions
const FORM_FIELDS = {
  messNo: { label: "Mess Number", type: "select", options: ["Mess 1", "Mess 2", "Mess 3", "Mess 4"] },
  hostelName: { label: "Hostel Name", type: "select", options: ["Boys Hostel 1", "Boys Hostel 2", "Boys Hostel 3", "Girls Hostel 1", "Girls Hostel 2", "Girls Hostel 3", "PG Hostel"] },
  roomNo: { label: "Room Number", type: "text", placeholder: "Enter your room number (e.g., 301)" },
  floorNo: { label: "Floor Number", type: "select", options: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor"] },
  blockName: { label: "Block / Wing", type: "select", options: ["Block A", "Block B", "Block C", "Block D"] },
  mealType: { label: "Meal Type", type: "select", options: ["Breakfast", "Lunch", "Snacks", "Dinner"] },
  department: { label: "Department", type: "select", options: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Chemical Engineering", "Biotechnology", "MBA", "MCA", "Applied Sciences", "Other"] },
  semester: { label: "Semester", type: "select", options: ["1st Semester", "2nd Semester", "3rd Semester", "4th Semester", "5th Semester", "6th Semester", "7th Semester", "8th Semester"] },
  section: { label: "Section", type: "select", options: ["Section A", "Section B", "Section C", "Section D", "Section E"] },
  subject: { label: "Subject / Course", type: "text", placeholder: "Enter subject name (e.g., Data Structures)" },
  facultyName: { label: "Faculty Name", type: "text", placeholder: "Enter faculty name (optional)" },
  location: { label: "Location on Campus", type: "text", placeholder: "Describe the exact location" },
  building: { label: "Building Name", type: "text", placeholder: "Enter building name (e.g., Academic Block 2)" },
  enrollmentYear: { label: "Enrollment Year", type: "select", options: ["2023", "2024", "2025", "2026"] }
};

// Departments list (for login forms, etc.)
const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Information Technology",
  "Electronics & Communication Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Biotechnology",
  "MBA",
  "MCA",
  "Applied Sciences",
  "Other"
];
