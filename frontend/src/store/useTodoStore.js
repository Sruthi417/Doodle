import {create} from "zustand"
import { getAllTodos,toggleTodoAPI,deleteTodoAPI } from "../api/todo"

const useTodoStore=create ((set)=>({
    todos:[],
    loading:false,

    //fetch todos
    fetchTodo:async()=>{
        try{
            set({loading:true});
            const res=await getAllTodos();
            set({todos:res.data,loading:false});
        }
        catch(err){
           console.log(err);
           set({loading:false})
        }
    },

    //Toggletodo
    toggleTodo:async(noteId,todoId)=>{
       try{
        await toggleTodoAPI(noteId,todoId)
        set((state)=>({
            todos: state.todos.map((t) =>
          t._id === todoId
            ? { ...t, completed: !t.completed }
            : t
        ),
      }));
    } catch (err) {
      console.log(err);
    
       } 
    },
 
    deleteTodo:async(noteId,todoId)=>{
        try{
            await deleteTodoAPI(noteId,todoId)
            set((state)=>({
                todos:state.todos.filter((t) => t._id !== todoId),
    }));
  } catch (err) {
    console.log(err);
  }
},
         
    

}))

export default useTodoStore