import axios, { CancelTokenSource } from "axios";
import { iListAction } from "../reducers/ListReducer";
import Types from "./Types";
import Response, { ColorType, iResponse } from './../../models/Response';



class ListAction<T> {
    dispatch: React.Dispatch<iListAction<T>>
    source: CancelTokenSource = axios.CancelToken.source()

    constructor(dispatch: React.Dispatch<iListAction<T>>) {
        this.dispatch = dispatch;
    }
    getSource = (): CancelTokenSource => {
        this.source = axios.CancelToken.source();
        return this.source;
    }; //return token to cancel the request

    //get all data
    getAll = async (url: string): Promise<iResponse> => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${url}`, {
                    cancelToken: this.source.token,
                })
                .then((res) => {
                    const { error, message, response } = res.data;
                    if (error === false) {
                        //no error
                        //dispatch the global state
                        this.dispatch({
                            type: Types.GET_DATA,
                            payload: {
                                arr: response
                            }, //an array
                        });
                        resolve(
                            Response(true, "success" + message, ColorType.SUCCESS)
                        );
                    } else {
                        this.dispatch({
                            type: Types.GET_DATA,
                            payload: {
                                arr: []
                            }//an array
                        });
                        console.log("get list server error", message);
                        resolve(Response(false, "failed: " + message, ColorType.DANGER));
                    }
                })
                .catch((e) => {
                    if (axios.isCancel(e)) {
                        console.log("cancel the request.");
                    } else {
                        console.log("get list error", e);
                    }
                    this.dispatch({
                        type: Types.GET_DATA,
                        payload: {
                            arr: []
                        }//an array
                    });
                    resolve(Response(false, e.message, ColorType.DANGER));
                });
        });
    }; //end get all(make sure you got a response (object type) )
    addData = (url: string, newdata: T): Promise<iResponse> => {
        return new Promise((resolve, reject) => {
            axios
                .post(url, newdata)
                .then((res) => {
                    const { error, message, response } = res.data;
                    if (error === false) {
                        //no error
                        //dispatch the global state
                        this.dispatch({
                            type: Types.ADD_DATA,
                            payload: response, //a newly created object
                        });

                        resolve(
                            Response(true, "success", ColorType.SUCCESS)
                        );
                    } else {
                        //error
                        console.log("list add server error: ", message)
                        resolve(Response(false, message, ColorType.DANGER));
                    }
                })
                .catch((e) => {
                    console.log("list add error: ", e)
                    resolve(Response(false, e.message, ColorType.DANGER));
                });
        });
    }; //end add data
    //id_field=primary key (based on which field item will be identified)
    updateData = (url: string, updateData: T, id_field: string): Promise<iResponse> => {
        return new Promise((resolve, reject) => {
            axios.put(url, updateData).then((res) => {
                const { error, message, response } = res.data
                // console.log("after update: ", res.data);
                if (error === false) {
                    //dispatch the global state
                    this.dispatch({
                        type: Types.UPDATE_DATA,
                        payload: {
                            id_field: id_field,
                            obj: updateData
                        }
                    });
                    resolve(Response(true, "update success", ColorType.SUCCESS));
                } else {
                    console.error("list update server error: ", message)
                    resolve(Response(false, message, ColorType.DANGER));
                }
            }).catch((e) => {
                console.error("list update error: ", e)
                resolve(Response(false, e.message, ColorType.DANGER));
            })
        });
    } //end update data
    // Delete Data
    deleteData = (url: string, id_field: string, obj: T): Promise<iResponse> => {
        return new Promise((resolve, reject) => {
            axios
                .delete(url)
                .then((res) => {
                    const { error, message, response } = res.data;
                    if (error === false) {
                        //dispatch the global state
                        this.dispatch({
                            type: Types.DELETE_DATA,
                            payload: { id_field: id_field, obj: obj },
                        });
                        resolve(Response(true, "Delete success", ColorType.SUCCESS))
                    } else {
                        console.error("list delete server error: ", message)
                        resolve(Response(false, message, ColorType.DANGER));
                    }
                })
                .catch((e) => {
                    console.error("list delete error: ", e);
                    resolve(Response(false, e.message, ColorType.DANGER));
                });
        });
    }; //end Delete data
}

export default ListAction;