import { Action, Selector, State, StateContext } from "@ngxs/store";
import {Task} from "src/app/shared/task.model";
import { AddTask, CompleteTask, DeleteTask, FilterTasksBy, SortTasksBy } from "./actions";


export interface TasksStateModel {
    tasks: Task[];
    filtered: boolean | null;
    sort_order: "name_asc"|"name_desc"|"deadline_asc"|"deadline_desc"|"default";
}


@State<TasksStateModel>({
    name:'tasks',
    defaults: {
        tasks: [],
        filtered: null,
        sort_order: "default"
    }
})
export class TasksState {


    @Action(AddTask)
    addTask({patchState, getState}: StateContext<TasksStateModel>, {payload}: AddTask) {
        let state = getState();
        //cloning the array because arrays and objects are passed by reference 
        //thus values can be changed without patching the state and can introduce bugs down the line
        let cloned = [...state.tasks].map((t)=> t.clone());
        cloned.push(payload.clone());
        patchState({tasks: cloned});
    }

    @Selector()
    static tasks(state: TasksStateModel) {
        let cloned = [...state.tasks].map((t)=> t.clone());
        if (state.filtered != null) {
            cloned = cloned.filter((t)=>t.status == state.filtered);
        }
        cloned.sort((t1,t2)=>{
            if (state.sort_order == "name_asc") {
                if (t1.name < t2.name) return -1;
                if (t1.name > t2.name) return 1;
                return 0;
            }
            if (state.sort_order == "name_desc") {
                if (t1.name > t2.name) return -1;
                if (t1.name < t2.name) return 1;
                return 0;
            }

            if (state.sort_order == "deadline_asc") {
                if (t1.deadline < t2.deadline) return -1;
                if (t1.deadline > t2.deadline) return 1;
                return 0;
            }

            if (state.sort_order == "deadline_desc") {
                if (t1.deadline > t2.deadline) return -1;
                if (t1.deadline < t2.deadline) return 1;
                return 0;
            }
            if (state.sort_order == "default") {
                let now = Date.now();
                if (Math.abs(t1.deadline.getTime()-now) < Math.abs(t2.deadline.getTime() - now)) return -1;
                if (Math.abs(t1.deadline.getTime()-now) > Math.abs(t2.deadline.getTime() - now)) return 1;
                return 0;
            }
            //this can not be reached but the compiler doesn't know it
            return 0;
        })
        return cloned;
    }

    @Action(DeleteTask)
    deleteTask({patchState, getState}: StateContext<TasksStateModel>, {id}: DeleteTask) {
        let state = getState();
        //cloning the array because arrays and objects are passed by reference 
        //thus values can be changed without patching the state and can introduce bugs down the line
        let cloned = [...state.tasks].map((t)=> t.clone());
        let filtered = cloned.filter((t)=>{
            return t.id != id;
        })
        patchState({tasks: filtered});
    }

    @Action(CompleteTask)
    completeTask({patchState, getState}: StateContext<TasksStateModel>, {id}: CompleteTask) {
        let state = getState();
        //cloning the array because arrays and objects are passed by reference 
        //thus values can be changed without patching the state and can introduce bugs down the line
        let cloned = [...state.tasks].map((t)=> t.clone());
        cloned.map((t)=>{
            if (t.id == id) {
                t.finished = new Date(Date.now())
                t.status = true;
            }
            return t;
        })
        patchState({tasks:cloned});
    }

    @Action(FilterTasksBy)
    filterBy({patchState}: StateContext<TasksStateModel>, {predicate}: FilterTasksBy){
        patchState({filtered: predicate});
    }

    @Action(SortTasksBy)
    sortBy({patchState}: StateContext<TasksStateModel>, {predicate}: SortTasksBy) {
        patchState({sort_order: predicate});
    }
}