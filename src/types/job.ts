 export type jobs = {
    _id: string
    title: string,
    department: string, 
    location: string,
    work_type: "part time" | "full time",
    experience_level: string,
    salary_range: { 
        min: number, 
        max: number, 
     },
    description: string,
    requirements: string[],
    status: "draft" | "published" | "on hold" | "closed" | "archived";
  }