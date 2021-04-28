export class Task {
    id: string;
    name: string;
    status: boolean; //complete
    description: string;
    deadline: Date; // Unix timestamp?
    finished: Date | null; // Unix timestamp?

    constructor(id:string, name: string, status: boolean, description: string, deadline: Date, finished: Date | null) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.finished = finished;
        this.description = description;
        this.deadline = deadline;
    }

    public static new(id:string, name: string, status: boolean, description: string, deadline: string, finished: string) {
        
        let t_deadline = new Date(Date.parse(deadline));
        let t_finished = null;
        if (finished != null ){
            t_finished = new Date(Date.parse(finished));
        }
        
        return new Task(id, name, status, description, t_deadline, t_finished);
    }

    public clone(): Task {
        return new Task(this.id, this.name, this.status, this.description, this.deadline, this.finished);
    }
}

