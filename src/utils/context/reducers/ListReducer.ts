import Types from './../actions/Types';

type iGetPayload<T> = {
    type: Types.GET_DATA,
    payload: T[]
}

type iAddPayload<T> = {
    type: Types.ADD_DATA,
    payload: T
}

type iUpdateDeletePayload<T> = {
    type: Types.UPDATE_DATA | Types.DELETE_DATA,
    payload: {
        obj: T,
        id_field: string
    }
}

export type iListAction<T> = iGetPayload<T> | iAddPayload<T> | iUpdateDeletePayload<T>

// {
//     arr ?: T[],
//         obj ?: T
//     id_field ?: string
// }

//state: iListState<T>, action: iListAction<T>
const ListReducer = <T>(state: T[], action: iListAction<T>) => {
    switch (action.type) {
        case Types.GET_DATA:
            return [...action.payload]; //return an array
        case Types.ADD_DATA:
            return [action.payload, ...state]; //return array with new object
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

            let id_field = action.payload.id_field!
            let myobj = action.payload.obj as any

            let newste = state.filter((item: any) => {

                // console.log("delete reducer ck compare value=", item[id_field] === myobj[id_field])

                if (item[id_field] === myobj[id_field]) {
                    return false
                } else {
                    return true
                }
            });
            return newste
        default:
            return state; //default arry
    }

}

/**
 * use case
 */


// const [state, dispatch] = useReducer(ListReducer, [] as number[])
// dispatch({
//     type: "reset",
//     payload: ""
// })
// dispatch({
//     type: 'inc',
//     payload: 1
// })

export default ListReducer;