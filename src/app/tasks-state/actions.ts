import { Task } from "../shared/task.model";

export class AddTask {
    static readonly type = "[tasks] add task";
    constructor(public payload: Task) {}
}

export class DeleteTask {
    static readonly type = "[tasks] delete task";
    constructor(public id: string) {}
}

export class CompleteTask {
    static readonly type = "[tasks] complete task";
    constructor(public id: string) {}
}

export class FilterTasksBy {
    static readonly type = "[tasks] filter tasks";
    constructor(public predicate: boolean | null) {}
} 

export class SortTasksBy {
    static readonly type = "[tasks] sort tasks";
    constructor(public predicate: "name_asc"|"name_desc"|"deadline_asc"|"deadline_desc"|"default") {}

}