import API from './axios'

export const getAllNotesAPI = () =>{
    return API.get("/notes")
}

export const deleteNoteAPI = (id) =>{
    return API.get(`/notes/$(id)`)
}