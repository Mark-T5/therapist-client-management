export const mockTherapists = [
    {
      id: 1,
      title: "Dr.",
      name: "Alice Green",
      email: "alice@mumail.ie",
      location: "New York",
      years_of_practice: 10,
      availability: "TAKING CLIENTS",
    },
    {
      id: 2,
      title: "Ms.",
      name: "Bethany Jones",
      email: "beth@mumail.ie",
      location: "Chicago",
      years_of_practice: 5,
      availability: "NOT TAKING CLIENTS",
    },
    {
      id: 3,
      title: "Mr.",
      name: "Carlos Rivera",
      email: "carlos@mumail.ie",
      location: "Austin",
      years_of_practice: 8,
      availability: "TAKING CLIENTS",
    },
  ];
  
  export const mockClients = [
    {
      id: 1,
      name: "John Doe",
      email: "john@mumail.ie",
      phone: "086 700 8854",
      regularity: "WEEKLY",
      therapist_id: 1,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@mumail.ie",
      phone: "087 340 5669",
      regularity: "WEEKLY",
      therapist_id: 2,
    },
    {
      id: 3,
      name: "Kevin Brown",
      email: "kevin@mumail.ie",
      phone: "087 121 3887",
      regularity: "MONTHLY",
      therapist_id: 1,
    },
  ];
  
  export const mockSessions = [
    {
      id: 1,
      client_id: 1,
      therapist_id: 1,
      date: "2025-04-01",
      length: 90,
      notes: "Initial consultation.",
    },
    {
      id: 2,
      client_id: 2,
      therapist_id: 2,
      date: "2025-04-03",
      length: 45,
      notes: "Follow-up session.",
    },
    {
      id: 3,
      client_id: 3,
      therapist_id: 1,
      date: "2025-04-05",
      length: 60,
      notes: "Discussed goals.",
    },
  ];
  