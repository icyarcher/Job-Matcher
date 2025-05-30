const mockJobs = [
  { id: 1, title: 'Frontend Developer', company: 'Tech Solutions', location: 'Remote', description: 'Dezvoltare interfețe utilizator...' },
  { id: 2, title: 'Backend Engineer', company: 'DataCorp', location: 'Bucharest', description: 'Construire API-uri RESTful...' },
  { id: 3, title: 'UX/UI Designer', company: 'Creative Minds', location: 'Cluj', description: 'Creare prototipuri și wireframes...' },
  { id: 4, title: 'DevOps Specialist', company: 'CloudOps', location: 'Remote', description: 'Gestionare infrastructură cloud...' },
];

const getJobs = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockJobs);
    }, 500);
  });
};

const getJobById = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const job = mockJobs.find(job => job.id === parseInt(id));
            if (job) {
                resolve(job);
            } else {
                reject(new Error(`Job with id ${id} not found`));
            }
        }, 200);
    });
};

export {
  getJobs,
  getJobById
};