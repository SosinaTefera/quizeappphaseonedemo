import axios from 'axios';
export const getCategories = () =>{
    axios.get(`${process.env.REACT_APP_BASE_URL}/categories`).then((res)=>{
        //console.log(res.data)
        return res.data;

    }).catch((err)=>{
        return err;

    })

    //return "test";

}