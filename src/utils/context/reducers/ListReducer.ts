import Types from './../actions/Types';

export interface iListAction<T> {
    type: Types,
    payload: {
        arr?: T[],
        obj?: T
        id_field?: string
    }
}


const ListReducer = <T>(state: T[], action: iListAction<T>) => {
    switch (action.type) {
        case Types.GET_DATA:
            return [...action.payload.arr!]; //return an array
        case Types.ADD_DATA:
            return [action.payload.obj, ...state]; //return array with new object
        case Types.UPDATE_DATA:
            //use case
            /**
             * this.dispatch({
             *      type:Types.UPDATE_DATA
             *      payload:{
             *          id_field:"id",
             *          obj:{}//new object
             *      }
             * })
             */

            return state.map((itm: any) => {
                const id_field = action.payload.id_field
                const obj = action.payload.obj as any
                if (itm[id_field!] === obj[id_field!]) {
                    return obj;
                } else {
                    return itm;
                }
            });//return array with updated object

        // return state.filter((updateData) => {
        //     return updateData[action.payload.id_field] === action.payload.id
        // });
        case Types.DELETE_DATA:
            /**
             * this.dispatch({
             *      type:Types.DELETE_DATA
             *      payload:{
             *          id_field:"id",
             *          obj:{}//which will be deleted
             *      }
             * })
             */

            return state.filter((Deletedata: any) => {
                const id_field = action.payload.id_field
                const obj = action.payload.obj as any
                return Deletedata[id_field!] === obj[id_field!]
            });
        default:
            return state; //default arry
    }

}
export default ListReducer;